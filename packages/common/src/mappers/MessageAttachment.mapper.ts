import { MessageAttachment } from '../models/MessageAttachment.model'
import { Document, MessageAttachment as MessageAttachmentDto } from '@icure/api'

function toMessageAttachmentDtoType(domain: MessageAttachment): Document.DocumentLocationEnum | undefined {
    return domain.type
}

function toMessageAttachmentDtoIds(domain: MessageAttachment): string[] | undefined {
    return domain.ids
}

function toMessageAttachmentType(dto: MessageAttachmentDto): 'annex' | 'body' | undefined {
    return dto.type
}

function toMessageAttachmentIds(dto: MessageAttachmentDto): string[] | undefined {
    return dto.ids
}

export function mapMessageAttachmentDtoToMessageAttachment(dto: MessageAttachmentDto): MessageAttachment {
    return new MessageAttachment({
    type: toMessageAttachmentType(dto),
    ids: toMessageAttachmentIds(dto),
    })
}

export function mapMessageAttachmentToMessageAttachmentDto(domain: MessageAttachment): MessageAttachmentDto {
    return new MessageAttachmentDto({
    type: toMessageAttachmentDtoType(domain),
    ids: toMessageAttachmentDtoIds(domain),
    })
}
