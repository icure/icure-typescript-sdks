import { Patient } from '../models/Patient.model'
import { Address, Annotation as AnnotationEntity, CodeStub, Identifier as IdentifierEntity, Partnership, Patient as PatientEntity, PatientHealthCareParty, PersonName, PropertyStub, SecurityMetadata as SecurityMetadataEntity } from '@icure/api'
import { createMap, forMember, fromValue, ignore, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { Identifier } from '../models/Identifier.model'
import { CodingReference } from '../models/CodingReference.model'
import { HumanName } from '../models/HumanName.model'
import { Location } from '../models/Location.model'
import { Annotation } from '../models/Annotation.model'
import { RelatedPerson } from '../models/RelatedPerson.model'
import { RelatedPractitioner } from '../models/RelatedPractitioner.model'
import { Property } from '../models/Property.model'
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
} from './utils/Metadata.utils'
import { Delegation } from '../models/Delegation.model'
import { Delegation as DelegationEntity } from '@icure/api/icc-api/model/Delegation'
import { SecurityMetadata } from '../models/SecurityMetadata.model'
import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted.model'

function forMember_PatientEntity_id() {
    return forMember<Patient, PatientEntity>(
        (v) => v.id,
        mapFrom((p) => p.id)
    )
}

function forMember_PatientEntity_rev() {
    return forMember<Patient, PatientEntity>(
        (v) => v.rev,
        mapFrom((p) => p.rev)
    )
}

function forMember_PatientEntity_identifier() {
    return forMember<Patient, PatientEntity>(
        (v) => v.identifier,
        mapWith(IdentifierEntity, Identifier, (p) => p.identifiers)
    )
}

function forMember_PatientEntity_created() {
    return forMember<Patient, PatientEntity>(
        (v) => v.created,
        mapFrom((p) => p.created)
    )
}

function forMember_PatientEntity_modified() {
    return forMember<Patient, PatientEntity>(
        (v) => v.modified,
        mapFrom((p) => p.modified)
    )
}

function forMember_PatientEntity_author() {
    return forMember<Patient, PatientEntity>(
        (v) => v.author,
        mapFrom((p) => p.author)
    )
}

function forMember_PatientEntity_responsible() {
    return forMember<Patient, PatientEntity>(
        (v) => v.responsible,
        mapFrom((p) => p.responsible)
    )
}

function forMember_PatientEntity_tags() {
    return forMember<Patient, PatientEntity>(
        (v) => v.tags,
        mapWith(CodeStub, CodingReference, (p) => p.tags)
    )
}

function forMember_PatientEntity_codes() {
    return forMember<Patient, PatientEntity>(
        (v) => v.codes,
        mapWith(CodeStub, CodingReference, (p) => p.codes)
    )
}

function forMember_PatientEntity_endOfLife() {
    return forMember<Patient, PatientEntity>(
        (v) => v.endOfLife,
        mapFrom((p) => p.endOfLife)
    )
}

function forMember_PatientEntity_deletionDate() {
    return forMember<Patient, PatientEntity>(
        (v) => v.deletionDate,
        mapFrom((p) => p.deletionDate)
    )
}

function forMember_PatientEntity_firstName() {
    return forMember<Patient, PatientEntity>((v) => v.firstName, ignore())
}

function forMember_PatientEntity_lastName() {
    return forMember<Patient, PatientEntity>((v) => v.lastName, ignore())
}

function forMember_PatientEntity_names() {
    return forMember<Patient, PatientEntity>(
        (v) => v.names,
        mapWith(PersonName, HumanName, (p) => p.names)
    )
}

function forMember_PatientEntity_companyName() {
    return forMember<Patient, PatientEntity>((v) => v.companyName, ignore())
}

function forMember_PatientEntity_languages() {
    return forMember<Patient, PatientEntity>(
        (v) => v.languages,
        mapFrom((p) => p.languages)
    )
}

function forMember_PatientEntity_addresses() {
    return forMember<Patient, PatientEntity>(
        (v) => v.addresses,
        mapWith(Address, Location, (p) => p.addresses)
    )
}

function forMember_PatientEntity_civility() {
    return forMember<Patient, PatientEntity>(
        (v) => v.civility,
        mapFrom((p) => p.civility)
    )
}

function forMember_PatientEntity_gender() {
    return forMember<Patient, PatientEntity>(
        (v) => v.gender,
        mapFrom((p) => p.gender)
    )
}

function forMember_PatientEntity_birthSex() {
    return forMember<Patient, PatientEntity>(
        (v) => v.birthSex,
        mapFrom((p) => p.birthSex)
    )
}

function forMember_PatientEntity_mergeToPatientId() {
    return forMember<Patient, PatientEntity>(
        (v) => v.mergeToPatientId,
        mapFrom((p) => p.mergeToPatientId)
    )
}

function forMember_PatientEntity_mergedIds() {
    return forMember<Patient, PatientEntity>(
        (v) => v.mergedIds,
        mapFrom((p) => p.mergedIds)
    )
}

function forMember_PatientEntity_alias() {
    return forMember<Patient, PatientEntity>((v) => v.alias, ignore())
}

function forMember_PatientEntity_active() {
    return forMember<Patient, PatientEntity>(
        (v) => v.active,
        mapFrom((p) => p.active)
    )
}

function forMember_PatientEntity_deactivationReason() {
    return forMember<Patient, PatientEntity>(
        (v) => v.deactivationReason,
        mapFrom((p) => p.deactivationReason)
    )
}

function forMember_PatientEntity_deactivationDate() {
    return forMember<Patient, PatientEntity>(
        (v) => v.deactivationDate,
        mapFrom((p) => p.deactivationDate)
    )
}

function forMember_PatientEntity_ssin() {
    return forMember<Patient, PatientEntity>(
        (v) => v.ssin,
        mapFrom((p) => p.ssin)
    )
}

function forMember_PatientEntity_maidenName() {
    return forMember<Patient, PatientEntity>((v) => v.maidenName, ignore())
}

function forMember_PatientEntity_spouseName() {
    return forMember<Patient, PatientEntity>((v) => v.spouseName, ignore())
}

function forMember_PatientEntity_partnerName() {
    return forMember<Patient, PatientEntity>((v) => v.partnerName, ignore())
}

function forMember_PatientEntity_personalStatus() {
    return forMember<Patient, PatientEntity>(
        (v) => v.personalStatus,
        mapFrom((p) => p.personalStatus)
    )
}

function forMember_PatientEntity_dateOfBirth() {
    return forMember<Patient, PatientEntity>(
        (v) => v.dateOfBirth,
        mapFrom((p) => p.dateOfBirth)
    )
}

function forMember_PatientEntity_dateOfDeath() {
    return forMember<Patient, PatientEntity>(
        (v) => v.dateOfDeath,
        mapFrom((p) => p.dateOfDeath)
    )
}

function forMember_PatientEntity_timestampOfLatestEidReading() {
    return forMember<Patient, PatientEntity>((v) => v.timestampOfLatestEidReading, ignore())
}

function forMember_PatientEntity_placeOfBirth() {
    return forMember<Patient, PatientEntity>(
        (v) => v.placeOfBirth,
        mapFrom((p) => p.placeOfBirth)
    )
}

function forMember_PatientEntity_placeOfDeath() {
    return forMember<Patient, PatientEntity>(
        (v) => v.placeOfDeath,
        mapFrom((p) => p.placeOfDeath)
    )
}

function forMember_PatientEntity_deceased() {
    return forMember<Patient, PatientEntity>(
        (v) => v.deceased,
        mapFrom((p) => p.deceased)
    )
}

function forMember_PatientEntity_education() {
    return forMember<Patient, PatientEntity>(
        (v) => v.education,
        mapFrom((p) => p.education)
    )
}

function forMember_PatientEntity_profession() {
    return forMember<Patient, PatientEntity>(
        (v) => v.profession,
        mapFrom((p) => p.profession)
    )
}

function forMember_PatientEntity_note() {
    return forMember<Patient, PatientEntity>((v) => v.note, ignore())
}

function forMember_PatientEntity_administrativeNote() {
    return forMember<Patient, PatientEntity>((v) => v.administrativeNote, ignore())
}

function forMember_PatientEntity_notes() {
    return forMember<Patient, PatientEntity>(
        (v) => v.notes,
        mapWith(AnnotationEntity, Annotation, (p) => p.notes)
    )
}

function forMember_PatientEntity_nationality() {
    return forMember<Patient, PatientEntity>(
        (v) => v.nationality,
        mapFrom((p) => p.nationality)
    )
}

function forMember_PatientEntity_race() {
    return forMember<Patient, PatientEntity>(
        (v) => v.race,
        mapFrom((p) => p.race)
    )
}

function forMember_PatientEntity_ethnicity() {
    return forMember<Patient, PatientEntity>(
        (v) => v.ethnicity,
        mapFrom((p) => p.ethnicity)
    )
}

function forMember_PatientEntity_preferredUserId() {
    return forMember<Patient, PatientEntity>((v) => v.preferredUserId, ignore())
}

function forMember_PatientEntity_picture() {
    return forMember<Patient, PatientEntity>(
        (v) => v.picture,
        mapFrom((p) => p.picture)
    )
}

function forMember_PatientEntity_externalId() {
    return forMember<Patient, PatientEntity>(
        (v) => v.externalId,
        mapFrom((p) => p.externalId)
    )
}

function forMember_PatientEntity_insurabilities() {
    return forMember<Patient, PatientEntity>((v) => v.insurabilities, ignore())
}

function forMember_PatientEntity_partnerships() {
    return forMember<Patient, PatientEntity>(
        (v) => v.partnerships,
        mapWith(Partnership, RelatedPerson, (p) => p.relatives)
    )
}

function forMember_PatientEntity_patientHealthCareParties() {
    return forMember<Patient, PatientEntity>(
        (v) => v.patientHealthCareParties,
        mapWith(PatientHealthCareParty, RelatedPractitioner, (p) => p.patientPractitioners)
    )
}

function forMember_PatientEntity_financialInstitutionInformation() {
    return forMember<Patient, PatientEntity>((v) => v.financialInstitutionInformation, ignore())
}

function forMember_PatientEntity_medicalHouseContracts() {
    return forMember<Patient, PatientEntity>((v) => v.medicalHouseContracts, ignore())
}

function forMember_PatientEntity_patientProfessions() {
    return forMember<Patient, PatientEntity>(
        (v) => v.patientProfessions,
        mapWith(CodeStub, CodingReference, (p) => p.patientProfessions)
    )
}

function forMember_PatientEntity_parameters() {
    return forMember<Patient, PatientEntity>((v) => v.parameters, ignore())
}

function forMember_PatientEntity_properties() {
    return forMember<Patient, PatientEntity>(
        (v) => v.properties,
        mapWith(PropertyStub, Property, (p) => p.properties)
    )
}

function forMember_PatientEntity_hcPartyKeys() {
    return forMember<Patient, PatientEntity>(
        (v) => v.hcPartyKeys,
        mapFrom((p) => {
            const hcPartyKeys = extractHcPartyKeys(p.systemMetaData)
            return Object.fromEntries(hcPartyKeys?.entries() ?? [])
        })
    )
}

function forMember_PatientEntity_aesExchangeKeys() {
    return forMember<Patient, PatientEntity>(
        (v) => v.aesExchangeKeys,
        mapFrom((p) => {
            const aesExchangeKeys = extractAesExchangeKeys(p.systemMetaData)
            return !!aesExchangeKeys ? convertDeepNestedMapToObject(aesExchangeKeys) : undefined
        })
    )
}

function forMember_PatientEntity_transferKeys() {
    return forMember<Patient, PatientEntity>(
        (v) => v.transferKeys,
        mapFrom((p) => {
            const transferKeys = extractTransferKeys(p.systemMetaData)
            return !!transferKeys ? convertNestedMapToObject(transferKeys) : undefined
        })
    )
}

function forMember_PatientEntity_privateKeyShamirPartitions() {
    return forMember<Patient, PatientEntity>(
        (v) => v.privateKeyShamirPartitions,
        mapFrom((p) => {
            const privateKeyShamirPartitions = extractPrivateKeyShamirPartitions(p.systemMetaData)
            return !!privateKeyShamirPartitions ? convertMapToObject(privateKeyShamirPartitions) : undefined
        })
    )
}

function forMember_PatientEntity_publicKey() {
    return forMember<Patient, PatientEntity>(
        (v) => v.publicKey,
        mapFrom((p) => extractPublicKey(p.systemMetaData))
    )
}

function forMember_PatientEntity_secretForeignKeys() {
    return forMember<Patient, PatientEntity>(
        (v) => v.secretForeignKeys,
        mapFrom((v) => extractSecretForeignKeys(v.systemMetaData))
    )
}

function forMember_PatientEntity_cryptedForeignKeys() {
    return forMember<Patient, PatientEntity>(
        (v) => v.cryptedForeignKeys,
        mapFrom((p) => {
            const delegations = extractCryptedForeignKeys(p.systemMetaData)
            return !!delegations ? convertMapOfArrayOfGenericToObject<Delegation, DelegationEntity>(delegations, (arr) => mapper.mapArray(arr, Delegation, DelegationEntity)) : []
        })
    )
}

function forMember_PatientEntity_delegations() {
    return forMember<Patient, PatientEntity>(
        (v) => v.delegations,
        mapFrom((v) => {
            const delegations = extractDelegations(v.systemMetaData)
            return !!delegations ? convertMapOfArrayOfGenericToObject<Delegation, DelegationEntity>(delegations, (arr) => mapper.mapArray(arr, Delegation, DelegationEntity)) : []
        })
    )
}

function forMember_PatientEntity_encryptionKeys() {
    return forMember<Patient, PatientEntity>(
        (v) => v.encryptionKeys,
        mapFrom((v) => {
            const encryptionKeys = extractEncryptionKeys(v.systemMetaData)
            return !!encryptionKeys ? convertMapOfArrayOfGenericToObject<Delegation, DelegationEntity>(encryptionKeys, (arr) => mapper.mapArray(arr, Delegation, DelegationEntity)) : []
        })
    )
}

function forMember_PatientEntity_encryptedSelf() {
    return forMember<Patient, PatientEntity>(
        (v) => v.encryptedSelf,
        mapFrom((v) => extractEncryptedSelf(v.systemMetaData))
    )
}

function forMember_PatientEntity_medicalLocationId() {
    return forMember<Patient, PatientEntity>((v) => v.medicalLocationId, ignore())
}

function forMember_PatientEntity_nonDuplicateIds() {
    return forMember<Patient, PatientEntity>((v) => v.nonDuplicateIds, ignore())
}

function forMember_PatientEntity_encryptedAdministrativesDocuments() {
    return forMember<Patient, PatientEntity>((v) => v.encryptedAdministrativesDocuments, ignore())
}

function forMember_PatientEntity_comment() {
    return forMember<Patient, PatientEntity>((v) => v.comment, ignore())
}

function forMember_PatientEntity_warning() {
    return forMember<Patient, PatientEntity>((v) => v.warning, ignore())
}

function forMember_PatientEntity_fatherBirthCountry() {
    return forMember<Patient, PatientEntity>((v) => v.fatherBirthCountry, ignore())
}

function forMember_PatientEntity_birthCountry() {
    return forMember<Patient, PatientEntity>((v) => v.birthCountry, ignore())
}

function forMember_PatientEntity_nativeCountry() {
    return forMember<Patient, PatientEntity>((v) => v.nativeCountry, ignore())
}

function forMember_PatientEntity_socialStatus() {
    return forMember<Patient, PatientEntity>((v) => v.socialStatus, ignore())
}

function forMember_PatientEntity_mainSourceOfIncome() {
    return forMember<Patient, PatientEntity>((v) => v.mainSourceOfIncome, ignore())
}

function forMember_PatientEntity_schoolingInfos() {
    return forMember<Patient, PatientEntity>((v) => v.schoolingInfos, ignore())
}

function forMember_PatientEntity_employementInfos() {
    return forMember<Patient, PatientEntity>((v) => v.employementInfos, ignore())
}

function forMember_PatientEntity_securityMetadata() {
    return forMember<Patient, PatientEntity>(
        (v) => v.securityMetadata,
        mapWith(SecurityMetadataEntity, SecurityMetadata, (p) => extractSecurityMetadata(p.systemMetaData))
    )
}

function forMember_Patient_id() {
    return forMember<PatientEntity, Patient>(
        (v) => v.id,
        mapFrom((p) => p.id)
    )
}

function forMember_Patient_rev() {
    return forMember<PatientEntity, Patient>(
        (v) => v.rev,
        mapFrom((p) => p.rev)
    )
}

function forMember_Patient_identifiers() {
    return forMember<PatientEntity, Patient>(
        (v) => v.identifiers,
        mapWith(Identifier, IdentifierEntity, (p) => p.identifier)
    )
}

function forMember_Patient_created() {
    return forMember<PatientEntity, Patient>(
        (v) => v.created,
        mapFrom((p) => p.created)
    )
}

function forMember_Patient_modified() {
    return forMember<PatientEntity, Patient>(
        (v) => v.modified,
        mapFrom((p) => p.modified)
    )
}

function forMember_Patient_author() {
    return forMember<PatientEntity, Patient>(
        (v) => v.author,
        mapFrom((p) => p.author)
    )
}

function forMember_Patient_responsible() {
    return forMember<PatientEntity, Patient>(
        (v) => v.responsible,
        mapFrom((p) => p.responsible)
    )
}

function forMember_Patient_tags() {
    return forMember<PatientEntity, Patient>(
        (v) => v.tags,
        mapWith(CodingReference, CodeStub, (p) => p.tags)
    )
}

function forMember_Patient_codes() {
    return forMember<PatientEntity, Patient>(
        (v) => v.codes,
        mapWith(CodingReference, CodeStub, (p) => p.codes)
    )
}

function forMember_Patient_endOfLife() {
    return forMember<PatientEntity, Patient>(
        (v) => v.endOfLife,
        mapFrom((p) => p.endOfLife)
    )
}

function forMember_Patient_deletionDate() {
    return forMember<PatientEntity, Patient>(
        (v) => v.deletionDate,
        mapFrom((p) => p.deletionDate)
    )
}

function forMember_Patient_languages() {
    return forMember<PatientEntity, Patient>(
        (v) => v.languages,
        mapFrom((p) => p.languages)
    )
}

function forMember_Patient_addresses() {
    return forMember<PatientEntity, Patient>(
        (v) => v.addresses,
        mapWith(Location, Address, (p) => p.addresses)
    )
}

function forMember_Patient_civility() {
    return forMember<PatientEntity, Patient>(
        (v) => v.civility,
        mapFrom((p) => p.civility)
    )
}

function forMember_Patient_gender() {
    return forMember<PatientEntity, Patient>(
        (v) => v.gender,
        mapFrom((p) => p.gender)
    )
}

function forMember_Patient_birthSex() {
    return forMember<PatientEntity, Patient>(
        (v) => v.birthSex,
        mapFrom((p) => p.birthSex)
    )
}

function forMember_Patient_mergeToPatientId() {
    return forMember<PatientEntity, Patient>(
        (v) => v.mergeToPatientId,
        mapFrom((p) => p.mergeToPatientId)
    )
}

function forMember_Patient_mergedIds() {
    return forMember<PatientEntity, Patient>(
        (v) => v.mergedIds,
        mapFrom((p) => p.mergedIds)
    )
}

function forMember_Patient_active() {
    return forMember<PatientEntity, Patient>(
        (v) => v.active,
        mapFrom((p) => p.active)
    )
}

function forMember_Patient_deactivationReason() {
    return forMember<PatientEntity, Patient>(
        (v) => v.deactivationReason,
        mapFrom((p) => p.deactivationReason)
    )
}

function forMember_Patient_personalStatus() {
    return forMember<PatientEntity, Patient>(
        (v) => v.personalStatus,
        mapFrom((p) => p.personalStatus)
    )
}

function forMember_Patient_dateOfBirth() {
    return forMember<PatientEntity, Patient>(
        (v) => v.dateOfBirth,
        mapFrom((p) => p.dateOfBirth)
    )
}

function forMember_Patient_dateOfDeath() {
    return forMember<PatientEntity, Patient>(
        (v) => v.dateOfDeath,
        mapFrom((p) => p.dateOfDeath)
    )
}

function forMember_Patient_placeOfBirth() {
    return forMember<PatientEntity, Patient>(
        (v) => v.placeOfBirth,
        mapFrom((p) => p.placeOfBirth)
    )
}

function forMember_Patient_placeOfDeath() {
    return forMember<PatientEntity, Patient>(
        (v) => v.placeOfDeath,
        mapFrom((p) => p.placeOfDeath)
    )
}

function forMember_Patient_deceased() {
    return forMember<PatientEntity, Patient>(
        (v) => v.deceased,
        mapFrom((p) => p.deceased)
    )
}

function forMember_Patient_education() {
    return forMember<PatientEntity, Patient>(
        (v) => v.education,
        mapFrom((p) => p.education)
    )
}

function forMember_Patient_profession() {
    return forMember<PatientEntity, Patient>(
        (v) => v.profession,
        mapFrom((p) => p.profession)
    )
}

function forMember_Patient_notes() {
    return forMember<PatientEntity, Patient>(
        (v) => v.notes,
        mapWith(Annotation, AnnotationEntity, (p) => p.notes)
    )
}

function forMember_Patient_nationality() {
    return forMember<PatientEntity, Patient>(
        (v) => v.nationality,
        mapFrom((p) => p.nationality)
    )
}

function forMember_Patient_race() {
    return forMember<PatientEntity, Patient>(
        (v) => v.race,
        mapFrom((p) => p.race)
    )
}

function forMember_Patient_ethnicity() {
    return forMember<PatientEntity, Patient>(
        (v) => v.ethnicity,
        mapFrom((p) => p.ethnicity)
    )
}

function forMember_Patient_picture() {
    return forMember<PatientEntity, Patient>(
        (v) => v.picture,
        mapFrom((p) => p.picture)
    )
}

function forMember_Patient_externalId() {
    return forMember<PatientEntity, Patient>(
        (v) => v.externalId,
        mapFrom((p) => p.externalId)
    )
}

function forMember_Patient_relatives() {
    return forMember<PatientEntity, Patient>(
        (v) => v.relatives,
        mapWith(RelatedPerson, Partnership, (p) => p.partnerships)
    )
}

function forMember_Patient_patientPractioners() {
    return forMember<PatientEntity, Patient>(
        (v) => v.patientPractitioners,
        mapWith(RelatedPractitioner, PatientHealthCareParty, (p) => p.patientHealthCareParties)
    )
}

function forMember_Patient_patientProfessions() {
    return forMember<PatientEntity, Patient>(
        (v) => v.patientProfessions,
        mapWith(CodingReference, CodeStub, (p) => p.patientProfessions)
    )
}

function forMember_Patient_properties() {
    return forMember<PatientEntity, Patient>(
        (v) => v.properties,
        mapWith(Property, PropertyStub, (p) => p.properties)
    )
}

function forMember_Patient_systemMetaData() {
    return forMember<PatientEntity, Patient>(
        (v) => v.systemMetaData,
        mapFrom((p) => {
            return new SystemMetaDataOwnerEncrypted({
                encryptedSelf: p.encryptedSelf,
                securityMetadata: mapper.map(p.securityMetadata, SecurityMetadataEntity, SecurityMetadata),
                cryptedForeignKeys: !!p.cryptedForeignKeys ? convertObjectToMapOfArrayOfGeneric<DelegationEntity, Delegation>(p.cryptedForeignKeys, (arr) => mapper.mapArray(arr, DelegationEntity, Delegation)) : undefined,
                delegations: !!p.delegations ? convertObjectToMapOfArrayOfGeneric<DelegationEntity, Delegation>(p.delegations, (arr) => mapper.mapArray(arr, DelegationEntity, Delegation)) : undefined,
                encryptionKeys: !!p.encryptionKeys ? convertObjectToMapOfArrayOfGeneric<DelegationEntity, Delegation>(p.encryptionKeys, (arr) => mapper.mapArray(arr, DelegationEntity, Delegation)) : undefined,
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
    return forMember<PatientEntity, Patient>(
        (v) => v.names,
        mapWith(HumanName, PersonName, (p) => p.names)
    )
}

function forMember_Patient_deactivationDate() {
    return forMember<PatientEntity, Patient>(
        (v) => v.deactivationDate,
        mapFrom((p) => p.deactivationDate)
    )
}

function forMember_Patient_ssin() {
    return forMember<PatientEntity, Patient>(
        (v) => v.ssin,
        mapFrom((p) => p.ssin)
    )
}

function forMember_PatientEntity__type() {
    return forMember<Patient, PatientEntity>((v) => v._type, fromValue('Patient'))
}

function forMember_PatientEntity_publicKeysForOaepWithSha256() {
    return forMember<Patient, PatientEntity>(
        (v) => v.publicKeysForOaepWithSha256,
        mapFrom((v) => extractPublicKeysForOaepWithSha256(v.systemMetaData))
    )
}

function forMember_Patient_patientPractitioners() {
    return forMember<PatientEntity, Patient>(
        (v) => v.patientPractitioners,
        mapWith(RelatedPractitioner, PatientHealthCareParty, (p) => p.patientHealthCareParties)
    )
}

export function initializePatientMapper() {
    createMap(
        mapper,
        Patient,
        PatientEntity,
        forMember_PatientEntity_id(),
        forMember_PatientEntity_rev(),
        forMember_PatientEntity_identifier(),
        forMember_PatientEntity_created(),
        forMember_PatientEntity_modified(),
        forMember_PatientEntity_author(),
        forMember_PatientEntity_responsible(),
        forMember_PatientEntity_tags(),
        forMember_PatientEntity_codes(),
        forMember_PatientEntity_endOfLife(),
        forMember_PatientEntity_deletionDate(),
        forMember_PatientEntity_firstName(),
        forMember_PatientEntity_lastName(),
        forMember_PatientEntity_names(),
        forMember_PatientEntity_companyName(),
        forMember_PatientEntity_languages(),
        forMember_PatientEntity_addresses(),
        forMember_PatientEntity_civility(),
        forMember_PatientEntity_gender(),
        forMember_PatientEntity_birthSex(),
        forMember_PatientEntity_mergeToPatientId(),
        forMember_PatientEntity_mergedIds(),
        forMember_PatientEntity_alias(),
        forMember_PatientEntity_active(),
        forMember_PatientEntity_deactivationReason(),
        forMember_PatientEntity_deactivationDate(),
        forMember_PatientEntity_ssin(),
        forMember_PatientEntity_maidenName(),
        forMember_PatientEntity_spouseName(),
        forMember_PatientEntity_partnerName(),
        forMember_PatientEntity_personalStatus(),
        forMember_PatientEntity_dateOfBirth(),
        forMember_PatientEntity_dateOfDeath(),
        forMember_PatientEntity_timestampOfLatestEidReading(),
        forMember_PatientEntity_placeOfBirth(),
        forMember_PatientEntity_placeOfDeath(),
        forMember_PatientEntity_deceased(),
        forMember_PatientEntity_education(),
        forMember_PatientEntity_profession(),
        forMember_PatientEntity_note(),
        forMember_PatientEntity_administrativeNote(),
        forMember_PatientEntity_notes(),
        forMember_PatientEntity_nationality(),
        forMember_PatientEntity_race(),
        forMember_PatientEntity_ethnicity(),
        forMember_PatientEntity_preferredUserId(),
        forMember_PatientEntity_picture(),
        forMember_PatientEntity_externalId(),
        forMember_PatientEntity_insurabilities(),
        forMember_PatientEntity_partnerships(),
        forMember_PatientEntity_patientHealthCareParties(),
        forMember_PatientEntity_financialInstitutionInformation(),
        forMember_PatientEntity_medicalHouseContracts(),
        forMember_PatientEntity_patientProfessions(),
        forMember_PatientEntity_parameters(),
        forMember_PatientEntity_properties(),
        forMember_PatientEntity_hcPartyKeys(),
        forMember_PatientEntity_aesExchangeKeys(),
        forMember_PatientEntity_transferKeys(),
        forMember_PatientEntity_privateKeyShamirPartitions(),
        forMember_PatientEntity_publicKey(),
        forMember_PatientEntity_publicKeysForOaepWithSha256(),
        forMember_PatientEntity_secretForeignKeys(),
        forMember_PatientEntity_cryptedForeignKeys(),
        forMember_PatientEntity_delegations(),
        forMember_PatientEntity_encryptionKeys(),
        forMember_PatientEntity_encryptedSelf(),
        forMember_PatientEntity_medicalLocationId(),
        forMember_PatientEntity_nonDuplicateIds(),
        forMember_PatientEntity_encryptedAdministrativesDocuments(),
        forMember_PatientEntity_comment(),
        forMember_PatientEntity_warning(),
        forMember_PatientEntity_fatherBirthCountry(),
        forMember_PatientEntity_birthCountry(),
        forMember_PatientEntity_nativeCountry(),
        forMember_PatientEntity_socialStatus(),
        forMember_PatientEntity_mainSourceOfIncome(),
        forMember_PatientEntity_schoolingInfos(),
        forMember_PatientEntity_employementInfos(),
        forMember_PatientEntity_securityMetadata(),
        forMember_PatientEntity__type()
    )

    createMap(
        mapper,
        PatientEntity,
        Patient,
        forMember_Patient_id(),
        forMember_Patient_rev(),
        forMember_Patient_identifiers(),
        forMember_Patient_created(),
        forMember_Patient_modified(),
        forMember_Patient_author(),
        forMember_Patient_responsible(),
        forMember_Patient_tags(),
        forMember_Patient_codes(),
        forMember_Patient_endOfLife(),
        forMember_Patient_deletionDate(),
        forMember_Patient_names(),
        forMember_Patient_languages(),
        forMember_Patient_addresses(),
        forMember_Patient_civility(),
        forMember_Patient_gender(),
        forMember_Patient_birthSex(),
        forMember_Patient_mergeToPatientId(),
        forMember_Patient_mergedIds(),
        forMember_Patient_active(),
        forMember_Patient_deactivationDate(),
        forMember_Patient_deactivationReason(),
        forMember_Patient_ssin(),
        forMember_Patient_personalStatus(),
        forMember_Patient_dateOfBirth(),
        forMember_Patient_dateOfDeath(),
        forMember_Patient_placeOfBirth(),
        forMember_Patient_placeOfDeath(),
        forMember_Patient_deceased(),
        forMember_Patient_education(),
        forMember_Patient_profession(),
        forMember_Patient_notes(),
        forMember_Patient_nationality(),
        forMember_Patient_race(),
        forMember_Patient_ethnicity(),
        forMember_Patient_picture(),
        forMember_Patient_externalId(),
        forMember_Patient_relatives(),
        forMember_Patient_patientPractitioners(),
        forMember_Patient_patientProfessions(),
        forMember_Patient_properties(),
        forMember_Patient_systemMetaData()
    )
}
