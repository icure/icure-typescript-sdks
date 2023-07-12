import {KeyStorageFacade, StorageFacade} from '@icure/api'

import {AuthenticationApi, CryptoStrategies, DataOwnerWithType, MedTechApi} from '../../index'
import {CryptoPrimitives} from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import {CommonAnonymousApi} from '@icure/typescript-common/dist/apis/CommonAnonymousApi'
import {AnonymousApiBuilder} from '@icure/typescript-common'
import {MedTechCryptoStrategies} from '../services/MedTechCryptoStrategies'

export class AnonymousMedTechApi extends CommonAnonymousApi<MedTechApi> {
  private readonly _iCureUrlPath: string
  private readonly _msgGwUrl: string
  private readonly _msgGwSpecId: string
  private readonly _authenticationApi: AuthenticationApi

  constructor(
    iCureUrlPath: string,
    msgGwUrl: string,
    msgGwSpecId: string,
    storage: StorageFacade<string>,
    keyStorage: KeyStorageFacade,
    private readonly cryptoPrimitives: CryptoPrimitives,
    private readonly cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
    authProcessInfo: { authProcessBySmsId: string; authProcessByEmailId?: string } | { authProcessBySmsId?: string; authProcessByEmailId: string }
  ) {
    super(msgGwUrl, msgGwSpecId, storage, keyStorage)
    this._msgGwUrl = msgGwUrl
    this._msgGwSpecId = msgGwSpecId
    this._iCureUrlPath = iCureUrlPath

    this._authenticationApi = new AuthenticationApi(
      this._messageGatewayApi,
      this._iCureUrlPath,
      authProcessInfo.authProcessByEmailId,
      authProcessInfo.authProcessBySmsId,
      this._errorHandler,
      this._sanitizer,
      cryptoPrimitives.crypto,
      storage,
      keyStorage,
      this.cryptoStrategies
    )
  }

  get authenticationApi(): AuthenticationApi {
    return this._authenticationApi
  }
}

export namespace AnonymousMedTechApi {
  export class Builder extends AnonymousApiBuilder<MedTechCryptoStrategies, AnonymousMedTechApi> {
    protected doBuild(props: {
      iCureBaseUrl: string
      msgGwUrl: string
      msgGwSpecId: string
      storage: StorageFacade<string>
      keyStorage: KeyStorageFacade
      primitives: CryptoPrimitives
      cryptoStrategies: MedTechCryptoStrategies
      authProcessInfo: { authProcessBySmsId: string; authProcessByEmailId?: string } | { authProcessBySmsId?: string; authProcessByEmailId: string }
    }): Promise<AnonymousMedTechApi> {
      return Promise.resolve(
        new AnonymousMedTechApi(
          props.iCureBaseUrl,
          props.msgGwUrl,
          props.msgGwSpecId,
          props.storage,
          props.keyStorage,
          props.primitives,
          props.cryptoStrategies,
          props.authProcessInfo
        )
      )
    }
  }
}
