import { Document } from '../models/Document.model'
import { CodeStub, DataAttachment, DeletedAttachment, Document as DocumentDto, DocumentTemplate, SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { Delegation } from '../models/Delegation.model'
import DocumentLocationEnum = DocumentDto.DocumentLocationEnum
import DocumentTypeEnum = DocumentTemplate.DocumentTypeEnum
import DocumentStatusEnum = DocumentDto.DocumentStatusEnum
import { forceUuid } from '../utils/uuidUtils'
import { toCryptedForeignKeys, toDelegations, toEncryptedSelf, toEncryptionKeys, toSecretForeignKeys, toSecurityMetadataDto, toSystemMetaDataEncrypted } from './SystemMetaData.mapper'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'

function toDocumentDtoId(domain: Document): string {
    return forceUuid(domain.id)
}

function toDocumentDtoRev(domain: Document): string | undefined {
    return domain.rev
}

function toDocumentDtoCreated(domain: Document): number | undefined {
    return domain.created
}

function toDocumentDtoModified(domain: Document): number | undefined {
    return domain.modified
}

function toDocumentDtoAuthor(domain: Document): string | undefined {
    return domain.author
}

function toDocumentDtoResponsible(domain: Document): string | undefined {
    return domain.responsible
}

function toDocumentDtoMedicalLocationId(domain: Document): string | undefined {
    return domain.medicalLocationId
}

function toDocumentDtoTags(domain: Document): CodeStub[] | undefined {
    return undefined
}

function toDocumentDtoCodes(domain: Document): CodeStub[] | undefined {
    return undefined
}

function toDocumentDtoEndOfLife(domain: Document): number | undefined {
    return undefined
}

function toDocumentDtoDeletionDate(domain: Document): number | undefined {
    return domain.deletionDate
}

function toDocumentDtoDocumentLocation(domain: Document): DocumentLocationEnum | undefined {
    return undefined
}

function toDocumentDtoDocumentType(domain: Document): DocumentTypeEnum | undefined {
    return undefined
}

function toDocumentDtoDocumentStatus(domain: Document): DocumentStatusEnum | undefined {
    return undefined
}

function toDocumentDtoExternalUri(domain: Document): string | undefined {
    return undefined
}

function toDocumentDtoName(domain: Document): string | undefined {
    return domain.name
}

function toDocumentDtoVersion(domain: Document): string | undefined {
    return domain.version
}

function toDocumentDtoStoredICureDocumentId(domain: Document): string | undefined {
    return undefined
}

function toDocumentDtoExternalUuid(domain: Document): string | undefined {
    return domain.externalUuid
}

function toDocumentDtoSize(domain: Document): number | undefined {
    return domain.size
}

function toDocumentDtoHash(domain: Document): string | undefined {
    return domain.hash
}

function toDocumentDtoOpeningContactId(domain: Document): string | undefined {
    return undefined
}

function toDocumentDtoAttachmentId(domain: Document): string | undefined {
    return domain.attachmentId
}

function toDocumentDtoObjectStoreReference(domain: Document): string | undefined {
    return domain.objectStoreReference
}

function toDocumentDtoMainUti(domain: Document): string | undefined {
    return domain.mainUti
}

function toDocumentDtoOtherUtis(domain: Document): string[] | undefined {
    return undefined
}

function toDocumentDtoSecondaryAttachments(domain: Document): { [key: string]: DataAttachment } | undefined {
    return undefined
}

function toDocumentDtoDeletedAttachments(domain: Document): DeletedAttachment[] | undefined {
    return undefined
}

function toDocumentDtoEncryptedAttachment(domain: Document): ArrayBuffer | undefined {
    return undefined
}

function toDocumentDtoDecryptedAttachment(domain: Document): ArrayBuffer | undefined {
    return undefined
}

function toDocumentDtoSecretForeignKeys(domain: Document): string[] | undefined {
    return toSecretForeignKeys(domain.systemMetaData)
}

function toDocumentDtoCryptedForeignKeys(domain: Document): { [key: string]: Delegation[] } | undefined {
    return toCryptedForeignKeys(domain.systemMetaData)
}

function toDocumentDtoDelegations(domain: Document): { [key: string]: Delegation[] } | undefined {
    return toDelegations(domain.systemMetaData)
}

function toDocumentDtoEncryptionKeys(domain: Document): { [key: string]: Delegation[] } | undefined {
    return toEncryptionKeys(domain.systemMetaData)
}

function toDocumentDtoEncryptedSelf(domain: Document): string | undefined {
    return toEncryptedSelf(domain.systemMetaData)
}

function toDocumentDtoSecurityMetadata(domain: Document): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

function toDocumentId(dto: DocumentDto): string {
    return dto.id!
}

function toDocumentRev(dto: DocumentDto): string | undefined {
    return dto.rev
}

function toDocumentCreated(dto: DocumentDto): number | undefined {
    return dto.created
}

function toDocumentModified(dto: DocumentDto): number | undefined {
    return dto.modified
}

function toDocumentAuthor(dto: DocumentDto): string | undefined {
    return dto.author
}

function toDocumentResponsible(dto: DocumentDto): string | undefined {
    return dto.responsible
}

function toDocumentMedicalLocationId(dto: DocumentDto): string | undefined {
    return dto.medicalLocationId
}

function toDocumentDeletionDate(dto: DocumentDto): number | undefined {
    return dto.deletionDate
}

function toDocumentObjectStoreReference(dto: DocumentDto): string | undefined {
    return dto.objectStoreReference
}

function toDocumentMainUti(dto: DocumentDto): string | undefined {
    return dto.mainUti
}

function toDocumentName(dto: DocumentDto): string | undefined {
    return dto.name
}

function toDocumentVersion(dto: DocumentDto): string | undefined {
    return dto.version
}

function toDocumentOtherUtis(dto: DocumentDto): Array<string> {
    return dto.otherUtis ?? []
}

function toDocumentExternalUuid(dto: DocumentDto): string | undefined {
    return dto.externalUuid
}

function toDocumentSize(dto: DocumentDto): number | undefined {
    return dto.size
}

function toDocumentHash(dto: DocumentDto): string | undefined {
    return dto.hash
}

function toDocumentAttachmentId(dto: DocumentDto): string | undefined {
    return dto.attachmentId
}

function toDocumentSystemMetaData(dto: DocumentDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

export function mapDocumentDtoToDocument(dto: DocumentDto): Document {
    return new Document({
        id: toDocumentId(dto),
        rev: toDocumentRev(dto),
        created: toDocumentCreated(dto),
        modified: toDocumentModified(dto),
        author: toDocumentAuthor(dto),
        responsible: toDocumentResponsible(dto),
        medicalLocationId: toDocumentMedicalLocationId(dto),
        deletionDate: toDocumentDeletionDate(dto),
        objectStoreReference: toDocumentObjectStoreReference(dto),
        mainUti: toDocumentMainUti(dto),
        name: toDocumentName(dto),
        version: toDocumentVersion(dto),
        otherUtis: toDocumentOtherUtis(dto),
        externalUuid: toDocumentExternalUuid(dto),
        size: toDocumentSize(dto),
        hash: toDocumentHash(dto),
        attachmentId: toDocumentAttachmentId(dto),
        systemMetaData: toDocumentSystemMetaData(dto),
    })
}

export function mapDocumentToDocumentDto(domain: Document): DocumentDto {
    return new DocumentDto({
        id: toDocumentDtoId(domain),
        rev: toDocumentDtoRev(domain),
        created: toDocumentDtoCreated(domain),
        modified: toDocumentDtoModified(domain),
        author: toDocumentDtoAuthor(domain),
        responsible: toDocumentDtoResponsible(domain),
        medicalLocationId: toDocumentDtoMedicalLocationId(domain),
        tags: toDocumentDtoTags(domain),
        codes: toDocumentDtoCodes(domain),
        endOfLife: toDocumentDtoEndOfLife(domain),
        deletionDate: toDocumentDtoDeletionDate(domain),
        documentLocation: toDocumentDtoDocumentLocation(domain),
        documentType: toDocumentDtoDocumentType(domain),
        documentStatus: toDocumentDtoDocumentStatus(domain),
        externalUri: toDocumentDtoExternalUri(domain),
        name: toDocumentDtoName(domain),
        version: toDocumentDtoVersion(domain),
        storedICureDocumentId: toDocumentDtoStoredICureDocumentId(domain),
        externalUuid: toDocumentDtoExternalUuid(domain),
        size: toDocumentDtoSize(domain),
        hash: toDocumentDtoHash(domain),
        openingContactId: toDocumentDtoOpeningContactId(domain),
        attachmentId: toDocumentDtoAttachmentId(domain),
        objectStoreReference: toDocumentDtoObjectStoreReference(domain),
        mainUti: toDocumentDtoMainUti(domain),
        otherUtis: toDocumentDtoOtherUtis(domain),
        secondaryAttachments: toDocumentDtoSecondaryAttachments(domain),
        deletedAttachments: toDocumentDtoDeletedAttachments(domain),
        encryptedAttachment: toDocumentDtoEncryptedAttachment(domain),
        decryptedAttachment: toDocumentDtoDecryptedAttachment(domain),
        secretForeignKeys: toDocumentDtoSecretForeignKeys(domain),
        cryptedForeignKeys: toDocumentDtoCryptedForeignKeys(domain),
        delegations: toDocumentDtoDelegations(domain),
        encryptionKeys: toDocumentDtoEncryptionKeys(domain),
        encryptedSelf: toDocumentDtoEncryptedSelf(domain),
        securityMetadata: toDocumentDtoSecurityMetadata(domain),
    })
}
