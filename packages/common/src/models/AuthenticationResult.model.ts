import { ignoreSerialization } from '../utils/decorators'
import { KeyPair } from './KeyPair.model'
import { CommonApi } from '../apis/CommonApi'

@ignoreSerialization
export class AuthenticationResult<DSApi extends CommonApi> {
    constructor(json: IAuthenticationResult<DSApi>) {
        this.api = json.api
        this.keyPairs = json.keyPairs.map((item) => new KeyPair(item))
        this.token = json.token
        this.groupId = json.groupId
        this.userId = json.userId
    }

    api: DSApi
    /**
     * Available key pairs for the data owner using the api. Hex-encoded byte representation of the private key and public
     * key in pkcs8 and spki format respectively. Note that the key pairs are automatically saved in the key storage
     * implementation provided by iCure. This includes both verified and unverified key pairs.
     */
    keyPairs: KeyPair[] = []
    token: string
    groupId: string
    userId: string
}

export interface IAuthenticationResult<DSApi> {
    api: DSApi
    keyPairs: { privateKey: string; publicKey: string }[]
    token: string
    groupId: string
    userId: string
}
