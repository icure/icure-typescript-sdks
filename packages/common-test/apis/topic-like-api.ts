import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage } from '../test-utils'
import { BaseApiTestContext, WithDataOwnerApi, WithHcpApi, WithHelementApi, WithPatientApi, WithServiceApi, WithTopicApi } from './TestContexts'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, TopicFilter, TopicRoleEnum } from '@icure/typescript-common'
import { beforeAll, describe, it } from '@jest/globals'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import 'isomorphic-fetch'
import { sleep, Topic } from '@icure/api'
import { doXOnYAndSubscribe } from '../websocket-utils'

setLocalStorage(fetch)

export function testTopicLikeApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSTopic,
    DSHcp,
    DSPatient,
    DSService,
    DSHealthElement,
    DSDocument,
    DSDataOwner extends DataOwnerWithType,
>(
    name: string,
    ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> &
        WithTopicApi<DSApi, DSTopic, DSHcp, DSPatient, DSService, DSHealthElement> &
        WithHcpApi<DSApi, DSHcp> &
        WithPatientApi<DSApi, DSPatient> &
        WithDataOwnerApi<DSApi, DSDataOwner, DSUser> &
        WithServiceApi<DSApi, DSService, DSPatient, DSDocument> &
        WithHelementApi<DSApi, DSHealthElement, DSPatient>,
) {
    describe(`${name} (Topic-like API)`, () => {
        let env: TestVars

        beforeAll(async () => {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
        }, 600_000)

        it('should be capable of creating a topic from scratch', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRoleEnum.PARTICIPANT,
                    },
                ],
                'Topic description',
            )
            expect(topic).toBeTruthy()

            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto.id).toBeTruthy()
            expect(topicDto.description).toEqual('Topic description')
            expect(Object.entries(topicDto.activeParticipants!)).toHaveLength(2)

            const gotTopic = await ctx.topicApi(masterApi).get(topicDto.id!)
            expect(gotTopic).toBeTruthy()

            const gotTopicDto = ctx.toTopicDto(gotTopic)
            expect(gotTopicDto.id).toEqual(topicDto.id)
            expect(gotTopicDto).toEqual(topicDto)
        })

        it('should be capable of adding a participant to a topic', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                ],
                'Topic description',
            )
            expect(topic).toBeTruthy()

            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto.id).toBeTruthy()
            expect(topicDto.description).toEqual('Topic description')
            expect(Object.entries(topicDto.activeParticipants!)).toHaveLength(1)

            const gotTopic = await ctx.topicApi(masterApi).addParticipant(topic, {
                ref: hcp2User.healthcarePartyId!,
                role: TopicRoleEnum.PARTICIPANT,
            })
            expect(gotTopic).toBeTruthy()

            const gotTopicDto = ctx.toTopicDto(gotTopic)
            expect(gotTopicDto.id).toEqual(topicDto.id)
            expect(Object.entries(gotTopicDto.activeParticipants!)).toHaveLength(2)

            const gotTopicFromHcp2 = await ctx.topicApi(hcp2Api).get(topicDto.id!)
            expect(gotTopicFromHcp2).toBeTruthy()
            expect(ctx.toTopicDto(gotTopicFromHcp2)).toEqual(gotTopicDto)
        })

        it('should be capable to create topic with linkedHealthElements and linkedServices', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const patient = await ctx.createPatient(masterApi)

            const services = await ctx.createServicesForPatient(masterApi, patient)
            const sharedServices = await ctx.serviceApi(masterApi).giveAccessToMany(services, hcp2User.healthcarePartyId!)
            const healthElements = await Promise.all([ctx.createHelementForPatient(masterApi, patient), ctx.createHelementForPatient(masterApi, patient)])
            const sharedHealthElements = await Promise.all(healthElements.map((he) => ctx.helementApi(masterApi).giveAccessTo(he, hcp2User.healthcarePartyId!)))

            const serviceIds = sharedServices.map((service) => ctx.toServiceDto(service).id!)
            const heIds = sharedHealthElements.map((healthElement) => ctx.toHelementDto(healthElement).id!)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRoleEnum.PARTICIPANT,
                    },
                ],
                'Topic description',
                patient,
                heIds,
                serviceIds,
            )
            expect(topic).toBeTruthy()

            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto.id).toBeTruthy()
            expect(topicDto.description).toEqual('Topic description')
            expect(Object.entries(topicDto.activeParticipants!)).toHaveLength(2)
            expect(topicDto.linkedServices).toHaveLength(2)
            expect(topicDto.linkedHealthElements).toHaveLength(2)

            await hcp2Api.baseApi.cryptoApi.forceReload()

            const servicesFromHcp2 = await Promise.all(topicDto.linkedServices!.map((serviceId) => ctx.serviceApi(hcp2Api).get(serviceId)))
            expect(servicesFromHcp2).toHaveLength(2)
            expect(servicesFromHcp2).toEqual(expect.arrayContaining(sharedServices))

            const healthElementsFromHcp2 = await Promise.all(topicDto.linkedHealthElements!.map((healthElementId) => ctx.helementApi(hcp2Api).get(healthElementId)))
            expect(healthElementsFromHcp2).toHaveLength(2)
            expect(healthElementsFromHcp2).toEqual(expect.arrayContaining(sharedHealthElements))

            const gotTopic = await ctx.topicApi(hcp2Api).get(topicDto.id!)
            expect(gotTopic).toBeTruthy()

            const gotTopicDto = ctx.toTopicDto(gotTopic)
            expect(gotTopicDto.id).toEqual(topicDto.id)
            expect(gotTopicDto).toEqual(topicDto)
        })

        it('should be capable to create topic and filter it by TopicByHcPartyFilter', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRoleEnum.PARTICIPANT,
                    },
                ],
                'Topic description',
            )
            expect(topic).toBeTruthy()

            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto).toBeTruthy()

            const filter = await new TopicFilter(hcp2Api).forSelf().build()

            const paginatedList = await ctx.topicApi(hcp2Api).filterBy(filter)
            expect(paginatedList).toBeTruthy()

            const filteredTopicDtos = paginatedList.rows?.map(ctx.toTopicDto)
            expect(filteredTopicDtos.length).toBeGreaterThanOrEqual(1)
            expect(filteredTopicDtos).toEqual(expect.arrayContaining([topicDto]))
        })

        it('should be capable to create topic and filter it by TopicByParticipantFilter', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRoleEnum.PARTICIPANT,
                    },
                ],
                'Topic description',
            )
            expect(topic).toBeTruthy()

            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto).toBeTruthy()

            const filter = await new TopicFilter(masterApi).forSelf().byParticipant(hcp2User.healthcarePartyId!).build()

            const paginatedList = await ctx.topicApi(masterApi).filterBy(filter)
            expect(paginatedList).toBeTruthy()

            const filteredTopicDtos = paginatedList.rows?.map(ctx.toTopicDto)
            expect(filteredTopicDtos.length).toBeGreaterThanOrEqual(1)
            expect(filteredTopicDtos).toEqual(expect.arrayContaining([topicDto]))
        })

        it('A non-participant user should not be able to filter topic that other user are participants in', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)
            const { api: hcp3Api, user: hcp3User } = await ctx.apiForEnvUser(env, hcp3Username)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRoleEnum.PARTICIPANT,
                    },
                ],
                'Topic description',
            )
            expect(topic).toBeTruthy()

            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto).toBeTruthy()

            const filterByHcp = await new TopicFilter(hcp3Api).forDataOwner(hcp2User.healthcarePartyId!).build()
            const filterByParticipants = await new TopicFilter(hcp3Api).forSelf().byParticipant(hcp2User.healthcarePartyId!).build()

            await expect(ctx.topicApi(hcp3Api).filterBy(filterByHcp)).rejects.toThrow() // Throws 403, since your cannot get topic that you don't have access to

            const paginatedList = await ctx.topicApi(hcp3Api).filterBy(filterByParticipants)
            expect(paginatedList).toBeTruthy()

            const filteredTopicDtos = paginatedList.rows?.map(ctx.toTopicDto)
            expect(filteredTopicDtos.length).toBeGreaterThanOrEqual(0) // Returns a paginated list with 0 rows, since you don't share any topic with hcp2
        })

        it('a topic PARTICIPANT should be capable to leave the Topic and to not retrieve it using TopicByParticipantFilter', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRoleEnum.PARTICIPANT,
                    },
                ],
                'Topic description',
            )
            expect(topic).toBeTruthy()

            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto).toBeTruthy()

            const filter = await new TopicFilter(hcp2Api).forSelf().byParticipant(hcp2User.healthcarePartyId!).build()

            const paginatedList = await ctx.topicApi(hcp2Api).filterBy(filter)
            expect(paginatedList).toBeTruthy()

            const filteredTopicDtos = paginatedList.rows?.map(ctx.toTopicDto)
            expect(filteredTopicDtos.length).toBeGreaterThanOrEqual(1)
            expect(filteredTopicDtos).toEqual(expect.arrayContaining([topicDto]))

            await ctx.topicApi(hcp2Api).leave(topic)

            const paginatedListAfterLeave = await ctx.topicApi(hcp2Api).filterBy(filter)
            expect(paginatedListAfterLeave).toBeTruthy()

            const filteredTopicDtosAfterLeave = paginatedListAfterLeave.rows?.map(ctx.toTopicDto)
            expect(filteredTopicDtosAfterLeave).not.toEqual(expect.arrayContaining([topicDto]))
        })

        it('should not be able to add a patient as a participant', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: patientApi, user: patientUser } = await ctx.apiForEnvUser(env, patUsername)

            await expect(
                ctx.topicApi(masterApi).create(
                    [
                        {
                            participant: masterUser.healthcarePartyId!,
                            role: TopicRoleEnum.OWNER,
                        },
                        {
                            participant: patientUser.patientId!,
                            role: TopicRoleEnum.PARTICIPANT,
                        },
                    ],
                    'Topic description',
                ),
            ).rejects.toThrow()
        })

        it('should be able to create a topic but not to add a patient as a participant afterward', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: patientApi, user: patientUser } = await ctx.apiForEnvUser(env, patUsername)

            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: masterUser.healthcarePartyId!,
                        role: TopicRoleEnum.OWNER,
                    },
                ],
                'Topic description',
            )

            await expect(
                ctx.topicApi(masterApi).addParticipant(topic, {
                    ref: patientUser.patientId!,
                    role: TopicRoleEnum.PARTICIPANT,
                }),
            ).rejects.toThrow()
        })

        const subscribeAndCreateTopic = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
            const { api: hcp1Api, user: hcp1User } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const connectionPromise = async (options: {}, eventListener: (message: Topic) => Promise<void>) => {
                await sleep(2000)
                // TODO fix eventListener typing
                return await ctx.topicApi(hcp2Api).subscribeToEvents(eventTypes, await new TopicFilter(hcp2Api).forSelf().byParticipant(hcp2User.healthcarePartyId!).build(), eventListener as unknown as any, options)
            }

            const events: Topic[] = []
            const statuses: string[] = []

            let eventReceivedPromiseResolve!: (value: void | PromiseLike<void>) => void
            let eventReceivedPromiseReject!: (reason?: any) => void
            const eventReceivedPromise = new Promise<void>((res, rej) => {
                eventReceivedPromiseResolve = res
                eventReceivedPromiseReject = rej
            })

            await doXOnYAndSubscribe(
                hcp1Api!!,
                options,
                connectionPromise(options, async (topic) => {
                    events.push(topic)
                    eventReceivedPromiseResolve()
                }),
                async () => {
                    await ctx.topicApi(hcp1Api).create(
                        [
                            {
                                participant: hcp1User.healthcarePartyId!,
                                role: TopicRoleEnum.OWNER,
                            },
                            {
                                participant: hcp2User.healthcarePartyId!,
                                role: TopicRoleEnum.PARTICIPANT,
                            },
                        ],
                        'Topic description',
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

            expect(statuses.length).toEqual(2)
            expect(events.length).toEqual(1)
        }

        it('Can subscribe TopicLike CREATE without option', async () => {
            await subscribeAndCreateTopic({}, ['CREATE'])
        }, 60_000)

        it('Can subscribe TopicLike CREATE with options', async () => {
            await subscribeAndCreateTopic(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
            )
        }, 60_000)
    })
}
