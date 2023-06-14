import {ignoreSerialization} from "../utils/decorators";
import {KeyPair} from "./KeyPair";

@ignoreSerialization
export class AuthenticationResult<DSApi> {
  constructor(json: IAuthenticationResult<DSApi>) {
    Object.assign(this as AuthenticationResult<DSApi>, json)
  }

  'api': DSApi
  /**
   * Available key pairs for the data owner using the api. Hex-encoded byte representation of the private key and public
   * key in pkcs8 and spki format respectively. Note that the key pairs are automatically saved in the key storage
   * implementation provided by iCure. This includes both verified and unverified key pairs.
   */
  'keyPairs': KeyPair[]
  'token': string
  'groupId': string
  'userId': string
}

interface IAuthenticationResult<DSApi> {
  api?: DSApi
  keyPairs?: { privateKey: string; publicKey: string }[]
  token?: string
  groupId?: string
  userId?: string
}
