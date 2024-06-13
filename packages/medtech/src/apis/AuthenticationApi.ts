import {
    AuthenticationApiImpl,
    AuthenticationProcess,
    AuthenticationResult,
    CryptoStrategies,
    DataOwnerWithType,
    ErrorHandler,
    MessageGatewayApi,
    Sanitizer,
    DeviceDto,
    HealthcarePartyDto,
    KeyStorageFacade,
    PatientDto,
    StorageFacade,
    CryptoPrimitives,
} from '@icure/typescript-common'
import Crypto from 'crypto'
import { MedTechApi } from './MedTechApi'
import { AuthenticationProvider } from '@icure/api/icc-x-api/auth/AuthenticationProvider'

export interface MedTechAuthenticationResult extends AuthenticationResult<MedTechApi> {
    /**
     * @deprecated Use {@link AuthenticationResult.api} instead
     */
    medTechApi: MedTechApi
}

export class AuthenticationApi extends AuthenticationApiImpl<MedTechApi> {
    constructor(
        messageGatewayApi: MessageGatewayApi,
        iCureBasePath: string,
        authProcessByEmailId: string | undefined,
        authProcessBySmsId: string | undefined,
        errorHandler: ErrorHandler,
        sanitizer: Sanitizer,
        private readonly crypto: CryptoPrimitives,
        storage: StorageFacade<string>,
        private readonly keyStorage: KeyStorageFacade,
        private readonly cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
        msgGtwSpecId: string,
        msgGtwUrl: string,
        authProvider?: AuthenticationProvider,
        fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined' ? window.fetch : typeof self !== 'undefined' ? self.fetch : fetch
    ) {
        super(messageGatewayApi, errorHandler, sanitizer, iCureBasePath, authProcessByEmailId, authProcessBySmsId, storage, msgGtwSpecId, msgGtwUrl, authProvider, fetchImpl)
    }

    async completeAuthentication(process: AuthenticationProcess, validationCode: string, tokenDurationInSeconds?: number): Promise<MedTechAuthenticationResult> {
        const res = await super.completeAuthentication(process, validationCode, tokenDurationInSeconds)
        return { ...res, medTechApi: res.api }
    }

    protected initApi(username: string, password: string, initialTokens: { token: string; refreshToken: string } | undefined): Promise<MedTechApi> {
        const builder = new MedTechApi.Builder()
            .withICureBaseUrl(this.iCureBasePath)
            .withUserName(username)
            .withPassword(password)
            .withCrypto(this.crypto)
            .withStorage(this.storage)
            .withKeyStorage(this.keyStorage)
            .withCryptoStrategies(this.cryptoStrategies)
            .withMsgGwSpecId(this.msgGtwSpecId)
            .withMsgGwUrl(this.msgGtwUrl)
        if (!!initialTokens) {
            builder.withInitialTokens(initialTokens)
        }
        if (this.authProcessBySmsId) {
            builder.withAuthProcessBySmsId(this.authProcessBySmsId)
        }
        if (this.authProcessByEmailId) {
            builder.withAuthProcessByEmailId(this.authProcessByEmailId)
        }
        return builder.build()
    }

    protected validateDevice(deviceDto: DeviceDto): void {
        return
    }

    protected validateHcp(hcpDto: HealthcarePartyDto): void {
        return
    }

    protected validatePatient(patientDto: PatientDto): void {
        return
    }
}

export const authenticationApi = (
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    messageGatewayApi: MessageGatewayApi,
    iCureBasePath: string,
    authProcessByEmailId: string | undefined,
    authProcessBySmsId: string | undefined,
    crypto: CryptoPrimitives,
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade,
    cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
    authProvider: AuthenticationProvider,
    msgGtwSpecId: string,
    msgGtwUrl: string,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) => new AuthenticationApi(messageGatewayApi, iCureBasePath, authProcessByEmailId, authProcessBySmsId, errorHandler, sanitizer, crypto, storage, keyStorage, cryptoStrategies, msgGtwSpecId, msgGtwUrl, authProvider, fetchImpl)
