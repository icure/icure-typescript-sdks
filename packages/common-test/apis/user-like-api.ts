import 'isomorphic-fetch'
import { getEnvironmentInitializer, getTempEmail, hcp1Username, setLocalStorage } from '../test-utils'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, forceUuid, MessageFactory } from '@icure/typescript-common'
import { BaseApiTestContext, WithHelementApi, WithMaintenanceTaskApi, WithPatientApi, WithServiceApi } from './TestContexts'
import { Patient, User } from '@icure/api'
import { beforeAll, describe, it } from '@jest/globals'

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
    DSHelement,
>(
    name: string,
    ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, DSMessageFactory> &
        WithPatientApi<DSApi, DSPatient> &
        WithServiceApi<DSApi, DSService, DSPatient, any> &
        WithMaintenanceTaskApi<DSApi, DSMaintenanceTask> &
        WithHelementApi<DSApi, DSHelement, DSPatient>,
) {
    let env: TestVars
    let hcp1Api: DSApi
    let hcp1User: User

    describe(`${name} (User-like API)`, () => {
        beforeAll(async function () {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())

            const hcp1ApiAndUser = await ctx.apiForEnvUser(env, hcp1Username, (x) => x.withMsgGwUrl(env!.msgGtwUrl).withMsgGwSpecId(env!.specId).withMessageFactory(ctx.newTestMessageFactory()))
            hcp1Api = hcp1ApiAndUser.api
            hcp1User = hcp1ApiAndUser.user
        }, 600_000)

        it('should be able to create a new User from an existing Patient', async () => {
            // The Patient exists
            const email = getTempEmail()
            const newPatient = await ctx.patientApi(hcp1Api).createOrModify(
                ctx.toDSPatient(
                    new Patient({
                        firstName: 'Marcus',
                        lastName: 'Specter',
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
                    }),
                ),
            )
            expect(newPatient).toBeTruthy()
            const createdPatient = await ctx.userApi(hcp1Api).createAndInviteFor(newPatient, 5 * 60)

            // if the name of the user was saved correctly
            expect(createdPatient).toMatchObject({ name: 'Marcus Specter' })
        }, 300_000)

        // it('If sharedDataType already shared with ownerIds return user (no treatment needed)', async () => {
        //     const { api } = await ctx.signUpUserUsingEmail(env!, 'A', 'B', 'patient', env.dataOwnerDetails[hcp1Username].dataOwnerId)
        //     const delegate = env.dataOwnerDetails[hcp2Username].dataOwnerId
        //     // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only and no duplicates
        //     const updatedUser = await ctx.userApi(api).shareAllFutureDataWith([delegate], 'medicalInformation')
        //     expect(ctx.toUserDto(updatedUser).autoDelegations!['medicalInformation']).toContain(delegate)
        //     // When a user already shares data with the provided dataOwner, the user is returned successfully, without any additional request to iCure
        //     const unchangedUser = await ctx.userApi(api).shareAllFutureDataWith([delegate], 'medicalInformation')
        //     expect(unchangedUser).toEqual(updatedUser)
        // })
        //
        // it('A user should be able to share data with another dataOwner, and stop sharing data with him later', async () => {
        //     const { api } = await ctx.signUpUserUsingEmail(env!, 'A', 'B', 'patient', env.dataOwnerDetails[hcp1Username].dataOwnerId)
        //     const delegate = env.dataOwnerDetails[hcp2Username].dataOwnerId
        //     const delegate2 = env.dataOwnerDetails[hcp3Username].dataOwnerId
        //     // When a user shares data with the provided dataOwner, the user is returned successfully, with additional data sharing entries only on the right type
        //     await ctx.userApi(api).shareAllFutureDataWith([delegate], 'medicalInformation')
        //     await ctx.userApi(api).shareAllFutureDataWith([delegate2], 'medicalInformation')
        //     const userWithDelegations = await ctx.userApi(api).shareAllFutureDataWith([delegate], 'administrativeData')
        //     expect(ctx.toUserDto(userWithDelegations).autoDelegations!['medicalInformation']).toContain(delegate)
        //     expect(ctx.toUserDto(userWithDelegations).autoDelegations!['medicalInformation']).toContain(delegate2)
        //     expect(ctx.toUserDto(userWithDelegations).autoDelegations!['administrativeData']).toContain(delegate)
        //     // When a user want to stop to share data with the provided dataOwner, the user is returned successfully, with removed data sharing entries only on provided type
        //     const userWithRemovedMedicalDelegation = await ctx.userApi(api).stopSharingDataWith([delegate], 'medicalInformation')
        //     expect(ctx.toUserDto(userWithRemovedMedicalDelegation).autoDelegations!['medicalInformation']).not.toContain(delegate)
        //     expect(ctx.toUserDto(userWithRemovedMedicalDelegation).autoDelegations!['medicalInformation']).toContain(delegate2)
        //     expect(ctx.toUserDto(userWithRemovedMedicalDelegation).autoDelegations!['administrativeData']).toContain(delegate)
        // })
        //
        // it('should be able to create a new User from an existing Patient', async () => {
        //     // PRECONDITIONS:
        //     const testStartTime = new Date().getTime()
        //
        //     // The Patient exists
        //     const email = getTempEmail()
        //     const patientNote = 'He is moon knight'
        //     const newPatient = await ctx.patientApi(hcp1Api).createOrModify(
        //         ctx.toDSPatient(
        //             new Patient({
        //                 firstName: 'Marc',
        //                 lastName: 'Specter',
        //                 notes: [
        //                     {
        //                         markdown: { en: patientNote },
        //                     },
        //                 ],
        //                 addresses: [
        //                     {
        //                         addressType: 'home',
        //                         description: 'London',
        //                         telecoms: [
        //                             {
        //                                 telecomType: 'email',
        //                                 telecomNumber: email,
        //                             },
        //                         ],
        //                     },
        //                 ],
        //             }),
        //         ),
        //     )
        //     expect(newPatient).toBeTruthy()
        //     const patientId = ctx.toPatientDto(newPatient).id
        //     expect(ctx.toPatientDto(newPatient).notes![0].markdown!.en).toEqual(patientNote)
        //
        //     // Some Data Samples and Healthcare Elements were created for the Patient
        //     const newDS1 = await ctx.createServiceForPatient(hcp1Api, newPatient)
        //     const newDS2 = await ctx.createServiceForPatient(hcp1Api, newPatient)
        //     const newHE1 = await ctx.createHelementForPatient(hcp1Api, newPatient)
        //     const newHE2 = await ctx.createHelementForPatient(hcp1Api, newPatient)
        //
        //     // When HCP_1 creates user for patient PAT_1
        //     // And HCP_1 is sending an invitation email to patient PAT_1
        //     await ctx.userApi(hcp1Api).createAndInviteFor(newPatient, 5 * 60)
        //     await sleep(3_000)
        //
        //     // And PAT_1 accepts this invitation and changes his credentials
        //     const anonymousMedTechApi = await ctx
        //         .newAnonymousApiBuilder()
        //         .withICureBaseUrl(env!.iCureUrl)
        //         .withMsgGwUrl(env!.msgGtwUrl)
        //         .withMsgGwSpecId(env!.specId)
        //         .withCrypto(webcrypto as any)
        //         .withAuthProcessByEmailId(env!.patAuthProcessId)
        //         .withAuthProcessBySmsId(env!.patAuthProcessId)
        //         .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
        //         .build()
        //     const loginAndPassword = (await TestUtils.getEmail(email)).subject!
        //     // When PAT_1 generates a key pair for himself
        //     // Then maintenance task is created for HCP_1 in order to give back access to PAT_1 to his data
        //     // Then PAT_1 is able to log as a user
        //     const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskAccessToItsExistingData(loginAndPassword.split('|')[0], loginAndPassword.split('|')[1])
        //
        //     const newPatientApi = authResult!.api
        //
        //     // But PAT_1 may not access data sample DATA_SAMPLE_1 nor his own note
        //     await ctx.checkServiceInaccessible(newPatientApi, newDS1)
        //     await ctx.checkServiceInaccessible(newPatientApi, newDS2)
        //     await ctx.checkHelementInaccessible(newPatientApi, newHE1)
        //     await ctx.checkHelementInaccessible(newPatientApi, newHE2)
        //     await expect(ctx.patientApi(newPatientApi).get(patientId!)).rejects.toBeInstanceOf(Error)
        //     const encryptedPatient = await ctx.patientApi(newPatientApi).getAndTryDecrypt(patientId!)
        //     expect(encryptedPatient.decrypted).toBe(false)
        //     expect(Object.keys(ctx.toPatientDto(encryptedPatient.patient).notes![0].markdown ?? {})).toHaveLength(0)
        //
        //     // When HCP_1 gives access to PAT_1
        //     const newNotifications = await ctx.mtApi(hcp1Api).getPendingAfter()
        //     expect(newNotifications).toBeTruthy()
        //     const newPatientNotifications = newNotifications.filter((notification) => {
        //         const mt = ctx.toMtDto(notification)
        //         return mt.taskType === NotificationTypeEnum.NewUserOwnDataAccess && mt.responsible === patientId
        //     })
        //     expect(newPatientNotifications).toHaveLength(1)
        //     const newPatientNotification = newPatientNotifications[0]
        //     expect(newPatientNotification).toBeTruthy()
        //
        //     const ongoingStatusUpdate = await ctx.mtApi(hcp1Api).updateStatus(newPatientNotification, NotificationStatusEnum.Ongoing)
        //     expect(ongoingStatusUpdate).toBeTruthy()
        //     expect(ctx.toMtDto(ongoingStatusUpdate).status).toEqual('ongoing')
        //
        //     const sharedData = await ctx.patientApi(hcp1Api).giveAccessToAllDataOf(patientId!)
        //     expect(sharedData).toBeTruthy()
        //     expect(ctx.toPatientDto(sharedData.patient!).id).toEqual(patientId)
        //     expect(sharedData.statuses.healthcareElements?.success).toBe(true)
        //     expect(sharedData.statuses.healthcareElements?.error).toBeFalsy()
        //     expect(sharedData.statuses.healthcareElements?.modified).toEqual(2)
        //     expect(sharedData.statuses.dataSamples?.success).toBe(true)
        //     expect(sharedData.statuses.dataSamples?.error).toBeFalsy()
        //     expect(sharedData.statuses.dataSamples?.modified).toEqual(2)
        //
        //     await sleep(3000)
        //
        //     const completedStatusUpdate = await ctx.mtApi(hcp1Api).updateStatus(ongoingStatusUpdate!, NotificationStatusEnum.Completed)
        //     expect(completedStatusUpdate).toBeTruthy()
        //     expect(ctx.toMtDto(completedStatusUpdate).status).toEqual('completed')
        //
        //     // Then PAT_1 may access data sample DATA_SAMPLE_1
        //     // Be careful : We need to empty the cache of the hcPartyKeys otherwise, the previous API will use the key of the
        //     // patient -> patient stocked in cache instead of the one created by the doctor when he gives access back to patient data
        //     await newPatientApi.baseApi.cryptoApi.forceReload()
        //     // Data is updated by the giveAccessToAllDataOf method
        //     const updatedDS1 = await ctx.serviceApi(hcp1Api).get(ctx.toServiceDto(newDS1).id!)
        //     const updatedDS2 = await ctx.serviceApi(hcp1Api).get(ctx.toServiceDto(newDS2).id!)
        //     const updatedHE1 = await ctx.helementApi(hcp1Api).get(ctx.toHelementDto(newHE1).id!)
        //     const updatedHE2 = await ctx.helementApi(hcp1Api).get(ctx.toHelementDto(newHE2).id!)
        //     await ctx.checkServiceAccessibleAndDecrypted(newPatientApi, updatedDS1, true)
        //     await ctx.checkServiceAccessibleAndDecrypted(newPatientApi, updatedDS2, true)
        //     await ctx.checkHelementAccessibleAndDecrypted(newPatientApi, updatedHE1, true)
        //     await ctx.checkHelementAccessibleAndDecrypted(newPatientApi, updatedHE2, true)
        //
        //     // Should not destroy existing encrypted data
        //     expect(ctx.toPatientDto(await ctx.patientApi(hcp1Api).get(patientId!)).notes![0].markdown!.en).toEqual(patientNote)
        //     expect(ctx.toPatientDto(await ctx.patientApi(newPatientApi).get(patientId!)).notes![0].markdown!.en).toEqual(patientNote)
        // }, 300_000)
        //
        // it('should not be able to create a new User from Patient if the patient has no contact information', async () => {
        //     const newPatient = await ctx.patientApi(hcp1Api).createOrModify(
        //         ctx.toDSPatient(
        //             new Patient({
        //                 firstName: 'Marc',
        //                 lastName: 'Specter',
        //             }),
        //         ),
        //     )
        //
        //     await expect(ctx.userApi(hcp1Api).createAndInviteFor(newPatient)).rejects.toBeInstanceOf(Error)
        // })
        //
        // it('should not be able to create a new User from patient if a user already exists for that Patient', async () => {
        //     const email = getTempEmail()
        //     const newPatient = await ctx.patientApi(hcp1Api).createOrModify(
        //         ctx.toDSPatient(
        //             new Patient({
        //                 firstName: 'Marc',
        //                 lastName: 'Specter',
        //             }),
        //         ),
        //     )
        //     const newUser = await ctx.userApi(hcp1Api).createOrModify(
        //         ctx.toDSUser(
        //             new User({
        //                 login: email,
        //                 patientId: ctx.toPatientDto(newPatient).id,
        //                 email: email,
        //             }),
        //         ),
        //     )
        //     expect(newUser).toBeTruthy()
        //
        //     await expect(ctx.userApi(hcp1Api).createAndInviteFor(newPatient, 5 * 60)).rejects.toBeInstanceOf(Error)
        // })
        //
        // it('a new user from existing patient should be able to create new data and modify non-encrypted data before being given full access to existing data', async () => {
        //     const email = getTempEmail()
        //     const patientNote = 'He is moon knight'
        //     const patient = await ctx.patientApi(hcp1Api).createOrModify(
        //         ctx.toDSPatient(
        //             new Patient({
        //                 firstName: 'Marc',
        //                 lastName: 'Specter',
        //                 notes: [
        //                     {
        //                         markdown: { en: patientNote },
        //                     },
        //                 ],
        //                 addresses: [
        //                     {
        //                         addressType: 'home',
        //                         description: 'London',
        //                         telecoms: [
        //                             {
        //                                 telecomType: 'email',
        //                                 telecomNumber: email,
        //                             },
        //                         ],
        //                     },
        //                 ],
        //             }),
        //         ),
        //     )
        //     const patientId = ctx.toPatientDto(patient).id
        //     const heByHcp = await ctx.createHelementForPatient(hcp1Api, patient)
        //     // Create patient api
        //     await ctx.userApi(hcp1Api).createAndInviteFor(patient, 5 * 60)
        //
        //     await sleep(3_000)
        //
        //     const anonymousMedTechApi = await ctx
        //         .newAnonymousApiBuilder()
        //         .withICureBaseUrl(env!.iCureUrl)
        //         .withMsgGwUrl(env!.msgGtwUrl)
        //         .withMsgGwSpecId(env!.specId)
        //         .withCrypto(webcrypto as any)
        //         .withAuthProcessByEmailId(env!.patAuthProcessId)
        //         .withAuthProcessBySmsId(env!.patAuthProcessId)
        //         .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
        //         .build()
        //     const loginAndPassword = (await TestUtils.getEmail(email)).subject!
        //     const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskAccessToItsExistingData(loginAndPassword.split('|')[0], loginAndPassword.split('|')[1])
        //     const patApi = authResult!.api
        //
        //     // When the patient has not been given access to his data he...
        //
        //     // ...can modify only non-encrypted data of patient and...
        //     const encryptedPatient = await ctx.patientApi(patApi).getAndTryDecrypt(patientId!)
        //     expect(encryptedPatient.decrypted).toBe(false)
        //     const encryptedPatientDto = ctx.toPatientDto(encryptedPatient.patient)
        //     const modifyEncryptedPatientNote = ctx.toDSPatient({
        //         ...encryptedPatientDto,
        //         notes: [
        //             ...encryptedPatientDto.notes!,
        //             {
        //                 markdown: { en: 'Adding more notes or changing existing ones is not allowed since the patient could not be decrypted' },
        //             },
        //         ],
        //     })
        //     await expect(ctx.patientApi(patApi).createOrModify(modifyEncryptedPatientNote)).rejects.toBeInstanceOf(Error)
        //     const modifyEncryptedPatientLastName = ctx.toDSPatient({
        //         ...encryptedPatientDto,
        //         lastName: 'Ghost', // Changing non-encrypted data is allowed
        //     })
        //     const modifiedPatient = await ctx.patientApi(patApi).createOrModify(modifyEncryptedPatientLastName)
        //     expect(ctx.toPatientDto((await ctx.patientApi(patApi).getAndTryDecrypt(patientId!)).patient).lastName).toEqual('Ghost')
        //     const modifiedPatientRetrievedByHcp = ctx.toPatientDto(await ctx.patientApi(hcp1Api).get(patientId!))
        //     // Should update non-encrypted data
        //     expect(modifiedPatientRetrievedByHcp.lastName).toEqual('Ghost')
        //     // Should not change or destroy encrypted data
        //     expect(modifiedPatientRetrievedByHcp.notes).toHaveLength(1)
        //     expect(Object.keys(modifiedPatientRetrievedByHcp.notes![0].markdown ?? {})).toHaveLength(1)
        //     expect(modifiedPatientRetrievedByHcp.notes![0].markdown!.en).toEqual(patientNote)
        //     // ...can create medical data
        //     const heByPatient = await ctx.createHelementForPatient(patApi, modifiedPatient)
        //     const heByPatientId = ctx.toHelementDto(heByPatient).id
        //     const heByHcpId = ctx.toHelementDto(heByHcp).id
        //     // Originally medical data can't be accessed by others...
        //     await ctx.checkHelementInaccessible(hcp1Api, heByPatient)
        //     await ctx.checkHelementInaccessible(patApi, heByHcp)
        //     // ...but it can be shared
        //     const heByPatientWithUpdatedAccess = await ctx.helementApi(patApi).giveAccessTo(heByPatient, hcp1User.healthcarePartyId!)
        //     await ctx.checkDefaultHelementDecrypted(heByPatientWithUpdatedAccess)
        //     const heByHcpWithUpdatedAccess = await ctx.helementApi(hcp1Api).giveAccessTo(heByHcp, patientId!)
        //     await ctx.checkDefaultHelementDecrypted(heByHcpWithUpdatedAccess)
        //     await patApi.baseApi.cryptoApi.forceReload()
        //     await hcp1Api.baseApi.cryptoApi.forceReload()
        //     expect(await ctx.helementApi(hcp1Api).get(heByPatientId!)).toEqual(heByPatientWithUpdatedAccess)
        //     expect(await ctx.helementApi(patApi).get(heByHcpId!)).toEqual(heByHcpWithUpdatedAccess)
        //     // Originally medical data even if accessible can't be found by the other...
        //     const filterPatient1 = await ctx.newHelementFilter(patApi).forSelf().forPatients([modifiedPatient]).build()
        //     const patientFound1 = await ctx.helementApi(patApi).matchBy(filterPatient1)
        //     const filterHcp1 = await ctx.newHelementFilter(hcp1Api).forSelf().forPatients([modifiedPatient]).build()
        //     const hcpFound1 = await ctx.helementApi(hcp1Api).matchBy(filterHcp1)
        //     expect(patientFound1).toHaveLength(1)
        //     expect(patientFound1).toContain(heByPatientId)
        //     expect(hcpFound1).toHaveLength(1)
        //     expect(hcpFound1).toContain(heByHcpId)
        //
        //     //. ..but by sharing the patient with each other it can be found
        //     await ctx.patientApi(patApi).giveAccessTo((await ctx.patientApi(patApi).getAndTryDecrypt(patientId!)).patient, hcp1User.healthcarePartyId!)
        //     const fullySharedPatient = await ctx.patientApi(hcp1Api).giveAccessTo(await ctx.patientApi(hcp1Api).get(patientId!), patientId!)
        //     await patApi.baseApi.cryptoApi.forceReload()
        //     await hcp1Api.baseApi.cryptoApi.forceReload()
        //     expect(ctx.toPatientDto(await ctx.patientApi(patApi).get(patientId!)).notes![0].markdown!.en).toEqual(patientNote)
        //     expect(ctx.toPatientDto(await ctx.patientApi(hcp1Api).get(patientId!)).notes![0].markdown!.en).toEqual(patientNote)
        //     const filterPatient2 = await ctx.newHelementFilter(patApi).forSelf().forPatients([fullySharedPatient]).build()
        //     const patientFound2 = await ctx.helementApi(patApi).matchBy(filterPatient2)
        //     const filterHcp2 = await ctx.newHelementFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).forPatients([fullySharedPatient]).build()
        //     const hcpFound2 = await ctx.helementApi(hcp1Api).matchBy(filterHcp2)
        //     expect(hcpFound2).toHaveLength(2)
        //     expect(hcpFound2).toContain(heByPatientId)
        //     expect(hcpFound2).toContain(heByHcpId)
        //     expect(patientFound2).toHaveLength(2)
        //     expect(patientFound2).toContain(heByPatientId)
        //     expect(patientFound2).toContain(heByHcpId)
        // })
        //
        // const subscribeAndCreateUser = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
        //     const { api, user } = await ctx.masterApi(env)
        //
        //     const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (user: User) => Promise<void>) => {
        //         await sleep(2000)
        //         // TODO typing of eventlistener
        //         return ctx.userApi(api).subscribeToEvents(eventTypes, await new UserFilter(api).build(), eventListener as unknown as any, options)
        //     }
        //
        //     await sleep(2000)
        //     await sleep(2000)
        //
        //     const events: User[] = []
        //     const statuses: string[] = []
        //
        //     let eventReceivedPromiseResolve!: (value: void | PromiseLike<void>) => void
        //     let eventReceivedPromiseReject!: (reason?: any) => void
        //     const eventReceivedPromise = new Promise<void>((res, rej) => {
        //         eventReceivedPromiseResolve = res
        //         eventReceivedPromiseReject = rej
        //     })
        //
        //     await doXOnYAndSubscribe(
        //         api!!,
        //         options,
        //         connectionPromise(options, user.healthcarePartyId!, async (user) => {
        //             events.push(user)
        //             eventReceivedPromiseResolve()
        //         }),
        //         async () => {
        //             const user = await ctx.userApi(api).createOrModify(
        //                 ctx.toDSUser(
        //                     new User({
        //                         login: `${v4()}`,
        //                         status: 'ACTIVE',
        //                     }),
        //                 ),
        //             )
        //         },
        //         (status) => {
        //             statuses.push(status)
        //         },
        //         eventReceivedPromiseReject,
        //         eventReceivedPromise,
        //     )
        //
        //     events?.forEach((event) => console.log(`Event : ${event}`))
        //     statuses?.forEach((status) => console.log(`Status : ${status}`))
        //
        //     expect(events.length).toEqual(1)
        //     expect(statuses.length).toEqual(2)
        // }
        //
        // it('CREATE User without options', async () => {
        //     await subscribeAndCreateUser({}, ['CREATE'])
        // }, 60_000)
        //
        // it('CREATE User with options', async () => {
        //     await subscribeAndCreateUser(
        //         {
        //             connectionRetryIntervalMs: 10_000,
        //             connectionMaxRetry: 5,
        //         },
        //         ['CREATE'],
        //     )
        // }, 60_000)
        //
        // it('Can get an user by its phoneNumber', async () => {
        //     const api = await ctx.masterApi(env)
        //     const primitives = new CryptoPrimitives(webcrypto as any)
        //
        //     const phoneNumber = `+${`${Buffer.from(primitives.randomUuid()).readInt32BE(0)}`.slice(0, 14)}`
        //
        //     const createdUser = await ctx.userApi(api.api).createOrModify(
        //         ctx.toDSUser(
        //             new User({
        //                 id: v4(),
        //                 name: `user-${primitives.randomUuid()}`,
        //                 login: `user-${primitives.randomUuid()}`,
        //                 email: `user-${primitives.randomUuid()}@icure.com`,
        //                 mobilePhone: phoneNumber,
        //             }),
        //         ),
        //     )
        //
        //     const user = await ctx.userApi(api.api).getByPhoneNumber(phoneNumber)
        //
        //     expect(user).toEqual(createdUser)
        // }, 60_000)

        it('An instance of api obtained through mail signup should be capable of changin its password', async () => {
            const { api } = await ctx.signUpUserUsingEmail(env!, 'A', 'B', 'patient', env.dataOwnerDetails[hcp1Username].dataOwnerId)
            const newPassword = forceUuid()
            const user = await ctx.userApi(api).getLogged()
            const updatedUser = await ctx.userApi(api).createOrModify(
                ctx.toDSUser({
                    ...ctx.toUserDto(user),
                    passwordHash: newPassword,
                }),
            )
            expect(ctx.toUserDto(updatedUser).id).toEqual(ctx.toUserDto(user).id)
            expect(ctx.toUserDto(updatedUser).rev).not.toEqual(ctx.toUserDto(user).rev)
            expect(ctx.toUserDto(updatedUser).passwordHash).toEqual('*')
        })
    })
}
