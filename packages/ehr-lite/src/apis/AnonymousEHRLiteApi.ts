import { AnonymousApiBuilder, AuthenticationApi, CryptoStrategies, DataOwnerWithType, KeyStorageFacade, StorageFacade, CryptoPrimitives } from '@icure/typescript-common'
import { EHRLiteApi } from './EHRLiteApi'
import { authenticationApi } from './AuthenticationApi'
import { CommonAnonymousApi } from '@icure/typescript-common'

export class AnonymousEHRLiteApi extends CommonAnonymousApi<EHRLiteApi> {
    private readonly _authenticationApi: AuthenticationApi<EHRLiteApi>

    constructor(
        iCureUrlPath: string,
        msgGwUrl: string,
        msgGwSpecId: string,
        storage: StorageFacade<string>,
        keyStorage: KeyStorageFacade,
        private readonly cryptoPrimitives: CryptoPrimitives,
        private readonly cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
        authProcessInfo: { authProcessBySmsId: string; authProcessByEmailId?: string } | { authProcessBySmsId?: string; authProcessByEmailId: string },
        private readonly _messageCharactersLimit: number | undefined,
    ) {
        super(msgGwUrl, msgGwSpecId, storage, keyStorage, undefined, undefined)

        this._authenticationApi = authenticationApi(
            this._errorHandler,
            this._sanitizer,
            this._messageGatewayApi,
            iCureUrlPath,
            authProcessInfo.authProcessByEmailId,
            authProcessInfo.authProcessBySmsId,
            cryptoPrimitives,
            storage,
            keyStorage,
            this.cryptoStrategies,
            this._messageCharactersLimit,
            msgGwSpecId,
            msgGwUrl,
        )
    }

    get authenticationApi(): AuthenticationApi<EHRLiteApi> {
        return this._authenticationApi
    }
}

export namespace AnonymousEHRLiteApi {
    export class Builder extends AnonymousApiBuilder<CryptoStrategies<DataOwnerWithType>, AnonymousEHRLiteApi> {
        protected messageCharactersLimit?: number

        withMessageCharactersLimit(limit: number): this {
            this.messageCharactersLimit = limit
            return this
        }

        protected doBuild(props: {
            iCureBaseUrl: string
            msgGwUrl: string
            msgGwSpecId: string
            storage: StorageFacade<string>
            keyStorage: KeyStorageFacade
            primitives: CryptoPrimitives
            cryptoStrategies: CryptoStrategies<DataOwnerWithType>
            authProcessInfo:
                | { authProcessBySmsId: string; authProcessByEmailId?: string }
                | {
                      authProcessBySmsId?: string
                      authProcessByEmailId: string
                  }
            messageCharactersLimit: number | undefined
        }): Promise<AnonymousEHRLiteApi> {
            return Promise.resolve(new AnonymousEHRLiteApi(props.iCureBaseUrl, props.msgGwUrl, props.msgGwSpecId, props.storage, props.keyStorage, props.primitives, props.cryptoStrategies, props.authProcessInfo, props.messageCharactersLimit))
        }
    }
}
