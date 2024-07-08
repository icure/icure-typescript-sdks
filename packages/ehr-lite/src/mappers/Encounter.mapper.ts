import { Encounter } from '../models/Encounter.model'
import {
    addUniqueObjectsToArray,
    Annotation,
    AnnotationDto,
    CodeStub,
    CodingReference,
    ContactDto,
    Delegation,
    DelegationDto,
    filteringOutInternalTags,
    forceUuid,
    Identifier,
    IdentifierDto,
    mapAnnotationDtoToAnnotation,
    mapAnnotationToAnnotationDto,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    mergeTagsWithInternalTags,
    SecurityMetadataDto,
    ServiceDto,
    SubContactDto,
    SystemMetaDataEncrypted,
    toCryptedForeignKeys,
    toDelegations,
    toEncryptedSelf,
    toEncryptionKeys,
    toSecretForeignKeys,
    toSecurityMetadataDto,
    toSystemMetaDataEncrypted,
} from '@icure/typescript-common'
import { IMMUNIZATION_FHIR_TYPE, mapImmunizationToServiceDto, mapServiceDtoToImmunization } from './Immunization.mapper'
import { mapObservationToServiceDto, mapServiceDtoToObservation, OBSERVATION_FHIR_TYPE } from './Observation.mapper'
import { Immunization } from '../models/Immunization.model'
import { Observation } from '../models/Observation.model'
import { EncounterClass } from '../models/enums/EncounterClass.enum'

export const ENCOUNTER_FHIR_TYPE = 'Encounter'

const REASON_CONTEXT = 'reason'
const CLASS_CONTEXT = 'class'
const CONTEXTS = [REASON_CONTEXT, CLASS_CONTEXT].map((context) => `${ENCOUNTER_FHIR_TYPE}.${context}`)

function toContactDtoId(domain: Encounter): string | undefined {
    return forceUuid(domain.id)
}

function toContactDtoRev({ rev }: Encounter): string | undefined {
    return rev
}

function toContactDtoCreated({ created }: Encounter): number | undefined {
    return created
}

function toContactDtoModified({ modified }: Encounter): number | undefined {
    return modified
}

function toContactDtoAuthor({ author }: Encounter): string | undefined {
    return author
}

function toContactDtoResponsible({ serviceProvider }: Encounter): string | undefined {
    return serviceProvider
}

function toContactDtoMedicalLocationId(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoTags({ tags, systemMetaData }: Encounter): CodeStub[] | undefined {
    return mergeTagsWithInternalTags(ENCOUNTER_FHIR_TYPE, tags, systemMetaData)
}

function toContactDtoCodes({ codes, reasonCodes }: Encounter): CodeStub[] | undefined {
    return codes
        ? addUniqueObjectsToArray(
              codes.map(mapCodingReferenceToCodeStub),
              ...reasonCodes?.map((tag) => new CodingReference({ id: tag.id, code: tag.code, version: tag.version, contextLabel: tag.contextLabel, context: `${ENCOUNTER_FHIR_TYPE}.${REASON_CONTEXT}` }))?.map(mapCodingReferenceToCodeStub),
          )
        : undefined
}

function toContactDtoIdentifier({ identifiers }: Encounter): IdentifierDto[] | undefined {
    return identifiers?.map(mapIdentifierToIdentifierDto)
}

function toContactDtoEndOfLife({ endOfLife }: Encounter): number | undefined {
    return endOfLife
}

function toContactDtoDeletionDate({ endOfLife }: Encounter): number | undefined {
    return endOfLife
}

function toContactDtoGroupId(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoOpeningDate({ startTime }: Encounter): number | undefined {
    return startTime
}

function toContactDtoClosingDate({ endTime }: Encounter): number | undefined {
    return endTime
}

function toContactDtoDescr(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoLocation(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoExternalId(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoEncounterType({ encounterClass }: Encounter): CodeStub | undefined {
    return EncounterClass.toCodeStub(encounterClass)
}

function toContactDtoSubContacts(domain: Encounter): SubContactDto[] | undefined {
    return undefined
}

/**
 * Maps immunizations and observations to services
 *
 * Sorts the services by index, non-indexed services are sorted last
 *
 * @param immunizations
 * @param observations
 */
function toContactDtoServices({ immunizations, observations }: Encounter): ServiceDto[] | undefined {
    const services: ServiceDto[] = [...(immunizations?.map(mapImmunizationToServiceDto) ?? []), ...(observations?.map(mapObservationToServiceDto) ?? [])]

    return services.sort((a, b) => {
        if (a.index !== undefined && b.index !== undefined) {
            return a.index - b.index
        }
        if (a.index !== undefined) {
            return -1
        }
        if (b.index !== undefined) {
            return 1
        }
        return 0
    })
}

function toContactDtoHealthcarePartyId({ serviceProvider }: Encounter): string | undefined {
    return serviceProvider
}

function toContactDtoModifiedContactId(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoSecretForeignKeys({ systemMetaData }: Encounter): string[] | undefined {
    return toSecretForeignKeys(systemMetaData)
}

function toContactDtoCryptedForeignKeys({ systemMetaData }: Encounter): { [key: string]: DelegationDto[] } | undefined {
    return toCryptedForeignKeys(systemMetaData)
}

function toContactDtoDelegations({ systemMetaData }: Encounter): { [key: string]: DelegationDto[] } | undefined {
    return toDelegations(systemMetaData)
}

function toContactDtoEncryptionKeys({ systemMetaData }: Encounter): { [key: string]: DelegationDto[] } | undefined {
    return toEncryptionKeys(systemMetaData)
}

function toContactDtoEncryptedSelf({ systemMetaData }: Encounter): string | undefined {
    return toEncryptedSelf(systemMetaData)
}

function toContactDtoSecurityMetadata({ systemMetaData }: Encounter): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(systemMetaData)
}

function toContactDtoNotes({ notes }: Encounter): AnnotationDto[] | undefined {
    return notes?.map(mapAnnotationToAnnotationDto)
}

function toEncounterId({ id }: ContactDto): string {
    return forceUuid(id)
}

function toEncounterIdentifiers({ identifier }: ContactDto): Identifier[] | undefined {
    return identifier?.map(mapIdentifierDtoToIdentifier)
}

function toEncounterCodes({ codes }: ContactDto): CodingReference[] | undefined {
    return codes?.map(mapCodeStubToCodingReference)
}

function toEncounterTags({ tags }: ContactDto): CodingReference[] | undefined {
    return filteringOutInternalTags(ENCOUNTER_FHIR_TYPE, tags)
}

function toEncounterType({ encounterType }: ContactDto): CodingReference | undefined {
    return encounterType ? mapCodeStubToCodingReference(encounterType) : undefined
}

function toEncounterStartTime({ openingDate }: ContactDto): number | undefined {
    return openingDate
}

function toEncounterEndTime({ closingDate }: ContactDto): number | undefined {
    return closingDate
}

function toEncounterReasonCodes({ codes }: ContactDto): CodingReference[] | undefined {
    return codes?.filter((tag) => tag.context === `${ENCOUNTER_FHIR_TYPE}.${REASON_CONTEXT}`).map(mapCodeStubToCodingReference)
}

function toEncounterNotes({ notes }: ContactDto): Annotation[] | undefined {
    return notes?.map(mapAnnotationDtoToAnnotation)
}

function toEncounterSystemMetaData(dto: ContactDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toEncounterRev({ rev }: ContactDto): string | undefined {
    return rev
}

function toEncounterDiagnosis({ subContacts }: ContactDto): string[] | undefined {
    return subContacts?.map((subContact) => subContact.healthElementId)?.filter((id) => !!id) as string[] | undefined
}

function toEncounterCreated({ created }: ContactDto): number | undefined {
    return created
}

function toEncounterModified({ modified }: ContactDto): number | undefined {
    return modified
}

function toEncounterEndOfLife({ endOfLife }: ContactDto): number | undefined {
    return endOfLife
}

function toEncounterAuthor({ author }: ContactDto): string | undefined {
    return author
}

function toEncounterServiceProvider({ responsible }: ContactDto): string | undefined {
    return responsible
}

function toEncounterImmunizations({ services }: ContactDto): Immunization[] | undefined {
    return services?.filter((service) => service.tags?.some((tag) => tag.code?.toUpperCase() === IMMUNIZATION_FHIR_TYPE.toUpperCase()))?.map(mapServiceDtoToImmunization)
}

function toEncounterObservations({ services }: ContactDto): Observation[] | undefined {
    return services?.filter((service) => service.tags?.some((tag) => tag.code?.toUpperCase() === OBSERVATION_FHIR_TYPE.toUpperCase()))?.map(mapServiceDtoToObservation)
}

function toEncounterEncounterClass({ encounterType }: ContactDto): EncounterClass {
    if (!encounterType) {
        throw new Error('Encounter type not found in Contact and is required for Encounter mapping')
    }
    return EncounterClass.fromCodeStub(encounterType)
}

export function mapContactDtoToEncounter(dto: ContactDto): Encounter {
    return new Encounter({
        id: toEncounterId(dto),
        rev: toEncounterRev(dto),
        identifiers: toEncounterIdentifiers(dto),
        codes: toEncounterCodes(dto),
        tags: toEncounterTags(dto),
        encounterClass: toEncounterEncounterClass(dto),
        startTime: toEncounterStartTime(dto),
        endTime: toEncounterEndTime(dto),
        reasonCodes: toEncounterReasonCodes(dto),
        diagnosis: toEncounterDiagnosis(dto),
        serviceProvider: toEncounterServiceProvider(dto),
        author: toEncounterAuthor(dto),
        created: toEncounterCreated(dto),
        modified: toEncounterModified(dto),
        endOfLife: toEncounterEndOfLife(dto),
        immunizations: toEncounterImmunizations(dto),
        observations: toEncounterObservations(dto),
        notes: toEncounterNotes(dto),
        systemMetaData: toEncounterSystemMetaData(dto),
    })
}

export function mapEncounterToContactDto(domain: Encounter): ContactDto {
    return new ContactDto({
        id: toContactDtoId(domain),
        rev: toContactDtoRev(domain),
        created: toContactDtoCreated(domain),
        modified: toContactDtoModified(domain),
        author: toContactDtoAuthor(domain),
        responsible: toContactDtoResponsible(domain),
        medicalLocationId: toContactDtoMedicalLocationId(domain),
        tags: toContactDtoTags(domain),
        codes: toContactDtoCodes(domain),
        identifier: toContactDtoIdentifier(domain),
        endOfLife: toContactDtoEndOfLife(domain),
        deletionDate: toContactDtoDeletionDate(domain),
        groupId: toContactDtoGroupId(domain),
        openingDate: toContactDtoOpeningDate(domain),
        closingDate: toContactDtoClosingDate(domain),
        descr: toContactDtoDescr(domain),
        location: toContactDtoLocation(domain),
        externalId: toContactDtoExternalId(domain),
        encounterType: toContactDtoEncounterType(domain),
        subContacts: toContactDtoSubContacts(domain),
        services: toContactDtoServices(domain),
        healthcarePartyId: toContactDtoHealthcarePartyId(domain),
        modifiedContactId: toContactDtoModifiedContactId(domain),
        secretForeignKeys: toContactDtoSecretForeignKeys(domain),
        cryptedForeignKeys: toContactDtoCryptedForeignKeys(domain),
        delegations: toContactDtoDelegations(domain),
        encryptionKeys: toContactDtoEncryptionKeys(domain),
        encryptedSelf: toContactDtoEncryptedSelf(domain),
        securityMetadata: toContactDtoSecurityMetadata(domain),
        notes: toContactDtoNotes(domain),
    })
}
