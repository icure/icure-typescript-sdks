import { AuthenticationApiImpl, CryptoStrategies, DataOwnerWithType, ErrorHandler, extractDomainType, MessageGatewayApi, Sanitizer, DeviceDto, HealthcarePartyDto, KeyStorageFacade, PatientDto, StorageFacade, JwtBridgedAuthService } from '@icure/typescript-common'
import { EHRLiteApi } from './EHRLiteApi'
import Crypto from 'crypto'
import { DataOwnerTypeEnum } from '../models/DataOwner.model'
import { AuthenticationProvider } from '@icure/api/icc-x-api/auth/AuthenticationProvider'

export class AuthenticationApi extends AuthenticationApiImpl<EHRLiteApi> {
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
        private readonly messageCharactersLimit: number | undefined,
        msgGtwSpecId: string,
        msgGtwUrl: string,
        authProvider?: AuthenticationProvider,
        fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined' ? window.fetch : typeof self !== 'undefined' ? self.fetch : fetch,
    ) {
        super(messageGatewayApi, errorHandler, sanitizer, iCureBasePath, authProcessByEmailId, authProcessBySmsId, storage, msgGtwSpecId, msgGtwUrl, authProvider, fetchImpl)
    }

    protected initApi(username: string, password: string): Promise<EHRLiteApi> {
        const builder = new EHRLiteApi.Builder()
            .withICureBaseUrl(this.iCureBasePath)
            .withUserName(username)
            .withPassword(password)
            .withCrypto(this.crypto)
            .withStorage(this.storage)
            .withKeyStorage(this.keyStorage)
            .withCryptoStrategies(this.cryptoStrategies)
            .withMessageCharactersLimit(this.messageCharactersLimit)
            .withMsgGwUrl(this.msgGtwUrl)
            .withMsgGwSpecId(this.msgGtwSpecId)
        if (this.authProcessBySmsId) {
            builder.withAuthProcessBySmsId(this.authProcessBySmsId)
        }
        if (this.authProcessByEmailId) {
            builder.withAuthProcessByEmailId(this.authProcessByEmailId)
        }
        return builder.build()
    }

    protected validateDevice(deviceDto: DeviceDto): void {
        throw new Error('Unsupported DataOwner')
    }

    protected validateHcp(hcpDto: HealthcarePartyDto): void {
        const domainType = hcpDto.tags ? extractDomainType(hcpDto.tags) : undefined

        if (domainType === undefined) {
            throw new Error('Domain type is not found')
        }

        if (domainType !== DataOwnerTypeEnum.PRACTITIONER && domainType !== DataOwnerTypeEnum.ORGANISATION) {
            throw new Error('Unsupported DataOwner')
        }
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
    crypto: Crypto,
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade,
    cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
    messageCharactersLimit: number | undefined,
    msgGtwSpecId: string,
    msgGtwUrl: string,
    authProvider?: AuthenticationProvider,
    fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
) => new AuthenticationApi(messageGatewayApi, iCureBasePath, authProcessByEmailId, authProcessBySmsId, errorHandler, sanitizer, crypto, storage, keyStorage, cryptoStrategies, messageCharactersLimit, msgGtwSpecId, msgGtwUrl, authProvider, fetchImpl)
