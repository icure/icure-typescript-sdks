import 'isomorphic-fetch'
import {
  getEnvironmentInitializer,
  getTempEmail,
  hcp1Username,
  hcp3Username,
  setLocalStorage,
  TestUtils
} from '../test-utils'
import { webcrypto } from 'crypto'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { TestKeyStorage, TestStorage, testStorageForUser } from '../test-storage'
import {
  AnonymousApiBuilder,
  ApiBuilder,
  AuthenticatedApiBuilder,
  AuthenticationApi,
  CommonAnonymousApi,
  CommonApi,
  CryptoStrategies,
  DataOwnerLikeApi,
  DataOwnerWithType,
  forceUuid,
  HealthcarePartyLikeApi,
  KeyPair, MaintenanceTaskLikeApi,
  MessageFactory,
  NotificationTypeEnum,
  PatientLikeApi,
  RecaptchaType,
  ServiceLikeApi,
  SimpleCryptoStrategies,
  UserLikeApi
} from "@icure/typescript-common";
import {HealthcareParty, KeyStorageFacade, MaintenanceTask, Patient, sleep, StorageFacade} from "@icure/api";
import {MedTechApi} from "@icure/medical-device-sdk";
import {assert} from "chai";
import { User } from "@icure/api"
import {testStorageWithKeys} from "../../medtech/test/TestStorage";
import {DefaultStorageEntryKeysFactory} from "@icure/api/icc-x-api/storage/DefaultStorageEntryKeysFactory";
import {SimpleMedTechCryptoStrategies} from "@icure/medical-device-sdk/dist/src/services/MedTechCryptoStrategies";
// import { SimpleMedTechCryptoStrategies } from '../../src/services/MedTechCryptoStrategies'
// import { MedTechApi } from '../../src/apis/MedTechApi'
// import { AnonymousMedTechApi } from '../../src/apis/AnonymousMedTechApi'
// import { NotificationTypeEnum } from '@icure/typescript-common'

setLocalStorage(fetch)

export abstract class BaseApiTestContext<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser
> {
  static readonly registerThrottlingLimit = 10000
  private registerAverageWait = 10000
  private lastRegisterCall = 0

  abstract newAnonymousApiBuilder(): AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>
  abstract newApiBuilder(): AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi>
  abstract newSimpleCryptoStrategies(availableKeys?: KeyPair[]): DSCryptoStrategies & SimpleCryptoStrategies<any>
  abstract userApi(api: DSApi): UserLikeApi<DSUser, any>
  abstract toUserDto(dsUser: DSUser): User
  abstract toDSUser(userDto: User): DSUser

  async apiForEnvUser(
      env: TestVars,
      username: string,
      additionalBuilderSteps: (builder: AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi>) => AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi> = (x) => x
  ): Promise<{ api: DSApi, user: User }> {
    const credentials = env.dataOwnerDetails[username]
    const storage = await testStorageWithKeys(new DefaultStorageEntryKeysFactory(), [
      {
        dataOwnerId: credentials.dataOwnerId,
        pairs: [{ keyPair: { publicKey: credentials.publicKey, privateKey: credentials.privateKey } }],
      },
    ])
    const builderApi = this.newApiBuilder()
        .withICureBaseUrl(env.iCureUrl)
        .withUserName(credentials.user)
        .withPassword(credentials.password)
        .withCrypto(webcrypto as any)
        .withStorage(storage.storage)
        .withKeyStorage(storage.keyStorage)
        .withCryptoStrategies(this.newSimpleCryptoStrategies())
    const api = await additionalBuilderSteps(builderApi).build()

    const foundUser = this.toUserDto(await this.userApi(api).getLogged())

    return { api, user: foundUser }
  }

  async signUpUserUsingEmail(
      env: TestVars,
      firstName: string,
      lastName: string,
      userType: "hcp" | "patient",
      inviterId: string,
      recaptchaType: RecaptchaType = 'recaptcha',
      storage?: StorageFacade<string>,
      keyStorage?: KeyStorageFacade
  ): Promise<{ api: DSApi; user: User; token: string }> {
    if (new Date().getTime() - this.lastRegisterCall < BaseApiTestContext.registerThrottlingLimit) {
      const throttlingWait = this.returnWithinBoundaries(
          (BaseApiTestContext.registerThrottlingLimit - this.registerAverageWait) * 5 - this.registerAverageWait,
          BaseApiTestContext.registerThrottlingLimit,
          0
      )
      await sleep(throttlingWait)
      this.registerAverageWait = this.registerAverageWait + (throttlingWait - this.registerAverageWait) / 5
    }
    this.lastRegisterCall = new Date().getTime()

    const builder = this.newAnonymousApiBuilder()
        .withICureBaseUrl(env.iCureUrl)
        .withMsgGwUrl(env.msgGtwUrl)
        .withMsgGwSpecId(env.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(userType === "hcp" ? env.hcpAuthProcessId : env.patAuthProcessId)
        .withCryptoStrategies(this.newSimpleCryptoStrategies())

    if (storage) {
      builder.withStorage(storage)
    }

    if (keyStorage) {
      builder.withKeyStorage(keyStorage)
    }

    const anonymousApi = await builder.build()

    const email = getTempEmail()
    const process = await anonymousApi.authenticationApi.startAuthentication(
        recaptchaType === "recaptcha" ? env.recaptcha : env.friendlyCaptchaKey,
        email,
        undefined,
        firstName,
        lastName,
        inviterId,
        false,
        8,
        recaptchaType
    )

    const emails = await TestUtils.getEmail(email)

    const subjectCode = emails.subject!

    //assert(subjectCode.length === 8, 'The subject code should be 8 characters long')
    const result = await anonymousApi.authenticationApi.completeAuthentication(process!, subjectCode)

    if (result?.api == undefined) {
      throw Error(`Couldn't sign up user by email for current test`)
    }

    const foundUser = await this.userApi(result.api).getLogged()
    assert(result)
    assert(result!.token != null)
    assert(result!.userId != null)

    return {api: result.api, user: this.toUserDto(foundUser), token: result.token}
  }

  private returnWithinBoundaries(element: number, upperBound: number, lowerBound: number): number {
    if (element <= upperBound && element >= lowerBound) return element
    else if (element > upperBound) return upperBound
    if (element <= upperBound && element >= lowerBound) return element
    else if (element > upperBound) return upperBound
    else return lowerBound
  }
}

export abstract class AuthenticationApiTestContext<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSHcp,
    DSPatient,
    DSDataOwnerWithType extends DataOwnerWithType,
    DSService,
    DSMaintenanceTask
> extends BaseApiTestContext <
    DSAnonymousApiBuilder,
    DSAnonymousApi,
    DSApi,
    DSCryptoStrategies,
    DSUser
> {
  abstract authenticationApi(api: DSApi): AuthenticationApi<DSApi>
  abstract hcpApi(api: DSApi): HealthcarePartyLikeApi<DSHcp>
  abstract toHcpDto(dsHcp: DSHcp): HealthcareParty
  abstract toDSHcp(hcpDto: HealthcareParty): DSHcp
  abstract patientApi(api: DSApi): PatientLikeApi<DSPatient>
  abstract toPatientDto(dsPatient: DSPatient): Patient
  abstract toDSPatient(patientDto: Patient): DSPatient
  abstract dataOwnerApi(api: DSApi): DataOwnerLikeApi<DSDataOwnerWithType, DSUser>
  abstract serviceApi(api: DSApi): ServiceLikeApi<DSService, DSPatient, any>
  abstract createServiceForPatient(api: DSApi, patient: DSPatient): Promise<DSService>
  abstract checkServiceAccessible(api: DSApi, service: DSService): Promise<void>
  abstract checkServiceInaccessible(api: DSApi, service: DSService): Promise<void>
  abstract mtApi(api: DSApi): MaintenanceTaskLikeApi<DSMaintenanceTask>
  abstract toMtDto(dsMt: DSMaintenanceTask): MaintenanceTask
}

export function testAuthenticationApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSHcp,
    DSPatient,
    DSDataOwner extends DataOwnerWithType,
    DSService,
    DSMaintenanceTask
>(
    ctx: AuthenticationApiTestContext<
        DSAnonymousApiBuilder,
        DSAnonymousApi,
        DSApi,
        DSCryptoStrategies,
        DSUser,
        DSHcp,
        DSPatient,
        DSDataOwner,
        DSService,
        DSMaintenanceTask
    >
) {
  let env: TestVars
  let hcpId: string

  describe('Authentication API', () => {
    beforeAll(async function () {
      const initializer = await getEnvironmentInitializer()
      env = await initializer.execute(getEnvVariables())

      if (env.backendType === 'oss') this.skip()

      hcpId = env.dataOwnerDetails[hcp1Username].dataOwnerId
    }, 600_000)

    it("AnonymousMedTechApi shouldn't be instantiated if authServerUrl, authProcessId and specId aren't passed", async () => {
      await expect(
          Promise.resolve().then(() => ctx.newAnonymousApiBuilder()
              .withICureBaseUrl(env!.iCureUrl)
              .withCrypto(webcrypto as any)
              .withMsgGwUrl(env!.msgGtwUrl)
              .withAuthProcessByEmailId(env!.hcpAuthProcessId)
              .withAuthProcessBySmsId(env!.hcpAuthProcessId)
              .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
              .build()
          )
      ).rejects.toBeInstanceOf(Error)

      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
          .withICureBaseUrl(env!.iCureUrl)
          .withCrypto(webcrypto as any)
          .withMsgGwUrl(env!.msgGtwUrl)
          .withMsgGwSpecId(env!.specId)
          .withAuthProcessByEmailId('fake-process-id')
          .withAuthProcessBySmsId('fake-process-id')
          .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
          .build()

      expect(anonymousMedTechApi).toBeTruthy()
    })

    it("Impossible to use authenticationApi if msgGtwUrl, msgGtwSpecId and authProcessId haven't been provided", async () => {
      const user = env.dataOwnerDetails[hcp1Username]
      const storage = await testStorageForUser(user)
      // Given
      let api = await ctx.newApiBuilder()
        .withUserName(user.user)
        .withPassword(user.password)
        .withStorage(storage.storage)
        .withKeyStorage(storage.keyStorage)
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId('fake-process-id')
        .withAuthProcessBySmsId('fake-process-id')
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
        .build()

      await expect(Promise.resolve().then(() => ctx.authenticationApi(api))).rejects.toBeInstanceOf(Error)
    })
    
    it('Cannot instantiate the API if no AuthProcessId is passed', async () => {
      await expect(
        Promise.resolve().then(() => ctx.newAnonymousApiBuilder()
          .withICureBaseUrl(env!.iCureUrl)
          .withMsgGwUrl(env!.msgGtwUrl)
          .withMsgGwSpecId(env!.specId)
          .withCrypto(webcrypto as any)
          .build()
        )
      ).rejects.toBeInstanceOf(Error)
    })
    
    it("User should not be able to start authentication if he didn't provide any email and mobilePhone", async () => {
      // Given
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.hcpAuthProcessId)
        .withAuthProcessBySmsId(env!.hcpAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
        .build()

      await expect(
        anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, undefined, undefined, 'Tom', 'Gideon', env!.hcpAuthProcessId, false)
      ).rejects.toBeInstanceOf(Error)
    })

    it('User should not be able to start authentication if he provided an empty email and mobilePhone', async () => {
      // Given
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.hcpAuthProcessId)
        .withAuthProcessBySmsId(env!.hcpAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
        .build()

      await expect(anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, '', '', 'Tom', 'Gideon', env!.patAuthProcessId, false)).rejects.toBeInstanceOf(Error)
    })

    it('User should not be able to start authentication if he provided an email but no AuthProcessByEmailId', async () => {
      // Given
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessBySmsId(env!.hcpAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
        .build()

      await expect(
        anonymousMedTechApi.authenticationApi.startAuthentication(
          env!.recaptcha,
          'a-fake-email',
          undefined,
          'Tom',
          'Gideon',
          env!.hcpAuthProcessId,
          false
        )
      ).rejects.toBeInstanceOf(Error)
    })

    it('User should not be able to start authentication if he provided an sms but no AuthProcessBySMSId', async () => {
      // Given
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.hcpAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
        .build()

      await expect(
        anonymousMedTechApi.authenticationApi.startAuthentication(
          env!.recaptcha,
          undefined,
          'a-fake-phone-number',
          'Tom',
          'Gideon',
          env!.hcpAuthProcessId,
          false
        )
      ).rejects.toBeInstanceOf(Error)
    })

    it('A User should be able to start the authentication by sms', async () => {
      // Given
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessBySmsId(env!.hcpAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
        .build()

      // When
      const phoneNumber = `+${Math.ceil(Math.random() * 10000000 + 10000000)}`
      await anonymousMedTechApi.authenticationApi.startAuthentication(
        env!.recaptcha,
        undefined,
        phoneNumber,
        'Tom',
        'Gideon',
        env!.hcpAuthProcessId,
        false
      )
      const messages = await TestUtils.getSMS(phoneNumber)
      expect(messages?.message).not.toBeFalsy()
    })

    it('HCP should be capable of signing up using email', async () => {
      // When
      const firstName = `Gigio${forceUuid()}`
      const lastName = `Bagigio${forceUuid()}`
      const hcpApiAndUser = await ctx.signUpUserUsingEmail(
        env!,
        firstName,
        lastName,
        "hcp",
        hcpId!,
        'recaptcha'
      )
      const currentUser = hcpApiAndUser.user

      // Then
      expect(currentUser).toBeTruthy()
      expect(currentUser.healthcarePartyId).toBeTruthy()
      expect(forceUuid(currentUser.healthcarePartyId)).toEqual(currentUser.healthcarePartyId)
      expect(currentUser.healthcarePartyId).not.toEqual(hcpId!)

      const currentHcp = ctx.toHcpDto(await ctx.hcpApi(hcpApiAndUser.api).get(currentUser.healthcarePartyId!))
      expect(currentHcp).toBeTruthy()
      expect(currentHcp.firstName).toEqual(firstName)
      expect(currentHcp.lastName).toEqual(lastName)
    })

    it('HCP should be capable of signing up using email with friendlyCaptchaData', async () => {
      const firstName = `Gigio${forceUuid()}`
      const lastName = `Bagigio${forceUuid()}`
      // TODO we need to update this method to also take the FHIR type of hcp or something else?
      const hcpApiAndUser = await ctx.signUpUserUsingEmail(
          env!,
          firstName,
          lastName,
          "hcp",
          hcpId!,
          'friendly-captcha'
      )
      const currentUser = hcpApiAndUser.user

      // Then
      expect(currentUser).toBeTruthy()
      expect(currentUser.healthcarePartyId).toBeTruthy()
      expect(forceUuid(currentUser.healthcarePartyId)).toEqual(currentUser.healthcarePartyId)
      expect(currentUser.healthcarePartyId).not.toEqual(hcpId!)

      const currentHcp = ctx.toHcpDto(await ctx.hcpApi(hcpApiAndUser.api).get(currentUser.healthcarePartyId!))
      expect(currentHcp).toBeTruthy()
      expect(currentHcp.firstName).toEqual(firstName)
      expect(currentHcp.lastName).toEqual(lastName)
    })

    it('Patient should be able to signing up through email', async () => {
      // When
      const firstName = `Gigio${forceUuid()}`
      const lastName = `Bagigio${forceUuid()}`
      const patApiAndUser = await ctx.signUpUserUsingEmail(
          env!,
          firstName,
          lastName,
          "patient",
          hcpId!,
          'recaptcha'
      )
      const currentUser = patApiAndUser.user

      // Then
      expect(currentUser).toBeTruthy()
      expect(currentUser.patientId).toBeTruthy()
      expect(forceUuid(currentUser.patientId)).toEqual(currentUser.patientId)
      expect(currentUser.patientId).not.toEqual(hcpId!)

      const currentPatient = ctx.toPatientDto(await ctx.patientApi(patApiAndUser.api).get(currentUser.patientId!))
      expect(currentPatient).toBeTruthy()
      expect(currentPatient.firstName).toEqual(firstName)
      expect(currentPatient.lastName).toEqual(lastName)
    })

    it('Patient should be able to signing up through email with friendlyCaptchaData', async () => {
      // When
      const firstName = `Gigio${forceUuid()}`
      const lastName = `Bagigio${forceUuid()}`
      const patApiAndUser = await ctx.signUpUserUsingEmail(
          env!,
          firstName,
          lastName,
          "patient",
          hcpId!,
          'friendly-captcha'
      )
      const currentUser = patApiAndUser.user

      // Then
      expect(currentUser).toBeTruthy()
      expect(currentUser.patientId).toBeTruthy()
      expect(forceUuid(currentUser.patientId)).toEqual(currentUser.patientId)
      expect(currentUser.patientId).not.toEqual(hcpId!)

      const currentPatient = ctx.toPatientDto(await ctx.patientApi(patApiAndUser.api).get(currentUser.patientId!))
      expect(currentPatient).toBeTruthy()
      expect(currentPatient.firstName).toEqual(firstName)
      expect(currentPatient.lastName).toEqual(lastName)
    })

    it('Patient should be able to retrieve its keys when re-login', async () => {
      // When
      const { api, user, token } = await ctx.signUpUserUsingEmail(
        env,
        'A',
        'B',
        'patient',
        hcpId,
      )

      const keysFromFirstInit = ctx.dataOwnerApi(api).getPublicKeysOf(await ctx.dataOwnerApi(api).getDataOwner(user.patientId!))

      const newApi = await ctx.newApiBuilder()
        .withUserName(user.login!)
        .withPassword(token)
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.patAuthProcessId)
        .withAuthProcessBySmsId(env!.patAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
        .build()

      const keysFromNewApi = ctx.dataOwnerApi(newApi).getPublicKeysOf(await ctx.dataOwnerApi(newApi).getDataOwner(user.patientId!))

      expect(keysFromNewApi.length).toBeGreaterThan(0)
      expect(keysFromNewApi).toEqual(expect.arrayContaining(keysFromFirstInit))
    })

    it('Patient should be able to signing up through email using a different Storage implementation', async () => {
      // Given
      const storage = new TestStorage()
      const keyStorage = new TestKeyStorage()

      // When
      const patApiAndUser = await ctx.signUpUserUsingEmail(
        env!,
        'a',
        'b',
        'patient',
        hcpId,
        'recaptcha',
        storage,
        keyStorage
      )

      // Then
      const currentUser = patApiAndUser.user
      assert(currentUser)
      assert(currentUser.patientId != null)

      const currentPatient = ctx.toPatientDto(await ctx.patientApi(patApiAndUser.api).get(currentUser.patientId!))
      assert(currentPatient)
      assert(currentPatient.firstName == 'a')
      assert(currentPatient.lastName == 'b')
      assert(Object.entries(keyStorage).length == 1)
    })

    it('A patient may login with a new RSA keypair and access his previous data if he gave access to its new key with his previous private key', async () => {
      // Given
      const patApiAndUser = await ctx.signUpUserUsingEmail(
          env!,
          'a',
          'b',
          'patient',
          hcpId,
          'recaptcha',
      )

      const currentPatient = await ctx.patientApi(patApiAndUser.api).get(patApiAndUser.user.patientId!)
      const createdDataSample = await ctx.createServiceForPatient(patApiAndUser.api, currentPatient)
      const keysFromFirstInit = ctx.dataOwnerApi(patApiAndUser.api).getPublicKeysOf(
        await ctx.dataOwnerApi(patApiAndUser.api).getDataOwner(patApiAndUser.user.patientId!)
      )

      // User logs on another device
      const newCryptoStrategies = ctx.newSimpleCryptoStrategies([])
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.patAuthProcessId)
        .withAuthProcessBySmsId(env!.patAuthProcessId)
        .withStorage(new TestStorage())
        .withKeyStorage(new TestKeyStorage())
        .withCryptoStrategies(newCryptoStrategies)
        .build()

      const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, patApiAndUser.user.email)

      // When
      const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
      const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)

      if (loginAuthResult?.api == undefined) {
        throw Error(`Couldn't login user ${patApiAndUser.user.email} on the new terminal`)
      }

      const keysAfterLoss = ctx.dataOwnerApi(loginAuthResult.api).getPublicKeysOf(
          await ctx.dataOwnerApi(loginAuthResult.api).getDataOwner(patApiAndUser.user.patientId!)
      )
      expect(keysAfterLoss.length).toBeGreaterThan(keysFromFirstInit.length)
      expect(newCryptoStrategies.generatedKeyPair).toBeTruthy()

      // Then
      // User can create new data
      expect(await ctx.createServiceForPatient(loginAuthResult.api, currentPatient)).toBeTruthy()

      // But can't access (v8) / decrypt (v7) previous ones
      await ctx.checkServiceInaccessible(loginAuthResult.api, createdDataSample)

      // When he gave access back with his previous key
      await patApiAndUser.api.baseApi.cryptoApi.forceReload()
      await ctx.dataOwnerApi(patApiAndUser.api).giveAccessBackTo(patApiAndUser.user.patientId!, loginAuthResult.keyPairs[0].publicKey)

      // Then
      await loginAuthResult.api.baseApi.cryptoApi.forceReload()
      await ctx.checkServiceAccessible(loginAuthResult.api, createdDataSample)
    })

    it('A patient may login with a new RSA keypair and access his previous data only when a delegate gave him access back', async () => {
      // Given
      const hcpApiAndUser = await ctx.apiForEnvUser(env, hcp3Username)
      const patApiAndUser = await ctx.signUpUserUsingEmail(
        env,
        "A",
        "B",
        'patient',
        hcpId!,
        'recaptcha'
      )

      const currentPatient = await ctx.patientApi(patApiAndUser.api).get(patApiAndUser.user.patientId!)
      await ctx.patientApi(patApiAndUser.api).giveAccessTo(currentPatient, hcpApiAndUser.user.healthcarePartyId!)

      const createdService = await ctx.createServiceForPatient(patApiAndUser.api, currentPatient)
      await ctx.serviceApi(patApiAndUser.api).giveAccessTo(createdService, hcpApiAndUser.user.healthcarePartyId!)

      // User lost his key and logs back
      const newCryptoStrategies = ctx.newSimpleCryptoStrategies([])
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.patAuthProcessId)
        .withAuthProcessBySmsId(env!.patAuthProcessId)
        .withStorage(new TestStorage())
        .withKeyStorage(new TestKeyStorage())
        .withCryptoStrategies(newCryptoStrategies)
        .build()

      const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication(env!.recaptcha, patApiAndUser.user.email)

      // When
      const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
      const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)
      expect(newCryptoStrategies.generatedKeyPair).toBeTruthy()

      if (loginAuthResult?.api == undefined) {
        throw Error(`Couldn't login user ${patApiAndUser.user.email} after he lost his RSA keypair`)
      }

      // Then
      // User can create new data
      expect(await ctx.createServiceForPatient(loginAuthResult.api, currentPatient)).toBeTruthy()
      // But can't access (v8) / decrypt (v7) previous ones
      await ctx.checkServiceInaccessible(loginAuthResult.api, createdService)

      // When the delegate gave him access back
      // Hcp checks dedicated notification
      const startTimestamp = new Date().getTime() - 100000
      const hcpNotification = (await ctx.mtApi(hcpApiAndUser.api).getPendingAfter(startTimestamp))
          .map((x) => ctx.toMtDto(x))
          .find((mt) =>
            mt.taskType === NotificationTypeEnum.KEY_PAIR_UPDATE &&
            Array.from(mt.properties).find((prop) => prop.typedValue?.stringValue == patApiAndUser.user.patientId!) != undefined
          )

      expect(hcpNotification).toBeTruthy()

      const patientId = Array.from(hcpNotification!.properties).find((prop) => prop.id == 'dataOwnerConcernedId')
      expect(patientId).toBeTruthy()
      const patientPubKey = Array.from(hcpNotification!.properties).find((prop) => prop.id == 'dataOwnerConcernedPubKey')
      expect(patientPubKey).toBeTruthy()

      await ctx.dataOwnerApi(hcpApiAndUser.api).giveAccessBackTo(patientId!.typedValue!.stringValue!, patientPubKey!.typedValue!.stringValue!)

      // Then
      await loginAuthResult.api.baseApi.cryptoApi.forceReload()
      await ctx.checkServiceAccessible(loginAuthResult.api, createdService)
    }, 120_000)
  })
}