import { createMap, forMember, fromValue, ignore, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { CodeStub, Delegation as DelegationEntity, HealthElement, Identifier as IdentifierEntity, SecurityMetadata as SecurityMetadataEntity } from '@icure/api'
import { Condition } from '../models/Condition.model'
import { CodingReference } from '../models/CodingReference.model'
import { Annotation } from '../models/Annotation.model'
import { Annotation as AnnotationEntity } from '@icure/api/icc-api/model/Annotation'
import { Identifier } from '../models/Identifier.model'
import { convertObjectToMapOfDelegations, extractCryptedForeignKeys, extractDelegations, extractEncryptedSelf, extractEncryptionKeys, extractSecretForeignKeys, extractSecurityMetadata } from '../models/utils/Metadata.utils'
import { Delegation } from '../models/Delegation.model'
import { SecurityMetadata } from '../models/SecurityMetadata.model'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'

function forMember_HealthElement_id() {
    return forMember<Condition, HealthElement>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_HealthElement_identifiers() {
    return forMember<Condition, HealthElement>(
        (v) => v.identifiers,
        mapWith(Identifier, IdentifierEntity, (v) => v.identifiers)
    )
}

function forMember_HealthElement_rev() {
    return forMember<Condition, HealthElement>(
        (v) => v.rev,
        mapFrom((v) => v.rev)
    )
}

function forMember_HealthElement_created() {
    return forMember<Condition, HealthElement>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_HealthElement_modified() {
    return forMember<Condition, HealthElement>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_HealthElement_author() {
    return forMember<Condition, HealthElement>(
        (v) => v.author,
        mapFrom((v) => v.author)
    )
}

function forMember_HealthElement_responsible() {
    return forMember<Condition, HealthElement>(
        (v) => v.responsible,
        mapFrom((v) => v.responsible)
    )
}

function forMember_HealthElement_medicalLocationId() {
    return forMember<Condition, HealthElement>(
        (v) => v.medicalLocationId,
        mapFrom((v) => v.medicalLocationId)
    )
}

function forMember_HealthElement_tags() {
    return forMember<Condition, HealthElement>(
        (v) => v.tags,
        mapFrom((v) => {
            if (!v.tags) {
                return undefined
            }

            const tags = [...(v.tags ?? [])]
            const bodySite = [...(v.bodySite ?? [])]

            const bodySiteCodeStubs = mapper.mapArray(bodySite, CodingReference, CodeStub).map((c) => {
                return new CodeStub({
                    ...c,
                    context: 'bodySite',
                })
            })

            const tagsCodeStubs = mapper.mapArray(tags, CodingReference, CodeStub)

            return [...tagsCodeStubs, ...bodySiteCodeStubs]
        })
    )
}

function forMember_HealthElement_codes() {
    return forMember<Condition, HealthElement>(
        (v) => v.codes,
        mapWith(CodingReference, CodeStub, (v) => (!!v.codes ? [...v.codes] : undefined))
    )
}

function forMember_HealthElement_endOfLife() {
    return forMember<Condition, HealthElement>(
        (v) => v.endOfLife,
        mapFrom((v) => v.endOfLife)
    )
}

function forMember_HealthElement_deletionDate() {
    return forMember<Condition, HealthElement>(
        (v) => v.deletionDate,
        mapFrom((v) => v.deletionDate)
    )
}

function forMember_HealthElement_healthElementId() {
    return forMember<Condition, HealthElement>(
        (v) => v.healthElementId,
        mapFrom((v) => v.healthcareElementId)
    )
}

function forMember_HealthElement_valueDate() {
    return forMember<Condition, HealthElement>(
        (v) => v.valueDate,
        mapFrom((v) => v.recordedDate)
    )
}

function forMember_HealthElement_openingDate() {
    return forMember<Condition, HealthElement>(
        (v) => v.openingDate,
        mapFrom((v) => v.openingDate)
    )
}

function forMember_HealthElement_closingDate() {
    return forMember<Condition, HealthElement>(
        (v) => v.closingDate,
        mapFrom((v) => v.closingDate)
    )
}

function forMember_HealthElement_descr() {
    return forMember<Condition, HealthElement>(
        (v) => v.descr,
        mapFrom((v) => v.description)
    )
}

function forMember_HealthElement_note() {
    return forMember<Condition, HealthElement>((v) => v.note, ignore())
}

function forMember_HealthElement_notes() {
    return forMember<Condition, HealthElement>(
        (v) => v.notes,
        mapWith(Annotation, AnnotationEntity, (v) => v.notes)
    )
}

function forMember_HealthElement_relevant() {
    return forMember<Condition, HealthElement>((v) => v.relevant, ignore())
}

function forMember_HealthElement_idOpeningContact() {
    return forMember<Condition, HealthElement>((v) => v.idOpeningContact, ignore())
}

function forMember_HealthElement_idClosingContact() {
    return forMember<Condition, HealthElement>((v) => v.idClosingContact, ignore())
}

function forMember_HealthElement_idService() {
    return forMember<Condition, HealthElement>((v) => v.idService, ignore())
}

function forMember_HealthElement_status() {
    return forMember<Condition, HealthElement>((v) => v.status, ignore())
}

function forMember_HealthElement_laterality() {
    return forMember<Condition, HealthElement>((v) => v.laterality, ignore())
}

function forMember_HealthElement_plansOfAction() {
    return forMember<Condition, HealthElement>((v) => v.plansOfAction, ignore())
}

function forMember_HealthElement_episodes() {
    return forMember<Condition, HealthElement>((v) => v.episodes, ignore())
}

function forMember_HealthElement_careTeam() {
    return forMember<Condition, HealthElement>((v) => v.careTeam, ignore())
}

function forMember_HealthElement_secretForeignKeys() {
    return forMember<Condition, HealthElement>(
        (v) => v.secretForeignKeys,
        mapFrom((v) => extractSecretForeignKeys(v.systemMetaData))
    )
}

function forMember_HealthElement_cryptedForeignKeys() {
    return forMember<Condition, HealthElement>(
        (v) => v.cryptedForeignKeys,
        mapFrom((v) => {
            const cryptedForeignKeys = extractCryptedForeignKeys(v.systemMetaData)

            if (!cryptedForeignKeys) {
                return undefined
            }

            return new Map([...cryptedForeignKeys].map(([key, value]) => [key, mapper.mapArray(value, Delegation, DelegationEntity)]))
        })
    )
}

function forMember_HealthElement_delegations() {
    return forMember<Condition, HealthElement>(
        (v) => v.delegations,
        mapFrom((v) => {
            const delegations = extractDelegations(v.systemMetaData)

            if (!delegations) {
                return undefined
            }

            return new Map([...delegations].map(([key, value]) => [key, mapper.mapArray(value, Delegation, DelegationEntity)]))
        })
    )
}

function forMember_HealthElement_encryptionKeys() {
    return forMember<Condition, HealthElement>(
        (v) => v.encryptionKeys,
        mapFrom((v) => {
            const encryptionKeys = extractEncryptionKeys(v.systemMetaData)

            if (!encryptionKeys) {
                return undefined
            }

            return new Map([...encryptionKeys].map(([key, value]) => [key, mapper.mapArray(value, Delegation, DelegationEntity)]))
        })
    )
}

function forMember_HealthElement_encryptedSelf() {
    return forMember<Condition, HealthElement>(
        (v) => v.encryptedSelf,
        mapFrom((v) => extractEncryptedSelf(v.systemMetaData))
    )
}

function forMember_HealthElement_securityMetadata() {
    return forMember<Condition, HealthElement>(
        (v) => v.securityMetadata,
        mapWith(SecurityMetadata, SecurityMetadataEntity, (v) => extractSecurityMetadata(v.systemMetaData))
    )
}

function forMember_HealthElement__type() {
    return forMember<Condition, HealthElement>((v) => v._type, fromValue('HealthElement'))
}

function forMember_Condition_id() {
    return forMember<HealthElement, Condition>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_Condition_identifiers() {
    return forMember<HealthElement, Condition>(
        (v) => v.identifiers,
        mapWith(Identifier, IdentifierEntity, (v) => v.identifiers)
    )
}

function forMember_Condition_rev() {
    return forMember<HealthElement, Condition>(
        (v) => v.rev,
        mapFrom((v) => v.rev)
    )
}

function forMember_Condition_created() {
    return forMember<HealthElement, Condition>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_Condition_modified() {
    return forMember<HealthElement, Condition>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_Condition_author() {
    return forMember<HealthElement, Condition>(
        (v) => v.author,
        mapFrom((v) => v.author)
    )
}

function forMember_Condition_responsible() {
    return forMember<HealthElement, Condition>(
        (v) => v.responsible,
        mapFrom((v) => v.responsible)
    )
}

function forMember_Condition_medicalLocationId() {
    return forMember<HealthElement, Condition>(
        (v) => v.medicalLocationId,
        mapFrom((v) => v.medicalLocationId)
    )
}

function forMember_Condition_clinicalStatus() {
    return forMember<HealthElement, Condition>(
        (v) => v.clinicalStatus,
        mapFrom((v) => v.tags?.find((v) => v.context === 'clinicalStatus')?.type)
    )
}

function forMember_Condition_verificationStatus() {
    return forMember<HealthElement, Condition>(
        (v) => v.verificationStatus,
        mapFrom((v) => v.tags?.find((v) => v.context === 'verificationStatus')?.type)
    )
}

function forMember_Condition_category() {
    return forMember<HealthElement, Condition>(
        (v) => v.category,
        mapFrom((v) => v.tags?.find((v) => v.context === 'category')?.type)
    )
}

function forMember_Condition_severity() {
    return forMember<HealthElement, Condition>(
        (v) => v.severity,
        mapFrom((v) => v.tags?.find((v) => v.context === 'severity')?.type)
    )
}

function forMember_Condition_bodySite() {
    return forMember<HealthElement, Condition>(
        (v) => v.bodySite,
        mapWith(CodingReference, CodeStub, (v) => v.tags?.filter((v) => v.context === 'bodySite'))
    )
}

function forMember_Condition_tags() {
    return forMember<HealthElement, Condition>(
        (v) => v.tags,
        mapWith(CodingReference, CodeStub, (v) => v.tags?.filter((v) => (!!v.context ? ['clinicalStatus', 'verificationStatus', 'category', 'severity', 'bodySite'].includes(v.context) : undefined)))
    )
}

function forMember_Condition_codes() {
    return forMember<HealthElement, Condition>(
        (v) => v.codes,
        mapWith(CodingReference, CodeStub, (v) => v.codes)
    )
}

function forMember_Condition_endOfLife() {
    return forMember<HealthElement, Condition>(
        (v) => v.endOfLife,
        mapFrom((v) => v.endOfLife)
    )
}

function forMember_Condition_deletionDate() {
    return forMember<HealthElement, Condition>(
        (v) => v.deletionDate,
        mapFrom((v) => v.deletionDate)
    )
}

function forMember_Condition_healthcareElementId() {
    return forMember<HealthElement, Condition>(
        (v) => v.healthcareElementId,
        mapFrom((v) => v.healthElementId)
    )
}

function forMember_Condition_recordedDate() {
    return forMember<HealthElement, Condition>(
        (v) => v.recordedDate,
        mapFrom((v) => v.valueDate)
    )
}

function forMember_Condition_openingDate() {
    return forMember<HealthElement, Condition>(
        (v) => v.openingDate,
        mapFrom((v) => v.openingDate)
    )
}

function forMember_Condition_closingDate() {
    return forMember<HealthElement, Condition>(
        (v) => v.closingDate,
        mapFrom((v) => v.closingDate)
    )
}

function forMember_Condition_description() {
    return forMember<HealthElement, Condition>(
        (v) => v.description,
        mapFrom((v) => v.descr)
    )
}

function forMember_Condition_notes() {
    return forMember<HealthElement, Condition>(
        (v) => v.notes,
        mapWith(Annotation, AnnotationEntity, (v) => v.notes)
    )
}

function forMember_Condition_systemMetaData() {
    return forMember<HealthElement, Condition>(
        (v) => v.systemMetaData,
        mapFrom(
            (v) =>
                new SystemMetaDataEncrypted({
                    encryptedSelf: v.encryptedSelf,
                    secretForeignKeys: v.secretForeignKeys,
                    cryptedForeignKeys: !!v.cryptedForeignKeys ? new Map(Object.entries(v.cryptedForeignKeys).map(([k, v]) => [k, mapper.mapArray(v, Delegation, DelegationEntity)])) : undefined,
                    delegations: !!v.delegations ? new Map(Object.entries(v.delegations).map(([k, v]) => [k, mapper.mapArray(v, Delegation, DelegationEntity)])) : undefined,
                    encryptionKeys: !!v.encryptionKeys ? convertObjectToMapOfDelegations<DelegationEntity, Delegation>(v.encryptionKeys, (arr) => mapper.mapArray(arr, DelegationEntity, Delegation)) : undefined,
                    securityMetadata: mapper.map(v.securityMetadata, SecurityMetadataEntity, SecurityMetadata),
                })
        )
    )
}

export function initializeConditionMapper() {
    createMap(
        mapper,
        Condition,
        HealthElement,
        forMember_HealthElement_id(),
        forMember_HealthElement_identifiers(),
        forMember_HealthElement_rev(),
        forMember_HealthElement_created(),
        forMember_HealthElement_modified(),
        forMember_HealthElement_author(),
        forMember_HealthElement_responsible(),
        forMember_HealthElement_medicalLocationId(),
        forMember_HealthElement_tags(),
        forMember_HealthElement_codes(),
        forMember_HealthElement_endOfLife(),
        forMember_HealthElement_deletionDate(),
        forMember_HealthElement_healthElementId(),
        forMember_HealthElement_valueDate(),
        forMember_HealthElement_openingDate(),
        forMember_HealthElement_closingDate(),
        forMember_HealthElement_descr(),
        forMember_HealthElement_note(),
        forMember_HealthElement_notes(),
        forMember_HealthElement_relevant(),
        forMember_HealthElement_idOpeningContact(),
        forMember_HealthElement_idClosingContact(),
        forMember_HealthElement_idService(),
        forMember_HealthElement_status(),
        forMember_HealthElement_laterality(),
        forMember_HealthElement_plansOfAction(),
        forMember_HealthElement_episodes(),
        forMember_HealthElement_careTeam(),
        forMember_HealthElement_secretForeignKeys(),
        forMember_HealthElement_cryptedForeignKeys(),
        forMember_HealthElement_delegations(),
        forMember_HealthElement_encryptionKeys(),
        forMember_HealthElement_encryptedSelf(),
        forMember_HealthElement_securityMetadata(),
        forMember_HealthElement__type()
    )

    createMap(
        mapper,
        HealthElement,
        Condition,
        forMember_Condition_id(),
        forMember_Condition_identifiers(),
        forMember_Condition_rev(),
        forMember_Condition_created(),
        forMember_Condition_modified(),
        forMember_Condition_author(),
        forMember_Condition_responsible(),
        forMember_Condition_medicalLocationId(),
        forMember_Condition_clinicalStatus(),
        forMember_Condition_verificationStatus(),
        forMember_Condition_category(),
        forMember_Condition_severity(),
        forMember_Condition_bodySite(),
        forMember_Condition_tags(),
        forMember_Condition_codes(),
        forMember_Condition_endOfLife(),
        forMember_Condition_deletionDate(),
        forMember_Condition_healthcareElementId(),
        forMember_Condition_recordedDate(),
        forMember_Condition_openingDate(),
        forMember_Condition_closingDate(),
        forMember_Condition_description(),
        forMember_Condition_notes(),
        forMember_Condition_systemMetaData()
    )
}
