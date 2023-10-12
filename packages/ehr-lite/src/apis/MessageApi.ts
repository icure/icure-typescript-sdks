import { CommonApi, mapMessageDtoToMessage, mapMessageToMessageDto, mapTopicDtoToTopic, mapTopicToTopicDto, Message, MessageLikeApi, MessageLikeApiImpl, Topic } from '@icure/typescript-common'
import { Message as MessageDto, Topic as TopicDto } from '@icure/api'

export interface MessageApi extends MessageLikeApi<Message, Topic> {}

class MessageApiImpl extends MessageLikeApiImpl<Message, Topic> {}

export const messageApi = (api: CommonApi, characterLimit: number | undefined): MessageApi =>
    new MessageApiImpl(
        {
            toDomain(dto: MessageDto): Message {
                return mapMessageDtoToMessage(dto)
            },
            toDto(domain: Message): MessageDto {
                return mapMessageToMessageDto(domain)
            },
        },
        {
            toDomain(dto: TopicDto): Topic {
                return mapTopicDtoToTopic(dto)
            },
            toDto(domain: Topic): TopicDto {
                return mapTopicToTopicDto(domain)
            },
        },
        api.baseApi.messageApi,
        api.baseApi.topicApi,
        api.baseApi.userApi,
        api.baseApi.documentApi,
        api.baseApi.dataOwnerApi,
        api.errorHandler,
        characterLimit,
    )
