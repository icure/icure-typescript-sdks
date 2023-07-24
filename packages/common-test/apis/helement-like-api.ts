import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage, TestUtils } from '../test-utils'
import { webcrypto } from 'crypto'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { TestKeyStorage, TestStorage, testStorageForUser } from '../test-storage'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, forceUuid, NotificationTypeEnum } from '@icure/typescript-common'
import { assert } from 'chai'
import { BaseApiTestContext, WithAuthenticationApi, WithDataOwnerApi, WithHcpApi, WithHelementApi, WithMaintenanceTaskApi, WithPatientApi, WithServiceApi } from './TestContexts'
import { expectArrayContainsExactlyInAnyOrder } from '../assertions'
import { HealthElement, User } from '@icure/api'

setLocalStorage(fetch)

export function testHelementLikeApi<DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>, DSAnonymousApi extends CommonAnonymousApi<DSApi>, DSApi extends CommonApi, DSCryptoStrategies extends CryptoStrategies<any>, DSUser, DSPatient, DSHelement>(
    name: string,
    ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithPatientApi<DSApi, DSPatient> & WithHelementApi<DSApi, DSHelement, DSPatient>,
) {
    let env: TestVars
    let hcp1Api: DSApi
    let hcp1User: User
    let hcp2Api: DSApi
    let hcp2User: User
    let patApi: DSApi
    let patUser: User

    describe(`${name} (Healthcare Element like API)`, () => {
        beforeAll(async function () {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
            const patApiAndUser = await ctx.signUpUserUsingEmail(env, 'Giovanni', 'Giorgio', 'patient', env.dataOwnerDetails[hcp1Username].dataOwnerId)
            patApi = patApiAndUser.api
            patUser = patApiAndUser.user
            const patient = await ctx.patientApi(patApi).get(patUser!.patientId!)
            const sharedWithHcp1 = await ctx.patientApi(patApi).giveAccessTo(patient, env.dataOwnerDetails[hcp1Username].dataOwnerId)
            await ctx.patientApi(patApi).giveAccessTo(sharedWithHcp1, env.dataOwnerDetails[hcp2Username].dataOwnerId)
            const hcp1ApiAndUser = await ctx.apiForEnvUser(env, hcp1Username)
            hcp1Api = hcp1ApiAndUser.api
            hcp1User = hcp1ApiAndUser.user
            const hcp2ApiAndUser = await ctx.apiForEnvUser(env, hcp2Username)
            hcp2Api = hcp2ApiAndUser.api
            hcp2User = hcp2ApiAndUser.user
        }, 600000)

        it('Patient sharing healthcare element with HCP', async () => {
            const currentPatient = await ctx.patientApi(patApi).get(patUser.patientId!)
            const createdHealthcareElement = await ctx.createHelementForPatient(patApi, currentPatient)
            // Initially hcp2 can't get HE
            await ctx.checkHelementInaccessible(hcp2Api, createdHealthcareElement)
            // Patient shares HE and gets it updated and decrypted
            const sharedHealthcareElement = await ctx.helementApi(patApi).giveAccessTo(createdHealthcareElement, hcp2User.healthcarePartyId!)
            ctx.checkDefaultHelementDecrypted(sharedHealthcareElement)
            // HCP2 can now get HE and decrypt it
            await ctx.checkHelementAccessibleAndDecrypted(hcp2Api, sharedHealthcareElement, true)
        })

        it('HCP sharing healthcare element with patient', async () => {
            const currentPatient = await ctx.patientApi(patApi).get(patUser!.patientId!)
            const createdHealthcareElement = await ctx.createHelementForPatient(hcp1Api, currentPatient)
            // Initially patient can't get HE
            await ctx.checkHelementInaccessible(patApi, createdHealthcareElement)
            // HCP shares HE and gets it updated and decrypted
            const sharedHealthcareElement = await ctx.helementApi(hcp1Api).giveAccessTo(createdHealthcareElement, patUser.patientId!)
            ctx.checkDefaultHelementDecrypted(sharedHealthcareElement)
            // Patient can now get HE and decrypt it (after refreshing the api to get the new keys for Access Control)
            await patApi.baseApi.cryptoApi.forceReload()
            await ctx.checkHelementAccessibleAndDecrypted(patApi, sharedHealthcareElement, true)
        })

        it('HCP sharing healthcare element with another HCP', async () => {
            const patient = await ctx.createPatient(hcp1Api!)
            const createdHealthcareElement = await ctx.createHelementForPatient(hcp1Api, patient)
            // Initially hcp2 can't get HE
            await ctx.checkHelementInaccessible(hcp2Api, createdHealthcareElement)
            // HCP1 shares HE and gets it updated and decrypted
            const sharedHealthcareElement = await ctx.helementApi(hcp1Api).giveAccessTo(createdHealthcareElement, hcp2User.healthcarePartyId!)
            ctx.checkDefaultHelementDecrypted(sharedHealthcareElement)
            // HCP2 can now get HE and decrypt it
            await ctx.checkHelementAccessibleAndDecrypted(hcp2Api, sharedHealthcareElement, true)
        })
        it('Optimization - No delegation sharing if delegated already has access to HE', async () => {
            const patient = await ctx.patientApi(patApi).get(patUser!.patientId!)
            const createdHealthcareElement = await ctx.createHelementForPatient(patApi!, patient)

            // When
            const sharedHealthcareElement = await ctx.helementApi(patApi).giveAccessTo(createdHealthcareElement, hcp1User.healthcarePartyId!)
            const sharedHealthcareElement2 = await ctx.helementApi(patApi).giveAccessTo(sharedHealthcareElement, hcp1User.healthcarePartyId!)

            // Then
            expect(sharedHealthcareElement).not.toEqual(createdHealthcareElement)
            expect(sharedHealthcareElement).toEqual(sharedHealthcareElement2)
        })

        it('Users without access to the Healthcare element can not share it', async () => {
            const patient = await ctx.createPatient(hcp1Api)
            const createdHealthcareElement = await ctx.createHelementForPatient(hcp1Api, patient)

            await expect(ctx.helementApi(hcp2Api).giveAccessTo(createdHealthcareElement, patUser.patientId!)).rejects.toBeInstanceOf(Error)
        })

        it('Data Owner can filter all the Healthcare Elements for a Patient - Success', async () => {
            const newPatient = await ctx.createPatient(hcp1Api!)
            const newHealthElement = await ctx.createHelementForPatient(hcp1Api!, newPatient)
            const newHealthElement2 = await ctx.createHelementForPatient(hcp1Api!, newPatient)
            const filteredElements = await ctx.helementApi(hcp1Api).getAllForPatient(newPatient)
            expect(filteredElements).toBeTruthy()
            expect(filteredElements).toHaveLength(2)
            expectArrayContainsExactlyInAnyOrder(filteredElements, [newHealthElement, newHealthElement2])
        })

        it('Healthcare element content is equal when obtain by its id or through filter', async () => {
            const newPatient = await ctx.createPatient(hcp1Api)
            const createdHelement = await ctx.createHelementForPatient(hcp1Api, newPatient)

            const filter = await ctx
                .newHelementFilter(hcp1Api)
                .forDataOwner(hcp1User.healthcarePartyId!)
                .forPatients([newPatient])
                .byIds([ctx.toHelementDto(createdHelement).id])
                .build()

            const retrievedHelement = await ctx.helementApi(hcp1Api).get(ctx.toHelementDto(createdHelement).id!)
            const filteredHelements = await ctx.helementApi(hcp1Api).filterBy(filter)

            expect(filteredHelements).toBeTruthy()
            expect(filteredHelements.rows).toHaveLength(1)
            expect(retrievedHelement).toEqual(createdHelement)
            expect(filteredHelements.rows[0]).toEqual(retrievedHelement)
        })

        it('getsForPatient returns no Healthcare Elements for a Patient with no Healthcare Elements', async () => {
            const newPatient = await ctx.createPatient(hcp1Api!)
            const filteredElements = await ctx.helementApi(hcp1Api).getAllForPatient(newPatient)
            expect(filteredElements).toHaveLength(0)
        })

        it('Data Owner can filter all his Health Elements', async () => {
            const currentPatient = await ctx.patientApi(patApi).get(patUser.patientId!)

            const createdHe = await ctx.createHelementForPatient(hcp2Api, currentPatient)
            const createdHeId = ctx.toHelementDto(createdHe).id

            const filter = await ctx.newHelementFilter(hcp2Api).forDataOwner(hcp2User.healthcarePartyId!).build()

            const filterResult = await ctx.helementApi(hcp2Api).filterBy(filter)
            expect(filterResult.rows.length).toBeGreaterThan(0)
            expect(filterResult.rows.find((x) => ctx.toHelementDto(x).id == createdHeId)).toEqual(createdHe)
        })

        it('Data Owner can match all his Health Elements', async () => {
            const filter = await ctx.newHelementFilter(hcp2Api).forDataOwner(hcp2User.healthcarePartyId!).build()

            const filterResult = await ctx.helementApi(hcp2Api).filterBy(filter)
            const matchResult = await ctx.helementApi(hcp2Api).matchBy(filter)
            expect(matchResult.length).toEqual(filterResult.rows.length)
            expectArrayContainsExactlyInAnyOrder(
                matchResult,
                filterResult.rows.map((x) => ctx.toHelementDto(x).id),
            )
        })

        it('if no Healthcare Element healthcareElementId is specified, then it should be set to the Healthcare Element id', async () => {
            const patient = await ctx.createPatient(hcp1Api)
            const newHE = await ctx.helementApi(hcp1Api).createOrModify(ctx.toDSHelement(new HealthElement({ description: 'DUMMY_DESCRIPTION' })), ctx.toPatientDto(patient).id)
            expect(newHE).toBeTruthy()
            const heDto = ctx.toHelementDto(newHE)
            expect(heDto.id).toBeTruthy()
            expect(forceUuid(heDto.id)).toEqual(heDto.id)
            expect(heDto.healthElementId).toEqual(heDto.id)
        })

        it('if a Healthcare Element healthcareElementId is specified, then it should be different from the Healthcare Element id', async () => {
            const elementId = forceUuid()
            const patient = await ctx.createPatient(hcp1Api)
            const newHE = await ctx.helementApi(hcp1Api).createOrModify(
                ctx.toDSHelement(
                    new HealthElement({
                        description: 'DUMMY_DESCRIPTION',
                        healthElementId: elementId,
                    }),
                ),
                ctx.toPatientDto(patient).id,
            )
            const heDto = ctx.toHelementDto(newHE)
            expect(heDto.healthElementId).toEqual(elementId)
            expect(heDto.id).not.toEqual(elementId)
        })

        it('Give access to will fail if the healthcare version does not match the latest', async () => {
            const patient = await ctx.createPatient(hcp1Api)
            const healthcareElement = await ctx.createHelementForPatient(hcp1Api, patient)
            const shared = await ctx.helementApi(hcp1Api).giveAccessTo(healthcareElement, patUser.patientId!)
            await expect(ctx.helementApi(hcp1Api).giveAccessTo(healthcareElement, hcp2User.healthcarePartyId!)).rejects.toBeInstanceOf(Error)
            await ctx.checkHelementAccessibleAndDecrypted(hcp1Api, shared, true)
            await ctx.checkHelementAccessibleAndDecrypted(patApi, shared, true)
            await ctx.checkHelementInaccessible(hcp2Api, shared)
        })
    })
}
