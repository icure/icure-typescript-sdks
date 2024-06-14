import { DataSample } from '../models/DataSample.model'
import {
    AnnotationDto,
    CodeStub,
    CodingReference,
    ContentDto,
    DelegationDto,
    forceUuid,
    Identifier,
    IdentifierDto,
    ISO639_1,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    SecurityMetadataDto,
    ServiceDto,
    SystemMetaDataEncrypted,
    toCryptedForeignKeys,
    toDelegations,
    toEncryptedSelf,
    toEncryptionKeys,
    toSecretForeignKeys,
    toSecurityMetadataDto,
    toSystemMetaDataEncrypted,
} from '@icure/typescript-common'
import { Content } from '../models/Content.model'
import { mapContentDtoToContent, mapContentToContentDto } from './Content.mapper'

function toServiceDtoId(domain: DataSample): string | undefined {
    return forceUuid(domain.id)
}

function toServiceDtoTransactionId(domain: DataSample): string | undefined {
    return domain.transactionId
}

function toServiceDtoIdentifier(domain: DataSample): IdentifierDto[] | undefined {
    return domain.identifiers?.map(mapIdentifierToIdentifierDto)
}

function toServiceDtoContactId(domain: DataSample): string | undefined {
    return domain.batchId
}

function toServiceDtoSubContactIds(domain: DataSample): string[] | undefined {
    return undefined
}

function toServiceDtoPlansOfActionIds(domain: DataSample): string[] | undefined {
    return undefined
}

function toServiceDtoHealthElementsIds(domain: DataSample): string[] | undefined {
    return [...(domain.healthcareElementIds ?? [])]
}

function toServiceDtoFormIds(domain: DataSample): string[] | undefined {
    return [...(domain.canvasesIds ?? [])]
}

function toServiceDtoSecretForeignKeys(domain: DataSample): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDtoCryptedForeignKeys(domain: DataSample): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDtoDelegations(domain: DataSample): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toServiceDtoEncryptionKeys(domain: DataSample): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toServiceDtoLabel(domain: DataSample): string | undefined {
    return undefined
}

function toServiceDtoDataClassName(domain: DataSample): string | undefined {
    return undefined
}

function toServiceDtoIndex(domain: DataSample): number | undefined {
    return domain.index
}

function toServiceDtoContent(domain: DataSample): { [key: string]: ContentDto } | undefined {
    const mappedEntries = [...Object.entries(domain.content)]?.map(([lang, content]) => [lang, mapContentToContentDto(content)])
    return !!mappedEntries ? Object.fromEntries(mappedEntries) : undefined
}

function toServiceDtoEncryptedContent(domain: DataSample): string | undefined {
    return undefined
}

function toServiceDtoTextIndexes(domain: DataSample): { [key: string]: string } | undefined {
    return undefined
}

function toServiceDtoValueDate(domain: DataSample): number | undefined {
    return domain.valueDate
}

function toServiceDtoOpeningDate(domain: DataSample): number | undefined {
    return domain.openingDate
}

function toServiceDtoClosingDate(domain: DataSample): number | undefined {
    return domain.closingDate
}

function toServiceDtoFormId(domain: DataSample): string | undefined {
    return undefined
}

function toServiceDtoCreated(domain: DataSample): number | undefined {
    return domain.created
}

function toServiceDtoModified(domain: DataSample): number | undefined {
    return domain.modified
}

function toServiceDtoEndOfLife(domain: DataSample): number | undefined {
    return domain.endOfLife
}

function toServiceDtoAuthor(domain: DataSample): string | undefined {
    return domain.author
}

function toServiceDtoResponsible(domain: DataSample): string | undefined {
    return domain.responsible
}

function toServiceDtoMedicalLocationId(domain: DataSample): string | undefined {
    return undefined
}

function toServiceDtoComment(domain: DataSample): string | undefined {
    return domain.comment
}

function toServiceDtoStatus(domain: DataSample): number | undefined {
    return undefined
}

function toServiceDtoInvoicingCodes(domain: DataSample): string[] | undefined {
    return undefined
}

function toServiceDtoNotes(domain: DataSample): AnnotationDto[] | undefined {
    return undefined
}

function toServiceDtoQualifiedLinks(domain: DataSample): { [key: string]: { [key: string]: string } } | undefined {
    return domain.qualifiedLinks ? Object.fromEntries([...Object.entries(domain.qualifiedLinks)].map(([key, value]) => [key, Object.fromEntries([...Object.entries(value)])])) : undefined
}

function toServiceDtoCodes(domain: DataSample): CodeStub[] | undefined {
    return domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toServiceDtoTags(domain: DataSample): CodeStub[] | undefined {
    return domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toServiceDtoEncryptedSelf(domain: DataSample): string | undefined {
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

function toDataSampleHealthcareElementIds(dto: ServiceDto): Array<string> | undefined {
    return dto.healthElementsIds ? dto.healthElementsIds : undefined
}

function toDataSampleCanvasesIds(dto: ServiceDto): Array<string> | undefined {
    return dto.formIds ? dto.formIds : undefined
}

function toDataSampleIndex(dto: ServiceDto): number | undefined {
    return dto.index
}

function toDataSampleContent(dto: ServiceDto): Record<ISO639_1, Content> {
    return dto.content ? (Object.fromEntries([...Object.entries(dto.content)].map(([key, value]) => [key, mapContentDtoToContent(value)])) as Record<ISO639_1, Content>) : ({} as Record<ISO639_1, Content>)
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

function toDataSampleQualifiedLinks(dto: ServiceDto): Record<string, Record<string, string>> {
    return dto.qualifiedLinks ? Object.fromEntries([...Object.entries(dto.qualifiedLinks)].map(([key, value]) => [key, Object.fromEntries([...Object.entries(value)])])) : {}
}

function toDataSampleCodes(dto: ServiceDto): Array<CodingReference> {
    return dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : []
}

function toDataSampleLabels(dto: ServiceDto): Array<CodingReference> {
    return dto.tags ? dto.tags.map(mapCodeStubToCodingReference) : []
}

function toDataSampleSystemMetaData(dto: ServiceDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toServiceDtoSecurityMetadata(domain: DataSample): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapServiceDtoToDataSample(dto: ServiceDto): DataSample {
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

export function mapDataSampleToServiceDto(domain: DataSample): ServiceDto {
    return new ServiceDto({
        id: toServiceDtoId(domain),
        transactionId: toServiceDtoTransactionId(domain),
        identifier: toServiceDtoIdentifier(domain),
        contactId: toServiceDtoContactId(domain),
        subContactIds: toServiceDtoSubContactIds(domain),
        plansOfActionIds: toServiceDtoPlansOfActionIds(domain),
        healthElementsIds: toServiceDtoHealthElementsIds(domain),
        formIds: toServiceDtoFormIds(domain),
        secretForeignKeys: toServiceDtoSecretForeignKeys(domain),
        cryptedForeignKeys: toServiceDtoCryptedForeignKeys(domain),
        delegations: toServiceDtoDelegations(domain),
        encryptionKeys: toServiceDtoEncryptionKeys(domain),
        label: toServiceDtoLabel(domain),
        dataClassName: toServiceDtoDataClassName(domain),
        index: toServiceDtoIndex(domain),
        content: toServiceDtoContent(domain),
        encryptedContent: toServiceDtoEncryptedContent(domain),
        textIndexes: toServiceDtoTextIndexes(domain),
        valueDate: toServiceDtoValueDate(domain),
        openingDate: toServiceDtoOpeningDate(domain),
        closingDate: toServiceDtoClosingDate(domain),
        formId: toServiceDtoFormId(domain),
        created: toServiceDtoCreated(domain),
        modified: toServiceDtoModified(domain),
        endOfLife: toServiceDtoEndOfLife(domain),
        author: toServiceDtoAuthor(domain),
        responsible: toServiceDtoResponsible(domain),
        medicalLocationId: toServiceDtoMedicalLocationId(domain),
        comment: toServiceDtoComment(domain),
        status: toServiceDtoStatus(domain),
        invoicingCodes: toServiceDtoInvoicingCodes(domain),
        notes: toServiceDtoNotes(domain),
        qualifiedLinks: toServiceDtoQualifiedLinks(domain),
        codes: toServiceDtoCodes(domain),
        tags: toServiceDtoTags(domain),
        encryptedSelf: toServiceDtoEncryptedSelf(domain),
        securityMetadata: toServiceDtoSecurityMetadata(domain),
    })
}
