import {SecurityMetadata} from '../models/SecurityMetadata.model'
import {SecureDelegation as SecureDelegationDto, SecurityMetadata as SecurityMetadataDto} from '@icure/api'
import {createMap, forMember, mapFrom, Mapper} from '@automapper/core'
import {mapper} from "./mapper";
import {
    convertMapOfGenericToObject,
    convertMapToObject, convertObjectToMap,
    convertObjectToMapOfGeneric
} from '../utils/Metadata.utils'
import {SecureDelegation} from '../models/SecureDelegation.model'

function forMember_SecurityMetadataDto_secureDelegations() {
    return forMember<SecurityMetadata, SecurityMetadataDto>(
        (v) => v.secureDelegations,
        mapFrom((s) => (!!s.secureDelegations ? convertMapOfGenericToObject<SecureDelegation, SecureDelegationDto>(s.secureDelegations, (arr) => mapper.map(arr, SecureDelegation, SecureDelegationDto)) : undefined))
    )
}

function forMember_SecurityMetadataDto_keysEquivalences() {
    return forMember<SecurityMetadata, SecurityMetadataDto>(
        (v) => v.keysEquivalences,
        mapFrom((s) => {
            return !!s.keysEquivalences ? convertMapToObject(s.keysEquivalences) : undefined
        })
    )
}

function forMember_SecurityMetadata_secureDelegations() {
    return forMember<SecurityMetadataDto, SecurityMetadata>(
        (v) => v.secureDelegations,
        mapFrom((s) => !!s.secureDelegations
            ? convertObjectToMapOfGeneric<SecureDelegationDto, SecureDelegation>(s.secureDelegations, (arr) => mapper.map(arr, SecureDelegationDto, SecureDelegation))
            : undefined
        )
    )
}

function forMember_SecurityMetadata_keysEquivalences() {
    return forMember<SecurityMetadataDto, SecurityMetadata>(
        (v) => v.keysEquivalences,
        mapFrom((s) => {
            return !!s.keysEquivalences ? convertObjectToMap(s.keysEquivalences) : undefined
        })
    )
}

export function initializeSecurityMetadataMapper(mapper: Mapper) {
    createMap(mapper, SecurityMetadata, SecurityMetadataDto, forMember_SecurityMetadataDto_secureDelegations(), forMember_SecurityMetadataDto_keysEquivalences())

    createMap(mapper, SecurityMetadataDto, SecurityMetadata, forMember_SecurityMetadata_secureDelegations(), forMember_SecurityMetadata_keysEquivalences())
}
