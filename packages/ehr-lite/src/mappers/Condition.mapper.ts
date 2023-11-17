import { Condition } from '../models/Condition.model'
import {
    addUniqueObjectsToArray,
    Annotation,
    CodingReference,
    filteringOutInternalTags,
    forceUuid,
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
    toEncryptedSelf,
    toEncryptionKeys,
    toSecretForeignKeys,
    toSecurityMetadataDto,
    toSystemMetaDataEncrypted,
    CareTeamMember,
    CodeStub,
    DelegationDto,
    Episode,
    HealthElementDto,
    IdentifierDto,
    PlanOfAction,
    SecurityMetadataDto,
    AnnotationDto,
} from '@icure/typescript-common'
import { ClinicalStatusEnum } from '../models/enums/ClinicalStatus.enum'
import { VerificationStatusEnum } from '../models/enums/VerificationStatus.enum'
import { CategoryEnum } from '../models/enums/Category.enum'
import { SeverityEnum } from '../models/enums/Severity.enum'

function toHealthElementId(domain: Condition): string {
    return forceUuid(domain.id)
}

function toHealthElementIdentifiers(domain: Condition): IdentifierDto[] | undefined {
    return !!domain.identifiers ? [...domain.identifiers].map(mapIdentifierToIdentifierDto) : undefined
}

function toHealthElementRev(domain: Condition): string | undefined {
    return domain.rev
}

function toHealthElementCreated(domain: Condition): number | undefined {
    return domain.created
}

function toHealthElementModified(domain: Condition): number | undefined {
    return domain.modified
}

function toHealthElementAuthor(domain: Condition): string | undefined {
    return domain.author
}

function toHealthElementResponsible(domain: Condition): string | undefined {
    return domain.responsible
}

function toHealthElementMedicalLocationId(domain: Condition): string | undefined {
    return domain.medicalLocationId
}

function toHealthElementTags(domain: Condition): CodeStub[] | undefined {
    const mappedTags = mergeTagsWithInternalTags('condition', domain.tags, domain.systemMetaData)

    const bodySite = [...(domain.bodySite ?? [])]

    const bodySiteCodeStubs = bodySite.map(mapCodingReferenceToCodeStub).map((c) => {
        return new CodeStub({
            ...c,
            context: 'Condition.bodySite',
        })
    })

    const clinicalStatus = domain.clinicalStatus
        ? [
              new CodeStub({
                  ...ClinicalStatusEnum.toCodeStub(domain.clinicalStatus),
                  context: 'Condition.clinicalStatus',
              }),
          ]
        : []

    const verificationStatus = domain.verificationStatus
        ? [
              new CodeStub({
                  ...VerificationStatusEnum.toCodeStub(domain.verificationStatus),
                  context: 'Condition.verificationStatus',
              }),
          ]
        : []

    const severity = domain.severity
        ? [
              new CodeStub({
                  ...SeverityEnum.toCodeStub(domain.severity),
                  context: 'Condition.severity',
              }),
          ]
        : []

    const category = domain.category
        ? [
              new CodeStub({
                  ...CategoryEnum.toCodeStub(domain.category),
                  context: 'Condition.category',
              }),
          ]
        : []

    return addUniqueObjectsToArray(mappedTags, ...bodySiteCodeStubs, ...clinicalStatus, ...severity, ...verificationStatus, ...category)
}

function toHealthElementCodes(domain: Condition): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthElementEndOfLife(domain: Condition): number | undefined {
    return domain.endOfLife
}

function toHealthElementDeletionDate(domain: Condition): number | undefined {
    return domain.deletionDate
}

function toHealthElementHealthElementId(domain: Condition, initialisedId: string): string {
    return domain.healthcareElementId ?? initialisedId
}

function toHealthElementValueDate(domain: Condition): number | undefined {
    return domain.recordedDate
}

function toHealthElementOpeningDate(domain: Condition): number | undefined {
    return domain.openingDate
}

function toHealthElementClosingDate(domain: Condition): number | undefined {
    return domain.closingDate
}

function toHealthElementDescr(domain: Condition): string | undefined {
    return domain.description
}

function toHealthElementNote(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementNotes(domain: Condition): AnnotationDto[] | undefined {
    return !!domain.notes ? [...domain.notes].map(mapAnnotationToAnnotationDto) : undefined
}

function toHealthElementRelevant(domain: Condition): boolean | undefined {
    return undefined
}

function toHealthElementIdOpeningContact(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementIdClosingContact(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementIdService(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementStatus(domain: Condition): number | undefined {
    return undefined
}

function toHealthElementLaterality(domain: Condition): HealthElementDto.LateralityEnum | undefined {
    return undefined
}

function toHealthElementPlansOfAction(domain: Condition): PlanOfAction[] | undefined {
    return undefined
}

function toHealthElementEpisodes(domain: Condition): Episode[] | undefined {
    return undefined
}

function toHealthElementCareTeam(domain: Condition): CareTeamMember[] | undefined {
    return undefined
}

function toHealthElementSecretForeignKeys(domain: Condition): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementCryptedForeignKeys(domain: Condition):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementDelegations(domain: Condition):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toHealthElementEncryptionKeys(domain: Condition):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toHealthElementEncryptedSelf(domain: Condition): string | undefined {
    return !!domain.systemMetaData ? toEncryptedSelf(domain.systemMetaData) : undefined
}

function toConditionId(dto: HealthElementDto): string | undefined {
    return dto.id
}

function toConditionIdentifiers(dto: HealthElementDto): Identifier[] | undefined {
    return !!dto.identifiers ? [...dto.identifiers].map(mapIdentifierDtoToIdentifier) : undefined
}

function toConditionRev(dto: HealthElementDto): string | undefined {
    return dto.rev
}

function toConditionCreated(dto: HealthElementDto): number | undefined {
    return dto.created
}

function toConditionModified(dto: HealthElementDto): number | undefined {
    return dto.modified
}

function toConditionAuthor(dto: HealthElementDto): string | undefined {
    return dto.author
}

function toConditionResponsible(dto: HealthElementDto): string | undefined {
    return dto.responsible
}

function toConditionMedicalLocationId(dto: HealthElementDto): string | undefined {
    return dto.medicalLocationId
}

function toConditionClinicalStatus(dto: HealthElementDto): ClinicalStatusEnum | undefined {
    const clinicalStatusTag = dto.tags?.find((v) => v.context === 'Condition.clinicalStatus')
    return clinicalStatusTag ? ClinicalStatusEnum.fromCodeStub(clinicalStatusTag) : undefined
}

function toConditionVerificationStatus(dto: HealthElementDto): VerificationStatusEnum | undefined {
    const verificationStatusTag = dto.tags?.find((v) => v.context === 'Condition.verificationStatus')
    return verificationStatusTag ? VerificationStatusEnum.fromCodeStub(verificationStatusTag) : undefined
}

function toConditionCategory(dto: HealthElementDto): CategoryEnum | undefined {
    const categoryTag = dto.tags?.find((v) => v.context === 'Condition.category')
    return categoryTag ? CategoryEnum.fromCodeStub(categoryTag) : undefined
}

function toConditionSeverity(dto: HealthElementDto): SeverityEnum | undefined {
    const severityTag = dto.tags?.find((v) => v.context === 'Condition.severity')
    return severityTag ? SeverityEnum.fromCodeStub(severityTag) : undefined
}

function toConditionBodySite(dto: HealthElementDto): Set<CodingReference> | undefined {
    const bodySites = dto.tags?.filter((v) => v.context === 'Condition.bodySite')

    if (!bodySites) {
        return undefined
    }

    return new Set(bodySites.map(mapCodeStubToCodingReference))
}

function toConditionTags(dto: HealthElementDto): Set<CodingReference> | undefined {
    const contexts = ['clinicalStatus', 'verificationStatus', 'category', 'severity', 'bodySite'].map((v) => `Condition.${v}`)
    const tags = dto.tags?.filter((v) => (!!v.context ? !contexts.includes(v.context) : true))

    return filteringOutInternalTags('condition', tags)
}

function toConditionCodes(dto: HealthElementDto): Set<CodingReference> | undefined {
    return dto.codes ? new Set([...dto.codes].map(mapCodeStubToCodingReference)) : undefined
}

function toConditionEndOfLife(dto: HealthElementDto): number | undefined {
    return dto.endOfLife
}

function toConditionDeletionDate(dto: HealthElementDto): number | undefined {
    return dto.deletionDate
}

function toConditionHealthcareElementId(dto: HealthElementDto): string | undefined {
    return dto.healthElementId
}

function toConditionRecordedDate(dto: HealthElementDto): number | undefined {
    return dto.valueDate
}

function toConditionOpeningDate(dto: HealthElementDto): number | undefined {
    return dto.openingDate
}

function toConditionClosingDate(dto: HealthElementDto): number | undefined {
    return dto.closingDate
}

function toConditionDescription(dto: HealthElementDto): string | undefined {
    return dto.descr
}

function toConditionNotes(dto: HealthElementDto): Annotation[] | undefined {
    return dto.notes ? [...dto.notes].map(mapAnnotationDtoToAnnotation) : undefined
}

function toConditionSystemMetaData(dto: HealthElementDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toHealthElementSecurityMetadata(domain: Condition): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapHealthElementToCondition(dto: HealthElementDto): Condition {
    return new Condition({
        id: toConditionId(dto),
        identifiers: toConditionIdentifiers(dto),
        rev: toConditionRev(dto),
        created: toConditionCreated(dto),
        modified: toConditionModified(dto),
        author: toConditionAuthor(dto),
        responsible: toConditionResponsible(dto),
        medicalLocationId: toConditionMedicalLocationId(dto),
        clinicalStatus: toConditionClinicalStatus(dto),
        verificationStatus: toConditionVerificationStatus(dto),
        category: toConditionCategory(dto),
        severity: toConditionSeverity(dto),
        bodySite: toConditionBodySite(dto),
        tags: toConditionTags(dto),
        codes: toConditionCodes(dto),
        endOfLife: toConditionEndOfLife(dto),
        deletionDate: toConditionDeletionDate(dto),
        healthcareElementId: toConditionHealthcareElementId(dto),
        recordedDate: toConditionRecordedDate(dto),
        openingDate: toConditionOpeningDate(dto),
        closingDate: toConditionClosingDate(dto),
        description: toConditionDescription(dto),
        notes: toConditionNotes(dto),
        systemMetaData: toConditionSystemMetaData(dto),
    })
}

export function mapConditionToHealthElement(domain: Condition): HealthElementDto {
    const id = toHealthElementId(domain)
    return new HealthElementDto({
        id: id,
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
        securityMetadata: toHealthElementSecurityMetadata(domain),
    })
}
