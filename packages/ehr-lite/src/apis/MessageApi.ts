import { CommonApi, mapMessageDtoToMessage, mapMessageToMessageDto, mapTopicDtoToTopic, mapTopicToTopicDto, Message, MessageDto, MessageLikeApi, MessageLikeApiImpl, Topic, TopicDto } from '@icure/typescript-common'
import { Binary } from '../models/Binary.model'
import { mapBinaryToDocumentAttachment, mapDocumentAttachmentToBinary } from '../mappers/Binary.mapper'

export interface MessageApi extends MessageLikeApi<Message, Topic, Binary> {}

class MessageApiImpl extends MessageLikeApiImpl<Message, Topic, Binary> {}

export const messageApi = (api: CommonApi, characterLimit: number): MessageApi =>
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
        {
            toDomain(dto: { data: ArrayBuffer; filename: string; uti: string }): Binary {
                return mapDocumentAttachmentToBinary(dto, (uti) => api.baseApi.documentApi.mimeType(uti))
            },
            toDto(domain: Binary): { data: ArrayBuffer; filename: string; uti: string } {
                return mapBinaryToDocumentAttachment(domain, (mimeType, extension) => api.baseApi.documentApi.uti(mimeType, extension))
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
