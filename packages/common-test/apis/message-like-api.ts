import { getEnvironmentInitializer, hcp2Username, setLocalStorage } from '../test-utils'
import { BaseApiTestContext, WithDataOwnerApi, WithHcpApi, WithMessageApi, WithPatientApi, WithTopicApi } from './TestContexts'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, TopicRole } from '@icure/typescript-common'
import { describe, it, beforeAll } from '@jest/globals'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import 'isomorphic-fetch'
import { Binary } from '@icure/ehr-lite-sdk'

setLocalStorage(fetch)

export function testMessageLikeApi<
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
    DSMessage,
    DSBinary,
    DSDataOwner extends DataOwnerWithType,
>(
    name: string,
    ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> &
        WithTopicApi<DSApi, DSTopic, DSHcp, DSPatient, DSService, DSHealthElement> &
        WithMessageApi<DSApi, DSMessage, DSTopic, DSBinary> &
        WithHcpApi<DSApi, DSHcp> &
        WithPatientApi<DSApi, DSPatient> &
        WithDataOwnerApi<DSApi, DSDataOwner, DSUser>,
) {
    const encoder = new TextEncoder()

    function generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters.charAt(randomIndex)
        }
        return result
    }

    function generateRandomArrayBuffer(length: number): ArrayBuffer {
        return encoder.encode(generateRandomString(length)).buffer
    }

    describe(`${name} (Message-like API)`, () => {
        let env: TestVars

        beforeAll(async () => {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
        }, 600_000)

        it('should be capable of creating a message from scratch', async () => {
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

            const messageCreationResult = await ctx.messageApi(masterApi).create(topic, 'Message content')

            expect(messageCreationResult).toBeTruthy()

            const createdMessage = (messageCreationResult as any).createdMessage as DSMessage
            const messageDto = ctx.toMessageDto(createdMessage)

            const gotMessage = await ctx.messageApi(hcp2Api).get(messageDto.id!)

            expect(gotMessage).toBeTruthy()

            const gotMessageDto = ctx.toMessageDto(gotMessage)
            expect(gotMessageDto.id).toEqual(messageDto.id)
            expect(gotMessageDto).toEqual(messageDto)
        })

        it('should be capable of creating a long message from scratch', async () => {
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

            const content = generateRandomString(3000)

            const messageCreationResult = await ctx.messageApi(masterApi).create(topic, content)

            expect(messageCreationResult).toBeTruthy()

            const createdMessage = (messageCreationResult as any).createdMessage as DSMessage
            const messageDto = ctx.toMessageDto(createdMessage)

            expect(messageDto.subject).toEqual(content)

            const gotMessage = await ctx.messageApi(hcp2Api).get(messageDto.id!)

            expect(gotMessage).toBeTruthy()

            const gotMessageDto = ctx.toMessageDto(gotMessage)
            expect(gotMessageDto.id).toEqual(messageDto.id)
            expect(gotMessageDto.subject).toEqual(content)
        })

        it('should be capable of creating a long message with some documents', async () => {
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

            const binaries = [
                {
                    filename: 'test.txt',
                    data: generateRandomArrayBuffer(100),
                    uti: 'public.plain-text',
                },
                {
                    filename: 'test2.txt',
                    data: generateRandomArrayBuffer(3000),
                    uti: 'public.plain-text',
                },
            ].map((dto) => ctx.toDSBinary(dto, (uti) => masterApi.baseApi.documentApi.mimeType(uti)))

            const messageCreationResult = await ctx.messageApi(masterApi).create(topic, generateRandomString(3000), binaries)

            expect(messageCreationResult).toBeTruthy()

            const createdMessage = (messageCreationResult as any).createdMessage as DSMessage
            const messageDto = ctx.toMessageDto(createdMessage)

            const gotMessage = await ctx.messageApi(hcp2Api).get(messageDto.id!)

            expect(gotMessage).toBeTruthy()

            const gotMessageDto = ctx.toMessageDto(gotMessage)
            expect(gotMessageDto.id).toEqual(messageDto.id)
            expect(gotMessageDto).toEqual(messageDto)

            const documents = await ctx.messageApi(hcp2Api).getAttachments(gotMessageDto.id!)
            expect(documents).toBeTruthy()

            expect(documents.length).toEqual(2)
            expect(expect.arrayContaining(documents)).toEqual(binaries)
        })
    })
}
