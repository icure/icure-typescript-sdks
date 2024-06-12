import { Observation } from '../models/Observation.model'
import {
    Annotation,
    CodingReference,
    convertNestedMapToObject,
    convertObjectToNestedMap,
    extractEncryptedSelf,
    filteringOutInternalTags,
    Identifier,
    mapAnnotationDtoToAnnotation,
    mapAnnotationToAnnotationDto,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    mergeTagsWithInternalTags,
    SystemMetaDataEncrypted,
    toCryptedForeignKeys,
    toDelegations,
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
import { Component } from '../models/Component.model'
import { LocalComponent } from '../models/LocalComponent.model'
import { mapContentDtoToLocalComponent, mapLocalComponentToContentDto } from './LocalComponent.mapper'
import { mapComponentToContentDto, mapContentDtoToComponent } from './Component.mapper'

function toServiceDtoId(domain: Observation): string | undefined {
    return domain.id
}

function toServiceDtoTransactionId(domain: Observation): string | undefined {
    return domain.transactionId
}

function toServiceDtoIdentifier(domain: Observation): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
}

function toServiceDtoContactId(domain: Observation): string | undefined {
    return domain.batchId
}

function toServiceDtoSubContactIds(domain: Observation): string[] | undefined {
    return undefined
}

function toServiceDtoPlansOfActionIds(domain: Observation): string[] | undefined {
    return undefined
}

function toServiceDtoHealthElementsIds(domain: Observation): string[] | undefined {
    return domain.healthcareElementIds
}

function toServiceDtoFormIds(domain: Observation): string[] | undefined {
    return undefined
}

function toServiceDtoSecretForeignKeys(domain: Observation): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDtoCryptedForeignKeys(domain: Observation): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDtoDelegations(domain: Observation): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toServiceDtoEncryptionKeys(domain: Observation): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toServiceDtoLabel(domain: Observation): string | undefined {
    return undefined
}

function toServiceDtoDataClassName(domain: Observation): string | undefined {
    return undefined
}

function toServiceDtoIndex(domain: Observation): number | undefined {
    return domain.index
}

function toServiceDtoContent(domain: Observation): { [key: string]: ContentDto } | undefined {
    const nonLocalizedContent = !!domain.component ? mapComponentToContentDto(domain.component) : undefined
    const localizedContentEntries: [ISO639_1, ContentDto][] = Object.entries(domain.localContent ?? {})?.map(([key, value]) => {
        return [key as ISO639_1, mapLocalComponentToContentDto(value)]
    })

    if (!nonLocalizedContent && localizedContentEntries.length === 0) {
        return undefined
    }

    const nonLocalizedContentEntry = !!nonLocalizedContent ? [['xx', nonLocalizedContent]] : []
    return Object.fromEntries([...localizedContentEntries, ...nonLocalizedContentEntry])
}

function toServiceDtoEncryptedContent(domain: Observation): string | undefined {
    return undefined
}

function toServiceDtoTextIndexes(domain: Observation): { [key: string]: string } | undefined {
    return undefined
}

function toServiceDtoValueDate(domain: Observation): number | undefined {
    return domain.valueDate
}

function toServiceDtoOpeningDate(domain: Observation): number | undefined {
    return domain.openingDate
}

function toServiceDtoClosingDate(domain: Observation): number | undefined {
    return domain.closingDate
}

function toServiceDtoFormId(domain: Observation): string | undefined {
    return undefined
}

function toServiceDtoCreated(domain: Observation): number | undefined {
    return domain.created
}

function toServiceDtoModified(domain: Observation): number | undefined {
    return domain.modified
}

function toServiceDtoEndOfLife(domain: Observation): number | undefined {
    return domain.endOfLife
}

function toServiceDtoAuthor(domain: Observation): string | undefined {
    return domain.author
}

function toServiceDtoResponsible(domain: Observation): string | undefined {
    return domain.performer
}

function toServiceDtoMedicalLocationId(domain: Observation): string | undefined {
    return undefined
}

function toServiceDtoComment(domain: Observation): string | undefined {
    return undefined
}

function toServiceDtoStatus(domain: Observation): number | undefined {
    return undefined
}

function toServiceDtoInvoicingCodes(domain: Observation): string[] | undefined {
    return undefined
}

function toServiceDtoNotes(domain: Observation): AnnotationDto[] | undefined {
    return !!domain.notes ? domain.notes.map(mapAnnotationToAnnotationDto) : undefined
}

function toServiceDtoQualifiedLinks(domain: Observation): { [key: string]: { [key: string]: string } } | undefined {
    return !!domain.qualifiedLinks ? convertNestedMapToObject(domain.qualifiedLinks) : undefined
}

function toServiceDtoCodes(domain: Observation): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toServiceDtoTags(domain: Observation): CodeStub[] | undefined {
    return mergeTagsWithInternalTags('observation', domain.tags, domain.systemMetaData)
}

function toServiceDtoEncryptedSelf(domain: Observation): string | undefined {
    return extractEncryptedSelf(domain.systemMetaData)
}

function toObservationId(dto: ServiceDto): string | undefined {
    return dto.id
}

function toObservationTransactionId(dto: ServiceDto): string | undefined {
    return dto.transactionId
}

function toObservationIdentifiers(dto: ServiceDto): Identifier[] | undefined {
    return !!dto.identifier ? dto.identifier.map(mapIdentifierDtoToIdentifier) : undefined
}

function toObservationBatchId(dto: ServiceDto): string | undefined {
    return dto.contactId
}

function toObservationHealthcareElementIds(dto: ServiceDto): string[] | undefined {
    return dto.healthElementsIds
}

function toObservationIndex(dto: ServiceDto): number | undefined {
    return dto.index
}

function toObservationComponent(dto: ServiceDto): Component | undefined {
    const content = Object.entries(dto.content ?? {})?.find(([key]) => key === 'xx')?.[1]
    return !!content ? mapContentDtoToComponent(content) : undefined
}

function toObservationValueDate(dto: ServiceDto): number | undefined {
    return dto.valueDate
}

function toObservationOpeningDate(dto: ServiceDto): number | undefined {
    return dto.openingDate
}

function toObservationClosingDate(dto: ServiceDto): number | undefined {
    return dto.closingDate
}

function toObservationCreated(dto: ServiceDto): number | undefined {
    return dto.created
}

function toObservationModified(dto: ServiceDto): number | undefined {
    return dto.modified
}

function toObservationEndOfLife(dto: ServiceDto): number | undefined {
    return dto.endOfLife
}

function toObservationAuthor(dto: ServiceDto): string | undefined {
    return dto.author
}

function toObservationPerformer(dto: ServiceDto): string | undefined {
    return dto.responsible
}

function toObservationLocalContent(dto: ServiceDto): Record<ISO639_1, LocalComponent> | undefined {
    const localizedContent = Object.entries(dto.content ?? {})?.filter(([key]) => key !== 'xx')
    return Object.fromEntries(
        localizedContent.map(([key, value]) => {
            return [key as ISO639_1, mapContentDtoToLocalComponent(value)]
        })
    ) as Record<ISO639_1, LocalComponent>
}

function toObservationQualifiedLinks(dto: ServiceDto): Record<string, Record<string, string>> | undefined {
    return !!dto.qualifiedLinks ? convertObjectToNestedMap(dto.qualifiedLinks) : undefined
}

function toObservationCodes(dto: ServiceDto): Array<CodingReference> | undefined {
    return !!dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : undefined
}

function toObservationTags(dto: ServiceDto): Array<CodingReference> | undefined {
    return filteringOutInternalTags('observation', dto.tags)
}

function toObservationSystemMetaData(dto: ServiceDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toObservationNotes(dto: ServiceDto): Annotation[] | undefined {
    return !!dto.notes ? dto.notes.map(mapAnnotationDtoToAnnotation) : undefined
}

function toServiceDtoSecurityMetadata(domain: Observation): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapServiceDtoToObservation(dto: ServiceDto): Observation {
    return new Observation({
        id: toObservationId(dto),
        transactionId: toObservationTransactionId(dto),
        identifiers: toObservationIdentifiers(dto),
        batchId: toObservationBatchId(dto),
        healthcareElementIds: toObservationHealthcareElementIds(dto),
        index: toObservationIndex(dto),
        component: toObservationComponent(dto),
        valueDate: toObservationValueDate(dto),
        openingDate: toObservationOpeningDate(dto),
        closingDate: toObservationClosingDate(dto),
        created: toObservationCreated(dto),
        modified: toObservationModified(dto),
        endOfLife: toObservationEndOfLife(dto),
        author: toObservationAuthor(dto),
        performer: toObservationPerformer(dto),
        localContent: toObservationLocalContent(dto),
        qualifiedLinks: toObservationQualifiedLinks(dto),
        codes: toObservationCodes(dto),
        tags: toObservationTags(dto),
        systemMetaData: toObservationSystemMetaData(dto),
        notes: toObservationNotes(dto),
    })
}

export function mapObservationToServiceDto(domain: Observation): ServiceDto {
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
