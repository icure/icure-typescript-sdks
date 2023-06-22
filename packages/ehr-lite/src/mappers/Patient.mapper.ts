import { Patient } from '../models/Patient.model'
import { Address, Annotation as AnnotationDto, CodeStub, Identifier as IdentifierDto, Partnership, Patient as PatientDto, PatientHealthCareParty, PersonName, PropertyStub, SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { createMap, forMember, fromValue, ignore, mapFrom, mapWith, Mapper } from '@automapper/core'
import { mapper } from './mapper'
import { HumanName } from '../models/HumanName.model'
import { Location } from '../models/Location.model'
import { Annotation } from '@icure/typescript-common'
import { RelatedPerson } from '../models/RelatedPerson.model'
import { RelatedPractitioner } from '../models/RelatedPractitioner.model'
import {
    convertDeepNestedMapToObject,
    convertMapOfArrayOfGenericToObject,
    convertMapToObject,
    convertNestedMapToObject,
    convertObjectToDeepNestedMap,
    convertObjectToMap,
    convertObjectToMapOfArrayOfGeneric,
    convertObjectToNestedMap,
    extractAesExchangeKeys,
    extractCryptedForeignKeys,
    extractDelegations,
    extractEncryptedSelf,
    extractEncryptionKeys,
    extractHcPartyKeys,
    extractPrivateKeyShamirPartitions,
    extractPublicKey,
    extractPublicKeysForOaepWithSha256,
    extractSecretForeignKeys,
    extractSecurityMetadata,
    extractTransferKeys,
    SecurityMetadata,
    SystemMetaDataOwnerEncrypted,
    Delegation,
    Property, Identifier, CodingReference
} from '@icure/typescript-common'
import { Delegation as DelegationDto } from '@icure/api/icc-api/model/Delegation'

function forMember_PatientDto_id() {
    return forMember<Patient, PatientDto>(
        (v) => v.id,
        mapFrom((p) => p.id)
    )
}

function forMember_PatientDto_rev() {
    return forMember<Patient, PatientDto>(
        (v) => v.rev,
        mapFrom((p) => p.rev)
    )
}

function forMember_PatientDto_identifier() {
    return forMember<Patient, PatientDto>(
        (v) => v.identifier,
        mapWith(IdentifierDto, Identifier, (p) => p.identifiers)
    )
}

function forMember_PatientDto_created() {
    return forMember<Patient, PatientDto>(
        (v) => v.created,
        mapFrom((p) => p.created)
    )
}

function forMember_PatientDto_modified() {
    return forMember<Patient, PatientDto>(
        (v) => v.modified,
        mapFrom((p) => p.modified)
    )
}

function forMember_PatientDto_author() {
    return forMember<Patient, PatientDto>(
        (v) => v.author,
        mapFrom((p) => p.author)
    )
}

function forMember_PatientDto_responsible() {
    return forMember<Patient, PatientDto>(
        (v) => v.responsible,
        mapFrom((p) => p.responsible)
    )
}

function forMember_PatientDto_tags() {
    return forMember<Patient, PatientDto>(
        (v) => v.tags,
        mapWith(CodeStub, CodingReference, (p) => p.tags)
    )
}

function forMember_PatientDto_codes() {
    return forMember<Patient, PatientDto>(
        (v) => v.codes,
        mapWith(CodeStub, CodingReference, (p) => p.codes)
    )
}

function forMember_PatientDto_endOfLife() {
    return forMember<Patient, PatientDto>(
        (v) => v.endOfLife,
        mapFrom((p) => p.endOfLife)
    )
}

function forMember_PatientDto_deletionDate() {
    return forMember<Patient, PatientDto>(
        (v) => v.deletionDate,
        mapFrom((p) => p.deletionDate)
    )
}

function forMember_PatientDto_firstName() {
    return forMember<Patient, PatientDto>((v) => v.firstName, ignore())
}

function forMember_PatientDto_lastName() {
    return forMember<Patient, PatientDto>((v) => v.lastName, ignore())
}

function forMember_PatientDto_names() {
    return forMember<Patient, PatientDto>(
        (v) => v.names,
        mapWith(PersonName, HumanName, (p) => p.names)
    )
}

function forMember_PatientDto_companyName() {
    return forMember<Patient, PatientDto>((v) => v.companyName, ignore())
}

function forMember_PatientDto_languages() {
    return forMember<Patient, PatientDto>(
        (v) => v.languages,
        mapFrom((p) => p.languages)
    )
}

function forMember_PatientDto_addresses() {
    return forMember<Patient, PatientDto>(
        (v) => v.addresses,
        mapWith(Address, Location, (p) => p.addresses)
    )
}

function forMember_PatientDto_civility() {
    return forMember<Patient, PatientDto>(
        (v) => v.civility,
        mapFrom((p) => p.civility)
    )
}

function forMember_PatientDto_gender() {
    return forMember<Patient, PatientDto>(
        (v) => v.gender,
        mapFrom((p) => p.gender)
    )
}

function forMember_PatientDto_birthSex() {
    return forMember<Patient, PatientDto>(
        (v) => v.birthSex,
        mapFrom((p) => p.birthSex)
    )
}

function forMember_PatientDto_mergeToPatientId() {
    return forMember<Patient, PatientDto>(
        (v) => v.mergeToPatientId,
        mapFrom((p) => p.mergeToPatientId)
    )
}

function forMember_PatientDto_mergedIds() {
    return forMember<Patient, PatientDto>(
        (v) => v.mergedIds,
        mapFrom((p) => p.mergedIds)
    )
}

function forMember_PatientDto_alias() {
    return forMember<Patient, PatientDto>((v) => v.alias, ignore())
}

function forMember_PatientDto_active() {
    return forMember<Patient, PatientDto>(
        (v) => v.active,
        mapFrom((p) => p.active)
    )
}

function forMember_PatientDto_deactivationReason() {
    return forMember<Patient, PatientDto>(
        (v) => v.deactivationReason,
        mapFrom((p) => p.deactivationReason)
    )
}

function forMember_PatientDto_deactivationDate() {
    return forMember<Patient, PatientDto>(
        (v) => v.deactivationDate,
        mapFrom((p) => p.deactivationDate)
    )
}

function forMember_PatientDto_ssin() {
    return forMember<Patient, PatientDto>(
        (v) => v.ssin,
        mapFrom((p) => p.ssin)
    )
}

function forMember_PatientDto_maidenName() {
    return forMember<Patient, PatientDto>((v) => v.maidenName, ignore())
}

function forMember_PatientDto_spouseName() {
    return forMember<Patient, PatientDto>((v) => v.spouseName, ignore())
}

function forMember_PatientDto_partnerName() {
    return forMember<Patient, PatientDto>((v) => v.partnerName, ignore())
}

function forMember_PatientDto_personalStatus() {
    return forMember<Patient, PatientDto>(
        (v) => v.personalStatus,
        mapFrom((p) => p.personalStatus)
    )
}

function forMember_PatientDto_dateOfBirth() {
    return forMember<Patient, PatientDto>(
        (v) => v.dateOfBirth,
        mapFrom((p) => p.dateOfBirth)
    )
}

function forMember_PatientDto_dateOfDeath() {
    return forMember<Patient, PatientDto>(
        (v) => v.dateOfDeath,
        mapFrom((p) => p.dateOfDeath)
    )
}

function forMember_PatientDto_timestampOfLatestEidReading() {
    return forMember<Patient, PatientDto>((v) => v.timestampOfLatestEidReading, ignore())
}

function forMember_PatientDto_placeOfBirth() {
    return forMember<Patient, PatientDto>(
        (v) => v.placeOfBirth,
        mapFrom((p) => p.placeOfBirth)
    )
}

function forMember_PatientDto_placeOfDeath() {
    return forMember<Patient, PatientDto>(
        (v) => v.placeOfDeath,
        mapFrom((p) => p.placeOfDeath)
    )
}

function forMember_PatientDto_deceased() {
    return forMember<Patient, PatientDto>(
        (v) => v.deceased,
        mapFrom((p) => p.deceased)
    )
}

function forMember_PatientDto_education() {
    return forMember<Patient, PatientDto>(
        (v) => v.education,
        mapFrom((p) => p.education)
    )
}

function forMember_PatientDto_profession() {
    return forMember<Patient, PatientDto>(
        (v) => v.profession,
        mapFrom((p) => p.profession)
    )
}

function forMember_PatientDto_note() {
    return forMember<Patient, PatientDto>((v) => v.note, ignore())
}

function forMember_PatientDto_administrativeNote() {
    return forMember<Patient, PatientDto>((v) => v.administrativeNote, ignore())
}

function forMember_PatientDto_notes() {
    return forMember<Patient, PatientDto>(
        (v) => v.notes,
        mapWith(AnnotationDto, Annotation, (p) => p.notes)
    )
}

function forMember_PatientDto_nationality() {
    return forMember<Patient, PatientDto>(
        (v) => v.nationality,
        mapFrom((p) => p.nationality)
    )
}

function forMember_PatientDto_race() {
    return forMember<Patient, PatientDto>(
        (v) => v.race,
        mapFrom((p) => p.race)
    )
}

function forMember_PatientDto_ethnicity() {
    return forMember<Patient, PatientDto>(
        (v) => v.ethnicity,
        mapFrom((p) => p.ethnicity)
    )
}

function forMember_PatientDto_preferredUserId() {
    return forMember<Patient, PatientDto>((v) => v.preferredUserId, ignore())
}

function forMember_PatientDto_picture() {
    return forMember<Patient, PatientDto>(
        (v) => v.picture,
        mapFrom((p) => p.picture)
    )
}

function forMember_PatientDto_externalId() {
    return forMember<Patient, PatientDto>(
        (v) => v.externalId,
        mapFrom((p) => p.externalId)
    )
}

function forMember_PatientDto_insurabilities() {
    return forMember<Patient, PatientDto>((v) => v.insurabilities, ignore())
}

function forMember_PatientDto_partnerships() {
    return forMember<Patient, PatientDto>(
        (v) => v.partnerships,
        mapWith(Partnership, RelatedPerson, (p) => p.relatives)
    )
}

function forMember_PatientDto_patientHealthCareParties() {
    return forMember<Patient, PatientDto>(
        (v) => v.patientHealthCareParties,
        mapWith(PatientHealthCareParty, RelatedPractitioner, (p) => p.patientPractitioners)
    )
}

function forMember_PatientDto_financialInstitutionInformation() {
    return forMember<Patient, PatientDto>((v) => v.financialInstitutionInformation, ignore())
}

function forMember_PatientDto_medicalHouseContracts() {
    return forMember<Patient, PatientDto>((v) => v.medicalHouseContracts, ignore())
}

function forMember_PatientDto_patientProfessions() {
    return forMember<Patient, PatientDto>(
        (v) => v.patientProfessions,
        mapWith(CodeStub, CodingReference, (p) => p.patientProfessions)
    )
}

function forMember_PatientDto_parameters() {
    return forMember<Patient, PatientDto>((v) => v.parameters, ignore())
}

function forMember_PatientDto_properties() {
    return forMember<Patient, PatientDto>(
        (v) => v.properties,
        mapWith(PropertyStub, Property, (p) => p.properties)
    )
}

function forMember_PatientDto_hcPartyKeys() {
    return forMember<Patient, PatientDto>(
        (v) => v.hcPartyKeys,
        mapFrom((p) => {
            const hcPartyKeys = extractHcPartyKeys(p.systemMetaData)
            return Object.fromEntries(hcPartyKeys?.entries() ?? [])
        })
    )
}

function forMember_PatientDto_aesExchangeKeys() {
    return forMember<Patient, PatientDto>(
        (v) => v.aesExchangeKeys,
        mapFrom((p) => {
            const aesExchangeKeys = extractAesExchangeKeys(p.systemMetaData)
            return !!aesExchangeKeys ? convertDeepNestedMapToObject(aesExchangeKeys) : undefined
        })
    )
}

function forMember_PatientDto_transferKeys() {
    return forMember<Patient, PatientDto>(
        (v) => v.transferKeys,
        mapFrom((p) => {
            const transferKeys = extractTransferKeys(p.systemMetaData)
            return !!transferKeys ? convertNestedMapToObject(transferKeys) : undefined
        })
    )
}

function forMember_PatientDto_privateKeyShamirPartitions() {
    return forMember<Patient, PatientDto>(
        (v) => v.privateKeyShamirPartitions,
        mapFrom((p) => {
            const privateKeyShamirPartitions = extractPrivateKeyShamirPartitions(p.systemMetaData)
            return !!privateKeyShamirPartitions ? convertMapToObject(privateKeyShamirPartitions) : undefined
        })
    )
}

function forMember_PatientDto_publicKey() {
    return forMember<Patient, PatientDto>(
        (v) => v.publicKey,
        mapFrom((p) => extractPublicKey(p.systemMetaData))
    )
}

function forMember_PatientDto_secretForeignKeys() {
    return forMember<Patient, PatientDto>(
        (v) => v.secretForeignKeys,
        mapFrom((v) => extractSecretForeignKeys(v.systemMetaData))
    )
}

function forMember_PatientDto_cryptedForeignKeys() {
    return forMember<Patient, PatientDto>(
        (v) => v.cryptedForeignKeys,
        mapFrom((p) => {
            const delegations = extractCryptedForeignKeys(p.systemMetaData)
            return !!delegations ? convertMapOfArrayOfGenericToObject<Delegation, DelegationDto>(delegations, (arr) => mapper.mapArray(arr, Delegation, DelegationDto)) : []
        })
    )
}

function forMember_PatientDto_delegations() {
    return forMember<Patient, PatientDto>(
        (v) => v.delegations,
        mapFrom((v) => {
            const delegations = extractDelegations(v.systemMetaData)
            return !!delegations ? convertMapOfArrayOfGenericToObject<Delegation, DelegationDto>(delegations, (arr) => mapper.mapArray(arr, Delegation, DelegationDto)) : []
        })
    )
}

function forMember_PatientDto_encryptionKeys() {
    return forMember<Patient, PatientDto>(
        (v) => v.encryptionKeys,
        mapFrom((v) => {
            const encryptionKeys = extractEncryptionKeys(v.systemMetaData)
            return !!encryptionKeys ? convertMapOfArrayOfGenericToObject<Delegation, DelegationDto>(encryptionKeys, (arr) => mapper.mapArray(arr, Delegation, DelegationDto)) : []
        })
    )
}

function forMember_PatientDto_encryptedSelf() {
    return forMember<Patient, PatientDto>(
        (v) => v.encryptedSelf,
        mapFrom((v) => extractEncryptedSelf(v.systemMetaData))
    )
}

function forMember_PatientDto_medicalLocationId() {
    return forMember<Patient, PatientDto>((v) => v.medicalLocationId, ignore())
}

function forMember_PatientDto_nonDuplicateIds() {
    return forMember<Patient, PatientDto>((v) => v.nonDuplicateIds, ignore())
}

function forMember_PatientDto_encryptedAdministrativesDocuments() {
    return forMember<Patient, PatientDto>((v) => v.encryptedAdministrativesDocuments, ignore())
}

function forMember_PatientDto_comment() {
    return forMember<Patient, PatientDto>((v) => v.comment, ignore())
}

function forMember_PatientDto_warning() {
    return forMember<Patient, PatientDto>((v) => v.warning, ignore())
}

function forMember_PatientDto_fatherBirthCountry() {
    return forMember<Patient, PatientDto>((v) => v.fatherBirthCountry, ignore())
}

function forMember_PatientDto_birthCountry() {
    return forMember<Patient, PatientDto>((v) => v.birthCountry, ignore())
}

function forMember_PatientDto_nativeCountry() {
    return forMember<Patient, PatientDto>((v) => v.nativeCountry, ignore())
}

function forMember_PatientDto_socialStatus() {
    return forMember<Patient, PatientDto>((v) => v.socialStatus, ignore())
}

function forMember_PatientDto_mainSourceOfIncome() {
    return forMember<Patient, PatientDto>((v) => v.mainSourceOfIncome, ignore())
}

function forMember_PatientDto_schoolingInfos() {
    return forMember<Patient, PatientDto>((v) => v.schoolingInfos, ignore())
}

function forMember_PatientDto_employementInfos() {
    return forMember<Patient, PatientDto>((v) => v.employementInfos, ignore())
}

function forMember_PatientDto_securityMetadata() {
    return forMember<Patient, PatientDto>(
        (v) => v.securityMetadata,
        mapWith(SecurityMetadataDto, SecurityMetadata, (p) => extractSecurityMetadata(p.systemMetaData))
    )
}

function forMember_Patient_id() {
    return forMember<PatientDto, Patient>(
        (v) => v.id,
        mapFrom((p) => p.id)
    )
}

function forMember_Patient_rev() {
    return forMember<PatientDto, Patient>(
        (v) => v.rev,
        mapFrom((p) => p.rev)
    )
}

function forMember_Patient_identifiers() {
    return forMember<PatientDto, Patient>(
        (v) => v.identifiers,
        mapWith(Identifier, IdentifierDto, (p) => p.identifier)
    )
}

function forMember_Patient_created() {
    return forMember<PatientDto, Patient>(
        (v) => v.created,
        mapFrom((p) => p.created)
    )
}

function forMember_Patient_modified() {
    return forMember<PatientDto, Patient>(
        (v) => v.modified,
        mapFrom((p) => p.modified)
    )
}

function forMember_Patient_author() {
    return forMember<PatientDto, Patient>(
        (v) => v.author,
        mapFrom((p) => p.author)
    )
}

function forMember_Patient_responsible() {
    return forMember<PatientDto, Patient>(
        (v) => v.responsible,
        mapFrom((p) => p.responsible)
    )
}

function forMember_Patient_tags() {
    return forMember<PatientDto, Patient>(
        (v) => v.tags,
        mapWith(CodingReference, CodeStub, (p) => p.tags)
    )
}

function forMember_Patient_codes() {
    return forMember<PatientDto, Patient>(
        (v) => v.codes,
        mapWith(CodingReference, CodeStub, (p) => p.codes)
    )
}

function forMember_Patient_endOfLife() {
    return forMember<PatientDto, Patient>(
        (v) => v.endOfLife,
        mapFrom((p) => p.endOfLife)
    )
}

function forMember_Patient_deletionDate() {
    return forMember<PatientDto, Patient>(
        (v) => v.deletionDate,
        mapFrom((p) => p.deletionDate)
    )
}

function forMember_Patient_languages() {
    return forMember<PatientDto, Patient>(
        (v) => v.languages,
        mapFrom((p) => p.languages)
    )
}

function forMember_Patient_addresses() {
    return forMember<PatientDto, Patient>(
        (v) => v.addresses,
        mapWith(Location, Address, (p) => p.addresses)
    )
}

function forMember_Patient_civility() {
    return forMember<PatientDto, Patient>(
        (v) => v.civility,
        mapFrom((p) => p.civility)
    )
}

function forMember_Patient_gender() {
    return forMember<PatientDto, Patient>(
        (v) => v.gender,
        mapFrom((p) => p.gender)
    )
}

function forMember_Patient_birthSex() {
    return forMember<PatientDto, Patient>(
        (v) => v.birthSex,
        mapFrom((p) => p.birthSex)
    )
}

function forMember_Patient_mergeToPatientId() {
    return forMember<PatientDto, Patient>(
        (v) => v.mergeToPatientId,
        mapFrom((p) => p.mergeToPatientId)
    )
}

function forMember_Patient_mergedIds() {
    return forMember<PatientDto, Patient>(
        (v) => v.mergedIds,
        mapFrom((p) => p.mergedIds)
    )
}

function forMember_Patient_active() {
    return forMember<PatientDto, Patient>(
        (v) => v.active,
        mapFrom((p) => p.active)
    )
}

function forMember_Patient_deactivationReason() {
    return forMember<PatientDto, Patient>(
        (v) => v.deactivationReason,
        mapFrom((p) => p.deactivationReason)
    )
}

function forMember_Patient_personalStatus() {
    return forMember<PatientDto, Patient>(
        (v) => v.personalStatus,
        mapFrom((p) => p.personalStatus)
    )
}

function forMember_Patient_dateOfBirth() {
    return forMember<PatientDto, Patient>(
        (v) => v.dateOfBirth,
        mapFrom((p) => p.dateOfBirth)
    )
}

function forMember_Patient_dateOfDeath() {
    return forMember<PatientDto, Patient>(
        (v) => v.dateOfDeath,
        mapFrom((p) => p.dateOfDeath)
    )
}

function forMember_Patient_placeOfBirth() {
    return forMember<PatientDto, Patient>(
        (v) => v.placeOfBirth,
        mapFrom((p) => p.placeOfBirth)
    )
}

function forMember_Patient_placeOfDeath() {
    return forMember<PatientDto, Patient>(
        (v) => v.placeOfDeath,
        mapFrom((p) => p.placeOfDeath)
    )
}

function forMember_Patient_deceased() {
    return forMember<PatientDto, Patient>(
        (v) => v.deceased,
        mapFrom((p) => p.deceased)
    )
}

function forMember_Patient_education() {
    return forMember<PatientDto, Patient>(
        (v) => v.education,
        mapFrom((p) => p.education)
    )
}

function forMember_Patient_profession() {
    return forMember<PatientDto, Patient>(
        (v) => v.profession,
        mapFrom((p) => p.profession)
    )
}

function forMember_Patient_notes() {
    return forMember<PatientDto, Patient>(
        (v) => v.notes,
        mapWith(Annotation, AnnotationDto, (p) => p.notes)
    )
}

function forMember_Patient_nationality() {
    return forMember<PatientDto, Patient>(
        (v) => v.nationality,
        mapFrom((p) => p.nationality)
    )
}

function forMember_Patient_race() {
    return forMember<PatientDto, Patient>(
        (v) => v.race,
        mapFrom((p) => p.race)
    )
}

function forMember_Patient_ethnicity() {
    return forMember<PatientDto, Patient>(
        (v) => v.ethnicity,
        mapFrom((p) => p.ethnicity)
    )
}

function forMember_Patient_picture() {
    return forMember<PatientDto, Patient>(
        (v) => v.picture,
        mapFrom((p) => p.picture)
    )
}

function forMember_Patient_externalId() {
    return forMember<PatientDto, Patient>(
        (v) => v.externalId,
        mapFrom((p) => p.externalId)
    )
}

function forMember_Patient_relatives() {
    return forMember<PatientDto, Patient>(
        (v) => v.relatives,
        mapWith(RelatedPerson, Partnership, (p) => p.partnerships)
    )
}

function forMember_Patient_patientPractioners() {
    return forMember<PatientDto, Patient>(
        (v) => v.patientPractitioners,
        mapWith(RelatedPractitioner, PatientHealthCareParty, (p) => p.patientHealthCareParties)
    )
}

function forMember_Patient_patientProfessions() {
    return forMember<PatientDto, Patient>(
        (v) => v.patientProfessions,
        mapWith(CodingReference, CodeStub, (p) => p.patientProfessions)
    )
}

function forMember_Patient_properties() {
    return forMember<PatientDto, Patient>(
        (v) => v.properties,
        mapWith(Property, PropertyStub, (p) => p.properties)
    )
}

function forMember_Patient_systemMetaData() {
    return forMember<PatientDto, Patient>(
        (v) => v.systemMetaData,
        mapFrom((p) => {
            return new SystemMetaDataOwnerEncrypted({
                encryptedSelf: p.encryptedSelf,
                securityMetadata: mapper.map(p.securityMetadata, SecurityMetadataDto, SecurityMetadata),
                cryptedForeignKeys: !!p.cryptedForeignKeys ? convertObjectToMapOfArrayOfGeneric<DelegationDto, Delegation>(p.cryptedForeignKeys, (arr) => mapper.mapArray(arr, DelegationDto, Delegation)) : undefined,
                delegations: !!p.delegations ? convertObjectToMapOfArrayOfGeneric<DelegationDto, Delegation>(p.delegations, (arr) => mapper.mapArray(arr, DelegationDto, Delegation)) : undefined,
                encryptionKeys: !!p.encryptionKeys ? convertObjectToMapOfArrayOfGeneric<DelegationDto, Delegation>(p.encryptionKeys, (arr) => mapper.mapArray(arr, DelegationDto, Delegation)) : undefined,
                secretForeignKeys: p.secretForeignKeys,
                hcPartyKeys: !!p.hcPartyKeys ? new Map(Object.entries(p.hcPartyKeys)) : undefined,
                publicKey: p.publicKey,
                aesExchangeKeys: !!p.aesExchangeKeys ? convertObjectToDeepNestedMap(p.aesExchangeKeys) : undefined,
                transferKeys: !!p.transferKeys ? convertObjectToNestedMap(p.transferKeys) : undefined,
                privateKeyShamirPartitions: !!p.privateKeyShamirPartitions ? convertObjectToMap(p.privateKeyShamirPartitions) : undefined,
                publicKeysForOaepWithSha256: p.publicKeysForOaepWithSha256,
            })
        })
    )
}

function forMember_Patient_names() {
    return forMember<PatientDto, Patient>(
        (v) => v.names,
        mapWith(HumanName, PersonName, (p) => p.names)
    )
}

function forMember_Patient_deactivationDate() {
    return forMember<PatientDto, Patient>(
        (v) => v.deactivationDate,
        mapFrom((p) => p.deactivationDate)
    )
}

function forMember_Patient_ssin() {
    return forMember<PatientDto, Patient>(
        (v) => v.ssin,
        mapFrom((p) => p.ssin)
    )
}

function forMember_PatientDto__type() {
    return forMember<Patient, PatientDto>((v) => v._type, fromValue('Patient'))
}

function forMember_PatientDto_publicKeysForOaepWithSha256() {
    return forMember<Patient, PatientDto>(
        (v) => v.publicKeysForOaepWithSha256,
        mapFrom((v) => extractPublicKeysForOaepWithSha256(v.systemMetaData))
    )
}

function forMember_Patient_patientPractitioners() {
    return forMember<PatientDto, Patient>(
        (v) => v.patientPractitioners,
        mapWith(RelatedPractitioner, PatientHealthCareParty, (p) => p.patientHealthCareParties)
    )
}

export function initializePatientMapper(mapper: Mapper) {
    createMap(mapper, Patient, PatientDto, forMember_PatientDto_id(), forMember_PatientDto_rev(), forMember_PatientDto_identifier(), forMember_PatientDto_created(), forMember_PatientDto_modified(), forMember_PatientDto_author(), forMember_PatientDto_responsible(), forMember_PatientDto_tags(), forMember_PatientDto_codes(), forMember_PatientDto_endOfLife(), forMember_PatientDto_deletionDate(), forMember_PatientDto_firstName(), forMember_PatientDto_lastName(), forMember_PatientDto_names(), forMember_PatientDto_companyName(), forMember_PatientDto_languages(), forMember_PatientDto_addresses(), forMember_PatientDto_civility(), forMember_PatientDto_gender(), forMember_PatientDto_birthSex(), forMember_PatientDto_mergeToPatientId(), forMember_PatientDto_mergedIds(), forMember_PatientDto_alias(), forMember_PatientDto_active(), forMember_PatientDto_deactivationReason(), forMember_PatientDto_deactivationDate(), forMember_PatientDto_ssin(), forMember_PatientDto_maidenName(), forMember_PatientDto_spouseName(), forMember_PatientDto_partnerName(), forMember_PatientDto_personalStatus(), forMember_PatientDto_dateOfBirth(), forMember_PatientDto_dateOfDeath(), forMember_PatientDto_timestampOfLatestEidReading(), forMember_PatientDto_placeOfBirth(), forMember_PatientDto_placeOfDeath(), forMember_PatientDto_deceased(), forMember_PatientDto_education(), forMember_PatientDto_profession(), forMember_PatientDto_note(), forMember_PatientDto_administrativeNote(), forMember_PatientDto_notes(), forMember_PatientDto_nationality(), forMember_PatientDto_race(), forMember_PatientDto_ethnicity(), forMember_PatientDto_preferredUserId(), forMember_PatientDto_picture(), forMember_PatientDto_externalId(), forMember_PatientDto_insurabilities(), forMember_PatientDto_partnerships(), forMember_PatientDto_patientHealthCareParties(), forMember_PatientDto_financialInstitutionInformation(), forMember_PatientDto_medicalHouseContracts(), forMember_PatientDto_patientProfessions(), forMember_PatientDto_parameters(), forMember_PatientDto_properties(), forMember_PatientDto_hcPartyKeys(), forMember_PatientDto_aesExchangeKeys(), forMember_PatientDto_transferKeys(), forMember_PatientDto_privateKeyShamirPartitions(), forMember_PatientDto_publicKey(), forMember_PatientDto_publicKeysForOaepWithSha256(), forMember_PatientDto_secretForeignKeys(), forMember_PatientDto_cryptedForeignKeys(), forMember_PatientDto_delegations(), forMember_PatientDto_encryptionKeys(), forMember_PatientDto_encryptedSelf(), forMember_PatientDto_medicalLocationId(), forMember_PatientDto_nonDuplicateIds(), forMember_PatientDto_encryptedAdministrativesDocuments(), forMember_PatientDto_comment(), forMember_PatientDto_warning(), forMember_PatientDto_fatherBirthCountry(), forMember_PatientDto_birthCountry(), forMember_PatientDto_nativeCountry(), forMember_PatientDto_socialStatus(), forMember_PatientDto_mainSourceOfIncome(), forMember_PatientDto_schoolingInfos(), forMember_PatientDto_employementInfos(), forMember_PatientDto_securityMetadata(), forMember_PatientDto__type())

    createMap(mapper, PatientDto, Patient, forMember_Patient_id(), forMember_Patient_rev(), forMember_Patient_identifiers(), forMember_Patient_created(), forMember_Patient_modified(), forMember_Patient_author(), forMember_Patient_responsible(), forMember_Patient_tags(), forMember_Patient_codes(), forMember_Patient_endOfLife(), forMember_Patient_deletionDate(), forMember_Patient_names(), forMember_Patient_languages(), forMember_Patient_addresses(), forMember_Patient_civility(), forMember_Patient_gender(), forMember_Patient_birthSex(), forMember_Patient_mergeToPatientId(), forMember_Patient_mergedIds(), forMember_Patient_active(), forMember_Patient_deactivationDate(), forMember_Patient_deactivationReason(), forMember_Patient_ssin(), forMember_Patient_personalStatus(), forMember_Patient_dateOfBirth(), forMember_Patient_dateOfDeath(), forMember_Patient_placeOfBirth(), forMember_Patient_placeOfDeath(), forMember_Patient_deceased(), forMember_Patient_education(), forMember_Patient_profession(), forMember_Patient_notes(), forMember_Patient_nationality(), forMember_Patient_race(), forMember_Patient_ethnicity(), forMember_Patient_picture(), forMember_Patient_externalId(), forMember_Patient_relatives(), forMember_Patient_patientPractitioners(), forMember_Patient_patientProfessions(), forMember_Patient_properties(), forMember_Patient_systemMetaData())
}
