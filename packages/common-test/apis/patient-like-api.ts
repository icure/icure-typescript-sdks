import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, forceUuid, PatientFilter } from '@icure/typescript-common'
import { BaseApiTestContext, WithHelementApi, WithPatientApi } from './TestContexts'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, patUsername, setLocalStorage } from '../test-utils'
import { Patient, sleep, User } from '@icure/api'
import 'isomorphic-fetch'
import { doXOnYAndSubscribe } from '../websocket-utils'
import { describe, it, beforeAll } from '@jest/globals'

setLocalStorage(fetch)

export function testPatientLikeApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSHcp,
    DSPatient,
    DSDataOwner extends DataOwnerWithType,
    DSHelement,
    DSMaintenanceTask
>(name: string, ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithPatientApi<DSApi, DSPatient> & WithHelementApi<DSApi, DSHelement, DSPatient>) {
    let env: TestVars
    let hcp1Api: DSApi
    let hcp1User: User

    describe(`${name} (Patient like API)`, () => {
        beforeAll(async function () {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())

            const hcp1ApiAndUser = await ctx.apiForEnvUser(env, hcp1Username)
            hcp1Api = hcp1ApiAndUser.api
            hcp1User = hcp1ApiAndUser.user
        }, 600_000)

        it('Can create a patient and a related Healthcare Element', async () => {
            // when
            const patient = await ctx.patientApi(hcp1Api).createOrModify(
                ctx.toDSPatient(
                    new Patient({
                        firstName: 'Giovanni',
                        lastName: 'Neve',
                        notes: [
                            {
                                markdown: { it: "L'inverno sta arrivando" },
                            },
                        ],
                    })
                )
            )
            const patientDto = ctx.toPatientDto(patient)

            // Then
            expect(patientDto.id).toBeTruthy()
            expect(forceUuid(patientDto.id)).toEqual(patientDto.id)
            expect(patientDto.firstName).toEqual('Giovanni')
            expect(patientDto.lastName).toEqual('Neve')
            expect(patientDto.notes![0].markdown!['it']).toEqual("L'inverno sta arrivando")

            const retrieved = await ctx.patientApi(hcp1Api).get(patientDto.id!)
            expect(retrieved).toEqual(patient)

            // Init
            const hElement = await ctx.createHelementForPatient(hcp1Api, patient)
            expect(hElement).toBeTruthy()
            ctx.checkDefaultHelementDecrypted(hElement)
            await ctx.checkHelementAccessibleAndDecrypted(hcp1Api, hElement, true)
        })

        it('Patient sharing its own information with HCP', async function () {
            if (env.backendType === 'oss') return
            const patApiAndUser = await ctx.signUpUserUsingEmail(env, 'Giacomo', 'Passero', 'patient', hcp1User.healthcarePartyId!)
            const patApi = patApiAndUser.api
            const patUser = patApiAndUser.user

            const hcpApiAndUser = await ctx.apiForEnvUser(env, hcp2Username)
            const hcpApi = hcpApiAndUser.api
            const hcpUser = hcpApiAndUser.user
            const modifyPatient = ctx.toDSPatient({
                ...ctx.toPatientDto(await ctx.patientApi(patApi).get(patUser.patientId!)),
                notes: [{ markdown: { en: 'Some note' } }],
            })
            const updatedPatient = await ctx.patientApi(patApi).createOrModify(modifyPatient)
            expect(ctx.toPatientDto(updatedPatient).notes![0].markdown!.en).toEqual('Some note')
            // Initially HCP can't access the patient
            await ctx.checkPatientInaccessible(hcpApi, updatedPatient)
            // Patient shares P and gets it updated and decrypted
            const sharedPatient = await ctx.patientApi(patApi).giveAccessTo(updatedPatient, hcpUser.healthcarePartyId!)
            expect(ctx.toPatientDto(sharedPatient).notes![0].markdown!.en).toEqual('Some note')
            // HCP can now access the patient
            await ctx.checkPatientAccessibleAndDecrypted(hcpApi, sharedPatient, true)
        })

        it('Patient may access info of another patient only if he has the appropriate delegation', async () => {
            const patApiAndUser = await ctx.apiForEnvUser(env, patUsername)
            const patApi = patApiAndUser.api
            const patUser = patApiAndUser.user
            const currentPatient = await ctx.patientApi(patApi).get(patUser.patientId!)

            const createdPatient = await ctx.createPatient(hcp1Api)
            // Initially patient can't access the other patient
            await ctx.checkPatientInaccessible(patApi, createdPatient)
            // Hcp shares the other patient and gets it updated and decrypted
            const sharedPatient = await ctx.patientApi(hcp1Api).giveAccessTo(createdPatient, patUser.patientId!)
            ctx.checkDefaultPatientDecrypted(sharedPatient)
            // Patient can now access the other patient
            await patApi.baseApi.cryptoApi.forceReload()
            await ctx.checkPatientAccessibleAndDecrypted(patApi, sharedPatient, true)
        })

        it('HCP sharing patient with another HCP', async () => {
            const hcp2ApiAndUser = await ctx.apiForEnvUser(env, hcp2Username)
            const hcp2Api = hcp2ApiAndUser.api
            const hcp2User = hcp2ApiAndUser.user

            const createdPatient = await ctx.createPatient(hcp1Api)
            // Initially HCP2 can't access the patient
            await ctx.checkPatientInaccessible(hcp2Api, createdPatient)
            // HCP1 shares the patient with HCP2 and gets it updated and decrypted
            const sharedPatient = await ctx.patientApi(hcp1Api).giveAccessTo(createdPatient, hcp2User.healthcarePartyId!)
            ctx.checkDefaultPatientDecrypted(sharedPatient)
            // HCP2 can now access the patient
            await ctx.checkPatientAccessibleAndDecrypted(hcp2Api, sharedPatient, true)
        })

        it('Optimization - No delegation sharing if delegated already has access to patient', async () => {
            const patient = await ctx.createPatient(hcp1Api)

            // When
            const sharedPatient1 = await ctx.patientApi(hcp1Api).giveAccessTo(patient, env.dataOwnerDetails[hcp2Username].dataOwnerId!)
            // Currently if we create a new api we also create new exchange data because we can't verify the already existing data, so i'm re-sharing with the same api
            const sharedPatient2 = await ctx.patientApi(hcp1Api).giveAccessTo(sharedPatient1, env.dataOwnerDetails[hcp2Username].dataOwnerId!)

            // Then
            expect(sharedPatient1).toEqual(sharedPatient2)
        })

        it('Delegator may not share info of Patient', async () => {
            const hcp2ApiAndUser = await ctx.apiForEnvUser(env, hcp2Username)
            const hcp2Api = hcp2ApiAndUser.api

            const createdPatient = await ctx.createPatient(hcp1Api)

            // When
            await expect(ctx.patientApi(hcp2Api).giveAccessTo(createdPatient, env.dataOwnerDetails[patUsername].dataOwnerId!)).rejects.toBeInstanceOf(Error)
        })

        it('Give access using an older version of patient should not lose information', async () => {
            const { api: h2api, user: h2 } = await ctx.apiForEnvUser(env, hcp2Username)
            const { api: pApi, user: p } = await ctx.apiForEnvUser(env, patUsername)
            const patient = await ctx.createPatient(hcp1Api)
            await ctx.patientApi(hcp1Api!).giveAccessTo(patient, p.patientId!)
            const sharedPatient = await ctx.patientApi(hcp1Api!).giveAccessTo(patient, h2.healthcarePartyId!)
            await ctx.checkPatientAccessibleAndDecrypted(hcp1Api, sharedPatient, true)
            await ctx.checkPatientAccessibleAndDecrypted(h2api, sharedPatient, true)
            // Still accessible to patient even though the last time we shared we didn't pass the helement with delegation to patient.
            await ctx.checkPatientAccessibleAndDecrypted(pApi, sharedPatient, true)
        })

        const subscribeAndCreatePatient = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
            const { api, user } = await ctx.apiForEnvUser(env, hcp1Username)

            const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (patient: Patient) => Promise<void>) => {
                await sleep(2000)
                // TODO fix eventListener typing
                return ctx.patientApi(api).subscribeToEvents(eventTypes, await new PatientFilter(api).forSelf().containsFuzzy('John').build(), eventListener as unknown as any, options)
            }

            const events: Patient[] = []
            const statuses: string[] = []

            let eventReceivedPromiseResolve!: (value: void | PromiseLike<void>) => void
            let eventReceivedPromiseReject!: (reason?: any) => void
            const eventReceivedPromise = new Promise<void>((res, rej) => {
                eventReceivedPromiseResolve = res
                eventReceivedPromiseReject = rej
            })

            await doXOnYAndSubscribe(
                api!!,
                options,
                connectionPromise(options, user.healthcarePartyId!, async (patient) => {
                    events.push(patient)
                    eventReceivedPromiseResolve()
                }),
                async () => {
                    await ctx.createPatient(api)
                },
                (status) => {
                    statuses.push(status)
                },
                eventReceivedPromiseReject,
                eventReceivedPromise
            )

            events?.forEach((event) => console.log(`Event : ${event}`))
            statuses?.forEach((status) => console.log(`Status : ${status}`))

            expect(events.length).toEqual(1)
            expect(statuses.length).toEqual(2)
        }

        it('Can subscribe PatientLike CREATE without option', async () => {
            await subscribeAndCreatePatient({}, ['CREATE'])
        }, 60_000)

        it('Can subscribe PatientLike CREATE with options', async () => {
            await subscribeAndCreatePatient(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE']
            )
        }, 60_000)
    })
}
