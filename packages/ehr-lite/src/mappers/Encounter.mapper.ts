import { Encounter } from '../models/Encounter.model'
import {
    Annotation,
    AnnotationDto,
    CodeStub,
    CodingReference,
    ContactDto,
    Delegation,
    filteringOutInternalTags,
    forceUuid,
    Identifier,
    IdentifierDto,
    mapAnnotationDtoToAnnotation,
    mapAnnotationToAnnotationDto,
    mapCodeStubToCodingReference,
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

const REASON_CONTEXT = 'reason'
const CONTEXTS = [REASON_CONTEXT].map((context) => `${ENCOUNTER_FHIR_TYPE}.${context}`)

export const ENCOUNTER_FHIR_TYPE = 'Encounter'

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

function toContactDtoResponsible({ performer }: Encounter): string | undefined {
    return performer
}

function toContactDtoMedicalLocationId(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoTags({ tags, reasonCode, systemMetaData }: Encounter): CodeStub[] | undefined {
    return mergeTagsWithInternalTags(ENCOUNTER_FHIR_TYPE, [...tags, ...(reasonCode?.map((tag) => new CodingReference({ ...tag, context: REASON_CONTEXT })) ?? [])], systemMetaData)
}

function toContactDtoCodes({ codes }: Encounter): CodeStub[] | undefined {
    return codes.map(mapCodeStubToCodingReference)
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

function toContactDtoEncounterType({ type }: Encounter): CodeStub | undefined {
    return type ? mapCodeStubToCodingReference(type) : undefined
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

function toContactDtoHealthcarePartyId({ performer }: Encounter): string | undefined {
    return performer
}

function toContactDtoModifiedContactId(domain: Encounter): string | undefined {
    return undefined
}

function toContactDtoSecretForeignKeys({ systemMetaData }: Encounter): string[] | undefined {
    return toSecretForeignKeys(systemMetaData)
}

function toContactDtoCryptedForeignKeys({ systemMetaData }: Encounter): { [key: string]: Delegation[] } | undefined {
    return toCryptedForeignKeys(systemMetaData)
}

function toContactDtoDelegations({ systemMetaData }: Encounter): { [key: string]: Delegation[] } | undefined {
    return toDelegations(systemMetaData)
}

function toContactDtoEncryptionKeys({ systemMetaData }: Encounter): { [key: string]: Delegation[] } | undefined {
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
    return filteringOutInternalTags(ENCOUNTER_FHIR_TYPE, tags?.filter((tag) => (tag.context ? !CONTEXTS.includes(tag.context) : true)))
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

function toEncounterReasonCode({ tags }: ContactDto): CodingReference[] | undefined {
    return tags?.filter((tag) => tag.context === REASON_CONTEXT).map(mapCodeStubToCodingReference)
}

function toEncounterServiceProvider({ responsible }: ContactDto): string | undefined {
    return responsible
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

function toEncounterPerformer({ responsible }: ContactDto): string | undefined {
    return responsible
}

function toEncounterImmunizations({ services }: ContactDto): Immunization[] | undefined {
    return services?.filter((service) => service.tags?.some((tag) => tag.code?.toUpperCase() === IMMUNIZATION_FHIR_TYPE.toUpperCase()))?.map(mapServiceDtoToImmunization)
}

function toEncounterObservations({ services }: ContactDto): Observation[] | undefined {
    return services?.filter((service) => service.tags?.some((tag) => tag.code?.toUpperCase() === OBSERVATION_FHIR_TYPE.toUpperCase()))?.map(mapServiceDtoToObservation)
}

export function mapContactDtoToEncounter(dto: ContactDto): Encounter {
    return new Encounter({
        id: toEncounterId(dto),
        rev: toEncounterRev(dto),
        identifiers: toEncounterIdentifiers(dto),
        codes: toEncounterCodes(dto),
        tags: toEncounterTags(dto),
        type: toEncounterType(dto),
        startTime: toEncounterStartTime(dto),
        endTime: toEncounterEndTime(dto),
        reasonCode: toEncounterReasonCode(dto),
        diagnosis: toEncounterDiagnosis(dto),
        serviceProvider: toEncounterServiceProvider(dto),
        created: toEncounterCreated(dto),
        modified: toEncounterModified(dto),
        endOfLife: toEncounterEndOfLife(dto),
        author: toEncounterAuthor(dto),
        performer: toEncounterPerformer(dto),
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
