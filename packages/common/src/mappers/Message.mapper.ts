import { Message } from '../models/Message.model'
import { CodeStub, Delegation, Message as MessageDto, MessageReadStatus as MessageReadStatusDto, SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { mapCodeStubToCodingReference, mapCodingReferenceToCodeStub } from './CodingReference.mapper'
import { CodingReference } from '../models/CodingReference.model'
import { MessageReadStatus } from '../models/MessageReadStatus.model'
import { mapMessageReadStatusDtoToMessageReadStatus, mapMessageReadStatusToMessageReadStatusDto } from './MessageReadStatus.mapper'
import { toCryptedForeignKeys, toDelegations, toEncryptedSelf, toEncryptionKeys, toSecretForeignKeys, toSecurityMetadataDto, toSystemMetaDataEncrypted } from './SystemMetaData.mapper'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'

function toMessageDtoId(domain: Message): string | undefined {
    return domain.id
}

function toMessageDtoRev(domain: Message): string | undefined {
    return domain.rev
}

function toMessageDtoCreated(domain: Message): number | undefined {
    return domain.created
}

function toMessageDtoModified(domain: Message): number | undefined {
    return domain.modified
}

function toMessageDtoAuthor(domain: Message): string | undefined {
    return domain.author
}

function toMessageDtoResponsible(domain: Message): string | undefined {
    return domain.responsible
}

function toMessageDtoMedicalLocationId(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoTags(domain: Message): CodeStub[] | undefined {
    return [...(domain.tags ?? [])]?.map((item) => mapCodingReferenceToCodeStub(item))
}

function toMessageDtoCodes(domain: Message): CodeStub[] | undefined {
    return [...(domain.codes ?? [])]?.map((item) => mapCodingReferenceToCodeStub(item))
}

function toMessageDtoEndOfLife(domain: Message): number | undefined {
    return domain.endOfLife
}

function toMessageDtoDeletionDate(domain: Message): number | undefined {
    return domain.deletionDate
}

function toMessageDtoFromAddress(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoFromHealthcarePartyId(domain: Message): string | undefined {
    return domain.sender
}

function toMessageDtoFormId(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoStatus(domain: Message): number | undefined {
    return undefined
}

function toMessageDtoRecipientsType(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoRecipients(domain: Message): string[] | undefined {
    return [...(domain.recipients ?? [])]
}

function toMessageDtoToAddresses(domain: Message): string[] | undefined {
    return undefined
}

function toMessageDtoSent(domain: Message): number | undefined {
    return domain.sent
}

function toMessageDtoMetas(domain: Message): { [key: string]: string } | undefined {
    return undefined
}

function toMessageDtoReadStatus(domain: Message): { [key: string]: MessageReadStatusDto } | undefined {
    return Object.fromEntries([...(domain.readStatus?.entries() ?? [])].map(([k, v]) => [k, mapMessageReadStatusToMessageReadStatusDto(v)]))
}

function toMessageDtoTransportGuid(domain: Message): string | undefined {
    return domain.topicId
}

function toMessageDtoRemark(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoConversationGuid(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoSubject(domain: Message): string | undefined {
    return domain.content
}

function toMessageDtoInvoiceIds(domain: Message): string[] | undefined {
    return undefined
}

function toMessageDtoParentId(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoExternalRef(domain: Message): string | undefined {
    return undefined
}

function toMessageDtoUnassignedResults(domain: Message): string[] | undefined {
    return undefined
}

function toMessageDtoAssignedResults(domain: Message): { [key: string]: string } | undefined {
    return undefined
}

function toMessageDtoSenderReferences(domain: Message): { [key: string]: string } | undefined {
    return undefined
}

function toMessageDtoSecretForeignKeys(domain: Message): string[] | undefined {
    return toSecretForeignKeys(domain.systemMetadata)
}

function toMessageDtoCryptedForeignKeys(domain: Message): { [key: string]: Delegation[] } | undefined {
    return toCryptedForeignKeys(domain.systemMetadata)
}

function toMessageDtoDelegations(domain: Message): { [key: string]: Delegation[] } | undefined {
    return toDelegations(domain.systemMetadata)
}

function toMessageDtoEncryptionKeys(domain: Message): { [key: string]: Delegation[] } | undefined {
    return toEncryptionKeys(domain.systemMetadata)
}

function toMessageDtoEncryptedSelf(domain: Message): string | undefined {
    return toEncryptedSelf(domain.systemMetadata)
}

function toMessageDtoSecurityMetadata(domain: Message): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetadata)
}

function toMessageId(dto: MessageDto): string | undefined {
    return dto.id
}

function toMessageRev(dto: MessageDto): string | undefined {
    return dto.rev
}

function toMessageCreated(dto: MessageDto): number | undefined {
    return dto.created
}

function toMessageModified(dto: MessageDto): number | undefined {
    return dto.modified
}

function toMessageSent(dto: MessageDto): number | undefined {
    return dto.sent
}

function toMessageReadStatus(dto: MessageDto): Map<string, MessageReadStatus> | undefined {
    return new Map(Object.entries(dto.readStatus ?? {}).map(([k, v]) => [k, mapMessageReadStatusDtoToMessageReadStatus(v)]))
}

function toMessageAuthor(dto: MessageDto): string | undefined {
    return dto.author
}

function toMessageResponsible(dto: MessageDto): string | undefined {
    return dto.responsible
}

function toMessageTags(dto: MessageDto): Set<CodingReference> | undefined {
    return !!dto.tags ? new Set(dto.tags.map((item) => mapCodeStubToCodingReference(item))) : undefined
}

function toMessageCodes(dto: MessageDto): Set<CodingReference> | undefined {
    return !!dto.codes ? new Set(dto.codes.map((item) => mapCodeStubToCodingReference(item))) : undefined
}

function toMessageEndOfLife(dto: MessageDto): number | undefined {
    return dto.endOfLife
}

function toMessageDeletionDate(dto: MessageDto): number | undefined {
    return dto.deletionDate
}

function toMessageSender(dto: MessageDto): string | undefined {
    return dto.fromHealthcarePartyId
}

function toMessageRecipients(dto: MessageDto): Set<string> | undefined {
    return !!dto.recipients ? new Set(dto.recipients) : undefined
}

function toMessageMetas(dto: MessageDto): Map<string, string> | undefined {
    return !!dto.metas ? new Map(Object.entries(dto.metas)) : undefined
}

function toMessageContent(dto: MessageDto): string | undefined {
    return dto.subject
}

function toMessageSystemMetadata(dto: MessageDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toMessageTopicId(dto: MessageDto): string | undefined {
    return dto.transportGuid
}

function toMessageDtoReceived(domain: Message): number | undefined {
    return undefined
}

export function mapMessageDtoToMessage(dto: MessageDto): Message {
    return new Message({
        id: toMessageId(dto),
        rev: toMessageRev(dto),
        created: toMessageCreated(dto),
        modified: toMessageModified(dto),
        sent: toMessageSent(dto),
        readStatus: toMessageReadStatus(dto),
        author: toMessageAuthor(dto),
        responsible: toMessageResponsible(dto),
        tags: toMessageTags(dto),
        codes: toMessageCodes(dto),
        endOfLife: toMessageEndOfLife(dto),
        deletionDate: toMessageDeletionDate(dto),
        sender: toMessageSender(dto),
        recipients: toMessageRecipients(dto),
        metas: toMessageMetas(dto),
        content: toMessageContent(dto),
        topicId: toMessageTopicId(dto),
        systemMetadata: toMessageSystemMetadata(dto),
    })
}

export function mapMessageToMessageDto(domain: Message): MessageDto {
    return new MessageDto({
        id: toMessageDtoId(domain),
        rev: toMessageDtoRev(domain),
        created: toMessageDtoCreated(domain),
        modified: toMessageDtoModified(domain),
        author: toMessageDtoAuthor(domain),
        responsible: toMessageDtoResponsible(domain),
        medicalLocationId: toMessageDtoMedicalLocationId(domain),
        tags: toMessageDtoTags(domain),
        codes: toMessageDtoCodes(domain),
        endOfLife: toMessageDtoEndOfLife(domain),
        deletionDate: toMessageDtoDeletionDate(domain),
        fromAddress: toMessageDtoFromAddress(domain),
        fromHealthcarePartyId: toMessageDtoFromHealthcarePartyId(domain),
        formId: toMessageDtoFormId(domain),
        status: toMessageDtoStatus(domain),
        recipientsType: toMessageDtoRecipientsType(domain),
        recipients: toMessageDtoRecipients(domain),
        toAddresses: toMessageDtoToAddresses(domain),
        received: toMessageDtoReceived(domain),
        sent: toMessageDtoSent(domain),
        metas: toMessageDtoMetas(domain),
        readStatus: toMessageDtoReadStatus(domain),
        transportGuid: toMessageDtoTransportGuid(domain),
        remark: toMessageDtoRemark(domain),
        conversationGuid: toMessageDtoConversationGuid(domain),
        subject: toMessageDtoSubject(domain),
        invoiceIds: toMessageDtoInvoiceIds(domain),
        parentId: toMessageDtoParentId(domain),
        externalRef: toMessageDtoExternalRef(domain),
        unassignedResults: toMessageDtoUnassignedResults(domain),
        assignedResults: toMessageDtoAssignedResults(domain),
        senderReferences: toMessageDtoSenderReferences(domain),
        secretForeignKeys: toMessageDtoSecretForeignKeys(domain),
        cryptedForeignKeys: toMessageDtoCryptedForeignKeys(domain),
        delegations: toMessageDtoDelegations(domain),
        encryptionKeys: toMessageDtoEncryptionKeys(domain),
        encryptedSelf: toMessageDtoEncryptedSelf(domain),
        securityMetadata: toMessageDtoSecurityMetadata(domain),
    })
}
