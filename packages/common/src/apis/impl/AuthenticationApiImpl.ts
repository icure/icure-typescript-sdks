import { AuthenticationApi } from '../AuthenticationApi'
import {
    BasicApis, Device,
    HealthcareParty,
    IccCryptoXApi,
    IccPatientXApi,
    IccUserXApi,
    Patient,
    retry,
    ua2hex,
    User
} from '@icure/api'
import { Sanitizer } from '../../services/Sanitizer'
import { ErrorHandler } from '../../services/ErrorHandler'
import { MessageGatewayApi } from '../MessageGatewayApi'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { AuthenticationResult } from '../../models/AuthenticationResult.model'
import { AuthenticationProcess } from '../../models/AuthenticationProcess.model'
import { RecaptchaType } from '../../models/RecaptchaType.model'
import { CommonApi } from '../CommonApi'
import {UserLikeApi} from "../UserLikeApi";
import {forceUuid} from "../../utils/uuidUtils";
import {NotificationTypeEnum} from "../../models/Notification.model";

export abstract class AuthenticationApiImpl<DSApi extends CommonApi> implements AuthenticationApi<DSApi> {
    protected constructor(
        private readonly messageGatewayApi: MessageGatewayApi,
        protected readonly errorHandler: ErrorHandler,
        private readonly sanitizer: Sanitizer,
        protected readonly iCureBasePath: string,
        protected readonly authProcessByEmailId: string | undefined,
        protected readonly authProcessBySmsId: string | undefined
    ) {}

    async completeAuthentication(process: AuthenticationProcess, validationCode: string): Promise<AuthenticationResult<DSApi>> {
        const result = await this.messageGatewayApi.validateProcess(process.requestId, validationCode).catch((e) => {
            if (process.bypassTokenCheck) {
                return true
            }
            throw e
        })

        if (result) {
            return this._initUserAuthTokenAndCrypto(process.login, validationCode)
        }

        throw this.errorHandler.createErrorWithMessage(`iCure could not complete authentication process with requestId ${process.requestId}. Try again later.`)
    }

    async startAuthentication(
        recaptcha: string,
        email?: string,
        phoneNumber?: string,
        firstName: string = '',
        lastName: string = '',
        healthcareProfessionalId: string = '',
        bypassTokenCheck: boolean = false,
        validationCodeLength: number = 6,
        recaptchaType: RecaptchaType = 'recaptcha'
    ): Promise<AuthenticationProcess> {

        if (!email && !phoneNumber) {
            throw this.errorHandler.createErrorWithMessage(`In order to start authentication of a user, you should at least provide its email OR its phone number`)
        }

        if ((!!email && !this.authProcessByEmailId) || (!!phoneNumber && !this.authProcessBySmsId)) {
            throw this.errorHandler.createErrorWithMessage(
                `In order to start a user authentication with an email, you need to instantiate the API with a authProcessByEmailId. If you want to start the authentication with a phone number, then you need to instantiate the API with a authProcessBySmsId`
            )
        }

        const processId = !!email && !!this.authProcessByEmailId ? this.authProcessByEmailId : this.authProcessBySmsId

        const requestId = await this.messageGatewayApi.startProcess(
            processId!,
            {
                'g-recaptcha-response': recaptchaType === 'recaptcha' ? recaptcha : undefined,
                'friendly-captcha-response': recaptchaType === 'friendly-captcha' ? recaptcha : undefined,
                firstName: firstName,
                lastName: lastName,
                from: email != undefined ? this.sanitizer.validateEmail(email) : this.sanitizer.validateMobilePhone(phoneNumber!),
                email: email,
                mobilePhone: phoneNumber,
                hcpId: healthcareProfessionalId,
            },
            validationCodeLength
        )

        if (!!requestId) {
            return new AuthenticationProcess({
                requestId,
                login: (email ?? phoneNumber)!,
                bypassTokenCheck: bypassTokenCheck,
            })
        }

        throw this.errorHandler.createErrorWithMessage(`iCure could not start the authentication process ${processId} for user ${email ?? phoneNumber}. Try again later`)
    }

    private async _generateAndAssignAuthenticationToken(
        login: string,
        validationCode: string
    ): Promise<{
        user: User
        password: string
    }> {
        const userApi = (await BasicApis(this.iCureBasePath, login, validationCode)).userApi
        const user = await userApi.getCurrentUser()
        if (!user) {
            throw this.errorHandler.createErrorWithMessage(`Your validation code ${validationCode} expired. Start a new authentication process for your user`)
        }
        const token = await userApi.getToken(user.id!, forceUuid(), 3600 * 24 * 365 * 10)
        if (!token) {
            throw this.errorHandler.createErrorWithMessage(`Your validation code ${validationCode} expired. Start a new authentication process for your user`)
        }
        return { user, password: token }
    }

    protected async _initUserAuthTokenAndCrypto(login: string, token: string): Promise<AuthenticationResult<DSApi>> {
        const { user, password } = await retry(() => this._generateAndAssignAuthenticationToken(login, token), 5, 500, 2)
        const authenticatedApi = await  this.initApi(login, password)

        const userKeyPairs: KeyPair<string>[] = []
        for (const keyPair of Object.values(authenticatedApi.baseApi.cryptoApi.userKeysManager.getDecryptionKeys())) {
            userKeyPairs.push({
                publicKey: ua2hex(await authenticatedApi.baseApi.cryptoApi.primitives.RSA.exportKey(keyPair.publicKey, 'spki')),
                privateKey: ua2hex(await authenticatedApi.baseApi.cryptoApi.primitives.RSA.exportKey(keyPair.privateKey, 'pkcs8')),
            })
        }

        return new AuthenticationResult({
            api: authenticatedApi,
            keyPairs: userKeyPairs,
            token: password,
            groupId: user.groupId!,
            userId: user.id,
        })
    }

    async authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string): Promise<AuthenticationResult<DSApi>> {
        const authenticationResult = await this._initUserAuthTokenAndCrypto(userLogin, shortLivedToken)
        const baseApi = authenticationResult.api.baseApi
        const loggedUser = await baseApi.userApi.getCurrentUser()
        if (!loggedUser) {
            throw this.errorHandler.createErrorWithMessage(`There is no user currently logged in. You must call this method from an authenticated MedTechApi`)
        } else if (!!loggedUser.patientId) {
            const patientDataOwner = await baseApi.patientApi.getPatientWithUser(loggedUser, loggedUser.patientId)
            if (!patientDataOwner) throw this.errorHandler.createErrorWithMessage(`Impossible to find the patient ${loggedUser.patientId} apparently linked to the user ${loggedUser.id}. Are you sure this patientId is correct ?`)
            this.validatePatient(patientDataOwner)

            const delegatesInfo = await baseApi.cryptoApi.entities.getDataOwnersWithAccessTo(patientDataOwner)
            const delegates = Object.keys(delegatesInfo.permissionsByDataOwnerId)

            for (const delegate of delegates) {
                const accessNotification = await baseApi.maintenanceTaskApi.createMaintenanceTaskWithUser(
                    loggedUser,
                    await baseApi.maintenanceTaskApi.newInstance(
                        loggedUser,
                        {
                            status: 'pending',
                            author: loggedUser.id,
                            responsible: loggedUser.patientId,
                            taskType: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
                        },
                        {
                            additionalDelegates: { [delegate]: 'WRITE' }
                        }
                    ),
                )
                //TODO Return which delegates were warned to share back info & add retry mechanism
                if (!accessNotification)
                    console.error(`iCure could not create a notification to healthcare party ${delegate} to ask access back to ${loggedUser.patientId} data. Make sure to create a notification for the healthcare party so that he gives back access to ${loggedUser.patientId} data.`)
            }
        } else if (!!loggedUser.healthcarePartyId) {
            const hcpDataOwner = await baseApi.healthcarePartyApi.getHealthcareParty(loggedUser.healthcarePartyId, false).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

            if (!hcpDataOwner) throw this.errorHandler.createErrorWithMessage(`Impossible to find the healthcare party ${loggedUser.healthcarePartyId} apparently linked to user ${loggedUser.id}. Are you sure this healthcarePartyId is correct ?`)
            this.validateHcp(hcpDataOwner)
        } else if (!!loggedUser.deviceId) {
            const deviceDataOwner = await baseApi.deviceApi.getDevice(loggedUser.deviceId).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

            if (!deviceDataOwner) throw this.errorHandler.createErrorWithMessage(`Impossible to find the healthcare party ${loggedUser.healthcarePartyId} apparently linked to user ${loggedUser.id}. Are you sure this healthcarePartyId is correct ?`)
            this.validateDevice(deviceDataOwner)
        } else {
            throw this.errorHandler.createErrorWithMessage(`User with id ${loggedUser.id} is not a Data Owner. To be a Data Owner, your user needs to have either patientId, healthcarePartyId or deviceId filled in`)
        }

        return authenticationResult
    }

    protected abstract initApi(username: string, password: string): Promise<DSApi>
    protected abstract validatePatient(patientDto: Patient): void
    protected abstract validateHcp(hcpDto: HealthcareParty): void
    protected abstract validateDevice(deviceDto: Device): void
}
