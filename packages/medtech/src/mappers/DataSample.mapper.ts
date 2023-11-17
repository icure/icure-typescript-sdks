import { DataSample } from '../models/DataSample.model'
import {
    CodingReference,
    extractEncryptedSelf,
    forceUuid,
    Identifier,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    SystemMetaDataEncrypted,
    toCryptedForeignKeys,
    toDelegations,
    toEncryptedSelf,
    toEncryptionKeys,
    toSecretForeignKeys,
    toSecurityMetadataDto,
    toSystemMetaDataEncrypted,
    AnnotationDto,
    CodeStub,
    ContentDto,
    DelegationDto,
    IdentifierDto,
    ISO639_1,
    SecurityMetadataDto,
    ServiceDto,
} from '@icure/typescript-common'
import { Content } from '../models/Content.model'
import { mapContentDtoToContent, mapContentToContentDto } from './Content.mapper'

function toServiceId(domain: DataSample): string | undefined {
    return forceUuid(domain.id)
}

function toServiceTransactionId(domain: DataSample): string | undefined {
    return domain.transactionId
}

function toServiceIdentifier(domain: DataSample): IdentifierDto[] | undefined {
    return domain.identifiers?.map(mapIdentifierToIdentifierDto)
}

function toServiceContactId(domain: DataSample): string | undefined {
    return domain.batchId
}

function toServiceSubContactIds(domain: DataSample): string[] | undefined {
    return undefined
}

function toServicePlansOfActionIds(domain: DataSample): string[] | undefined {
    return undefined
}

function toServiceHealthElementsIds(domain: DataSample): string[] | undefined {
    return [...(domain.healthcareElementIds ?? [])]
}

function toServiceFormIds(domain: DataSample): string[] | undefined {
    return [...(domain.canvasesIds ?? [])]
}

function toServiceSecretForeignKeys(domain: DataSample): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toServiceCryptedForeignKeys(domain: DataSample): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDelegations(domain: DataSample): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toServiceEncryptionKeys(domain: DataSample): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toServiceLabel(domain: DataSample): string | undefined {
    return undefined
}

function toServiceDataClassName(domain: DataSample): string | undefined {
    return undefined
}

function toServiceIndex(domain: DataSample): number | undefined {
    return domain.index
}

function toServiceContent(domain: DataSample): { [key: string]: ContentDto } | undefined {
    const mappedEntries = [...(domain.content?.entries() ?? [])]?.map(([lang, content]) => [lang, mapContentToContentDto(content)])
    return !!mappedEntries ? Object.fromEntries(mappedEntries) : undefined
}

function toServiceEncryptedContent(domain: DataSample): string | undefined {
    return undefined
}

function toServiceTextIndexes(domain: DataSample): { [key: string]: string } | undefined {
    return undefined
}

function toServiceValueDate(domain: DataSample): number | undefined {
    return domain.valueDate
}

function toServiceOpeningDate(domain: DataSample): number | undefined {
    return domain.openingDate
}

function toServiceClosingDate(domain: DataSample): number | undefined {
    return domain.closingDate
}

function toServiceFormId(domain: DataSample): string | undefined {
    return undefined
}

function toServiceCreated(domain: DataSample): number | undefined {
    return domain.created
}

function toServiceModified(domain: DataSample): number | undefined {
    return domain.modified
}

function toServiceEndOfLife(domain: DataSample): number | undefined {
    return domain.endOfLife
}

function toServiceAuthor(domain: DataSample): string | undefined {
    return domain.author
}

function toServiceResponsible(domain: DataSample): string | undefined {
    return domain.responsible
}

function toServiceMedicalLocationId(domain: DataSample): string | undefined {
    return undefined
}

function toServiceComment(domain: DataSample): string | undefined {
    return domain.comment
}

function toServiceStatus(domain: DataSample): number | undefined {
    return undefined
}

function toServiceInvoicingCodes(domain: DataSample): string[] | undefined {
    return undefined
}

function toServiceNotes(domain: DataSample): AnnotationDto[] | undefined {
    return undefined
}

function toServiceQualifiedLinks(domain: DataSample): { [key: string]: { [key: string]: string } } | undefined {
    return domain.qualifiedLinks ? Object.fromEntries([...domain.qualifiedLinks.entries()].map(([key, value]) => [key, Object.fromEntries([...value.entries()])])) : undefined
}

function toServiceCodes(domain: DataSample): CodeStub[] | undefined {
    return domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toServiceTags(domain: DataSample): CodeStub[] | undefined {
    return domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toServiceEncryptedSelf(domain: DataSample): string | undefined {
    return !!domain.systemMetaData ? toEncryptedSelf(domain.systemMetaData) : undefined
}

function toDataSampleId(dto: ServiceDto): string | undefined {
    return forceUuid(dto.id)
}

function toDataSampleTransactionId(dto: ServiceDto): string | undefined {
    return dto.transactionId
}

function toDataSampleIdentifiers(dto: ServiceDto): Identifier[] {
    return dto.identifier?.map(mapIdentifierDtoToIdentifier) ?? []
}

function toDataSampleBatchId(dto: ServiceDto): string | undefined {
    return dto.contactId
}

function toDataSampleHealthcareElementIds(dto: ServiceDto): Set<string> | undefined {
    return dto.healthElementsIds ? new Set(dto.healthElementsIds) : undefined
}

function toDataSampleCanvasesIds(dto: ServiceDto): Set<string> | undefined {
    return dto.formIds ? new Set(dto.formIds) : undefined
}

function toDataSampleIndex(dto: ServiceDto): number | undefined {
    return dto.index
}

function toDataSampleContent(dto: ServiceDto): Map<ISO639_1, Content> {
    return dto.content ? new Map([...Object.entries(dto.content)].map(([key, value]) => [key, mapContentDtoToContent(value)])) : new Map()
}

function toDataSampleValueDate(dto: ServiceDto): number | undefined {
    return dto.valueDate
}

function toDataSampleOpeningDate(dto: ServiceDto): number | undefined {
    return dto.openingDate
}

function toDataSampleClosingDate(dto: ServiceDto): number | undefined {
    return dto.closingDate
}

function toDataSampleCreated(dto: ServiceDto): number | undefined {
    return dto.created
}

function toDataSampleModified(dto: ServiceDto): number | undefined {
    return dto.modified
}

function toDataSampleEndOfLife(dto: ServiceDto): number | undefined {
    return dto.endOfLife
}

function toDataSampleAuthor(dto: ServiceDto): string | undefined {
    return dto.author
}

function toDataSampleResponsible(dto: ServiceDto): string | undefined {
    return dto.responsible
}

function toDataSampleComment(dto: ServiceDto): string | undefined {
    return dto.comment
}

function toDataSampleQualifiedLinks(dto: ServiceDto): Map<string, Map<string, string>> {
    return dto.qualifiedLinks ? new Map([...Object.entries(dto.qualifiedLinks)].map(([key, value]) => [key, new Map([...Object.entries(value)])])) : new Map()
}

function toDataSampleCodes(dto: ServiceDto): Set<CodingReference> {
    return dto.codes ? new Set(dto.codes.map(mapCodeStubToCodingReference)) : new Set()
}

function toDataSampleLabels(dto: ServiceDto): Set<CodingReference> {
    return dto.tags ? new Set(dto.tags.map(mapCodeStubToCodingReference)) : new Set()
}

function toDataSampleSystemMetaData(dto: ServiceDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toServiceSecurityMetadata(domain: DataSample): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapServiceToDataSample(dto: ServiceDto): DataSample {
    return new DataSample({
        id: toDataSampleId(dto),
        transactionId: toDataSampleTransactionId(dto),
        identifiers: toDataSampleIdentifiers(dto),
        batchId: toDataSampleBatchId(dto),
        healthcareElementIds: toDataSampleHealthcareElementIds(dto),
        canvasesIds: toDataSampleCanvasesIds(dto),
        index: toDataSampleIndex(dto),
        content: toDataSampleContent(dto),
        valueDate: toDataSampleValueDate(dto),
        openingDate: toDataSampleOpeningDate(dto),
        closingDate: toDataSampleClosingDate(dto),
        created: toDataSampleCreated(dto),
        modified: toDataSampleModified(dto),
        endOfLife: toDataSampleEndOfLife(dto),
        author: toDataSampleAuthor(dto),
        responsible: toDataSampleResponsible(dto),
        comment: toDataSampleComment(dto),
        qualifiedLinks: toDataSampleQualifiedLinks(dto),
        codes: toDataSampleCodes(dto),
        labels: toDataSampleLabels(dto),
        systemMetaData: toDataSampleSystemMetaData(dto),
    })
}

export function mapDataSampleToService(domain: DataSample): ServiceDto {
    return new ServiceDto({
        id: toServiceId(domain),
        transactionId: toServiceTransactionId(domain),
        identifier: toServiceIdentifier(domain),
        contactId: toServiceContactId(domain),
        subContactIds: toServiceSubContactIds(domain),
        plansOfActionIds: toServicePlansOfActionIds(domain),
        healthElementsIds: toServiceHealthElementsIds(domain),
        formIds: toServiceFormIds(domain),
        secretForeignKeys: toServiceSecretForeignKeys(domain),
        cryptedForeignKeys: toServiceCryptedForeignKeys(domain),
        delegations: toServiceDelegations(domain),
        encryptionKeys: toServiceEncryptionKeys(domain),
        label: toServiceLabel(domain),
        dataClassName: toServiceDataClassName(domain),
        index: toServiceIndex(domain),
        content: toServiceContent(domain),
        encryptedContent: toServiceEncryptedContent(domain),
        textIndexes: toServiceTextIndexes(domain),
        valueDate: toServiceValueDate(domain),
        openingDate: toServiceOpeningDate(domain),
        closingDate: toServiceClosingDate(domain),
        formId: toServiceFormId(domain),
        created: toServiceCreated(domain),
        modified: toServiceModified(domain),
        endOfLife: toServiceEndOfLife(domain),
        author: toServiceAuthor(domain),
        responsible: toServiceResponsible(domain),
        medicalLocationId: toServiceMedicalLocationId(domain),
        comment: toServiceComment(domain),
        status: toServiceStatus(domain),
        invoicingCodes: toServiceInvoicingCodes(domain),
        notes: toServiceNotes(domain),
        qualifiedLinks: toServiceQualifiedLinks(domain),
        codes: toServiceCodes(domain),
        tags: toServiceTags(domain),
        encryptedSelf: toServiceEncryptedSelf(domain),
        securityMetadata: toServiceSecurityMetadata(domain),
    })
}
