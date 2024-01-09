import { Apis, KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade } from '@icure/api'
import { ErrorHandler } from '../services/ErrorHandler'
import { Sanitizer } from '../services/Sanitizer'
import { ErrorHandlerImpl } from '../services/impl/ErrorHandlerImpl'
import { SanitizerImpl } from '../services/impl/SanitizerImpl'
import { MessageGatewayApi } from './MessageGatewayApi'
import { MessageGatewayApiImpl } from './impl/MessageGatewayApiImpl'

export abstract class CommonApi {
    protected readonly _messageGatewayApi: MessageGatewayApi | undefined
    protected readonly _errorHandler: ErrorHandler
    protected readonly _sanitizer: Sanitizer
    protected readonly _storage: StorageFacade<string>
    protected readonly _keyStorage: KeyStorageFacade

    protected constructor(
        protected readonly _baseApi: Apis,
        username: string | undefined,
        password: string | undefined,
        protected readonly msgGtwUrl?: string,
        protected readonly msgGtwSpecId?: string,
        storage?: StorageFacade<string>,
        keyStorage?: KeyStorageFacade,
        errorHandler?: ErrorHandler,
        sanitizer?: Sanitizer,
    ) {
        this._errorHandler = errorHandler ?? new ErrorHandlerImpl()
        this._sanitizer = sanitizer ?? new SanitizerImpl(this._errorHandler)

        this._storage = storage ?? new LocalStorageImpl()
        this._keyStorage = keyStorage ?? new KeyStorageImpl(this._storage)

        this._messageGatewayApi = msgGtwUrl && msgGtwSpecId ? new MessageGatewayApiImpl(msgGtwUrl, msgGtwSpecId, this.errorHandler, this.sanitizer, username, password) : undefined
    }

    get baseApi(): Apis {
        return this._baseApi
    }

    get errorHandler(): ErrorHandler {
        return this._errorHandler
    }

    get sanitizer(): Sanitizer {
        return this._sanitizer
    }

    get messageGatewayApi(): MessageGatewayApi | undefined {
        return this._messageGatewayApi
    }
}
