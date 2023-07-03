import { AuthenticationApi, CryptoStrategies, DataOwnerWithType, ErrorHandler, ErrorHandlerImpl, formatICureApiUrl, ICURE_CLOUD_URL, MSG_GW_CLOUD_URL, Sanitizer, SanitizerImpl } from '@icure/typescript-common'
import { KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade } from '@icure/api'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { EHRLiteApi } from './EHRLiteApi'
import { authenticationApi } from './AuthenticationApi'
import { messageGatewayApi } from './MessageGatewayApi'

export class AnonymousEHRLiteApi {
    private readonly _iCureUrlPath: string
    private readonly _msgGwUrl: string
    private readonly _msgGwSpecId: string
    private readonly _authenticationApi: AuthenticationApi<EHRLiteApi>
    private readonly _errorHandler: ErrorHandler
    private readonly _sanitizer: Sanitizer

    constructor(
        iCureUrlPath: string,
        msgGwUrl: string,
        msgGwSpecId: string,
        authProcessByEmailId: string | undefined,
        authProcessBySmsId: string | undefined,
        storage: StorageFacade<string>,
        keyStorage: KeyStorageFacade,
        private readonly cryptoPrimitives: CryptoPrimitives,
        private readonly cryptoStrategies: CryptoStrategies<DataOwnerWithType>
    ) {
        this._iCureUrlPath = iCureUrlPath
        this._msgGwUrl = msgGwUrl
        this._msgGwSpecId = msgGwSpecId

        this._errorHandler = new ErrorHandlerImpl()
        this._sanitizer = new SanitizerImpl(this._errorHandler)

        this._authenticationApi = authenticationApi(
            this._errorHandler,
            this._sanitizer,
            messageGatewayApi(this._msgGwUrl, this._msgGwSpecId, this._errorHandler, this._sanitizer),
            this._iCureUrlPath,
            authProcessByEmailId,
            authProcessBySmsId,
            cryptoPrimitives.crypto,
            storage,
            keyStorage,
            this.cryptoStrategies
        )
    }

    get authenticationApi(): AuthenticationApi<EHRLiteApi> {
        return this._authenticationApi
    }
}

export namespace AnonymousEHRLiteApi {
    export class Builder {
        private iCureBaseUrl: string = ICURE_CLOUD_URL
        private msgGwUrl: string = MSG_GW_CLOUD_URL
        private msgGwSpecId?: string
        private authProcessByEmailId?: string
        private authProcessBySmsId?: string
        private crypto?: Crypto
        private storage?: StorageFacade<string>
        private keyStorage?: KeyStorageFacade
        private cryptoStrategies?: CryptoStrategies<DataOwnerWithType>

        withICureBaseUrl(newICureBaseUrl: string): Builder {
            this.iCureBaseUrl = formatICureApiUrl(newICureBaseUrl)
            return this
        }

        withMsgGwUrl(msgGwUrl: string): Builder {
            this.msgGwUrl = msgGwUrl
            return this
        }

        withMsgGwSpecId(msgGwSpecId: string): Builder {
            this.msgGwSpecId = msgGwSpecId
            return this
        }

        withAuthProcessByEmailId(authProcessByEmailId: string): Builder {
            this.authProcessByEmailId = authProcessByEmailId
            return this
        }

        withAuthProcessBySmsId(authProcessBySmsId: string): Builder {
            this.authProcessBySmsId = authProcessBySmsId
            return this
        }

        withCrypto(crypto: Crypto): Builder {
            this.crypto = crypto
            return this
        }

        withStorage(storage: StorageFacade<string>): Builder {
            this.storage = storage
            return this
        }

        withKeyStorage(keyStorage: KeyStorageFacade): Builder {
            this.keyStorage = keyStorage
            return this
        }

        withCryptoStrategies(strategies: CryptoStrategies<DataOwnerWithType>): Builder {
            this.cryptoStrategies = strategies
            return this
        }

        async build(): Promise<AnonymousEHRLiteApi> {
            const iCureBaseUrl = this.iCureBaseUrl
            const msgGwUrl = this.msgGwUrl
            const msgGwSpecId = this.msgGwSpecId
            const authProcessByEmailId = this.authProcessByEmailId
            const authProcessBySmsId = this.authProcessBySmsId
            const cryptoStrategies = this.cryptoStrategies
            if (!authProcessByEmailId && !authProcessBySmsId) {
                throw new Error('At least one between authProcessIdBySms and authProcessByEmailId is required')
            }
            if (!msgGwSpecId) {
                throw new Error('msgGtwSpecId is required')
            }
            if (!cryptoStrategies) {
                throw new Error('cryptoStrategies is required')
            }

            const storage = this.storage ?? new LocalStorageImpl()
            const keyStorage = this.keyStorage ?? new KeyStorageImpl(storage)

            return new AnonymousEHRLiteApi(iCureBaseUrl, msgGwUrl, msgGwSpecId, authProcessByEmailId, authProcessBySmsId, storage, keyStorage, new CryptoPrimitives(this.crypto), cryptoStrategies)
        }
    }
}
