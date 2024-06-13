import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, setLocalStorage } from '../test-utils'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { AnnotationDto, AnonymousApiBuilder, CommonAnonymousApi, CommonApi, ContactDto, CryptoStrategies } from '@icure/typescript-common'
import { BaseApiTestContext, WithContactApi, WithPatientApi } from './TestContexts'
import { expectArrayContainsExactlyInAnyOrder } from '../assertions'
import { CodeStub, Contact, Patient, User } from '@icure/api'
import { doXOnYAndSubscribe } from '../websocket-utils'
import { describe, it, beforeAll } from '@jest/globals'

setLocalStorage(fetch)

export function testContactLikeApi<DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>, DSAnonymousApi extends CommonAnonymousApi<DSApi>, DSApi extends CommonApi, DSCryptoStrategies extends CryptoStrategies<any>, DSUser, DSPatient, DSContact>(
    name: string,
    ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithPatientApi<DSApi, DSPatient> & WithContactApi<DSApi, DSContact, DSPatient>,
) {
    let env: TestVars
    let hcp1Api: DSApi
    let hcp1User: User
    let hcp2Api: DSApi
    let hcp2User: User
    let patApi: DSApi
    let patUser: User

    describe(`${name} (Contact like API)`, () => {
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

        it('Patient sharing Contact with HCP', async () => {
            const currentPatient = await ctx.patientApi(patApi).get(patUser.patientId!)
            const createdContact = await ctx.createContactForPatient(patApi, currentPatient)
            // Initially hcp2 can't get HE
            await ctx.checkContactInaccessible(hcp2Api, createdContact)
            // Patient shares HE and gets it updated and decrypted
            const sharedContact = await ctx.contactApi(patApi).giveAccessTo(createdContact, hcp2User.healthcarePartyId!)
            ctx.checkDefaultContactDecrypted(sharedContact)
            // HCP2 can now get HE and decrypt it
            await ctx.checkContactAccessibleAndDecrypted(hcp2Api, sharedContact, true)
        })

        it('HCP sharing Contact with patient', async () => {
            const currentPatient = await ctx.patientApi(patApi).get(patUser!.patientId!)
            const createdContact = await ctx.createContactForPatient(hcp1Api, currentPatient)
            // Initially patient can't get HE
            await ctx.checkContactInaccessible(patApi, createdContact)
            // HCP shares HE and gets it updated and decrypted
            const sharedContact = await ctx.contactApi(hcp1Api).giveAccessTo(createdContact, patUser.patientId!)
            ctx.checkDefaultContactDecrypted(sharedContact)
            // Patient can now get HE and decrypt it (after refreshing the api to get the new keys for Access Control)
            await patApi.baseApi.cryptoApi.forceReload()
            await ctx.checkContactAccessibleAndDecrypted(patApi, sharedContact, true)
        })

        it('HCP sharing Contact with another HCP', async () => {
            const patient = await ctx.createPatient(hcp1Api!)
            const createdContact = await ctx.createContactForPatient(hcp1Api, patient)
            // Initially hcp2 can't get HE
            await ctx.checkContactInaccessible(hcp2Api, createdContact)
            // HCP1 shares HE and gets it updated and decrypted
            const sharedContact = await ctx.contactApi(hcp1Api).giveAccessTo(createdContact, hcp2User.healthcarePartyId!)
            ctx.checkDefaultContactDecrypted(sharedContact)
            // HCP2 can now get HE and decrypt it
            await ctx.checkContactAccessibleAndDecrypted(hcp2Api, sharedContact, true)
        })
        it('Optimization - No delegation sharing if delegated already has access to Contact', async () => {
            const patient = await ctx.patientApi(patApi).get(patUser!.patientId!)
            const createdContact = await ctx.createContactForPatient(patApi!, patient)

            // When
            const sharedContact = await ctx.contactApi(patApi).giveAccessTo(createdContact, hcp1User.healthcarePartyId!)
            const sharedContact2 = await ctx.contactApi(patApi).giveAccessTo(sharedContact, hcp1User.healthcarePartyId!)

            // Then
            expect(sharedContact).not.toEqual(createdContact)
            expect(sharedContact).toEqual(sharedContact2)
        })

        it('Users without access to the Contact can not share it', async () => {
            const patient = await ctx.createPatient(hcp1Api)
            const createdContact = await ctx.createContactForPatient(hcp1Api, patient)

            await expect(ctx.contactApi(hcp2Api).giveAccessTo(createdContact, patUser.patientId!)).rejects.toBeInstanceOf(Error)
        })

        it('Data Owner can match all the Contacts for a Patient - Success', async () => {
            const newPatient = await ctx.createPatient(hcp1Api!)
            const newContact = await ctx.createContactForPatient(hcp1Api!, newPatient)
            const newContact2 = await ctx.createContactForPatient(hcp1Api!, newPatient)
            const matchedContactIds = await ctx.contactApi(hcp1Api).matchBy(await ctx.newContactFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).byPatientLabelCodeDateFilter([newPatient]).build())

            expect(matchedContactIds).toBeTruthy()
            expect(matchedContactIds).toHaveLength(2)
            expectArrayContainsExactlyInAnyOrder(
                matchedContactIds,
                [newContact, newContact2].map((x) => ctx.toContactDto(x).id!),
            )
        })

        it('Contact content is equal when obtain by its id or through filter', async () => {
            const newPatient = await ctx.createPatient(hcp1Api)
            const createdContact = await ctx.createContactForPatient(hcp1Api, newPatient)

            const filter = await ctx.newContactFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).build()

            const retrievedContact = await ctx.contactApi(hcp1Api).get(ctx.toContactDto(createdContact).id!)
            const filteredContacts = await ctx.contactApi(hcp1Api).filterBy(filter)

            expect(filteredContacts).toBeTruthy()
            expect(filteredContacts.rows).toHaveLength(1)
            expect(retrievedContact).toEqual(createdContact)
            expect(filteredContacts.rows[0]).toEqual(retrievedContact)
        })

        it('Data Owner can filter all his Contacts', async () => {
            const currentPatient = await ctx.patientApi(patApi).get(patUser.patientId!)

            const createdContact = await ctx.createContactForPatient(hcp2Api, currentPatient)
            const createdContactId = ctx.toContactDto(createdContact).id

            const filter = await ctx.newContactFilter(hcp2Api).forDataOwner(hcp2User.healthcarePartyId!).build()

            const filterResult = await ctx.contactApi(hcp2Api).filterBy(filter)
            expect(filterResult.rows.length).toBeGreaterThan(0)
            expect(filterResult.rows.find((x) => ctx.toContactDto(x).id == createdContactId)).toEqual(createdContact)
        })

        it('Data Owner can match all his Contacts', async () => {
            const filter = await ctx.newContactFilter(hcp2Api).forDataOwner(hcp2User.healthcarePartyId!).build()

            const filterResult = await ctx.contactApi(hcp2Api).filterBy(filter)
            const matchResult = await ctx.contactApi(hcp2Api).matchBy(filter)
            expect(matchResult.length).toEqual(filterResult.rows.length)
            expectArrayContainsExactlyInAnyOrder(
                matchResult,
                filterResult.rows.map((x) => ctx.toContactDto(x).id),
            )
        })

        it('Give access to using an older version of contact should not lose information', async () => {
            const patient = await ctx.createPatient(hcp1Api)
            const contact = await ctx.createContactForPatient(hcp1Api, patient)
            await ctx.contactApi(hcp1Api).giveAccessTo(contact, patUser.patientId!)
            const shared2 = await ctx.contactApi(hcp1Api).giveAccessTo(contact, hcp2User.healthcarePartyId!)
            await ctx.checkContactAccessibleAndDecrypted(hcp1Api, shared2, true)
            await ctx.checkContactAccessibleAndDecrypted(hcp2Api, shared2, true)
            // Still accessible to patient even though the last time we shared we didn't pass the helement with delegation to patient.
            await ctx.checkContactAccessibleAndDecrypted(patApi, shared2, true)
        })

        const testType = 'IC-TEST'
        const testCode = 'TEST'

        const subscribeAndCreateContact = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
            const { api, user } = await ctx.apiForEnvUser(env, hcp1Username)
            // TODO fix event listener type
            const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (contact: ContactDto) => Promise<void>) =>
                ctx.contactApi(api).subscribeToEvents(eventTypes, await ctx.newContactFilter(api).forSelf().byLabelCodeDateFilter(testType, testCode).build(), eventListener as unknown as any, options)

            const events: ContactDto[] = []
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
                connectionPromise({}, user.healthcarePartyId!, async (contact) => {
                    events.push(contact)
                    eventReceivedPromiseResolve()
                }),
                async () => {
                    const patient = await ctx.patientApi(api).createOrModify(
                        ctx.toDSPatient(
                            new Patient({
                                firstName: 'John',
                                lastName: 'Snow',
                                note: 'Winter is coming',
                            }),
                        ),
                    )

                    await ctx.contactApi(api).createOrModifyFor(
                        (await ctx.toPatientDto(patient)).id,
                        ctx.toDSContact(
                            new Contact({
                                note: [
                                    new AnnotationDto({
                                        markdown: { en: 'Hero Syndrome' },
                                    }),
                                ],
                                tags: [new CodeStub({ code: testCode, type: testType })],
                            }),
                        ),
                    )
                },
                (status) => {
                    statuses.push(status)
                },
                eventReceivedPromiseReject,
                eventReceivedPromise,
            )

            events?.forEach((event) => console.log(`Event : ${event}`))
            statuses?.forEach((status) => console.log(`Status : ${status}`))

            expect(events.length).toEqual(1)
            expect(statuses.length).toEqual(2)
        }

        it('Can subscribe ContactLike CREATE without options', async () => {
            await subscribeAndCreateContact({}, ['CREATE'])
        }, 60_000)

        it('Can subscribe ContactLike CREATE with options', async () => {
            await subscribeAndCreateContact(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
            )
        }, 60_000)
    })
}
