import { Patient } from '../models/Patient.model'
import { HumanName } from '../models/HumanName.model'
import { Location } from '../models/Location.model'
import {
    Annotation,
    CodingReference,
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
    DelegationDto,
} from '@icure/typescript-common'
import { RelatedPerson } from '../models/RelatedPerson.model'
import { RelatedPractitioner } from '../models/RelatedPractitioner.model'
import { mapHumanNameToPersonNameDto, mapPersonNameDtoToHumanName } from './HumanName.mapper'
import { mapPartnershipDtoToRelatedPerson, mapRelatedPersonToPartnershipDto } from './RelatedPerson.mapper'
import { mapPatientHealthCarePartyDtoToRelatedPractitioner, mapRelatedPractitionerToPatientHealthCarePartyDto } from './RelatedPractitioner.mapper'
import { mapAddressDtoToLocation, mapLocationToAddressDto } from './Location.mapper'
import { GenderEnum } from '../models/enums/Gender.enum'
import { PatientDeactivationReasonEnum } from '../models/enums/PatientDeactivationReason.enum'
import { PatientPersonalStatusEnum } from '../models/enums/PatientPersonalStatus.enum'
import { b64_2ab, ua2b64 } from '@icure/api'

function toPatientDtoId(domain: Patient): string | undefined {
    return domain.id
}

function toPatientDtoRev(domain: Patient): string | undefined {
    return domain.rev
}

function toPatientDtoIdentifier(domain: Patient): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
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
    return !!domain.tags ? [...domain.tags].map(mapCodingReferenceToCodeStub) : undefined
}

function toPatientDtoCodes(domain: Patient): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
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
    return !!domain.names ? domain.names.map(mapHumanNameToPersonNameDto) : undefined
}

function toPatientDtoCompanyName(domain: Patient): string | undefined {
    return undefined
}

function toPatientDtoLanguages(domain: Patient): string[] | undefined {
    return domain.languages
}

function toPatientDtoAddresses(domain: Patient): AddressDto[] | undefined {
    return !!domain.addresses ? domain.addresses.map(mapLocationToAddressDto) : undefined
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
    return domain.mergedIds
}

function toPatientDtoAlias(domain: Patient): string | undefined {
    return undefined
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
    return undefined
}

function toPatientDtoSpouseName(domain: Patient): string | undefined {
    return undefined
}

function toPatientDtoPartnerName(domain: Patient): string | undefined {
    return undefined
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
    return undefined
}

function toPatientDtoAdministrativeNote(domain: Patient): string | undefined {
    return undefined
}

function toPatientDtoNotes(domain: Patient): AnnotationDto[] | undefined {
    return !!domain.notes ? domain.notes.map(mapAnnotationToAnnotationDto) : undefined
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
    return !!domain.relatives ? domain.relatives.map(mapRelatedPersonToPartnershipDto) : undefined
}

function toPatientDtoPatientHealthCareParties(domain: Patient): PatientHealthCarePartyDto[] | undefined {
    return !!domain.patientPractitioners ? domain.patientPractitioners.map(mapRelatedPractitionerToPatientHealthCarePartyDto) : undefined
}

function toPatientDtoFinancialInstitutionInformation(domain: Patient): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toPatientDtoMedicalHouseContracts(domain: Patient): MedicalHouseContract[] | undefined {
    return undefined
}

function toPatientDtoPatientProfessions(domain: Patient): CodeStub[] | undefined {
    return !!domain.patientProfessions ? domain.patientProfessions.map(mapCodingReferenceToCodeStub) : undefined
}

function toPatientDtoParameters(domain: Patient): { [key: string]: string[] } | undefined {
    return undefined
}

function toPatientDtoProperties(domain: Patient): PropertyStub[] | undefined {
    return !!domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
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
    return domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toPatientDtoPublicKeysForOaepWithSha256(domain: Patient): string[] | undefined {
    return domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toPatientDtoSecretForeignKeys(domain: Patient): string[] | undefined {
    return domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toPatientDtoCryptedForeignKeys(domain: Patient): { [key: string]: DelegationDto[] } | undefined {
    return domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toPatientDtoDelegations(domain: Patient): { [key: string]: DelegationDto[] } | undefined {
    return domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toPatientDtoEncryptionKeys(domain: Patient): { [key: string]: DelegationDto[] } | undefined {
    return domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toPatientDtoEncryptedSelf(domain: Patient): string | undefined {
    return domain.systemMetaData ? toEncryptedSelf(domain.systemMetaData) : undefined
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

function toPatientIdentifiers(dto: PatientDto): Identifier[] | undefined {
    return !!dto.identifier ? dto.identifier.map(mapIdentifierDtoToIdentifier) : undefined
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

function toPatientTags(dto: PatientDto): Array<CodingReference> | undefined {
    return !!dto.tags?.length ? dto.tags.map(mapCodeStubToCodingReference) : undefined
}

function toPatientCodes(dto: PatientDto): Array<CodingReference> | undefined {
    return !!dto.codes?.length ? dto.codes.map(mapCodeStubToCodingReference) : undefined
}

function toPatientEndOfLife(dto: PatientDto): number | undefined {
    return dto.endOfLife
}

function toPatientDeletionDate(dto: PatientDto): number | undefined {
    return dto.deletionDate
}

function toPatientNames(dto: PatientDto): HumanName[] | undefined {
    return !!dto.names ? dto.names.map(mapPersonNameDtoToHumanName) : undefined
}

function toPatientLanguages(dto: PatientDto): string[] | undefined {
    return dto.languages
}

function toPatientAddresses(dto: PatientDto): Location[] | undefined {
    return !!dto.addresses ? dto.addresses.map(mapAddressDtoToLocation) : undefined
}

function toPatientCivility(dto: PatientDto): string | undefined {
    return dto.civility
}

function toPatientGender(dto: PatientDto): GenderEnum | undefined {
    return dto.gender as GenderEnum | undefined
}

function toPatientBirthSex(dto: PatientDto): GenderEnum | undefined {
    return dto.birthSex as GenderEnum | undefined
}

function toPatientMergeToPatientId(dto: PatientDto): string | undefined {
    return dto.mergeToPatientId
}

function toPatientMergedIds(dto: PatientDto): string[] | undefined {
    return dto.mergedIds
}

function toPatientActive(dto: PatientDto): boolean | undefined {
    return dto.active
}

function toPatientDeactivationDate(dto: PatientDto): number | undefined {
    return dto.deactivationDate
}

function toPatientDeactivationReason(dto: PatientDto): PatientDeactivationReasonEnum | undefined {
    return dto.deactivationReason as PatientDeactivationReasonEnum | undefined
}

function toPatientSsin(dto: PatientDto): string | undefined {
    return dto.ssin
}

function toPatientPersonalStatus(dto: PatientDto): PatientPersonalStatusEnum | undefined {
    return dto.personalStatus as PatientPersonalStatusEnum | undefined
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

function toPatientNotes(dto: PatientDto): Annotation[] | undefined {
    return !!dto.notes ? dto.notes.map(mapAnnotationDtoToAnnotation) : undefined
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

function toPatientRelatives(dto: PatientDto): RelatedPerson[] | undefined {
    return !!dto.partnerships ? dto.partnerships.map(mapPartnershipDtoToRelatedPerson) : undefined
}

function toPatientPatientPractitioners(dto: PatientDto): RelatedPractitioner[] | undefined {
    return !!dto.patientHealthCareParties ? dto.patientHealthCareParties.map(mapPatientHealthCarePartyDtoToRelatedPractitioner) : undefined
}

function toPatientPatientProfessions(dto: PatientDto): CodingReference[] | undefined {
    return !!dto.patientProfessions ? dto.patientProfessions.map(mapCodeStubToCodingReference) : undefined
}

function toPatientProperties(dto: PatientDto): Array<Property> | undefined {
    return !!dto.properties ? dto.properties.map(mapPropertyStubToProperty) : undefined
}

function toPatientSystemMetaData(dto: PatientDto): SystemMetaDataOwnerEncrypted | undefined {
    return toSystemMetaDataOwnerEncrypted(dto)
}

function toPatientFirstName(dto: PatientDto): string | undefined {
    return dto.firstName
}

function toPatientLastName(dto: PatientDto): string | undefined {
    return dto.lastName
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
        tags: toPatientTags(dto),
        codes: toPatientCodes(dto),
        endOfLife: toPatientEndOfLife(dto),
        deletionDate: toPatientDeletionDate(dto),
        firstName: toPatientFirstName(dto),
        lastName: toPatientLastName(dto),
        names: toPatientNames(dto),
        languages: toPatientLanguages(dto),
        addresses: toPatientAddresses(dto),
        civility: toPatientCivility(dto),
        gender: toPatientGender(dto),
        birthSex: toPatientBirthSex(dto),
        mergeToPatientId: toPatientMergeToPatientId(dto),
        mergedIds: toPatientMergedIds(dto),
        active: toPatientActive(dto),
        deactivationDate: toPatientDeactivationDate(dto),
        deactivationReason: toPatientDeactivationReason(dto),
        ssin: toPatientSsin(dto),
        personalStatus: toPatientPersonalStatus(dto),
        dateOfBirth: toPatientDateOfBirth(dto),
        dateOfDeath: toPatientDateOfDeath(dto),
        placeOfBirth: toPatientPlaceOfBirth(dto),
        placeOfDeath: toPatientPlaceOfDeath(dto),
        deceased: toPatientDeceased(dto),
        education: toPatientEducation(dto),
        profession: toPatientProfession(dto),
        notes: toPatientNotes(dto),
        nationality: toPatientNationality(dto),
        race: toPatientRace(dto),
        ethnicity: toPatientEthnicity(dto),
        picture: toPatientPicture(dto),
        externalId: toPatientExternalId(dto),
        relatives: toPatientRelatives(dto),
        patientPractitioners: toPatientPatientPractitioners(dto),
        patientProfessions: toPatientPatientProfessions(dto),
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
