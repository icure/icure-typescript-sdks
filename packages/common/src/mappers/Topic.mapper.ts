import { Topic } from '../models/Topic.model'
import { CodeStub, Delegation, SecurityMetadata as SecurityMetadataDto, Topic as TopicDto, TopicRole as TopicRoleDto } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'
import { mapCodeStubToCodingReference } from './CodingReference.mapper'
import { TopicRole } from '../models/enums/TopicRole.enum'
import { toCryptedForeignKeys, toDelegations, toEncryptedSelf, toEncryptionKeys, toSecretForeignKeys, toSecurityMetadataDto, toSystemMetaDataEncrypted } from './SystemMetaData.mapper'

function toTopicDtoId(domain: Topic): string | undefined {
    return domain.id
}

function toTopicDtoRev(domain: Topic): string | undefined {
    return domain.rev
}

function toTopicDtoCreated(domain: Topic): number | undefined {
    return domain.created
}

function toTopicDtoModified(domain: Topic): number | undefined {
    return domain.modified
}

function toTopicDtoDescription(domain: Topic): string | undefined {
    return domain.descr
}

function toTopicDtoTags(domain: Topic): CodeStub[] | undefined {
    return (domain.tags ?? []).map((item) => mapCodeStubToCodingReference(item))
}

function toTopicDtoCodes(domain: Topic): CodeStub[] | undefined {
    return (domain.codes ?? []).map((item) => mapCodeStubToCodingReference(item))
}

function toTopicDtoAuthor(domain: Topic): string | undefined {
    return domain.author
}

function toTopicDtoResponsible(domain: Topic): string | undefined {
    return domain.responsible
}

function toTopicDtoMedicalLocationId(domain: Topic): string | undefined {
    return domain.medicalLocationId
}

function toTopicDtoEndOfLife(domain: Topic): number | undefined {
    return domain.endOfLife
}

function toTopicDtoDeletionDate(domain: Topic): number | undefined {
    return domain.deletionDate
}

function toTopicDtoActiveParticipants(domain: Topic): { [key: string]: TopicRoleDto } | undefined {
    return Object.fromEntries(Object.entries(domain.activeParticipants ?? {}).map(([k, v]) => [k, v as TopicRoleDto]))
}

function toTopicDtoSecurityMetadata(domain: Topic): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetadata)
}

function toTopicDtoSecretForeignKeys(domain: Topic): string[] | undefined {
    return toSecretForeignKeys(domain.systemMetadata)
}

function toTopicDtoCryptedForeignKeys(domain: Topic): { [key: string]: Delegation[] } | undefined {
    return toCryptedForeignKeys(domain.systemMetadata)
}

function toTopicDtoDelegations(domain: Topic): { [key: string]: Delegation[] } | undefined {
    return toDelegations(domain.systemMetadata)
}

function toTopicDtoEncryptionKeys(domain: Topic): { [key: string]: Delegation[] } | undefined {
    return toEncryptionKeys(domain.systemMetadata)
}

function toTopicDtoEncryptedSelf(domain: Topic): string | undefined {
    return toEncryptedSelf(domain.systemMetadata)
}

function toTopicId(dto: TopicDto): string | undefined {
    return dto.id
}

function toTopicRev(dto: TopicDto): string | undefined {
    return dto.rev
}

function toTopicCreated(dto: TopicDto): number | undefined {
    return dto.created
}

function toTopicModified(dto: TopicDto): number | undefined {
    return dto.modified
}

function toTopicAuthor(dto: TopicDto): string | undefined {
    return dto.author
}

function toTopicResponsible(dto: TopicDto): string | undefined {
    return dto.responsible
}

function toTopicMedicalLocationId(dto: TopicDto): string | undefined {
    return dto.medicalLocationId
}

function toTopicTags(dto: TopicDto): Array<CodingReference> | undefined {
    return !!dto.tags ? (dto.tags.map((item) => mapCodeStubToCodingReference(item))) : undefined
}

function toTopicCodes(dto: TopicDto): Array<CodingReference> | undefined {
    return !!dto.codes ? (dto.codes.map((item) => mapCodeStubToCodingReference(item))) : undefined
}

function toTopicEndOfLife(dto: TopicDto): number | undefined {
    return dto.endOfLife
}

function toTopicDeletionDate(dto: TopicDto): number | undefined {
    return dto.deletionDate
}

function toTopicDescr(dto: TopicDto): string | undefined {
    return dto.description
}

function toTopicActiveParticipants(dto: TopicDto): Record<string, TopicRole> {
    return Object.fromEntries(Object.entries(dto.activeParticipants ?? {}).map(([k, v]) => [k, v as TopicRole]))
}

function toTopicSystemMetadata(dto: TopicDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toTopicDtoLinkedServices(domain: Topic): string[] | undefined {
    return domain.linkedServices ? (domain.linkedServices) : undefined
}

function toTopicDtoLinkedHealthElements(domain: Topic): string[] | undefined {
    return domain.linkedHealthElements ? (domain.linkedHealthElements) : undefined
}

function toTopicLinkedHealthElements(dto: TopicDto): Array<string> | undefined {
    return dto.linkedHealthElements ? (dto.linkedHealthElements) : undefined
}

function toTopicLinkedServices(dto: TopicDto): Array<string> | undefined {
    return dto.linkedServices ? (dto.linkedServices) : undefined
}

export function mapTopicDtoToTopic(dto: TopicDto): Topic {
    return new Topic({
        id: toTopicId(dto),
        rev: toTopicRev(dto),
        created: toTopicCreated(dto),
        modified: toTopicModified(dto),
        author: toTopicAuthor(dto),
        responsible: toTopicResponsible(dto),
        medicalLocationId: toTopicMedicalLocationId(dto),
        tags: toTopicTags(dto),
        codes: toTopicCodes(dto),
        endOfLife: toTopicEndOfLife(dto),
        deletionDate: toTopicDeletionDate(dto),
        descr: toTopicDescr(dto),
        linkedHealthElements: toTopicLinkedHealthElements(dto),
        linkedServices: toTopicLinkedServices(dto),
        activeParticipants: toTopicActiveParticipants(dto),
        systemMetadata: toTopicSystemMetadata(dto),
    })
}

export function mapTopicToTopicDto(domain: Topic): TopicDto {
    return new TopicDto({
        id: toTopicDtoId(domain),
        rev: toTopicDtoRev(domain),
        created: toTopicDtoCreated(domain),
        modified: toTopicDtoModified(domain),
        description: toTopicDtoDescription(domain),
        tags: toTopicDtoTags(domain),
        codes: toTopicDtoCodes(domain),
        author: toTopicDtoAuthor(domain),
        responsible: toTopicDtoResponsible(domain),
        medicalLocationId: toTopicDtoMedicalLocationId(domain),
        endOfLife: toTopicDtoEndOfLife(domain),
        deletionDate: toTopicDtoDeletionDate(domain),
        activeParticipants: toTopicDtoActiveParticipants(domain),
        linkedServices: toTopicDtoLinkedServices(domain),
        linkedHealthElements: toTopicDtoLinkedHealthElements(domain),
        securityMetadata: toTopicDtoSecurityMetadata(domain),
        secretForeignKeys: toTopicDtoSecretForeignKeys(domain),
        cryptedForeignKeys: toTopicDtoCryptedForeignKeys(domain),
        delegations: toTopicDtoDelegations(domain),
        encryptionKeys: toTopicDtoEncryptionKeys(domain),
        encryptedSelf: toTopicDtoEncryptedSelf(domain),
    })
}
