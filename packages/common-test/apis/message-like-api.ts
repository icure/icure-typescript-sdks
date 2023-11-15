import { getEnvironmentInitializer, hcp1Username, hcp2Username, setLocalStorage } from '../test-utils'
import { BaseApiTestContext, WithDataOwnerApi, WithHcpApi, WithMessageApi, WithPatientApi, WithTopicApi } from './TestContexts'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, FilterComposition, MessageFilter, TopicRole } from '@icure/typescript-common'
import { describe, it, beforeAll } from '@jest/globals'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import 'isomorphic-fetch'
import { Message, sleep, User } from '@icure/api'
import { doXOnYAndSubscribe } from '../websocket-utils'

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

        const createTopic = async (masterApi: DSApi, ownerUser: User, participantUser: User): Promise<DSTopic> => {
            const topic = await ctx.topicApi(masterApi).create(
                [
                    {
                        participant: ownerUser.healthcarePartyId!,
                        role: TopicRole.OWNER,
                    },
                    {
                        participant: participantUser.healthcarePartyId!,
                        role: TopicRole.PARTICIPANT,
                    },
                ],
                'Topic description',
            )
            expect(topic).toBeTruthy()
            return topic
        }

        it('should be capable of creating a message from scratch', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(masterApi, masterUser, hcp2User)
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

            const topic = await createTopic(masterApi, masterUser, hcp2User)
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
            expect(gotMessageDto.subject).not.toEqual(content)
            expect(gotMessageDto.subject).toEqual(content.slice(0, 2000))

            const fullContent = await ctx.messageApi(hcp2Api).loadMessageWithContent(gotMessage)
            expect(fullContent).toBeTruthy()

            const fullContentDto = ctx.toMessageDto(fullContent)
            expect(fullContentDto.subject).toEqual(content)
        })

        it('should be capable of creating a long message with some documents', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(masterApi, masterUser, hcp2User)
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

            const fullMessage = await ctx.messageApi(hcp2Api).loadMessageWithContent(gotMessage)
            expect(fullMessage).toBeTruthy()

            const fullMessageDto = ctx.toMessageDto(fullMessage)
            expect(fullMessageDto).toEqual(messageDto)

            const documents = await ctx.messageApi(hcp2Api).getAttachments(gotMessageDto.id!)
            expect(documents).toBeTruthy()

            expect(documents.length).toEqual(2)
            expect(expect.arrayContaining(documents)).toEqual(binaries)
        })

        it('should be capable to filter latest message sent on different Topics', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic1 = await createTopic(masterApi, masterUser, hcp2User)
            const topic2 = await createTopic(masterApi, masterUser, hcp2User)

            const topic1Dto = ctx.toTopicDto(topic1)
            const topic2Dto = ctx.toTopicDto(topic2)

            expect(topic1Dto.id).toBeTruthy()
            expect(topic2Dto.id).toBeTruthy()

            const createMessage = async (topic: DSTopic, content: string) => {
                const messageCreationResult = await ctx.messageApi(masterApi).create(topic, content)
                expect(messageCreationResult).toBeTruthy()
                const createdMessage = (messageCreationResult as any).createdMessage as DSMessage
                const messageDto = ctx.toMessageDto(createdMessage)
                return messageDto
            }

            const topic1Messages = []
            const topic2Messages = []

            for (let i = 0; i < 10; i++) {
                topic1Messages.push(await createMessage(topic1, `Message content ${i}`))
                topic2Messages.push(await createMessage(topic2, `Message content ${i}`))
            }

            const latestTopic1Message = topic1Messages.reduce((prev, curr) => (prev.created! > curr.created! ? prev : curr))
            const latestTopic2Message = topic2Messages.reduce((prev, curr) => (prev.created! > curr.created! ? prev : curr))

            const filter = FilterComposition.union(await new MessageFilter(hcp2Api).forSelf().byTransportGuid(topic1Dto.id!, true).build(), await new MessageFilter(hcp2Api).forSelf().byTransportGuid(topic2Dto.id!, true).build())

            const paginatedList = await ctx.messageApi(hcp2Api).filterBy(filter)
            const ids = await ctx.messageApi(hcp2Api).matchBy(filter)

            expect(paginatedList).toBeTruthy()
            expect(ids).toBeTruthy()
            expect(paginatedList.rows.length).toEqual(2)
            expect(ids.length).toEqual(2)

            const messagesDto = paginatedList.rows.map(ctx.toMessageDto)
            expect(messagesDto).toEqual(expect.arrayContaining([latestTopic1Message, latestTopic2Message]))
            expect(ids).toEqual(expect.arrayContaining([latestTopic1Message.id!, latestTopic2Message.id!]))
        })

        it('should be capable to filter message sent on a Topic', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(masterApi, masterUser, hcp2User)
            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto.id).toBeTruthy()

            const anotherTopic = await createTopic(masterApi, masterUser, hcp2User)
            const anotherTopicDto = ctx.toTopicDto(anotherTopic)
            expect(anotherTopicDto.id).toBeTruthy()

            const createMessage = async (topic: DSTopic, content: string) => {
                const messageCreationResult = await ctx.messageApi(masterApi).create(topic, content)
                expect(messageCreationResult).toBeTruthy()
                const createdMessage = (messageCreationResult as any).createdMessage as DSMessage
                const messageDto = ctx.toMessageDto(createdMessage)
                return messageDto
            }

            const topicMessages = await Promise.all(Array.from({ length: 10 }, (_, i) => createMessage(topic, `Message content ${i}`)))

            const anotherTopicMessages = await Promise.all(Array.from({ length: 10 }, (_, i) => createMessage(anotherTopic, `Message content ${i}`)))

            const filter = await new MessageFilter(hcp2Api).forSelf().byTransportGuid(topicDto.id!, false).build()

            const paginatedList = await ctx.messageApi(hcp2Api).filterBy(filter, undefined, 1000)
            const ids = await ctx.messageApi(hcp2Api).matchBy(filter)

            expect(paginatedList).toBeTruthy()
            expect(ids).toBeTruthy()

            expect(paginatedList.rows.length).toEqual(10)
            expect(ids.length).toEqual(10)

            const messagesDto = paginatedList.rows.map(ctx.toMessageDto)
            expect(messagesDto).toEqual(expect.arrayContaining(topicMessages))
            expect(ids).toEqual(expect.arrayContaining(topicMessages.map((it) => it.id!)))
            expect(messagesDto).not.toEqual(expect.arrayContaining(anotherTopicMessages))
        })

        it('should be capable to set read status of a Message', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(masterApi, masterUser, hcp2User)
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

            const updatedMessage = await ctx.messageApi(hcp2Api).read([messageDto.id!])
            expect(updatedMessage).toBeTruthy()
            expect(updatedMessage[0]).toBeTruthy()

            const updatedMessageDto = ctx.toMessageDto(updatedMessage[0])
            expect(updatedMessageDto.readStatus).toBeTruthy()
            expect(updatedMessageDto.readStatus![hcp2User.id!].read).toBeTruthy()

            const gotUpdatedMessage = await ctx.messageApi(masterApi).get(messageDto.id!)
            expect(gotUpdatedMessage).toBeTruthy()
            const gotUpdatedMessageDto = ctx.toMessageDto(gotUpdatedMessage)
            expect(gotUpdatedMessageDto.readStatus).toBeTruthy()
            expect(gotUpdatedMessageDto.readStatus![hcp2User.id!].read).toBeTruthy()
        })

        const subscribeAndCreateMessage = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
            const { api: hcp1Api, user: hcp1User } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(hcp1Api!!, hcp1User, hcp2User)
            const topicDto = ctx.toTopicDto(topic)

            const connectionPromise = async (options: {}, eventListener: (message: Message) => Promise<void>) => {
                await sleep(2000)
                // TODO fix eventListener typing
                return await ctx.messageApi(hcp2Api).subscribeToEvents(eventTypes, await new MessageFilter(hcp2Api).forSelf().byTransportGuid(topicDto.id!, false).build(), eventListener as unknown as any, options)
            }

            const events: Message[] = []
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
                connectionPromise(options, async (message) => {
                    events.push(message)
                    eventReceivedPromiseResolve()
                }),
                async () => {
                    await ctx.messageApi(hcp1Api).create(topic, 'Message content')
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

        it('Can subscribe MessageLike CREATE without option', async () => {
            await subscribeAndCreateMessage({}, ['CREATE'])
        }, 60_000)

        it('Can subscribe MessageLike CREATE with options', async () => {
            await subscribeAndCreateMessage(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
            )
        }, 60_000)

        it('message should be encrypted', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(masterApi, masterUser, hcp2User)
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

            const shouldBeEncryptedMessage = await hcp2Api.baseApi.messageApi.getMessage(gotMessageDto.id!)
            expect(shouldBeEncryptedMessage).toBeTruthy()

            expect(shouldBeEncryptedMessage.subject).toBeUndefined()
            expect(shouldBeEncryptedMessage.encryptedSelf).toBeDefined()
        })

        it('should not be able to send a message after leaving the Topic', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(masterApi, masterUser, hcp2User)
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

            const updatedTopic = await ctx.topicApi(hcp2Api).leave(topic)
            expect(updatedTopic).toBeTruthy()

            const updatedTopicDto = ctx.toTopicDto(updatedTopic)
            expect(updatedTopicDto.id).toEqual(topicDto.id)
            expect(updatedTopicDto.activeParticipants).not.toEqual(topicDto.activeParticipants)

            await expect(ctx.messageApi(hcp2Api).create(topic, 'Message content')).rejects.toThrow()
        })

        it('message creation should fail if the user is not a participant of the topic and noot loop infinitely', async () => {
            const { api: masterApi, user: masterUser } = await ctx.masterApi(env)
            const { api: hcp1Api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const topic = await createTopic(masterApi, masterUser, hcp2User)
            const topicDto = ctx.toTopicDto(topic)
            expect(topicDto.id).toBeTruthy()

            await expect(ctx.messageApi(hcp1Api).create(topic, 'Message content')).rejects.toThrow()
        })
    })
}
