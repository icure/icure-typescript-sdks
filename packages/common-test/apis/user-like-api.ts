import 'isomorphic-fetch'
import {
  getEnvironmentInitializer, getTempEmail,
  hcp1Username, hcp2Username,
  hcp3Username,
  setLocalStorage,
  TestUtils
} from '../test-utils'
import { webcrypto } from 'crypto'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { TestKeyStorage, TestStorage, testStorageForUser } from '../test-storage'
import {
  AnonymousApiBuilder,
  CommonAnonymousApi,
  CommonApi,
  CryptoStrategies,
  DataOwnerWithType,
  forceUuid, MessageFactory,
  NotificationTypeEnum
} from "@icure/typescript-common";
import {
  BaseApiTestContext,
  WithAuthenticationApi,
  WithDataOwnerApi,
  WithHcpApi, WithHelementApi, WithMaintenanceTaskApi,
  WithPatientApi,
  WithServiceApi
} from "./TestContexts";
import {expectArrayContainsExactlyInAnyOrder} from "../assertions";
import {Patient, sleep, User} from "@icure/api";
setLocalStorage(fetch)

export function testUserLikeApi<
  DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
  DSAnonymousApi extends CommonAnonymousApi<DSApi>,
  DSApi extends CommonApi,
  DSCryptoStrategies extends CryptoStrategies<any>,
  DSUser,
  DSHcp,
  DSPatient,
  DSDataOwner extends DataOwnerWithType,
  DSService,
  DSMaintenanceTask,
  DSMessageFactory extends MessageFactory<any, any, any>,
  DSHelement
>(
  ctx: BaseApiTestContext<
    DSAnonymousApiBuilder,
    DSAnonymousApi,
    DSApi,
    DSCryptoStrategies,
    DSUser,
    DSMessageFactory
  > & WithPatientApi<DSApi, DSPatient>
    & WithAuthenticationApi<DSApi>
    & WithHcpApi<DSApi, DSHcp>
    & WithDataOwnerApi<DSApi, DSDataOwner, DSUser>
    & WithServiceApi<DSApi, DSService, DSPatient, any>
    & WithMaintenanceTaskApi<DSApi, DSMaintenanceTask>
    & WithHelementApi<DSApi, DSHelement, DSPatient>
) {
  let env: TestVars
  let hcp1Api: DSApi
  let hcp1User: User

  describe('UserLike API', () => {
    beforeAll(async function () {
      const initializer = await getEnvironmentInitializer()
      env = await initializer.execute(getEnvVariables())

      const hcp1ApiAndUser = await ctx.apiForEnvUser(
        env,
        hcp1Username,
        (x) => x
          .withMsgGwUrl(env!.msgGtwUrl)
          .withMsgGwSpecId(env!.specId)
          .withMessageFactory(ctx.newTestMessageFactory())
      )
      hcp1Api = hcp1ApiAndUser.api
      hcp1User = hcp1ApiAndUser.user
    }, 600_000)

    it('If sharedDataType already shared with ownerIds return user (no treatment needed)', async () => {
      const { api } = await ctx.signUpUserUsingEmail(
        env!,
        "A",
        "B",
        "patient",
        env.dataOwnerDetails[hcp1Username].dataOwnerId,
      )
      const delegate = env.dataOwnerDetails[hcp2Username].dataOwnerId
      // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only and no duplicates
      const updatedUser = await ctx.userApi(api).shareAllFutureDataWith([delegate], 'medicalInformation')
      expect(ctx.toUserDto(updatedUser).autoDelegations["medicalInformation"]).toContain(delegate)
      // When a user already shares data with the provided dataOwner, the user is returned successfully, without any additional request to iCure
      const unchangedUser = await ctx.userApi(api).shareAllFutureDataWith([delegate], 'medicalInformation')
      expect(unchangedUser).toEqual(updatedUser)
    })

    it('A user should be able to share data with another dataOwner, and stop sharing data with him later', async () => {
      const { api } = await ctx.signUpUserUsingEmail(
        env!,
        "A",
        "B",
        "patient",
        env.dataOwnerDetails[hcp1Username].dataOwnerId,
      )
      const delegate = env.dataOwnerDetails[hcp2Username].dataOwnerId
      const delegate2 = env.dataOwnerDetails[hcp3Username].dataOwnerId
      // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only on the right type
      await ctx.userApi(api).shareAllFutureDataWith([delegate], 'medicalInformation')
      await ctx.userApi(api).shareAllFutureDataWith([delegate2], 'medicalInformation')
      const userWithDelegations = await ctx.userApi(api).shareAllFutureDataWith([delegate], 'administrativeData')
      expect(ctx.toUserDto(userWithDelegations).autoDelegations["medicalInformation"]).toContain(delegate)
      expect(ctx.toUserDto(userWithDelegations).autoDelegations["medicalInformation"]).toContain(delegate2)
      expect(ctx.toUserDto(userWithDelegations).autoDelegations["administrativeData"]).toContain(delegate)
      // When a user want to stop to share data with the provided dataOwner, the user is returned successfully, with removed data sharing entries only on provided type
      const userWithRemovedMedicalDelegation = await ctx.userApi(api).stopSharingDataWith([delegate], 'medicalInformation')
      expect(ctx.toUserDto(userWithRemovedMedicalDelegation).autoDelegations["medicalInformation"]).not.toContain(delegate)
      expect(ctx.toUserDto(userWithRemovedMedicalDelegation).autoDelegations["medicalInformation"]).toContain(delegate2)
      expect(ctx.toUserDto(userWithRemovedMedicalDelegation).autoDelegations["administrativeData"]).toContain(delegate)
    })

    it('should be able to create a new User from an existing Patient', async () => {
      // PRECONDITIONS:
      const testStartTime = new Date().getTime()

      // The Patient exists
      const email = getTempEmail()
      const patientNote = 'He is moon knight'
      const newPatient = await ctx.patientApi(hcp1Api).createOrModify(
        ctx.toDSPatient(new Patient({
          firstName: 'Marc',
          lastName: 'Specter',
          note: patientNote,
          addresses: [
            {
              addressType: 'home',
              description: 'London',
              telecoms: [
                {
                  telecomType: 'email',
                  telecomNumber: email,
                },
              ],
            },
          ],
        })
      ))
      expect(newPatient).toBeTruthy()
      const patientId = ctx.toPatientDto(newPatient).id
      expect(ctx.toPatientDto(newPatient).note).toEqual(patientNote)

      // Some Data Samples and Healthcare Elements were created for the Patient
      const newDS1 = await ctx.createServiceForPatient(hcp1Api, newPatient)
      const newDS2 = await ctx.createServiceForPatient(hcp1Api, newPatient)
      const newHE1 = await ctx.createHelementForPatient(hcp1Api, newPatient)
      const newHE2 = await ctx.createHelementForPatient(hcp1Api, newPatient)

      // When HCP_1 creates user for patient PAT_1
      // And HCP_1 is sending an invitation email to patient PAT_1
      await ctx.userApi(hcp1Api).createAndInviteFor(newPatient, 3600)
      await sleep(3_000)

      // And PAT_1 accepts this invitation and changes his credentials
      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.patAuthProcessId)
        .withAuthProcessBySmsId(env!.patAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
        .build()
      const loginAndPassword = (await TestUtils.getEmail(email)).subject!
      // When PAT_1 generates a key pair for himself
      // Then maintenance task is created for HCP_1 in order to give back access to PAT_1 to his data
      // Then PAT_1 is able to log as a user
      const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskAccessToItsExistingData(
        loginAndPassword.split('|')[0],
        loginAndPassword.split('|')[1]
      )

      const newPatientApi = authResult!.api

      // But PAT_1 may not access data sample DATA_SAMPLE_1 nor his own note
      await ctx.checkServiceInaccessible(newPatientApi, newDS1)
      await ctx.checkServiceInaccessible(newPatientApi, newDS2)
      await ctx.checkHelementInaccessible(newPatientApi, newHE1)
      await ctx.checkHelementInaccessible(newPatientApi, newHE2)
      await expect(ctx.patientApi(newPatientApi).get(patientId)).rejects.toBeInstanceOf(Error)
      const encryptedPatient = await ctx.patientApi(newPatientApi).getAndTryDecrypt(patientId)
      expect(encryptedPatient.decrypted).toBe(false)
      expect(ctx.toPatientDto(encryptedPatient.patient).note).toBeFalsy()

      // When HCP_1 gives access to PAT_1
      const newNotifications = await ctx.mtApi(hcp1Api).getPendingAfter()
      expect(newNotifications).toBeTruthy()
      const newPatientNotifications = newNotifications.filter((notification) => {
        const mt = ctx.toMtDto(notification)
        return mt.taskType === NotificationTypeEnum.NEW_USER_OWN_DATA_ACCESS && mt.responsible === patientId
      })
      expect(newPatientNotifications).toHaveLength(1)
      const newPatientNotification = newPatientNotifications[0]
      expect(newPatientNotification).toBeTruthy()

      const ongoingStatusUpdate = await ctx.mtApi(hcp1Api).updateStatus(newPatientNotification, 'ongoing')
      expect(ongoingStatusUpdate).toBeTruthy()
      expect(ctx.toMtDto(ongoingStatusUpdate).status).toEqual('ongoing')

      const sharedData = await ctx.patientApi(hcp1Api).giveAccessToAllDataOf(patientId)
      expect(sharedData).toBeTruthy()
      expect(ctx.toPatientDto(sharedData.patient).id).toEqual(patientId)
      expect(sharedData.statuses.healthcareElements?.success).toBe(true)
      expect(sharedData.statuses.healthcareElements?.error).toBeFalsy()
      expect(sharedData.statuses.healthcareElements?.modified).toEqual(2)
      expect(sharedData.statuses.dataSamples?.success).toBe(true)
      expect(sharedData.statuses.dataSamples?.error).toBeFalsy()
      expect(sharedData.statuses.dataSamples?.modified).toEqual(2)

      await sleep(3000)

      const completedStatusUpdate = await ctx.mtApi(hcp1Api).updateStatus(ongoingStatusUpdate!, 'completed')
      expect(completedStatusUpdate).toBeTruthy()
      expect(ctx.toMtDto(completedStatusUpdate).status).toEqual('completed')

      // Then PAT_1 may access data sample DATA_SAMPLE_1
      // Be careful : We need to empty the cache of the hcPartyKeys otherwise, the previous API will use the key of the
      // patient -> patient stocked in cache instead of the one created by the doctor when he gives access back to patient data
      await newPatientApi.baseApi.cryptoApi.forceReload()
      // Data is updated by the giveAccessToAllDataOf method
      const updatedDS1 = await ctx.serviceApi(hcp1Api).get(ctx.toServiceDto(newDS1).id)
      const updatedDS2 = await ctx.serviceApi(hcp1Api).get(ctx.toServiceDto(newDS2).id)
      const updatedHE1 = await ctx.helementApi(hcp1Api).get(ctx.toHelementDto(newHE1).id)
      const updatedHE2 = await ctx.helementApi(hcp1Api).get(ctx.toHelementDto(newHE2).id)
      await ctx.checkServiceAccessibleAndDecrypted(newPatientApi, updatedDS1, true)
      await ctx.checkServiceAccessibleAndDecrypted(newPatientApi, updatedDS2, true)
      await ctx.checkHelementAccessibleAndDecrypted(newPatientApi, updatedHE1, true)
      await ctx.checkHelementAccessibleAndDecrypted(newPatientApi, updatedHE2, true)

      // Should not destroy existing encrypted data
      expect(ctx.toPatientDto(await ctx.patientApi(hcp1Api).get(patientId)).note).toEqual(patientNote)
      expect(ctx.toPatientDto(await ctx.patientApi(newPatientApi).get(patientId)).note).toEqual(patientNote)
    }, 300_000)

    it('should not be able to create a new User from Patient if the patient has no contact information', async () => {
      const newPatient = await ctx.patientApi(hcp1Api).createOrModify(ctx.toDSPatient(new Patient({
        firstName: 'Marc',
        lastName: 'Specter',
      })))

      await expect(ctx.userApi(hcp1Api).createAndInviteFor(newPatient)).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to create a new User from patient if a user already exists for that Patient', async () => {
      const email = getTempEmail()
      const newPatient = await ctx.patientApi(hcp1Api).createOrModify(
        ctx.toDSPatient(new Patient({
          firstName: 'Marc',
          lastName: 'Specter',
        }))
      )
      const newUser = await ctx.userApi(hcp1Api).createOrModify(
        ctx.toDSUser(new User({
          login: email,
          patientId: ctx.toPatientDto(newPatient).id,
          email: email,
        }))
      )
      expect(newUser).toBeTruthy()

      await expect(ctx.userApi(hcp1Api).createAndInviteFor(newPatient, 3600)).rejects.toBeInstanceOf(Error)
    })

    it('a new user from existing patient should be able to create new data and modify non-encrypted data before being given full access to existing data', async () => {
      const email = getTempEmail()
      const patientNote = 'He is moon knight'
      const patient = await ctx.patientApi(hcp1Api).createOrModify(
        ctx.toDSPatient(new Patient({
          firstName: 'Marc',
          lastName: 'Specter',
          note: patientNote,
          addresses: [
            {
              addressType: 'home',
              description: 'London',
              telecoms: [
                {
                  telecomType: 'email',
                  telecomNumber: email,
                },
              ],
            },
          ],
        }))
      )
      const patientId = ctx.toPatientDto(patient).id
      const heByHcp = await ctx.createHelementForPatient(hcp1Api, patient)
      // Create patient api
      await ctx.userApi(hcp1Api).createAndInviteFor(patient, 3600)

      await sleep(3_000)

      const anonymousMedTechApi = await ctx.newAnonymousApiBuilder()
        .withICureBaseUrl(env!.iCureUrl)
        .withMsgGwUrl(env!.msgGtwUrl)
        .withMsgGwSpecId(env!.specId)
        .withCrypto(webcrypto as any)
        .withAuthProcessByEmailId(env!.patAuthProcessId)
        .withAuthProcessBySmsId(env!.patAuthProcessId)
        .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
        .build()
      const loginAndPassword = (await TestUtils.getEmail(email)).subject!
      const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskAccessToItsExistingData(
        loginAndPassword.split('|')[0],
        loginAndPassword.split('|')[1]
      )
      const patApi = authResult!.api

      // When the patient has not been given access to his data he...

      // ...can modify only non-encrypted data of patient and...
      const encryptedPatient = await ctx.patientApi(patApi).getAndTryDecrypt(patientId)
      expect(encryptedPatient.decrypted).toBe(false)
      const modifyEncryptedPatientNote = ctx.toDSPatient({
        ...ctx.toPatientDto(encryptedPatient.patient),
        note: 'This is not allowed'
      })
      await expect(ctx.patientApi(patApi).createOrModify(modifyEncryptedPatientNote)).rejects.toBeInstanceOf(Error)
      const modifyEncryptedPatientLastName = ctx.toDSPatient({
        ...ctx.toPatientDto(encryptedPatient.patient),
        lastName: 'Ghost'
      })
      const modifiedPatient = await ctx.patientApi(patApi).createOrModify(modifyEncryptedPatientLastName)
      expect(ctx.toPatientDto((await ctx.patientApi(patApi).getAndTryDecrypt(patientId)).patient).lastName).toEqual('Ghost')
      const modifiedPatientRetrievedByHcp = ctx.toPatientDto(await ctx.patientApi(hcp1Api).get(patientId))
      expect(modifiedPatientRetrievedByHcp.lastName).toEqual('Ghost')
      expect(modifiedPatientRetrievedByHcp.note).toEqual(patientNote) // Should not destroy encrypted data
      // ...can create medical data
      const heByPatient = await ctx.createHelementForPatient(patApi, modifiedPatient)
      const heByPatientId = ctx.toHelementDto(heByPatient).id
      const heByHcpId = ctx.toHelementDto(heByHcp).id
      // Originally medical data can't be accessed by others...
      await ctx.checkHelementInaccessible(hcp1Api, heByPatient)
      await ctx.checkHelementInaccessible(patApi, heByHcp)
      // ...but it can be shared
      const heByPatientWithUpdatedAccess = await ctx.helementApi(patApi).giveAccessTo(heByPatient, hcp1User.healthcarePartyId!)
      await ctx.checkDefaultHelementDecrypted(heByPatientWithUpdatedAccess)
      const heByHcpWithUpdatedAccess = await ctx.helementApi(hcp1Api).giveAccessTo(heByHcp, patientId)
      await ctx.checkDefaultHelementDecrypted(heByHcpWithUpdatedAccess)
      await patApi.baseApi.cryptoApi.forceReload()
      await hcp1Api.baseApi.cryptoApi.forceReload()
      expect(await ctx.helementApi(hcp1Api).get(heByPatientId)).toEqual(heByPatientWithUpdatedAccess)
      expect(await ctx.helementApi(patApi).get(heByHcpId)).toEqual(heByHcpWithUpdatedAccess)
      // Originally medical data even if accessible can't be found by the other...
      const filterPatient1 = await ctx.newHelementFilter(patApi).forSelf().forPatients([ctx.toPatientDto(modifiedPatient)]).build()
      const patientFound1 = await ctx.helementApi(patApi).matchBy(filterPatient1)
      const filterHcp1 = await ctx.newHelementFilter(hcp1Api).forSelf().forPatients([ctx.toPatientDto(modifiedPatient)]).build()
      const hcpFound1 = await ctx.helementApi(hcp1Api).matchBy(filterHcp1)
      expect(patientFound1).toHaveLength(1)
      expect(patientFound1).toContain(heByPatientId)
      expect(hcpFound1).toHaveLength(1)
      expect(hcpFound1).toContain(heByHcpId)

      //. ..but by sharing the patient with each other it can be found
      await ctx.patientApi(patApi).giveAccessTo((await ctx.patientApi(patApi).getAndTryDecrypt(patientId)).patient, hcp1User.healthcarePartyId!)
      const fullySharedPatient = await ctx.patientApi(hcp1Api).giveAccessTo(await ctx.patientApi(hcp1Api).get(patientId), patientId)
      const fullySharedPatientDto = ctx.toPatientDto(fullySharedPatient)
      await patApi.baseApi.cryptoApi.forceReload()
      await hcp1Api.baseApi.cryptoApi.forceReload()
      expect(ctx.toPatientDto(await ctx.patientApi(patApi).get(patientId)).note).toEqual(patientNote)
      expect(ctx.toPatientDto(await ctx.patientApi(hcp1Api).get(patientId)).note).toEqual(patientNote)
      const filterPatient2 = await ctx.newHelementFilter(patApi).forSelf().forPatients([fullySharedPatientDto]).build()
      const patientFound2 = await ctx.helementApi(patApi).matchBy(filterPatient2)
      const filterHcp2 = await ctx.newHelementFilter(hcp1Api)
        .forDataOwner(hcp1User.healthcarePartyId!)
        .forPatients([fullySharedPatientDto])
        .build()
      const hcpFound2 = await ctx.helementApi(hcp1Api).matchBy(filterHcp2)
      expect(hcpFound2).toHaveLength(2)
      expect(hcpFound2).toContain(heByPatientId)
      expect(hcpFound2).toContain(heByHcpId)
      expect(patientFound2).toHaveLength(2)
      expect(patientFound2).toContain(heByPatientId)
      expect(patientFound2).toContain(heByHcpId)
    })
  })
}