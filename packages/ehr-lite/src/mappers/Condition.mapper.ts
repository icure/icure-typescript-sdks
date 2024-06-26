import { Condition } from '../models/Condition.model'
import {
    addUniqueObjectsToArray,
    Annotation,
    AnnotationDto,
    CareTeamMember,
    CodeStub,
    CodingReference,
    DelegationDto,
    Episode,
    filteringOutInternalTags,
    forceUuid,
    HealthElementDto,
    Identifier,
    IdentifierDto,
    mapAnnotationDtoToAnnotation,
    mapAnnotationToAnnotationDto,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    mergeTagsWithInternalTags,
    PlanOfAction,
    SecurityMetadataDto,
    SystemMetaDataEncrypted,
    toCryptedForeignKeys,
    toDelegations,
    toEncryptedSelf,
    toEncryptionKeys,
    toSecretForeignKeys,
    toSecurityMetadataDto,
    toSystemMetaDataEncrypted,
} from '@icure/typescript-common'
import { ClinicalStatusEnum } from '../models/enums/ClinicalStatus.enum'
import { VerificationStatusEnum } from '../models/enums/VerificationStatus.enum'
import { CategoryEnum } from '../models/enums/Category.enum'
import { SeverityEnum } from '../models/enums/Severity.enum'

export const CONDITION_FHIR_TYPE = 'Condition'

const BODY_SITE_CONTEXT = 'bodySite'
const CLINICAL_STATUS_CONTEXT = 'clinicalStatus'
const VERIFICATION_STATUS_CONTEXT = 'verificationStatus'
const SEVERITY_CONTEXT = 'severity'
const CATEGORY_CONTEXT = 'category'

const CONTEXTS = [BODY_SITE_CONTEXT, CLINICAL_STATUS_CONTEXT, VERIFICATION_STATUS_CONTEXT, SEVERITY_CONTEXT, CATEGORY_CONTEXT].map((context) => `${CONDITION_FHIR_TYPE}.${context}`)

function toHealthElementDtoId(domain: Condition): string {
    return forceUuid(domain.id)
}

function toHealthElementDtoIdentifiers(domain: Condition): IdentifierDto[] | undefined {
    return !!domain.identifiers ? [...domain.identifiers].map(mapIdentifierToIdentifierDto) : undefined
}

function toHealthElementDtoRev(domain: Condition): string | undefined {
    return domain.rev
}

function toHealthElementDtoCreated(domain: Condition): number | undefined {
    return domain.created
}

function toHealthElementDtoModified(domain: Condition): number | undefined {
    return domain.modified
}

function toHealthElementDtoAuthor(domain: Condition): string | undefined {
    return domain.author
}

function toHealthElementDtoResponsible(domain: Condition): string | undefined {
    return domain.responsible
}

function toHealthElementDtoMedicalLocationId(domain: Condition): string | undefined {
    return domain.medicalLocationId
}

function toHealthElementDtoTags({ bodySite, clinicalStatus, verificationStatus, severity, category, tags, systemMetaData }: Condition): CodeStub[] | undefined {
    const mappedTags = mergeTagsWithInternalTags(CONDITION_FHIR_TYPE, [...tags], systemMetaData)

    const bodySiteCodeStubs = [...(bodySite ?? [])].map(mapCodingReferenceToCodeStub).map((c) => {
        return new CodeStub({
            ...c,
            context: `${CONDITION_FHIR_TYPE}.${BODY_SITE_CONTEXT}`,
        })
    })

    const clinicalStatusCodeStubs = clinicalStatus
        ? [
              new CodeStub({
                  ...ClinicalStatusEnum.toCodeStub(clinicalStatus),
                  context: `${CONDITION_FHIR_TYPE}.${CLINICAL_STATUS_CONTEXT}`,
              }),
          ]
        : []

    const verificationStatusCodeStubs = verificationStatus
        ? [
              new CodeStub({
                  ...VerificationStatusEnum.toCodeStub(verificationStatus),
                  context: `${CONDITION_FHIR_TYPE}.${VERIFICATION_STATUS_CONTEXT}`,
              }),
          ]
        : []

    const severityCodeStubs = severity
        ? [
              new CodeStub({
                  ...SeverityEnum.toCodeStub(severity),
                  context: `${CONDITION_FHIR_TYPE}.${SEVERITY_CONTEXT}`,
              }),
          ]
        : []

    const categoryCodeStubs = category
        ? [
              new CodeStub({
                  ...CategoryEnum.toCodeStub(category),
                  context: `${CONDITION_FHIR_TYPE}.${CATEGORY_CONTEXT}`,
              }),
          ]
        : []

    return addUniqueObjectsToArray(mappedTags, ...bodySiteCodeStubs, ...clinicalStatusCodeStubs, ...severityCodeStubs, ...verificationStatusCodeStubs, ...categoryCodeStubs)
}

function toHealthElementDtoCodes(domain: Condition): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthElementDtoEndOfLife(domain: Condition): number | undefined {
    return domain.endOfLife
}

function toHealthElementDtoDeletionDate(domain: Condition): number | undefined {
    return domain.deletionDate
}

function toHealthElementDtoHealthElementId(domain: Condition, initialisedId: string): string {
    return domain.healthcareElementId ?? initialisedId
}

function toHealthElementDtoValueDate(domain: Condition): number | undefined {
    return domain.recordedDate
}

function toHealthElementDtoOpeningDate(domain: Condition): number | undefined {
    return domain.openingDate
}

function toHealthElementDtoClosingDate(domain: Condition): number | undefined {
    return domain.closingDate
}

function toHealthElementDtoDescr(domain: Condition): string | undefined {
    return domain.description
}

function toHealthElementDtoNote(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementDtoNotes(domain: Condition): AnnotationDto[] | undefined {
    return !!domain.notes ? [...domain.notes].map(mapAnnotationToAnnotationDto) : undefined
}

function toHealthElementDtoRelevant(domain: Condition): boolean | undefined {
    return undefined
}

function toHealthElementDtoIdOpeningContact(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementDtoIdClosingContact(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementDtoIdService(domain: Condition): string | undefined {
    return undefined
}

function toHealthElementDtoStatus(domain: Condition): number | undefined {
    return undefined
}

function toHealthElementDtoLaterality(domain: Condition): HealthElementDto.LateralityEnum | undefined {
    return undefined
}

function toHealthElementDtoPlansOfAction(domain: Condition): PlanOfAction[] | undefined {
    return undefined
}

function toHealthElementDtoEpisodes(domain: Condition): Episode[] | undefined {
    return undefined
}

function toHealthElementDtoCareTeam(domain: Condition): CareTeamMember[] | undefined {
    return undefined
}

function toHealthElementDtoSecretForeignKeys(domain: Condition): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementDtoCryptedForeignKeys(domain: Condition):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toHealthElementDtoDelegations(domain: Condition):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toHealthElementDtoEncryptionKeys(domain: Condition):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toHealthElementDtoEncryptedSelf(domain: Condition): string | undefined {
    return !!domain.systemMetaData ? toEncryptedSelf(domain.systemMetaData) : undefined
}

function toConditionId(dto: HealthElementDto): string | undefined {
    return dto.id
}

function toConditionIdentifiers(dto: HealthElementDto): Identifier[] {
    return !!dto.identifiers ? [...dto.identifiers].map(mapIdentifierDtoToIdentifier) : []
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
    const clinicalStatusTag = dto.tags?.find((v) => v.context === `${CONDITION_FHIR_TYPE}.${BODY_SITE_CONTEXT}`)
    return clinicalStatusTag ? ClinicalStatusEnum.fromCodeStub(clinicalStatusTag) : undefined
}

function toConditionVerificationStatus(dto: HealthElementDto): VerificationStatusEnum | undefined {
    const verificationStatusTag = dto.tags?.find((v) => v.context === `${CONDITION_FHIR_TYPE}.${CLINICAL_STATUS_CONTEXT}`)
    return verificationStatusTag ? VerificationStatusEnum.fromCodeStub(verificationStatusTag) : undefined
}

function toConditionCategory(dto: HealthElementDto): CategoryEnum | undefined {
    const categoryTag = dto.tags?.find((v) => v.context === `${CONDITION_FHIR_TYPE}.${VERIFICATION_STATUS_CONTEXT}`)
    return categoryTag ? CategoryEnum.fromCodeStub(categoryTag) : undefined
}

function toConditionSeverity(dto: HealthElementDto): SeverityEnum | undefined {
    const severityTag = dto.tags?.find((v) => v.context === `${CONDITION_FHIR_TYPE}.${SEVERITY_CONTEXT}`)
    return severityTag ? SeverityEnum.fromCodeStub(severityTag) : undefined
}

function toConditionBodySite(dto: HealthElementDto): Array<CodingReference> | undefined {
    const bodySites = dto.tags?.filter((v) => v.context === `${CONDITION_FHIR_TYPE}.${CATEGORY_CONTEXT}`)

    if (!bodySites) {
        return undefined
    }

    return bodySites.map(mapCodeStubToCodingReference)
}

function toConditionTags({ tags }: HealthElementDto): CodingReference[] {
    const filteredTags = filteringOutInternalTags(CONDITION_FHIR_TYPE, tags?.filter((v) => (!!v.context ? !CONTEXTS.includes(v.context) : true)))
    return filteredTags ?? []
}

function toConditionCodes(dto: HealthElementDto): Array<CodingReference> {
    return dto.codes ? [...dto.codes].map(mapCodeStubToCodingReference) : []
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

function toConditionNotes(dto: HealthElementDto): Annotation[] {
    return dto.notes ? [...dto.notes].map(mapAnnotationDtoToAnnotation) : []
}

function toConditionSystemMetaData(dto: HealthElementDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toHealthElementDtoSecurityMetadata(domain: Condition): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapHealthElementDtoToCondition(dto: HealthElementDto): Condition {
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

export function mapConditionToHealthElementDto(domain: Condition): HealthElementDto {
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
