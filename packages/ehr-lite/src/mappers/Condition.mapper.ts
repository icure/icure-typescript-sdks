import {
    CareTeamMember,
    CodeStub,
    Delegation as DelegationDto,
    Episode,
    HealthElement,
    Identifier as IdentifierDto,
    PlanOfAction
} from '@icure/api'
import {Condition} from '../models/Condition.model'
import {
    Annotation,
    CodingReference,
    dataOwnerDomainTypeTag,
    extractDomainTypeTag,
    ICURE_DOMAIN_TYPE_ID,
    Identifier,
    mapAnnotationDtoToAnnotation,
    mapAnnotationToAnnotationDto,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    SystemMetaDataEncrypted,
    systemMetaDataTags,
} from '@icure/typescript-common'
import {Annotation as AnnotationDto} from '@icure/api/icc-api/model/Annotation'
import {ClinicalStatusEnum} from '../models/enums/ClinicalStatus.enum'
import {VerificationStatusEnum} from '../models/enums/VerificationStatus.enum'
import {CategoryEnum} from '../models/enums/Category.enum'
import {SeverityEnum} from '../models/enums/Severity.enum'
import {
    toCryptedForeignKeys,
    toDelegations,
    toEncryptedSelf,
    toEncryptionKeys,
    toSecretForeignKeys,
    toSystemMetaDataEncrypted
} from '@icure/typescript-common/dist/mappers/SystemMetaData.mapper'
import {addUniqueObjectsToArray} from "../utils/Array.utils";

function toHealthElementId(domain: Condition): string | undefined {
    return domain.id
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
    if (!domain.tags) {
        return undefined
    }

    const tags = [...(domain.tags ?? [])]
    const bodySite = [...(domain.bodySite ?? [])]

    const bodySiteCodeStubs = bodySite.map(mapCodingReferenceToCodeStub).map((c) => {
        return new CodeStub({
            ...c,
            context: 'bodySite',
        })
    })

    const clinicalStatus = new CodeStub({
        code: domain.clinicalStatus,
        context: 'clinicalStatus',
    })

    const verificationStatus = new CodeStub({
        code: domain.verificationStatus,
        context: 'verificationStatus',
    })

    const severity = new CodeStub({
        code: domain.severity,
        context: 'severity',
    })

    const category = new CodeStub({
        code: domain.category,
        context: 'category',
    })

    const tagsCodeStubs = tags.map(mapCodingReferenceToCodeStub)

    if (!!domain.rev) {
        return addUniqueObjectsToArray(tagsCodeStubs, ...bodySiteCodeStubs, clinicalStatus, severity, verificationStatus, category, ...[...systemMetaDataTags(domain.systemMetaData)].map(mapCodingReferenceToCodeStub), dataOwnerDomainTypeTag('Condition'))
    }

    return addUniqueObjectsToArray(tagsCodeStubs, ...bodySiteCodeStubs, clinicalStatus, severity, verificationStatus, category, ...[...systemMetaDataTags(domain.systemMetaData)].map(mapCodingReferenceToCodeStub))
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

function toHealthElementHealthElementId(domain: Condition): string | undefined {
    return domain.healthcareElementId
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

function toConditionIdentifiers(dto: HealthElement): Set<Identifier> | undefined {
    return !!dto.identifiers ? new Set([...dto.identifiers].map(mapIdentifierDtoToIdentifier)) : undefined
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
    return dto.tags?.find((v) => v.context === 'clinicalStatus')?.code as ClinicalStatusEnum | undefined
}

function toConditionVerificationStatus(dto: HealthElement): VerificationStatusEnum | undefined {
    return dto.tags?.find((v) => v.context === 'verificationStatus')?.code as VerificationStatusEnum | undefined
}

function toConditionCategory(dto: HealthElement): CategoryEnum | undefined {
    return dto.tags?.find((v) => v.context === 'category')?.code as CategoryEnum | undefined
}

function toConditionSeverity(dto: HealthElement): SeverityEnum | undefined {
    return dto.tags?.find((v) => v.context === 'severity')?.code as SeverityEnum | undefined
}

function toConditionBodySite(dto: HealthElement): Set<CodingReference> | undefined {
    const bodySites = dto.tags?.filter((v) => v.context === 'bodySite')

    if (!bodySites) {
        return undefined
    }

    return new Set(bodySites.map(mapCodeStubToCodingReference))
}

function toConditionTags(dto: HealthElement): Set<CodingReference> | undefined {
    const contexts = ['clinicalStatus', 'verificationStatus', 'category', 'severity', 'bodySite']
    const tags = dto.tags?.filter((v) => (!!v.context ? !contexts.includes(v.context) : true))

    const domainTypeTag = extractDomainTypeTag(dto.tags)

    if (!domainTypeTag || domainTypeTag.context !== 'Condition') {
        throw new Error('Domain type tag is missing')
    }

    const filteredTags = tags?.filter(t => t.id === ICURE_DOMAIN_TYPE_ID)

    if (!filteredTags || filteredTags.length === 0) {
        return undefined
    }

    return new Set(filteredTags.map(mapCodeStubToCodingReference))
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
    return new HealthElement({
        id: toHealthElementId(domain),
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
        healthElementId: toHealthElementHealthElementId(domain),
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
