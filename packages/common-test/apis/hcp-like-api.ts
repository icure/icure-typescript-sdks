import 'isomorphic-fetch'
import { getEnvironmentInitializer, setLocalStorage } from '../test-utils'
import { webcrypto } from 'crypto'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, forceUuid, HealthcarePartyFilter } from '@icure/typescript-common'
import { BaseApiTestContext, WithDataOwnerApi, WithHcpApi, WithPatientApi } from './TestContexts'
import { HealthcareParty, jwk2spki, ShaVersion, sleep, User } from '@icure/api'
import { doXOnYAndSubscribe } from '../websocket-utils'
import { describe, it, beforeAll } from '@jest/globals'

setLocalStorage(fetch)

export function testHcpLikeApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSHcp,
    DSPatient,
    DSDataOwner extends DataOwnerWithType,
>(name: string, ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithPatientApi<DSApi, DSPatient> & WithHcpApi<DSApi, DSHcp> & WithDataOwnerApi<DSApi, DSDataOwner, DSUser>) {
    describe(`${name} (Hcp-like API)`, () => {
        let env: TestVars

        beforeAll(async () => {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
        }, 600_000)

        it('should be capable of creating a healthcare professional from scratch', async () => {
            const { api } = await ctx.masterApi(env)
            const rawKeyPair: CryptoKeyPair = await api.baseApi.cryptoApi.primitives.RSA.generateKeyPair(ShaVersion.Sha256)
            const keyPair = await api.baseApi.cryptoApi.primitives.RSA.exportKeys(
                rawKeyPair as {
                    publicKey: CryptoKey
                    privateKey: CryptoKey
                },
                'jwk',
                'jwk',
            )
            const hcp = await ctx.hcpApi(api).createOrModify(
                ctx.toDSHcp(
                    new HealthcareParty({
                        name: `Med-ts-ic-test-${forceUuid()}`,
                        publicKeysForOaepWithSha256: [jwk2spki(keyPair.publicKey)],
                    }),
                ),
            )
            expect(hcp).toBeTruthy()
            const hcpDto = ctx.toHcpDto(hcp)
            expect(hcpDto.id).toBeTruthy()
            expect(forceUuid(hcpDto.id)).toEqual(hcpDto.id)
            expect(hcpDto.name).toEqual(hcpDto.name)
            let userEmail = `${forceUuid()}@med-ts-ic-test.com`
            let userPwd = `${forceUuid()}`
            const user = await ctx.userApi(api).createOrModify(
                ctx.toDSUser(
                    new User({
                        login: userEmail,
                        passwordHash: userPwd,
                        email: userEmail,
                        healthcarePartyId: hcpDto.id,
                    }),
                ),
            )
            expect(user).toBeTruthy()
            const userDto = ctx.toUserDto(user)
            expect(userDto.id).toBeTruthy()
            expect(forceUuid(userDto.id)).toEqual(userDto.id)
            expect(userDto.login).toEqual(userEmail)
            expect(userDto.email).toEqual(userEmail)
            expect(userDto.healthcarePartyId).toEqual(hcpDto.id)
            expect(userDto.passwordHash).not.toEqual(userPwd)
        })

        it('should be capable of initializing crypto of a healthcare professional from scratch', async () => {
            const { api } = await ctx.masterApi(env)
            const hcp = await ctx.hcpApi(api).createOrModify(
                ctx.toDSHcp(
                    new HealthcareParty({
                        name: `Med-ts-ic-test-${forceUuid()}`,
                    }),
                ),
            )
            expect(hcp).toBeTruthy()
            const hcpId = ctx.toHcpDto(hcp).id
            let userEmail = `${forceUuid()}@med-ts-ic-test.com`
            let userPwd = forceUuid()
            const user = await ctx.userApi(api).createOrModify(
                ctx.toDSUser(
                    new User({
                        login: userEmail,
                        passwordHash: userPwd,
                        email: userEmail,
                        healthcarePartyId: hcpId,
                    }),
                ),
            )
            const userDto = ctx.toUserDto(user)
            expect(userDto.id).toBeTruthy()
            expect(userDto.login).toEqual(userEmail)
            expect(userDto.email).toEqual(userEmail)
            expect(userDto.healthcarePartyId).toEqual(hcpId)
            expect(userDto.passwordHash).not.toEqual(userPwd)
            // When HCP wants to init a RSA KeyPair
            const hcpApi = await ctx
                .newApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withUserName(userEmail)
                .withPassword(userPwd)
                .withCrypto(webcrypto as any)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()
            // TODO coherence: dataOwnerApi methods should omit "dataOwner" from name
            const initialisedHcp = await ctx.dataOwnerApi(hcpApi).getDataOwner(userDto.healthcarePartyId!)
            expect(ctx.dataOwnerApi(hcpApi).getPublicKeysOf(initialisedHcp)).toHaveLength(1)
            // Then, HCP can create and retrievedata
            const createdPatient = await ctx.createPatient(hcpApi)
            expect(createdPatient).toBeTruthy()
            const retrievedPatient = await ctx.patientApi(hcpApi).get(ctx.toPatientDto(createdPatient).id!)
            expect(retrievedPatient).toEqual(createdPatient)
        })

        const subscribeAndCreateHealthcareParty = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
            const { api, user } = await ctx.masterApi(env)
            const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (patient: HealthcareParty) => Promise<void>) => {
                await sleep(2000)
                // TODO fix eventListener typing
                return ctx.hcpApi(api).subscribeToEvents(eventTypes, await new HealthcarePartyFilter(api).build(), eventListener as unknown as any, options)
            }

            const events: HealthcareParty[] = []
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
                    await ctx.hcpApi(api).createOrModify(
                        ctx.toDSHcp(
                            new HealthcareParty({
                                name: `Med-ts-ic-test-${forceUuid()}`,
                                firstName: 'Homer',
                                lastName: 'Simpson',
                                parentId: user.healthcarePartyId,
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

        it('Can subscribe to HealthcarePartyLike CREATE without option', async () => {
            await subscribeAndCreateHealthcareParty({}, ['CREATE'])
        }, 60_000)

        it('Can subscribe to HealthcarePartyLike CREATE with options', async () => {
            await subscribeAndCreateHealthcareParty(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
            )
        }, 60_000)
    })
}
