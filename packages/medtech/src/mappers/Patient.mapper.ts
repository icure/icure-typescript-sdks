import { Patient, PatientBirthSexEnum, PatientDeactivationReasonEnum, PatientGenderEnum, PatientPersonalStatusEnum } from '../models/Patient.model'
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
    mapPropertyStubToProperty,
    mapPropertyToPropertyStub,
    Property,
    SystemMetaDataOwnerEncrypted,
    toAesExchangeKeys,
    toCryptedForeignKeys,
    toDelegations,
    toEncryptedSelf,
    toEncryptionKeys,
    toHcPartyKeys,
    toPrivateKeyShamirPartitions,
    toPublicKey,
    toPublicKeysForOaepWithSha256,
    toSecretForeignKeys,
    toSecurityMetadataDto,
    toSystemMetaDataOwnerEncrypted,
    toTransferKeys,
    AddressDto,
    AnnotationDto,
    CodeStub,
    DelegationDto,
    EmploymentInfo,
    FinancialInstitutionInformation,
    IdentifierDto,
    Insurability,
    MedicalHouseContract,
    PartnershipDto,
    PatientDto,
    PatientHealthCarePartyDto,
    PersonNameDto,
    PropertyStub,
    SchoolingInfo,
    SecurityMetadataDto,
} from '@icure/typescript-common'
import { PersonName } from '../models/PersonName.model'
import { Address } from '../models/Address.model'
import { Partnership } from '../models/Partnership.model'
import { PatientHealthCareParty } from '../models/PatientHealthCareParty.model'
import { mapPersonNameDtoToPersonName, mapPersonNameToPersonNameDto } from './PersonName.mapper'
import { mapAddressDtoToAddress, mapAddressToAddressDto } from './Address.mapper'
import { mapPartnershipDtoToPartnership, mapPartnershipToPartnershipDto } from './Partnership.mapper'
import { mapPatientHealthCarePartyDtoToPatientHealthCareParty, mapPatientHealthCarePartyToPatientHealthCarePartyDto } from './PatientHealthCareParty.mapper'
import { b64_2ab, ua2b64 } from '@icure/api'

function toPatientDtoId(domain: Patient): string | undefined {
    return forceUuid(domain.id)
}

function toPatientDtoRev(domain: Patient): string | undefined {
    return domain.rev
}

function toPatientDtoIdentifier(domain: Patient): IdentifierDto[] | undefined {
    return domain.identifiers ? [...domain.identifiers].map(mapIdentifierToIdentifierDto) : undefined
}

function toPatientDtoCreated(domain: Patient): number | undefined {
    return domain.created
}

function toPatientDtoModified(domain: Patient): number | undefined {
    return domain.modified
}

function toPatientDtoAuthor(domain: Patient): string | undefined {
    return domain.author
}

function toPatientDtoResponsible(domain: Patient): string | undefined {
    return domain.responsible
}

function toPatientDtoTags(domain: Patient): CodeStub[] | undefined {
    return domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toPatientDtoCodes(domain: Patient): CodeStub[] | undefined {
    return domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toPatientDtoEndOfLife(domain: Patient): number | undefined {
    return domain.endOfLife
}

function toPatientDtoDeletionDate(domain: Patient): number | undefined {
    return domain.deletionDate
}

function toPatientDtoFirstName(domain: Patient): string | undefined {
    return domain.firstName
}

function toPatientDtoLastName(domain: Patient): string | undefined {
    return domain.lastName
}

function toPatientDtoNames(domain: Patient): PersonNameDto[] | undefined {
    return domain.names ? [...domain.names].map(mapPersonNameToPersonNameDto) : undefined
}

function toPatientDtoCompanyName(domain: Patient): string | undefined {
    return domain.companyName
}

function toPatientDtoLanguages(domain: Patient): string[] | undefined {
    return domain.languages ? [...domain.languages] : undefined
}

function toPatientDtoAddresses(domain: Patient): AddressDto[] | undefined {
    return domain.addresses ? [...domain.addresses].map(mapAddressToAddressDto) : undefined
}

function toPatientDtoCivility(domain: Patient): string | undefined {
    return domain.civility
}

function toPatientDtoGender(domain: Patient): PatientDto.GenderEnum | undefined {
    return domain.gender
}

function toPatientDtoBirthSex(domain: Patient): PatientDto.BirthSexEnum | undefined {
    return domain.birthSex
}

function toPatientDtoMergeToPatientId(domain: Patient): string | undefined {
    return domain.mergeToPatientId
}

function toPatientDtoMergedIds(domain: Patient): string[] | undefined {
    return domain.mergedIds ? [...domain.mergedIds] : undefined
}

function toPatientDtoAlias(domain: Patient): string | undefined {
    return domain.alias
}

function toPatientDtoActive(domain: Patient): boolean | undefined {
    return domain.active
}

function toPatientDtoDeactivationReason(domain: Patient): PatientDto.DeactivationReasonEnum | undefined {
    return domain.deactivationReason
}

function toPatientDtoDeactivationDate(domain: Patient): number | undefined {
    return domain.deactivationDate
}

function toPatientDtoSsin(domain: Patient): string | undefined {
    return domain.ssin
}

function toPatientDtoMaidenName(domain: Patient): string | undefined {
    return domain.maidenName
}

function toPatientDtoSpouseName(domain: Patient): string | undefined {
    return domain.spouseName
}

function toPatientDtoPartnerName(domain: Patient): string | undefined {
    return domain.partnerName
}

function toPatientDtoPersonalStatus(domain: Patient): PatientDto.PersonalStatusEnum | undefined {
    return domain.personalStatus
}

function toPatientDtoDateOfBirth(domain: Patient): number | undefined {
    return domain.dateOfBirth
}

function toPatientDtoDateOfDeath(domain: Patient): number | undefined {
    return domain.dateOfDeath
}

function toPatientDtoTimestampOfLatestEidReading(domain: Patient): number | undefined {
    return undefined
}

function toPatientDtoPlaceOfBirth(domain: Patient): string | undefined {
    return domain.placeOfBirth
}

function toPatientDtoPlaceOfDeath(domain: Patient): string | undefined {
    return domain.placeOfDeath
}

function toPatientDtoDeceased(domain: Patient): boolean | undefined {
    return domain.deceased
}

function toPatientDtoEducation(domain: Patient): string | undefined {
    return domain.education
}

function toPatientDtoProfession(domain: Patient): string | undefined {
    return domain.profession
}

function toPatientDtoNote(domain: Patient): string | undefined {
    return domain.note
}

function toPatientDtoAdministrativeNote(domain: Patient): string | undefined {
    return domain.administrativeNote
}

function toPatientDtoNotes(domain: Patient): AnnotationDto[] | undefined {
    return domain.notes ? [...domain.notes].map(mapAnnotationToAnnotationDto) : undefined
}

function toPatientDtoNationality(domain: Patient): string | undefined {
    return domain.nationality
}

function toPatientDtoRace(domain: Patient): string | undefined {
    return domain.race
}

function toPatientDtoEthnicity(domain: Patient): string | undefined {
    return domain.ethnicity
}

function toPatientDtoPreferredUserId(domain: Patient): string | undefined {
    return undefined
}

function toPatientDtoPicture(domain: Patient): ArrayBuffer | undefined {
    return domain.picture ? b64_2ab(domain.picture) : undefined
}

function toPatientDtoExternalId(domain: Patient): string | undefined {
    return domain.externalId
}

function toPatientDtoInsurabilities(domain: Patient): Insurability[] | undefined {
    return undefined
}

function toPatientDtoPartnerships(domain: Patient): PartnershipDto[] | undefined {
    return domain.partnerships ? [...domain.partnerships].map(mapPartnershipToPartnershipDto) : undefined
}

function toPatientDtoPatientHealthCareParties(domain: Patient): PatientHealthCarePartyDto[] | undefined {
    return domain.patientHealthCareParties ? [...domain.patientHealthCareParties].map(mapPatientHealthCarePartyToPatientHealthCarePartyDto) : undefined
}

function toPatientDtoFinancialInstitutionInformation(domain: Patient): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toPatientDtoMedicalHouseContracts(domain: Patient): MedicalHouseContract[] | undefined {
    return undefined
}

function toPatientDtoPatientProfessions(domain: Patient): CodeStub[] | undefined {
    return domain.patientProfessions ? [...domain.patientProfessions].map(mapCodingReferenceToCodeStub) : undefined
}

function toPatientDtoParameters(domain: Patient): { [key: string]: string[] } | undefined {
    return domain.parameters ? Object.fromEntries(Object.entries(domain.parameters)) : undefined
}

function toPatientDtoProperties(domain: Patient): PropertyStub[] | undefined {
    return domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toPatientDtoHcPartyKeys(domain: Patient): { [key: string]: string[] } | undefined {
    return !!domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toPatientDtoAesExchangeKeys(domain: Patient):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return !!domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toPatientDtoTransferKeys(domain: Patient): { [key: string]: { [key: string]: string } } | undefined {
    return !!domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toPatientDtoPrivateKeyShamirPartitions(domain: Patient): { [key: string]: string } | undefined {
    return !!domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toPatientDtoPublicKey(domain: Patient): string | undefined {
    return !!domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toPatientDtoPublicKeysForOaepWithSha256(domain: Patient): string[] | undefined {
    return !!domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toPatientDtoSecretForeignKeys(domain: Patient): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toPatientDtoCryptedForeignKeys(domain: Patient):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toPatientDtoDelegations(domain: Patient):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toPatientDtoEncryptionKeys(domain: Patient):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toPatientDtoEncryptedSelf(domain: Patient): string | undefined {
    return !!domain.systemMetaData ? toEncryptedSelf(domain.systemMetaData) : undefined
}

function toPatientDtoMedicalLocationId(domain: Patient): string | undefined {
    return undefined
}

function toPatientDtoNonDuplicateIds(domain: Patient): string[] | undefined {
    return undefined
}

function toPatientDtoEncryptedAdministrativesDocuments(domain: Patient): string[] | undefined {
    return undefined
}

function toPatientDtoComment(domain: Patient): string | undefined {
    return undefined
}

function toPatientDtoWarning(domain: Patient): string | undefined {
    return undefined
}

function toPatientDtoFatherBirthCountry(domain: Patient): CodeStub | undefined {
    return undefined
}

function toPatientDtoBirthCountry(domain: Patient): CodeStub | undefined {
    return undefined
}

function toPatientDtoNativeCountry(domain: Patient): CodeStub | undefined {
    return undefined
}

function toPatientDtoSocialStatus(domain: Patient): CodeStub | undefined {
    return undefined
}

function toPatientDtoMainSourceOfIncome(domain: Patient): CodeStub | undefined {
    return undefined
}

function toPatientDtoSchoolingInfos(domain: Patient): SchoolingInfo[] | undefined {
    return undefined
}

function toPatientDtoEmployementInfos(domain: Patient): EmploymentInfo[] | undefined {
    return undefined
}

function toPatientId(dto: PatientDto): string | undefined {
    return dto.id
}

function toPatientRev(dto: PatientDto): string | undefined {
    return dto.rev
}

function toPatientIdentifiers(dto: PatientDto): Identifier[] {
    return dto.identifier ? dto.identifier.map(mapIdentifierDtoToIdentifier) : []
}

function toPatientCreated(dto: PatientDto): number | undefined {
    return dto.created
}

function toPatientModified(dto: PatientDto): number | undefined {
    return dto.modified
}

function toPatientAuthor(dto: PatientDto): string | undefined {
    return dto.author
}

function toPatientResponsible(dto: PatientDto): string | undefined {
    return dto.responsible
}

function toPatientLabels(dto: PatientDto): Array<CodingReference> {
    return dto.tags ? dto.tags.map(mapCodeStubToCodingReference) : []
}

function toPatientCodes(dto: PatientDto): Array<CodingReference> {
    return dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : []
}

function toPatientEndOfLife(dto: PatientDto): number | undefined {
    return dto.endOfLife
}

function toPatientDeletionDate(dto: PatientDto): number | undefined {
    return dto.deletionDate
}

function toPatientFirstName(dto: PatientDto): string | undefined {
    return dto.firstName
}

function toPatientLastName(dto: PatientDto): string | undefined {
    return dto.lastName
}

function toPatientNames(dto: PatientDto): PersonName[] {
    return dto.names ? dto.names.map(mapPersonNameDtoToPersonName) : []
}

function toPatientCompanyName(dto: PatientDto): string | undefined {
    return dto.companyName
}

function toPatientLanguages(dto: PatientDto): string[] {
    return dto.languages ? dto.languages : []
}

function toPatientAddresses(dto: PatientDto): Address[] {
    return dto.addresses ? dto.addresses.map(mapAddressDtoToAddress) : []
}

function toPatientCivility(dto: PatientDto): string | undefined {
    return dto.civility
}

function toPatientGender(dto: PatientDto): PatientGenderEnum | undefined {
    return dto.gender
}

function toPatientBirthSex(dto: PatientDto): PatientBirthSexEnum | undefined {
    return dto.birthSex
}

function toPatientMergeToPatientId(dto: PatientDto): string | undefined {
    return dto.mergeToPatientId
}

function toPatientMergedIds(dto: PatientDto): Array<string> {
    return dto.mergedIds ? dto.mergedIds : []
}

function toPatientAlias(dto: PatientDto): string | undefined {
    return dto.alias
}

function toPatientActive(dto: PatientDto): boolean | undefined {
    return dto.active
}

function toPatientDeactivationReason(dto: PatientDto): PatientDeactivationReasonEnum | undefined {
    return dto.deactivationReason
}

function toPatientSsin(dto: PatientDto): string | undefined {
    return dto.ssin
}

function toPatientMaidenName(dto: PatientDto): string | undefined {
    return dto.maidenName
}

function toPatientSpouseName(dto: PatientDto): string | undefined {
    return dto.spouseName
}

function toPatientPartnerName(dto: PatientDto): string | undefined {
    return dto.partnerName
}

function toPatientPersonalStatus(dto: PatientDto): PatientPersonalStatusEnum | undefined {
    return dto.personalStatus
}

function toPatientDateOfBirth(dto: PatientDto): number | undefined {
    return dto.dateOfBirth
}

function toPatientDateOfDeath(dto: PatientDto): number | undefined {
    return dto.dateOfDeath
}

function toPatientPlaceOfBirth(dto: PatientDto): string | undefined {
    return dto.placeOfBirth
}

function toPatientPlaceOfDeath(dto: PatientDto): string | undefined {
    return dto.placeOfDeath
}

function toPatientDeceased(dto: PatientDto): boolean | undefined {
    return dto.deceased
}

function toPatientEducation(dto: PatientDto): string | undefined {
    return dto.education
}

function toPatientProfession(dto: PatientDto): string | undefined {
    return dto.profession
}

function toPatientNote(dto: PatientDto): string | undefined {
    return dto.note
}

function toPatientAdministrativeNote(dto: PatientDto): string | undefined {
    return dto.administrativeNote
}

function toPatientNationality(dto: PatientDto): string | undefined {
    return dto.nationality
}

function toPatientRace(dto: PatientDto): string | undefined {
    return dto.race
}

function toPatientEthnicity(dto: PatientDto): string | undefined {
    return dto.ethnicity
}

function toPatientPicture(dto: PatientDto): string | undefined {
    return dto.picture ? ua2b64(dto.picture) : undefined
}

function toPatientExternalId(dto: PatientDto): string | undefined {
    return dto.externalId
}

function toPatientPartnerships(dto: PatientDto): Partnership[] {
    return dto.partnerships ? dto.partnerships.map(mapPartnershipDtoToPartnership) : []
}

function toPatientPatientHealthCareParties(dto: PatientDto): PatientHealthCareParty[] {
    return dto.patientHealthCareParties ? dto.patientHealthCareParties.map(mapPatientHealthCarePartyDtoToPatientHealthCareParty) : []
}

function toPatientPatientProfessions(dto: PatientDto): CodingReference[] {
    return dto.patientProfessions ? dto.patientProfessions.map(mapCodeStubToCodingReference) : []
}

function toPatientParameters(dto: PatientDto): Record<string, string[]> | undefined {
    return dto.parameters ? Object.fromEntries(Object.entries(dto.parameters)) : undefined
}

function toPatientProperties(dto: PatientDto): Array<Property> {
    return dto.properties ? dto.properties.map(mapPropertyStubToProperty) : []
}

function toPatientSystemMetaData(dto: PatientDto): SystemMetaDataOwnerEncrypted | undefined {
    return toSystemMetaDataOwnerEncrypted(dto)
}

function toPatientDeactivationDate(dto: PatientDto): number | undefined {
    return dto.deactivationDate
}

function toPatientNotes(dto: PatientDto): Annotation[] | undefined {
    return dto.notes ? dto.notes.map(mapAnnotationDtoToAnnotation) : undefined
}

function toPatientDtoSecurityMetadata(domain: Patient): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(domain.systemMetaData)
}

export function mapPatientDtoToPatient(dto: PatientDto): Patient {
    return new Patient({
        id: toPatientId(dto),
        rev: toPatientRev(dto),
        identifiers: toPatientIdentifiers(dto),
        created: toPatientCreated(dto),
        modified: toPatientModified(dto),
        author: toPatientAuthor(dto),
        responsible: toPatientResponsible(dto),
        labels: toPatientLabels(dto),
        codes: toPatientCodes(dto),
        endOfLife: toPatientEndOfLife(dto),
        deletionDate: toPatientDeletionDate(dto),
        firstName: toPatientFirstName(dto),
        lastName: toPatientLastName(dto),
        names: toPatientNames(dto),
        companyName: toPatientCompanyName(dto),
        languages: toPatientLanguages(dto),
        addresses: toPatientAddresses(dto),
        civility: toPatientCivility(dto),
        gender: toPatientGender(dto),
        birthSex: toPatientBirthSex(dto),
        mergeToPatientId: toPatientMergeToPatientId(dto),
        mergedIds: toPatientMergedIds(dto),
        alias: toPatientAlias(dto),
        active: toPatientActive(dto),
        deactivationDate: toPatientDeactivationDate(dto),
        deactivationReason: toPatientDeactivationReason(dto),
        ssin: toPatientSsin(dto),
        maidenName: toPatientMaidenName(dto),
        spouseName: toPatientSpouseName(dto),
        partnerName: toPatientPartnerName(dto),
        personalStatus: toPatientPersonalStatus(dto),
        dateOfBirth: toPatientDateOfBirth(dto),
        dateOfDeath: toPatientDateOfDeath(dto),
        placeOfBirth: toPatientPlaceOfBirth(dto),
        placeOfDeath: toPatientPlaceOfDeath(dto),
        deceased: toPatientDeceased(dto),
        education: toPatientEducation(dto),
        profession: toPatientProfession(dto),
        note: toPatientNote(dto),
        notes: toPatientNotes(dto),
        administrativeNote: toPatientAdministrativeNote(dto),
        nationality: toPatientNationality(dto),
        race: toPatientRace(dto),
        ethnicity: toPatientEthnicity(dto),
        picture: toPatientPicture(dto),
        externalId: toPatientExternalId(dto),
        partnerships: toPatientPartnerships(dto),
        patientHealthCareParties: toPatientPatientHealthCareParties(dto),
        patientProfessions: toPatientPatientProfessions(dto),
        parameters: toPatientParameters(dto),
        properties: toPatientProperties(dto),
        systemMetaData: toPatientSystemMetaData(dto),
    })
}

export function mapPatientToPatientDto(domain: Patient): PatientDto {
    return new PatientDto({
        id: toPatientDtoId(domain),
        rev: toPatientDtoRev(domain),
        identifier: toPatientDtoIdentifier(domain),
        created: toPatientDtoCreated(domain),
        modified: toPatientDtoModified(domain),
        author: toPatientDtoAuthor(domain),
        responsible: toPatientDtoResponsible(domain),
        tags: toPatientDtoTags(domain),
        codes: toPatientDtoCodes(domain),
        endOfLife: toPatientDtoEndOfLife(domain),
        deletionDate: toPatientDtoDeletionDate(domain),
        firstName: toPatientDtoFirstName(domain),
        lastName: toPatientDtoLastName(domain),
        names: toPatientDtoNames(domain),
        companyName: toPatientDtoCompanyName(domain),
        languages: toPatientDtoLanguages(domain),
        addresses: toPatientDtoAddresses(domain),
        civility: toPatientDtoCivility(domain),
        gender: toPatientDtoGender(domain),
        birthSex: toPatientDtoBirthSex(domain),
        mergeToPatientId: toPatientDtoMergeToPatientId(domain),
        mergedIds: toPatientDtoMergedIds(domain),
        alias: toPatientDtoAlias(domain),
        active: toPatientDtoActive(domain),
        deactivationReason: toPatientDtoDeactivationReason(domain),
        deactivationDate: toPatientDtoDeactivationDate(domain),
        ssin: toPatientDtoSsin(domain),
        maidenName: toPatientDtoMaidenName(domain),
        spouseName: toPatientDtoSpouseName(domain),
        partnerName: toPatientDtoPartnerName(domain),
        personalStatus: toPatientDtoPersonalStatus(domain),
        dateOfBirth: toPatientDtoDateOfBirth(domain),
        dateOfDeath: toPatientDtoDateOfDeath(domain),
        timestampOfLatestEidReading: toPatientDtoTimestampOfLatestEidReading(domain),
        placeOfBirth: toPatientDtoPlaceOfBirth(domain),
        placeOfDeath: toPatientDtoPlaceOfDeath(domain),
        deceased: toPatientDtoDeceased(domain),
        education: toPatientDtoEducation(domain),
        profession: toPatientDtoProfession(domain),
        note: toPatientDtoNote(domain),
        administrativeNote: toPatientDtoAdministrativeNote(domain),
        notes: toPatientDtoNotes(domain),
        nationality: toPatientDtoNationality(domain),
        race: toPatientDtoRace(domain),
        ethnicity: toPatientDtoEthnicity(domain),
        preferredUserId: toPatientDtoPreferredUserId(domain),
        picture: toPatientDtoPicture(domain),
        externalId: toPatientDtoExternalId(domain),
        insurabilities: toPatientDtoInsurabilities(domain),
        partnerships: toPatientDtoPartnerships(domain),
        patientHealthCareParties: toPatientDtoPatientHealthCareParties(domain),
        financialInstitutionInformation: toPatientDtoFinancialInstitutionInformation(domain),
        medicalHouseContracts: toPatientDtoMedicalHouseContracts(domain),
        patientProfessions: toPatientDtoPatientProfessions(domain),
        parameters: toPatientDtoParameters(domain),
        properties: toPatientDtoProperties(domain),
        hcPartyKeys: toPatientDtoHcPartyKeys(domain),
        aesExchangeKeys: toPatientDtoAesExchangeKeys(domain),
        transferKeys: toPatientDtoTransferKeys(domain),
        privateKeyShamirPartitions: toPatientDtoPrivateKeyShamirPartitions(domain),
        publicKey: toPatientDtoPublicKey(domain),
        publicKeysForOaepWithSha256: toPatientDtoPublicKeysForOaepWithSha256(domain),
        secretForeignKeys: toPatientDtoSecretForeignKeys(domain),
        cryptedForeignKeys: toPatientDtoCryptedForeignKeys(domain),
        delegations: toPatientDtoDelegations(domain),
        encryptionKeys: toPatientDtoEncryptionKeys(domain),
        encryptedSelf: toPatientDtoEncryptedSelf(domain),
        medicalLocationId: toPatientDtoMedicalLocationId(domain),
        nonDuplicateIds: toPatientDtoNonDuplicateIds(domain),
        encryptedAdministrativesDocuments: toPatientDtoEncryptedAdministrativesDocuments(domain),
        comment: toPatientDtoComment(domain),
        warning: toPatientDtoWarning(domain),
        fatherBirthCountry: toPatientDtoFatherBirthCountry(domain),
        birthCountry: toPatientDtoBirthCountry(domain),
        nativeCountry: toPatientDtoNativeCountry(domain),
        socialStatus: toPatientDtoSocialStatus(domain),
        mainSourceOfIncome: toPatientDtoMainSourceOfIncome(domain),
        schoolingInfos: toPatientDtoSchoolingInfos(domain),
        employementInfos: toPatientDtoEmployementInfos(domain),
        securityMetadata: toPatientDtoSecurityMetadata(domain),
    })
}
