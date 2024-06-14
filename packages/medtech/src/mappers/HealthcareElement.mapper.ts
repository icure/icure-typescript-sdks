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
    toSecurityMetadataDto,
    toSystemMetaDataEncrypted,
    AnnotationDto,
    CareTeamMember,
    CodeStub,
    DelegationDto,
    Episode,
    HealthElementDto,
    IdentifierDto,
    PlanOfAction,
    SecurityMetadataDto,
} from '@icure/typescript-common'

function toHealthElementDtoId(domain: HealthcareElement): string {
    return forceUuid(domain.id)
}

function toHealthElementDtoIdentifiers(domain: HealthcareElement): IdentifierDto[] | undefined {
    return domain.identifiers?.map(mapIdentifierToIdentifierDto)
}

function toHealthElementDtoRev(domain: HealthcareElement): string | undefined {
    return domain.rev
}

function toHealthElementDtoCreated(domain: HealthcareElement): number | undefined {
    return domain.created
}

function toHealthElementDtoModified(domain: HealthcareElement): number | undefined {
    return domain.modified
}

function toHealthElementDtoAuthor(domain: HealthcareElement): string | undefined {
    return domain.author
}

function toHealthElementDtoResponsible(domain: HealthcareElement): string | undefined {
    return domain.responsible
}

function toHealthElementDtoMedicalLocationId(domain: HealthcareElement): string | undefined {
    return domain.medicalLocationId
}

function toHealthElementDtoTags(domain: HealthcareElement): CodeStub[] | undefined {
    return domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthElementDtoCodes(domain: HealthcareElement): CodeStub[] | undefined {
    return domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthElementDtoEndOfLife(domain: HealthcareElement): number | undefined {
    return domain.endOfLife
}

function toHealthElementDtoDeletionDate(domain: HealthcareElement): number | undefined {
    return domain.deletionDate
}

// If domain.healthcareElementId is undefined we take the chosen "main" id for the dto
function toHealthElementDtoHealthElementId(domain: HealthcareElement, initialisedId: string): string {
    return domain.healthcareElementId ?? initialisedId
}

function toHealthElementDtoValueDate(domain: HealthcareElement): number | undefined {
    return domain.valueDate
}

function toHealthElementDtoOpeningDate(domain: HealthcareElement): number | undefined {
    return domain.openingDate
}

function toHealthElementDtoClosingDate(domain: HealthcareElement): number | undefined {
    return domain.closingDate
}

function toHealthElementDtoDescr(domain: HealthcareElement): string | undefined {
    return domain.description
}

function toHealthElementDtoNote(domain: HealthcareElement): string | undefined {
    return domain.note
}

function toHealthElementDtoNotes(domain: HealthcareElement): AnnotationDto[] | undefined {
    return domain.notes ? [...domain.notes].map(mapAnnotationToAnnotationDto) : undefined
}

function toHealthElementDtoRelevant(domain: HealthcareElement): boolean | undefined {
    return true
}

function toHealthElementDtoIdOpeningContact(domain: HealthcareElement): string | undefined {
    return undefined
}

function toHealthElementDtoIdClosingContact(domain: HealthcareElement): string | undefined {
    return undefined
}

function toHealthElementDtoIdService(domain: HealthcareElement): string | undefined {
    return undefined
}

function toHealthElementDtoStatus(domain: HealthcareElement): number | undefined {
    return 0
}

function toHealthElementDtoLaterality(domain: HealthcareElement): HealthElementDto.LateralityEnum | undefined {
    return undefined
}

function toHealthElementDtoPlansOfAction(domain: HealthcareElement): PlanOfAction[] | undefined {
    return undefined
}

function toHealthElementDtoEpisodes(domain: HealthcareElement): Episode[] | undefined {
    return undefined
}

function toHealthElementDtoCareTeam(domain: HealthcareElement): CareTeamMember[] | undefined {
    return undefined
}

function toHealthElementDtoSecretForeignKeys(domain: HealthcareElement): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementDtoCryptedForeignKeys(domain: HealthcareElement): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementDtoDelegations(domain: HealthcareElement): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toHealthElementDtoEncryptionKeys(domain: HealthcareElement): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toHealthElementDtoEncryptedSelf(domain: HealthcareElement): string | undefined {
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

function toHealthcareElementLabels(dto: HealthElementDto): Array<CodingReference> {
    return dto.tags?.map(mapCodeStubToCodingReference) ?? []
}

function toHealthcareElementCodes(dto: HealthElementDto): Array<CodingReference> {
    return dto.codes?.map(mapCodeStubToCodingReference) ?? []
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

function toHealthElementDtoSecurityMetadata(domain: HealthcareElement): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapHealthElementDtoToHealthcareElement(dto: HealthElementDto): HealthcareElement {
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

export function mapHealthcareElementToHealthElementDto(domain: HealthcareElement): HealthElementDto {
    const id = toHealthElementDtoId(domain)
    return new HealthElementDto({
    id: id,
    identifiers: toHealthElementDtoIdentifiers(domain),
    rev: toHealthElementDtoRev(domain),
    created: toHealthElementDtoCreated(domain),
    modified: toHealthElementDtoModified(domain),
    author: toHealthElementDtoAuthor(domain),
    responsible: toHealthElementDtoResponsible(domain),
    medicalLocationId: toHealthElementDtoMedicalLocationId(domain),
    tags: toHealthElementDtoTags(domain),
    codes: toHealthElementDtoCodes(domain),
    endOfLife: toHealthElementDtoEndOfLife(domain),
    deletionDate: toHealthElementDtoDeletionDate(domain),
    healthElementId: toHealthElementDtoHealthElementId(domain, id),
    valueDate: toHealthElementDtoValueDate(domain),
    openingDate: toHealthElementDtoOpeningDate(domain),
    closingDate: toHealthElementDtoClosingDate(domain),
    descr: toHealthElementDtoDescr(domain),
    note: toHealthElementDtoNote(domain),
    notes: toHealthElementDtoNotes(domain),
    relevant: toHealthElementDtoRelevant(domain),
    idOpeningContact: toHealthElementDtoIdOpeningContact(domain),
    idClosingContact: toHealthElementDtoIdClosingContact(domain),
    idService: toHealthElementDtoIdService(domain),
    status: toHealthElementDtoStatus(domain),
    laterality: toHealthElementDtoLaterality(domain),
    plansOfAction: toHealthElementDtoPlansOfAction(domain),
    episodes: toHealthElementDtoEpisodes(domain),
    careTeam: toHealthElementDtoCareTeam(domain),
    secretForeignKeys: toHealthElementDtoSecretForeignKeys(domain),
    cryptedForeignKeys: toHealthElementDtoCryptedForeignKeys(domain),
    delegations: toHealthElementDtoDelegations(domain),
    encryptionKeys: toHealthElementDtoEncryptionKeys(domain),
    encryptedSelf: toHealthElementDtoEncryptedSelf(domain),
    securityMetadata: toHealthElementDtoSecurityMetadata(domain),
    })
}
