import { HealthcareElement } from '../models/HealthcareElement.model'
import {
    Annotation,
    CodingReference,
    forceUuid,
    Identifier,
    mapAnnotationDtoToAnnotation,
    mapAnnotationToAnnotationDto,
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
    toSystemMetaDataEncrypted,
    AnnotationDto,
    CareTeamMember,
    CodeStub,
    DelegationDto,
    Episode,
    HealthElementDto,
    IdentifierDto,
    PlanOfAction,
} from '@icure/typescript-common'

function toHealthElementId(domain: HealthcareElement): string {
    return forceUuid(domain.id)
}

function toHealthElementIdentifiers(domain: HealthcareElement): IdentifierDto[] | undefined {
    return domain.identifiers?.map(mapIdentifierToIdentifierDto)
}

function toHealthElementRev(domain: HealthcareElement): string | undefined {
    return domain.rev
}

function toHealthElementCreated(domain: HealthcareElement): number | undefined {
    return domain.created
}

function toHealthElementModified(domain: HealthcareElement): number | undefined {
    return domain.modified
}

function toHealthElementAuthor(domain: HealthcareElement): string | undefined {
    return domain.author
}

function toHealthElementResponsible(domain: HealthcareElement): string | undefined {
    return domain.responsible
}

function toHealthElementMedicalLocationId(domain: HealthcareElement): string | undefined {
    return domain.medicalLocationId
}

function toHealthElementTags(domain: HealthcareElement): CodeStub[] | undefined {
    return domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthElementCodes(domain: HealthcareElement): CodeStub[] | undefined {
    return domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthElementEndOfLife(domain: HealthcareElement): number | undefined {
    return domain.endOfLife
}

function toHealthElementDeletionDate(domain: HealthcareElement): number | undefined {
    return domain.deletionDate
}

// If domain.healthcareElementId is undefined we take the chosen "main" id for the dto
function toHealthElementHealthElementId(domain: HealthcareElement, initialisedId: string): string {
    return domain.healthcareElementId ?? initialisedId
}

function toHealthElementValueDate(domain: HealthcareElement): number | undefined {
    return domain.valueDate
}

function toHealthElementOpeningDate(domain: HealthcareElement): number | undefined {
    return domain.openingDate
}

function toHealthElementClosingDate(domain: HealthcareElement): number | undefined {
    return domain.closingDate
}

function toHealthElementDescr(domain: HealthcareElement): string | undefined {
    return domain.description
}

function toHealthElementNote(domain: HealthcareElement): string | undefined {
    return domain.note
}

function toHealthElementNotes(domain: HealthcareElement): AnnotationDto[] | undefined {
    return domain.notes ? [...domain.notes].map(mapAnnotationToAnnotationDto) : undefined
}

function toHealthElementRelevant(domain: HealthcareElement): boolean | undefined {
    return true
}

function toHealthElementIdOpeningContact(domain: HealthcareElement): string | undefined {
    return undefined
}

function toHealthElementIdClosingContact(domain: HealthcareElement): string | undefined {
    return undefined
}

function toHealthElementIdService(domain: HealthcareElement): string | undefined {
    return undefined
}

function toHealthElementStatus(domain: HealthcareElement): number | undefined {
    return 0
}

function toHealthElementLaterality(domain: HealthcareElement): HealthElementDto.LateralityEnum | undefined {
    return undefined
}

function toHealthElementPlansOfAction(domain: HealthcareElement): PlanOfAction[] | undefined {
    return undefined
}

function toHealthElementEpisodes(domain: HealthcareElement): Episode[] | undefined {
    return undefined
}

function toHealthElementCareTeam(domain: HealthcareElement): CareTeamMember[] | undefined {
    return undefined
}

function toHealthElementSecretForeignKeys(domain: HealthcareElement): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementCryptedForeignKeys(domain: HealthcareElement): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementDelegations(domain: HealthcareElement): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toHealthElementEncryptionKeys(domain: HealthcareElement): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toHealthElementEncryptedSelf(domain: HealthcareElement): string | undefined {
    return !!domain.systemMetaData ? toEncryptedSelf(domain.systemMetaData) : undefined
}

function toHealthcareElementId(dto: HealthElementDto): string | undefined {
    return dto.id
}

function toHealthcareElementIdentifiers(dto: HealthElementDto): Identifier[] {
    return dto.identifiers?.map(mapIdentifierDtoToIdentifier) ?? []
}

function toHealthcareElementRev(dto: HealthElementDto): string | undefined {
    return dto.rev
}

function toHealthcareElementCreated(dto: HealthElementDto): number | undefined {
    return dto.created
}

function toHealthcareElementModified(dto: HealthElementDto): number | undefined {
    return dto.modified
}

function toHealthcareElementAuthor(dto: HealthElementDto): string | undefined {
    return dto.author
}

function toHealthcareElementResponsible(dto: HealthElementDto): string | undefined {
    return dto.responsible
}

function toHealthcareElementMedicalLocationId(dto: HealthElementDto): string | undefined {
    return dto.medicalLocationId
}

function toHealthcareElementLabels(dto: HealthElementDto): Set<CodingReference> {
    return new Set(dto.tags?.map(mapCodeStubToCodingReference) ?? [])
}

function toHealthcareElementCodes(dto: HealthElementDto): Set<CodingReference> {
    return new Set(dto.codes?.map(mapCodeStubToCodingReference) ?? [])
}

function toHealthcareElementEndOfLife(dto: HealthElementDto): number | undefined {
    return dto.endOfLife
}

function toHealthcareElementDeletionDate(dto: HealthElementDto): number | undefined {
    return dto.deletionDate
}

function toHealthcareElementHealthcareElementId(dto: HealthElementDto): string | undefined {
    return dto.healthElementId
}

function toHealthcareElementValueDate(dto: HealthElementDto): number | undefined {
    return dto.valueDate
}

function toHealthcareElementOpeningDate(dto: HealthElementDto): number | undefined {
    return dto.openingDate
}

function toHealthcareElementClosingDate(dto: HealthElementDto): number | undefined {
    return dto.closingDate
}

function toHealthcareElementDescription(dto: HealthElementDto): string | undefined {
    return dto.descr
}

function toHealthcareElementNote(dto: HealthElementDto): string | undefined {
    return dto.note
}

function toHealthcareElementSystemMetaData(dto: HealthElementDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toHealthcareElementNotes(dto: HealthElementDto): Annotation[] | undefined {
    return dto.notes?.map(mapAnnotationDtoToAnnotation)
}

export function mapHealthElementToHealthcareElement(dto: HealthElementDto): HealthcareElement {
    return new HealthcareElement({
        id: toHealthcareElementId(dto),
        identifiers: toHealthcareElementIdentifiers(dto),
        rev: toHealthcareElementRev(dto),
        created: toHealthcareElementCreated(dto),
        modified: toHealthcareElementModified(dto),
        author: toHealthcareElementAuthor(dto),
        responsible: toHealthcareElementResponsible(dto),
        medicalLocationId: toHealthcareElementMedicalLocationId(dto),
        labels: toHealthcareElementLabels(dto),
        codes: toHealthcareElementCodes(dto),
        endOfLife: toHealthcareElementEndOfLife(dto),
        deletionDate: toHealthcareElementDeletionDate(dto),
        healthcareElementId: toHealthcareElementHealthcareElementId(dto),
        valueDate: toHealthcareElementValueDate(dto),
        openingDate: toHealthcareElementOpeningDate(dto),
        closingDate: toHealthcareElementClosingDate(dto),
        description: toHealthcareElementDescription(dto),
        note: toHealthcareElementNote(dto),
        notes: toHealthcareElementNotes(dto),
        systemMetaData: toHealthcareElementSystemMetaData(dto),
    })
}

export function mapHealthcareElementToHealthElement(domain: HealthcareElement): HealthElementDto {
    const id = toHealthElementId(domain)
    return new HealthElementDto({
        id,
        identifiers: toHealthElementIdentifiers(domain),
        rev: toHealthElementRev(domain),
        created: toHealthElementCreated(domain),
        modified: toHealthElementModified(domain),
        author: toHealthElementAuthor(domain),
        responsible: toHealthElementResponsible(domain),
        medicalLocationId: toHealthElementMedicalLocationId(domain),
        tags: toHealthElementTags(domain),
        codes: toHealthElementCodes(domain),
        endOfLife: toHealthElementEndOfLife(domain),
        deletionDate: toHealthElementDeletionDate(domain),
        healthElementId: toHealthElementHealthElementId(domain, id),
        valueDate: toHealthElementValueDate(domain),
        openingDate: toHealthElementOpeningDate(domain),
        closingDate: toHealthElementClosingDate(domain),
        descr: toHealthElementDescr(domain),
        note: toHealthElementNote(domain),
        notes: toHealthElementNotes(domain),
        relevant: toHealthElementRelevant(domain),
        idOpeningContact: toHealthElementIdOpeningContact(domain),
        idClosingContact: toHealthElementIdClosingContact(domain),
        idService: toHealthElementIdService(domain),
        status: toHealthElementStatus(domain),
        laterality: toHealthElementLaterality(domain),
        plansOfAction: toHealthElementPlansOfAction(domain),
        episodes: toHealthElementEpisodes(domain),
        careTeam: toHealthElementCareTeam(domain),
        secretForeignKeys: toHealthElementSecretForeignKeys(domain),
        cryptedForeignKeys: toHealthElementCryptedForeignKeys(domain),
        delegations: toHealthElementDelegations(domain),
        encryptionKeys: toHealthElementEncryptionKeys(domain),
        encryptedSelf: toHealthElementEncryptedSelf(domain),
    })
}
