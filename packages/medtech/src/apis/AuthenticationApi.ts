import { AuthenticationApiImpl, AuthenticationProcess, AuthenticationResult, CryptoStrategies, DataOwnerWithType, ErrorHandler, MessageGatewayApi, Sanitizer } from '@icure/typescript-common'
import { Device, HealthcareParty, KeyStorageFacade, Patient, StorageFacade } from '@icure/api'
import Crypto from 'crypto'
import { MedTechApi } from './MedTechApi'

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
        private readonly crypto: Crypto,
        storage: StorageFacade<string>,
        private readonly keyStorage: KeyStorageFacade,
        private readonly cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
        private readonly fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined' ? window.fetch : typeof self !== 'undefined' ? self.fetch : fetch,
    ) {
        super(messageGatewayApi, errorHandler, sanitizer, iCureBasePath, authProcessByEmailId, authProcessBySmsId, storage)
    }

    async completeAuthentication(process: AuthenticationProcess, validationCode: string, tokenDurationInSeconds?: number): Promise<MedTechAuthenticationResult> {
        const res = await super.completeAuthentication(process, validationCode, tokenDurationInSeconds)
        return { ...res, medTechApi: res.api }
    }

    protected initApi(username: string, password: string): Promise<MedTechApi> {
        const builder = new MedTechApi.Builder().withICureBaseUrl(this.iCureBasePath).withUserName(username).withPassword(password).withCrypto(this.crypto).withStorage(this.storage).withKeyStorage(this.keyStorage).withCryptoStrategies(this.cryptoStrategies)
        if (this.authProcessBySmsId) {
            builder.withAuthProcessBySmsId(this.authProcessBySmsId)
        }
        if (this.authProcessByEmailId) {
            builder.withAuthProcessByEmailId(this.authProcessByEmailId)
        }
        return builder.build()
    }

    protected validateDevice(deviceDto: Device): void {
        return
    }

    protected validateHcp(hcpDto: HealthcareParty): void {
        return
    }

    protected validatePatient(patientDto: Patient): void {
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
    crypto: Crypto,
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade,
    cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
) => new AuthenticationApi(messageGatewayApi, iCureBasePath, authProcessByEmailId, authProcessBySmsId, errorHandler, sanitizer, crypto, storage, keyStorage, cryptoStrategies, fetchImpl)
