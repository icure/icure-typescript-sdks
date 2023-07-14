import {
  AuthenticationApiImpl,
  AuthenticationProcess,
  AuthenticationResult,
  CryptoStrategies,
  DataOwnerWithType,
  ErrorHandler,
  MessageGatewayApi,
  Notification,
  NotificationTypeEnum,
  Sanitizer,
} from '@icure/typescript-common'
import { Device, HealthcareParty, KeyStorageFacade, Patient, StorageFacade } from '@icure/api'
import { v4 as uuid } from 'uuid'
import Crypto from 'crypto'
import { mapPatientToPatientDto } from '../mappers/Patient.mapper'
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
    private readonly storage: StorageFacade<string>,
    private readonly keyStorage: KeyStorageFacade,
    private readonly cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
    private readonly fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined'
      ? window.fetch
      : typeof self !== 'undefined'
      ? self.fetch
      : fetch
  ) {
    super(messageGatewayApi, errorHandler, sanitizer, iCureBasePath, authProcessByEmailId, authProcessBySmsId)
  }

  async authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string): Promise<MedTechAuthenticationResult> {
    const authenticationResult = await this._initUserAuthTokenAndCrypto(userLogin, shortLivedToken)

    const loggedUser = await authenticationResult.api.userApi.getLogged()
    if (!loggedUser) {
      throw this.errorHandler.createErrorWithMessage(
        `There is no user currently logged in. You must call this method from an authenticated MedTechApi`
      )
    } else if (!!loggedUser.patientId) {
      const patientDataOwner = await authenticationResult.api.patientApi.getAndTryDecrypt(loggedUser.patientId)
      if (!patientDataOwner)
        throw this.errorHandler.createErrorWithMessage(
          `Impossible to find the patient ${loggedUser.patientId} apparently linked to the user ${loggedUser.id}. Are you sure this patientId is correct ?`
        )

      const delegatesInfo = await authenticationResult.api.cryptoApi.entities.getDataOwnersWithAccessTo(
        mapPatientToPatientDto(patientDataOwner.patient)
      )
      const delegates = Object.keys(delegatesInfo.permissionsByDataOwnerId)

      for (const delegate of delegates) {
        const accessNotification = await authenticationResult.api.notificationApi.createOrModify(
          new Notification({
            id: uuid(),
            status: 'pending',
            author: loggedUser.id,
            responsible: loggedUser.patientId,
            type: NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS,
          }),
          delegate
        )
        //TODO Return which delegates were warned to share back info & add retry mechanism
        if (!accessNotification)
          console.error(
            `iCure could not create a notification to healthcare party ${delegate} to ask access back to ${loggedUser.patientId} data. Make sure to create a notification for the healthcare party so that he gives back access to ${loggedUser.patientId} data.`
          )
      }
    } else if (!!loggedUser.healthcarePartyId) {
      const hcpDataOwner = await authenticationResult.api.baseApi.healthcarePartyApi
        .getHealthcareParty(loggedUser.healthcarePartyId, false)
        .catch((e) => {
          throw this.errorHandler.createErrorFromAny(e)
        })

      if (!hcpDataOwner)
        throw this.errorHandler.createErrorWithMessage(
          `Impossible to find the healthcare party ${loggedUser.healthcarePartyId} apparently linked to user ${loggedUser.id}. Are you sure this healthcarePartyId is correct ?`
        )
    } else {
      throw this.errorHandler.createErrorWithMessage(
        `User with id ${loggedUser.id} is not a Data Owner. To be a Data Owner, your user needs to have either patientId, healthcarePartyId or deviceId filled in`
      )
    }

    return { ...authenticationResult, medTechApi: authenticationResult.api }
  }

  async completeAuthentication(process: AuthenticationProcess, validationCode: string): Promise<MedTechAuthenticationResult> {
    const res = await super.completeAuthentication(process, validationCode)
    return { ...res, medTechApi: res.api }
  }

  protected initApi(username: string, password: string): Promise<MedTechApi> {
    const builder = new MedTechApi.Builder()
      .withICureBaseUrl(this.iCureBasePath)
      .withUserName(username)
      .withPassword(password)
      .withCrypto(this.crypto)
      .withStorage(this.storage)
      .withKeyStorage(this.keyStorage)
      .withCryptoStrategies(this.cryptoStrategies)
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
  fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) =>
  new AuthenticationApi(
    messageGatewayApi,
    iCureBasePath,
    authProcessByEmailId,
    authProcessBySmsId,
    errorHandler,
    sanitizer,
    crypto,
    storage,
    keyStorage,
    cryptoStrategies,
    fetchImpl
  )
