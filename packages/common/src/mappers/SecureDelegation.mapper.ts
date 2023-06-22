import { SecureDelegation } from '../models/SecureDelegation.model'
import { SecureDelegation as SecureDelegationDto } from '@icure/api'
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core'

function forMember_SecureDelegationDto_delegator() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.delegator,
        mapFrom((v) => v.delegator)
    )
}

function forMember_SecureDelegationDto_delegate() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.delegate,
        mapFrom((v) => v.delegate)
    )
}

function forMember_SecureDelegationDto_secretIds() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.secretIds,
        mapFrom((v) => v.secretIds)
    )
}

function forMember_SecureDelegationDto_encryptionKeys() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.encryptionKeys,
        mapFrom((v) => v.encryptionKeys)
    )
}

function forMember_SecureDelegationDto_owningEntityIds() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.owningEntityIds,
        mapFrom((v) => v.owningEntityIds)
    )
}

function forMember_SecureDelegationDto_parentDelegations() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.parentDelegations,
        mapFrom((v) => v.parentDelegations)
    )
}

function forMember_SecureDelegationDto_exchangeDataId() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.exchangeDataId,
        mapFrom((v) => v.exchangeDataId)
    )
}

function forMember_SecureDelegationDto_permissions() {
    return forMember<SecureDelegation, SecureDelegationDto>(
        (v) => v.permissions,
        mapFrom((v) => v.permissions)
    )
}

function forMember_SecureDelegation_delegator() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.delegator,
        mapFrom((v) => v.delegator)
    )
}

function forMember_SecureDelegation_delegate() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.delegate,
        mapFrom((v) => v.delegate)
    )
}

function forMember_SecureDelegation_secretIds() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.secretIds,
        mapFrom((v) => v.secretIds)
    )
}

function forMember_SecureDelegation_encryptionKeys() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.encryptionKeys,
        mapFrom((v) => v.encryptionKeys)
    )
}

function forMember_SecureDelegation_owningEntityIds() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.owningEntityIds,
        mapFrom((v) => v.owningEntityIds)
    )
}

function forMember_SecureDelegation_parentDelegations() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.parentDelegations,
        mapFrom((v) => v.parentDelegations)
    )
}

function forMember_SecureDelegation_exchangeDataId() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.exchangeDataId,
        mapFrom((v) => v.exchangeDataId)
    )
}

function forMember_SecureDelegation_permissions() {
    return forMember<SecureDelegationDto, SecureDelegation>(
        (v) => v.permissions,
        mapFrom((v) => v.permissions)
    )
}

export function initializeSecureDelegationMapper(mapper: Mapper) {
    createMap(mapper, SecureDelegation, SecureDelegationDto, forMember_SecureDelegationDto_delegator(), forMember_SecureDelegationDto_delegate(), forMember_SecureDelegationDto_secretIds(), forMember_SecureDelegationDto_encryptionKeys(), forMember_SecureDelegationDto_owningEntityIds(), forMember_SecureDelegationDto_parentDelegations(), forMember_SecureDelegationDto_exchangeDataId(), forMember_SecureDelegationDto_permissions())

    createMap(mapper, SecureDelegationDto, SecureDelegation, forMember_SecureDelegation_delegator(), forMember_SecureDelegation_delegate(), forMember_SecureDelegation_secretIds(), forMember_SecureDelegation_encryptionKeys(), forMember_SecureDelegation_owningEntityIds(), forMember_SecureDelegation_parentDelegations(), forMember_SecureDelegation_exchangeDataId(), forMember_SecureDelegation_permissions())
}
