import { AuthenticationApi } from '../AuthenticationApi'
import { IccCryptoXApi, IccPatientXApi, IccUserXApi, retry, ua2hex, User } from '@icure/api'
import { Sanitizer } from '../../services/Sanitizer'
import { ErrorHandler } from '../../services/ErrorHandler'
import { MessageGatewayApi } from '../MessageGatewayApi'
import { KeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { AuthenticationResult } from '../../models/AuthenticationResult.model'
import { AuthenticationProcess } from '../../models/AuthenticationProcess.model'
import { RecaptchaType } from '../../models/RecaptchaType.model'
import { CommonApi } from '../CommonApi'

export abstract class AuthenticationApiImpl<DSApi extends CommonApi> implements AuthenticationApi<DSApi> {
    protected constructor(
        private readonly messageGatewayApi: MessageGatewayApi,
        protected readonly errorHandler: ErrorHandler,
        private readonly sanitizer: Sanitizer,
        protected readonly iCureBasePath: string,
        private readonly authProcessByEmailId: string | undefined,
        private readonly authProcessBySmsId: string | undefined
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
        healthcareProfessionalId?: string,
        bypassTokenCheck?: boolean,
        validationCodeLength?: number,
        recaptchaType?: RecaptchaType
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

    protected abstract _generateAndAssignAuthenticationToken(
        login: string,
        validationCode: string
    ): Promise<{
        authenticatedApi: DSApi
        user: User
        password: string
        cryptoApi: IccCryptoXApi
    }>

    abstract authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string): Promise<AuthenticationResult<DSApi>>

    protected async _initUserAuthTokenAndCrypto(login: string, token: string): Promise<AuthenticationResult<DSApi>> {
        const { authenticatedApi, user, cryptoApi, password } = await retry(() => this._generateAndAssignAuthenticationToken(login, token))

        const userKeyPairs: KeyPair<string>[] = []
        for (const keyPair of Object.values(cryptoApi.userKeysManager.getDecryptionKeys())) {
            userKeyPairs.push({
                publicKey: ua2hex(await cryptoApi.primitives.RSA.exportKey(keyPair.publicKey, 'spki')),
                privateKey: ua2hex(await cryptoApi.primitives.RSA.exportKey(keyPair.privateKey, 'pkcs8')),
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
}
