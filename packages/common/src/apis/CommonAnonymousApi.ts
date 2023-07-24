import { Apis, KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade } from '@icure/api'
import { ErrorHandler } from '../services/ErrorHandler'
import { Sanitizer } from '../services/Sanitizer'
import { ErrorHandlerImpl } from '../services/impl/ErrorHandlerImpl'
import { SanitizerImpl } from '../services/impl/SanitizerImpl'
import { MessageGatewayApi } from './MessageGatewayApi'
import { MessageGatewayApiImpl } from './impl/MessageGatewayApiImpl'
import { AuthenticationApi } from './AuthenticationApi'
import { CommonApi } from './CommonApi'

export abstract class CommonAnonymousApi<DSApi extends CommonApi> {
    protected readonly _messageGatewayApi: MessageGatewayApi
    protected readonly _errorHandler: ErrorHandler
    protected readonly _sanitizer: Sanitizer
    protected readonly _storage: StorageFacade<string>
    protected readonly _keyStorage: KeyStorageFacade

    protected constructor(
        protected readonly msgGtwUrl: string,
        protected readonly msgGtwSpecId: string,
        storage?: StorageFacade<string>,
        keyStorage?: KeyStorageFacade,
        errorHandler?: ErrorHandler,
        sanitizer?: Sanitizer,
    ) {
        this._errorHandler = errorHandler ?? new ErrorHandlerImpl()
        this._sanitizer = sanitizer ?? new SanitizerImpl(this._errorHandler)

        this._storage = storage ?? new LocalStorageImpl()
        this._keyStorage = keyStorage ?? new KeyStorageImpl(this._storage)

        this._messageGatewayApi = new MessageGatewayApiImpl(msgGtwUrl, msgGtwSpecId, this._errorHandler, this._sanitizer, undefined, undefined)
    }

    abstract get authenticationApi(): AuthenticationApi<DSApi>
}
