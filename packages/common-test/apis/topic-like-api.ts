import { getEnvironmentInitializer, hcp2Username, setLocalStorage } from '../test-utils'
import { BaseApiTestContext, WithDataOwnerApi, WithHcpApi, WithHelementApi, WithPatientApi, WithServiceApi, WithTopicApi } from './TestContexts'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, TopicRole } from '@icure/typescript-common'
import { describe, it, beforeAll } from '@jest/globals'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import 'isomorphic-fetch'

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
                        role: TopicRole.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRole.PARTICIPANT,
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
                        role: TopicRole.OWNER,
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
                role: TopicRole.PARTICIPANT,
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
                        role: TopicRole.OWNER,
                    },
                    {
                        participant: hcp2User.healthcarePartyId!,
                        role: TopicRole.PARTICIPANT,
                    },
                ],
                'Topic description',
                patient,
                new Set(heIds),
                new Set(serviceIds),
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
    })
}
