import { CryptoStrategies } from '../services/CryptoStrategies'
import { CommonApi, formatICureApiUrl, ICURE_CLOUD_URL, MessageFactory, MSG_GW_CLOUD_URL } from '../index'
import { KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade } from '@icure/api'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { CommonAnonymousApi } from '../apis/CommonAnonymousApi'
import { AuthSecretProvider } from '@icure/api/icc-x-api/auth/SmartAuthProvider'

export abstract class ApiBuilder<DSCryptoStrategies extends CryptoStrategies<any>, DSApi> {
    protected iCureBaseUrl: string = ICURE_CLOUD_URL
    protected msgGwUrl: string = MSG_GW_CLOUD_URL
    protected msgGwSpecId?: string
    protected authProcessByEmailId?: string
    protected authProcessBySmsId?: string
    protected crypto?: Crypto
    protected storage?: StorageFacade<string>
    protected keyStorage?: KeyStorageFacade
    protected cryptoStrategies?: DSCryptoStrategies
    protected authSecretProvider?: AuthSecretProvider

    withAuthSecretProvider(authSecretProvider: AuthSecretProvider): this {
        this.authSecretProvider = authSecretProvider
        return this
    }

    withICureBaseUrl(newICureBaseUrl: string): this {
        this.iCureBaseUrl = formatICureApiUrl(newICureBaseUrl)
        return this
    }

    withMsgGwUrl(msgGwUrl: string): this {
        this.msgGwUrl = msgGwUrl
        return this
    }

    withMsgGwSpecId(msgGwSpecId: string): this {
        this.msgGwSpecId = msgGwSpecId
        return this
    }

    withAuthProcessByEmailId(authProcessByEmailId: string): this {
        this.authProcessByEmailId = authProcessByEmailId
        return this
    }

    withAuthProcessBySmsId(authProcessBySmsId: string): this {
        this.authProcessBySmsId = authProcessBySmsId
        return this
    }

    withCrypto(crypto: Crypto): this {
        this.crypto = crypto
        return this
    }

    withStorage(storage: StorageFacade<string>): this {
        this.storage = storage
        return this
    }

    withKeyStorage(keyStorage: KeyStorageFacade): this {
        this.keyStorage = keyStorage
        return this
    }

    withCryptoStrategies(strategies: DSCryptoStrategies): this {
        this.cryptoStrategies = strategies
        return this
    }

    abstract build(): Promise<DSApi>
}

export abstract class AnonymousApiBuilder<DSCryptoStrategies extends CryptoStrategies<any>, DSApi extends CommonAnonymousApi<any>> extends ApiBuilder<DSCryptoStrategies, DSApi> {
    build(): Promise<DSApi> {
        const iCureBaseUrl = this.iCureBaseUrl
        const msgGwUrl = this.msgGwUrl
        const msgGwSpecId = this.msgGwSpecId
        const authProcessByEmailId = this.authProcessByEmailId
        const authProcessBySmsId = this.authProcessBySmsId
        const cryptoStrategies = this.cryptoStrategies
        const authProcessInfo = !!authProcessByEmailId && !!authProcessBySmsId ? { authProcessBySmsId, authProcessByEmailId } : !!authProcessBySmsId ? { authProcessBySmsId } : !!authProcessByEmailId ? { authProcessByEmailId } : undefined
        if (!authProcessInfo) {
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

        return this.doBuild({
            iCureBaseUrl,
            msgGwUrl,
            msgGwSpecId,
            storage,
            keyStorage,
            primitives: new CryptoPrimitives(this.crypto),
            cryptoStrategies: cryptoStrategies,
            authProcessInfo,
        })
    }

    protected abstract doBuild(props: {
        iCureBaseUrl: string
        msgGwUrl: string
        msgGwSpecId: string
        storage: StorageFacade<string>
        keyStorage: KeyStorageFacade
        primitives: CryptoPrimitives
        cryptoStrategies: DSCryptoStrategies
        authProcessInfo: { authProcessBySmsId: string; authProcessByEmailId?: string } | { authProcessBySmsId?: string; authProcessByEmailId: string }
    }): Promise<DSApi>
}

export abstract class AuthenticatedApiBuilder<DSCryptoStrategies extends CryptoStrategies<any>, DSMessageFactory extends MessageFactory<any, any, any>, DSApi extends CommonApi> extends ApiBuilder<DSCryptoStrategies, DSApi> {
    private userName?: string
    private password?: string
    protected messageFactory?: DSMessageFactory

    withUserName(newUserName: string): this {
        this.userName = newUserName
        return this
    }

    withPassword(newPassword: string): this {
        this.password = newPassword
        return this
    }

    withMessageFactory(messageFactory: DSMessageFactory): this {
        this.messageFactory = messageFactory
        return this
    }

    build(): Promise<DSApi> {
        const iCureBaseUrl = this.iCureBaseUrl
        const username = this.userName
        const password = this.password
        const cryptoStrategies = this.cryptoStrategies
        const crypto = this.crypto
        const msgGwUrl = this.msgGwUrl
        const msgGwSpecId = this.msgGwSpecId
        const authProcessByEmailId = this.authProcessByEmailId
        const authProcessBySmsId = this.authProcessBySmsId
        const storage = this.storage
        const keyStorage = this.keyStorage
        const messageFactory = this.messageFactory
        const secretProvider = this.authSecretProvider
        if (iCureBaseUrl == undefined) {
            throw new Error('iCureBaseUrl is required')
        }
        if (username == undefined) {
            throw new Error('userName is required')
        }
        if (cryptoStrategies == undefined) {
            throw new Error('cryptoStrategies is required')
        }
        let loginDetails
        if (secretProvider != undefined) {
            loginDetails = {
                username,
                secretProvider,
                password,
            }
        } else if (password != undefined) {
            loginDetails = {
                username,
                password,
            }
        } else throw new Error('either a password or an authSecretProvider is required')

        return this.doBuild({
            iCureBaseUrl,
            cryptoStrategies,
            crypto,
            msgGwUrl,
            msgGwSpecId,
            authProcessByEmailId,
            authProcessBySmsId,
            storage,
            keyStorage,
            messageFactory,
            loginDetails,
        })
    }

    protected abstract doBuild(props: {
        iCureBaseUrl: string
        msgGwUrl: string
        msgGwSpecId: string | undefined
        storage: StorageFacade<string> | undefined
        keyStorage: KeyStorageFacade | undefined
        cryptoStrategies: DSCryptoStrategies
        loginDetails:
            | {
                  username: string
                  password: string
              }
            | {
                  username: string
                  secretProvider: AuthSecretProvider
                  password: string | undefined
              }
        crypto: Crypto | undefined
        authProcessByEmailId: string | undefined
        authProcessBySmsId: string | undefined
        messageFactory: DSMessageFactory | undefined
    }): Promise<DSApi>
}
