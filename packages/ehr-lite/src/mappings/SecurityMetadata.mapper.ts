import { SecurityMetadata } from '../models/SecurityMetadata.model'
import { SecureDelegation as SecureDelegationEntity, SecurityMetadata as SecurityMetadataEntity } from '@icure/api'
import { createMap, forMember, mapFrom } from '@automapper/core'
import { mapper } from './mapper'
import {
    convertMapOfArrayOfGenericToObject,
    convertMapOfGenericToObject,
    convertMapToObject, convertObjectToMap,
    convertObjectToMapOfGeneric
} from '../../../common/src/utils/Metadata.utils'
import { SecureDelegation } from '../models/SecureDelegation.model'

function forMember_SecurityMetadataEntity_secureDelegations() {
    return forMember<SecurityMetadata, SecurityMetadataEntity>(
        (v) => v.secureDelegations,
        mapFrom((s) => (!!s.secureDelegations ? convertMapOfGenericToObject<SecureDelegation, SecureDelegationEntity>(s.secureDelegations, (arr) => mapper.map(arr, SecureDelegation, SecureDelegationEntity)) : undefined))
    )
}

function forMember_SecurityMetadataEntity_keysEquivalences() {
    return forMember<SecurityMetadata, SecurityMetadataEntity>(
        (v) => v.keysEquivalences,
        mapFrom((s) => !!s.keysEquivalences ? convertMapToObject(s.keysEquivalences) : undefined)
    )
}

function forMember_SecurityMetadata_secureDelegations() {
    return forMember<SecurityMetadataEntity, SecurityMetadata>(
        (v) => v.secureDelegations,
        mapFrom((s) => !!s.secureDelegations
            ? convertObjectToMapOfGeneric<SecureDelegationEntity, SecureDelegation>(s.secureDelegations, (arr) => mapper.map(arr, SecureDelegationEntity, SecureDelegation))
            : undefined
        )
    )
}

function forMember_SecurityMetadata_keysEquivalences() {
    return forMember<SecurityMetadataEntity, SecurityMetadata>(
        (v) => v.keysEquivalences,
        mapFrom((s) => !!s.keysEquivalences ? convertObjectToMap(s.keysEquivalences) : undefined)
    )
}

export function initializeSecurityMetadataMapper() {
    createMap(mapper, SecurityMetadata, SecurityMetadataEntity, forMember_SecurityMetadataEntity_secureDelegations(), forMember_SecurityMetadataEntity_keysEquivalences())

    createMap(mapper, SecurityMetadataEntity, SecurityMetadata, forMember_SecurityMetadata_secureDelegations(), forMember_SecurityMetadata_keysEquivalences())
}

export function mapSecurityMetadataEntityToSecurityMetadata(entity: SecurityMetadataEntity): SecurityMetadata {
    return mapper.map(entity, SecurityMetadataEntity, SecurityMetadata)
}

export function mapSecurityMetadataToSecurityMetadataEntity(model: SecurityMetadata): SecurityMetadataEntity {
    return mapper.map(model, SecurityMetadata, SecurityMetadataEntity)
}
