import { Observation } from '../models/Observation.model'
import { Annotation as AnnotationDto, CodeStub, Content, Delegation as DelegationDto, Identifier as IdentifierDto, ISO639_1, SecurityMetadata as SecurityMetadataDto, Service } from '@icure/api'
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
} from '@icure/typescript-common'
import { Component } from '../models/Component.model'
import { LocalComponent } from '../models/LocalComponent.model'
import { mapContentToLocalComponent, mapLocalComponentToContent } from './LocalComponent.mapper'
import { mapComponentToContent, mapContentToComponent } from './Component.mapper'

function toServiceId(domain: Observation): string | undefined {
    return domain.id
}

function toServiceTransactionId(domain: Observation): string | undefined {
    return domain.transactionId
}

function toServiceIdentifier(domain: Observation): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
}

function toServiceContactId(domain: Observation): string | undefined {
    return domain.batchId
}

function toServiceSubContactIds(domain: Observation): string[] | undefined {
    return undefined
}

function toServicePlansOfActionIds(domain: Observation): string[] | undefined {
    return undefined
}

function toServiceHealthElementsIds(domain: Observation): string[] | undefined {
    return domain.healthcareElementIds
}

function toServiceFormIds(domain: Observation): string[] | undefined {
    return undefined
}

function toServiceSecretForeignKeys(domain: Observation): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toServiceCryptedForeignKeys(domain: Observation): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDelegations(domain: Observation): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toServiceEncryptionKeys(domain: Observation): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toServiceLabel(domain: Observation): string | undefined {
    return undefined
}

function toServiceDataClassName(domain: Observation): string | undefined {
    return undefined
}

function toServiceIndex(domain: Observation): number | undefined {
    return domain.index
}

function toServiceContent(domain: Observation): { [key: string]: Content } | undefined {
    const nonLocalizedContent = !!domain.component ? mapComponentToContent(domain.component) : undefined
    const localizedContentEntries: [ISO639_1, Content][] = [...(domain.localContent?.entries() ?? [])]?.map(([key, value]) => {
        return [key, mapLocalComponentToContent(value)]
    })

    if (!nonLocalizedContent && localizedContentEntries.length === 0) {
        return undefined
    }

    const nonLocalizedContentEntry = !!nonLocalizedContent ? [['xx', nonLocalizedContent]] : []
    return Object.fromEntries([...localizedContentEntries, ...nonLocalizedContentEntry])
}

function toServiceEncryptedContent(domain: Observation): string | undefined {
    return undefined
}

function toServiceTextIndexes(domain: Observation): { [key: string]: string } | undefined {
    return undefined
}

function toServiceValueDate(domain: Observation): number | undefined {
    return domain.valueDate
}

function toServiceOpeningDate(domain: Observation): number | undefined {
    return domain.openingDate
}

function toServiceClosingDate(domain: Observation): number | undefined {
    return domain.closingDate
}

function toServiceFormId(domain: Observation): string | undefined {
    return undefined
}

function toServiceCreated(domain: Observation): number | undefined {
    return domain.created
}

function toServiceModified(domain: Observation): number | undefined {
    return domain.modified
}

function toServiceEndOfLife(domain: Observation): number | undefined {
    return domain.endOfLife
}

function toServiceAuthor(domain: Observation): string | undefined {
    return domain.author
}

function toServiceResponsible(domain: Observation): string | undefined {
    return domain.performer
}

function toServiceMedicalLocationId(domain: Observation): string | undefined {
    return undefined
}

function toServiceComment(domain: Observation): string | undefined {
    return undefined
}

function toServiceStatus(domain: Observation): number | undefined {
    return undefined
}

function toServiceInvoicingCodes(domain: Observation): string[] | undefined {
    return undefined
}

function toServiceNotes(domain: Observation): AnnotationDto[] | undefined {
    return !!domain.notes ? domain.notes.map(mapAnnotationToAnnotationDto) : undefined
}

function toServiceQualifiedLinks(domain: Observation): { [key: string]: { [key: string]: string } } | undefined {
    return !!domain.qualifiedLinks ? convertNestedMapToObject(domain.qualifiedLinks) : undefined
}

function toServiceCodes(domain: Observation): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toServiceTags(domain: Observation): CodeStub[] | undefined {
    return mergeTagsWithInternalTags('observation', domain.tags, domain.systemMetaData)
}

function toServiceEncryptedSelf(domain: Observation): string | undefined {
    return extractEncryptedSelf(domain.systemMetaData)
}

function toObservationId(dto: Service): string | undefined {
    return dto.id
}

function toObservationTransactionId(dto: Service): string | undefined {
    return dto.transactionId
}

function toObservationIdentifiers(dto: Service): Identifier[] | undefined {
    return !!dto.identifier ? dto.identifier.map(mapIdentifierDtoToIdentifier) : undefined
}

function toObservationBatchId(dto: Service): string | undefined {
    return dto.contactId
}

function toObservationHealthcareElementIds(dto: Service): string[] | undefined {
    return dto.healthElementsIds
}

function toObservationIndex(dto: Service): number | undefined {
    return dto.index
}

function toObservationComponent(dto: Service): Component | undefined {
    const content = Object.entries(dto.content ?? {})?.find(([key]) => key === 'xx')?.[1]
    return !!content ? mapContentToComponent(content) : undefined
}

function toObservationValueDate(dto: Service): number | undefined {
    return dto.valueDate
}

function toObservationOpeningDate(dto: Service): number | undefined {
    return dto.openingDate
}

function toObservationClosingDate(dto: Service): number | undefined {
    return dto.closingDate
}

function toObservationCreated(dto: Service): number | undefined {
    return dto.created
}

function toObservationModified(dto: Service): number | undefined {
    return dto.modified
}

function toObservationEndOfLife(dto: Service): number | undefined {
    return dto.endOfLife
}

function toObservationAuthor(dto: Service): string | undefined {
    return dto.author
}

function toObservationPerformer(dto: Service): string | undefined {
    return dto.responsible
}

function toObservationLocalContent(dto: Service): Map<ISO639_1, LocalComponent> | undefined {
    const localizedContent = Object.entries(dto.content ?? {})?.filter(([key]) => key !== 'xx')
    return new Map(
        localizedContent.map(([key, value]) => {
            return [key, mapContentToLocalComponent(value)] as [ISO639_1, LocalComponent]
        }),
    )
}

function toObservationQualifiedLinks(dto: Service): Map<string, Map<string, string>> | undefined {
    return !!dto.qualifiedLinks ? convertObjectToNestedMap(dto.qualifiedLinks) : undefined
}

function toObservationCodes(dto: Service): Set<CodingReference> | undefined {
    return !!dto.codes ? new Set(dto.codes.map(mapCodeStubToCodingReference)) : undefined
}

function toObservationTags(dto: Service): Set<CodingReference> | undefined {
    return filteringOutInternalTags('observation', dto.tags)
}

function toObservationSystemMetaData(dto: Service): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toObservationNotes(dto: Service): Annotation[] | undefined {
    return !!dto.notes ? dto.notes.map(mapAnnotationDtoToAnnotation) : undefined
}

function toServiceSecurityMetadata(domain: Observation): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapServiceToObservation(dto: Service): Observation {
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

export function mapObservationToService(domain: Observation): Service {
    return new Service({
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
