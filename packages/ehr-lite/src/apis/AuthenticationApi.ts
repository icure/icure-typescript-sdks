import {
    AuthenticationApiImpl,
    AuthenticationResult, CryptoStrategies, DataOwnerWithType,
    ErrorHandler,
    MessageGatewayApi,
    Notification,
    NotificationTypeEnum,
    Sanitizer, User
} from "@icure/typescript-common";
import {EHRLite, EHRLiteApi} from "./EHRLiteApi";
import {IccCryptoXApi, KeyStorageFacade, Patient as PatientDto, StorageFacade, User as UserDto} from "@icure/api";
import {mapper} from "../mappers/mapper";
import {Patient} from "../models/Patient.model";
import {v4 as uuid} from "uuid";
import Crypto from "crypto";

class AuthenticationApi extends AuthenticationApiImpl<EHRLiteApi> {

    constructor(
        messageGatewayApi: MessageGatewayApi,
        iCureBasePath: string,
        authProcessByEmailId: string | undefined,
        authProcessBySmsId: string | undefined,
        errorHandler: ErrorHandler,
        sanitizer: Sanitizer,
        private readonly crypto: Crypto,
        private readonly storage: StorageFacade<string>,
        private readonly keyStorage: KeyStorageFacade,
        private readonly cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
        private readonly fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
            ? window.fetch
            : typeof self !== 'undefined'
                ? self.fetch
                : fetch
    ) {
        super(messageGatewayApi, errorHandler, sanitizer, iCureBasePath, authProcessByEmailId, authProcessBySmsId);
    }

    async authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string): Promise<AuthenticationResult<EHRLiteApi>> {
        const authenticationResult = await this._initUserAuthTokenAndCrypto(userLogin, shortLivedToken)

        const loggedUser = await authenticationResult.api.userApi.getLogged()
        if (!loggedUser) {
            throw this.errorHandler.createErrorWithMessage(
                `There is no user currently logged in. You must call this method from an authenticated MedTechApi`
            )
        } else if (!!loggedUser.patientId) {
            const patientDataOwner = await authenticationResult.api.patientApi.getAndTryDecrypt(loggedUser.patientId)
            if (!patientDataOwner)
                throw this.errorHandler.createErrorWithMessage(
                    `Impossible to find the patient ${loggedUser.patientId} apparently linked to the user ${loggedUser.id}. Are you sure this patientId is correct ?`
                )

            const delegatesInfo = await authenticationResult.api.cryptoApi.xapi.getDataOwnersWithAccessTo({
                entity: mapper.map(patientDataOwner.patient, Patient, PatientDto)!,
                type: 'Patient',
            })
            const delegates = Object.keys(delegatesInfo.permissionsByDataOwnerId)

            for (const delegate of delegates) {
                const accessNotification = await authenticationResult.api.notificationApi.createOrModify(
                    new Notification({
                        id: uuid(),
                        status: 'pending',
                        author: loggedUser.id,
                        responsible: loggedUser.patientId,
                        type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
                    }),
                    delegate
                )
                //TODO Return which delegates were warned to share back info & add retry mechanism
                if (!accessNotification)
                    console.error(
                        `iCure could not create a notification to healthcare party ${delegate} to ask access back to ${loggedUser.patientId} data. Make sure to create a notification for the healthcare party so that he gives back access to ${loggedUser.patientId} data.`
                    )
            }
        } else if (!!loggedUser.healthcarePartyId) {
            const hcpDataOwner = await authenticationResult.api.baseApi.healthcarePartyApi
                .getHealthcareParty(loggedUser.healthcarePartyId, false)
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })

            if (!hcpDataOwner)
                throw this.errorHandler.createErrorWithMessage(
                    `Impossible to find the healthcare party ${loggedUser.healthcarePartyId} apparently linked to user ${loggedUser.id}. Are you sure this healthcarePartyId is correct ?`
                )
        } else {
            throw this.errorHandler.createErrorWithMessage(
                `User with id ${loggedUser.id} is not a Data Owner. To be a Data Owner, your user needs to have either patientId, healthcarePartyId or deviceId filled in`
            )
        }

        return authenticationResult
    }

    protected async _generateAndAssignAuthenticationToken(login: string, validationCode: string): Promise<{
        authenticatedApi: EHRLiteApi;
        user: UserDto;
        password: string;
        cryptoApi: IccCryptoXApi
    }> {
        const api = await EHRLite.api()
            .withICureBaseUrl(this.iCureBasePath)
            .withUserName(login)
            .withPassword(validationCode)
            .withCrypto(this.crypto)
            .withStorage(this.storage)
            .withKeyStorage(this.keyStorage)
            .withCryptoStrategies(this.cryptoStrategies)
            .build()

        const user = await api.userApi.getLogged()
        if (!user) {
            throw this.errorHandler.createErrorWithMessage(
                `Your validation code ${validationCode} expired. Start a new authentication process for your user`
            )
        }

        const token = await api.userApi.createToken(user.id!, 3600 * 24 * 365 * 10)
        if (!token) {
            throw this.errorHandler.createErrorWithMessage(
                `Your validation code ${validationCode} expired. Start a new authentication process for your user`
            )
        }

        return {
            authenticatedApi: await EHRLite.api(api).withPassword(token).build(),
            user: mapper.map(user, User, UserDto)!,
            password: token,
            cryptoApi: api.cryptoApi
        }
    }

}

export const authenticationApi = (
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    messageGatewayApi: MessageGatewayApi,
    iCureBasePath: string,
    authProcessByEmailId: string | undefined,
    authProcessBySmsId: string | undefined,
    crypto: Crypto,
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade,
    cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) => new AuthenticationApi(
    messageGatewayApi,
    iCureBasePath,
    authProcessByEmailId,
    authProcessBySmsId,
    errorHandler,
    sanitizer,
    crypto,
    storage,
    keyStorage,
    cryptoStrategies,
    fetchImpl
);