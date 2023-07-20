import { CareTeamMember, CodeStub, Delegation as DelegationDto, Episode, HealthElement, Identifier as IdentifierDto, PlanOfAction } from '@icure/api'
import { Condition } from '../models/Condition.model'
import {
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
    toSystemMetaDataEncrypted,
} from '@icure/typescript-common'
import { Annotation as AnnotationDto } from '@icure/api/icc-api/model/Annotation'
import { ClinicalStatusEnum } from '../models/enums/ClinicalStatus.enum'
import { VerificationStatusEnum } from '../models/enums/VerificationStatus.enum'
import { CategoryEnum } from '../models/enums/Category.enum'
import { SeverityEnum } from '../models/enums/Severity.enum'
import { addUniqueObjectsToArray } from '@icure/typescript-common'

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
    const mappedTags = mergeTagsWithInternalTags('Condition', domain.tags, domain.systemMetaData)

    const bodySite = [...(domain.bodySite ?? [])]

    const bodySiteCodeStubs = bodySite.map(mapCodingReferenceToCodeStub).map((c) => {
        return new CodeStub({
            ...c,
            context: 'Condition.bodySite',
        })
    })

    const clinicalStatus = domain.clinicalStatus ? [new CodeStub({
        ...ClinicalStatusEnum.toCodeStub(domain.clinicalStatus),
        context: 'Condition.clinicalStatus',
    })] : []

    const verificationStatus = domain.verificationStatus ? [new CodeStub({
        ...VerificationStatusEnum.toCodeStub(domain.verificationStatus),
        context: 'Condition.verificationStatus',
    })] : []

    const severity = domain.severity ? [new CodeStub({
        ...SeverityEnum.toCodeStub(domain.severity),
        context: 'Condition.severity',
    })] : []

    const category = domain.category ? [new CodeStub({
        ...CategoryEnum.toCodeStub(domain.category),
        context: 'Condition.category',
    })] : []

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

function toHealthElementLaterality(domain: Condition): HealthElement.LateralityEnum | undefined {
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

function toConditionId(dto: HealthElement): string | undefined {
    return dto.id
}

function toConditionIdentifiers(dto: HealthElement): Identifier[] | undefined {
    return !!dto.identifiers ? [...dto.identifiers].map(mapIdentifierDtoToIdentifier) : undefined
}

function toConditionRev(dto: HealthElement): string | undefined {
    return dto.rev
}

function toConditionCreated(dto: HealthElement): number | undefined {
    return dto.created
}

function toConditionModified(dto: HealthElement): number | undefined {
    return dto.modified
}

function toConditionAuthor(dto: HealthElement): string | undefined {
    return dto.author
}

function toConditionResponsible(dto: HealthElement): string | undefined {
    return dto.responsible
}

function toConditionMedicalLocationId(dto: HealthElement): string | undefined {
    return dto.medicalLocationId
}

function toConditionClinicalStatus(dto: HealthElement): ClinicalStatusEnum | undefined {
    const clinicalStatusTag = dto.tags?.find((v) => v.context === 'Condition.clinicalStatus')
    return clinicalStatusTag ? ClinicalStatusEnum.fromCodeStub(clinicalStatusTag) : undefined
}

function toConditionVerificationStatus(dto: HealthElement): VerificationStatusEnum | undefined {
    const verificationStatusTag = dto.tags?.find((v) => v.context === 'Condition.verificationStatus')
    return verificationStatusTag ? VerificationStatusEnum.fromCodeStub(verificationStatusTag) : undefined
}

function toConditionCategory(dto: HealthElement): CategoryEnum | undefined {
    const categoryTag = dto.tags?.find((v) => v.context === 'Condition.category')
    return categoryTag ? CategoryEnum.fromCodeStub(categoryTag) : undefined
}

function toConditionSeverity(dto: HealthElement): SeverityEnum | undefined {
    const severityTag = dto.tags?.find((v) => v.context === 'Condition.severity')
    return severityTag ? SeverityEnum.fromCodeStub(severityTag) : undefined
}

function toConditionBodySite(dto: HealthElement): Set<CodingReference> | undefined {
    const bodySites = dto.tags?.filter((v) => v.context === 'Condition.bodySite')

    if (!bodySites) {
        return undefined
    }

    return new Set(bodySites.map(mapCodeStubToCodingReference))
}

function toConditionTags(dto: HealthElement): Set<CodingReference> | undefined {
    const contexts = ['clinicalStatus', 'verificationStatus', 'category', 'severity', 'bodySite'].map((v) => `Condition.${v}`)
    const tags = dto.tags?.filter((v) => (!!v.context ? !contexts.includes(v.context) : true))

    return filteringOutInternalTags('Condition', tags)
}

function toConditionCodes(dto: HealthElement): Set<CodingReference> | undefined {
    return dto.codes ? new Set([...dto.codes].map(mapCodeStubToCodingReference)) : undefined
}

function toConditionEndOfLife(dto: HealthElement): number | undefined {
    return dto.endOfLife
}

function toConditionDeletionDate(dto: HealthElement): number | undefined {
    return dto.deletionDate
}

function toConditionHealthcareElementId(dto: HealthElement): string | undefined {
    return dto.healthElementId
}

function toConditionRecordedDate(dto: HealthElement): number | undefined {
    return dto.valueDate
}

function toConditionOpeningDate(dto: HealthElement): number | undefined {
    return dto.openingDate
}

function toConditionClosingDate(dto: HealthElement): number | undefined {
    return dto.closingDate
}

function toConditionDescription(dto: HealthElement): string | undefined {
    return dto.descr
}

function toConditionNotes(dto: HealthElement): Annotation[] | undefined {
    return dto.notes ? [...dto.notes].map(mapAnnotationDtoToAnnotation) : undefined
}

function toConditionSystemMetaData(dto: HealthElement): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

export function mapHealthElementToCondition(dto: HealthElement): Condition {
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

export function mapConditionToHealthElement(domain: Condition): HealthElement {
    const id = toHealthElementId(domain)
    return new HealthElement({
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
    })
}
