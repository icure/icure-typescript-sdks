import { SecureDelegation } from '../models/SecureDelegation.model'
import { SecureDelegation as SecureDelegationEntity } from '@icure/api'
import { createMap, forMember, mapFrom } from '@automapper/core'
import { mapper } from './mapper'
import { convertMapToObject, convertObjectToMap } from './utils/Metadata.utils'

function forMember_SecureDelegationEntity_delegator() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.delegator,
        mapFrom((v) => v.delegator)
    )
}

function forMember_SecureDelegationEntity_delegate() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.delegate,
        mapFrom((v) => v.delegate)
    )
}

function forMember_SecureDelegationEntity_secretIds() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.secretIds,
        mapFrom((v) => v.secretIds)
    )
}

function forMember_SecureDelegationEntity_encryptionKeys() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.encryptionKeys,
        mapFrom((v) => v.encryptionKeys)
    )
}

function forMember_SecureDelegationEntity_owningEntityIds() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.owningEntityIds,
        mapFrom((v) => v.owningEntityIds)
    )
}

function forMember_SecureDelegationEntity_parentDelegations() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.parentDelegations,
        mapFrom((v) => v.parentDelegations)
    )
}

function forMember_SecureDelegationEntity_exchangeDataId() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.exchangeDataId,
        mapFrom((v) => v.exchangeDataId)
    )
}

function forMember_SecureDelegationEntity_encryptedExchangeDataId() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.encryptedExchangeDataId,
        mapFrom((v) => (!!v.encryptedExchangeDataId ? convertMapToObject(v.encryptedExchangeDataId) : undefined))
    )
}

function forMember_SecureDelegationEntity_permissions() {
    return forMember<SecureDelegation, SecureDelegationEntity>(
        (v) => v.permissions,
        mapFrom((v) => v.permissions)
    )
}

function forMember_SecureDelegation_delegator() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.delegator,
        mapFrom((v) => v.delegator)
    )
}

function forMember_SecureDelegation_delegate() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.delegate,
        mapFrom((v) => v.delegate)
    )
}

function forMember_SecureDelegation_secretIds() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.secretIds,
        mapFrom((v) => v.secretIds)
    )
}

function forMember_SecureDelegation_encryptionKeys() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.encryptionKeys,
        mapFrom((v) => v.encryptionKeys)
    )
}

function forMember_SecureDelegation_owningEntityIds() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.owningEntityIds,
        mapFrom((v) => v.owningEntityIds)
    )
}

function forMember_SecureDelegation_parentDelegations() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.parentDelegations,
        mapFrom((v) => v.parentDelegations)
    )
}

function forMember_SecureDelegation_exchangeDataId() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.exchangeDataId,
        mapFrom((v) => v.exchangeDataId)
    )
}

function forMember_SecureDelegation_encryptedExchangeDataId() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.encryptedExchangeDataId,
        mapFrom((v) => (!!v.encryptedExchangeDataId ? convertObjectToMap(v.encryptedExchangeDataId) : undefined))
    )
}

function forMember_SecureDelegation_permissions() {
    return forMember<SecureDelegationEntity, SecureDelegation>(
        (v) => v.permissions,
        mapFrom((v) => v.permissions)
    )
}

export function initializeSecureDelegationMapper() {
    createMap(
        mapper,
        SecureDelegation,
        SecureDelegationEntity,
        forMember_SecureDelegationEntity_delegator(),
        forMember_SecureDelegationEntity_delegate(),
        forMember_SecureDelegationEntity_secretIds(),
        forMember_SecureDelegationEntity_encryptionKeys(),
        forMember_SecureDelegationEntity_owningEntityIds(),
        forMember_SecureDelegationEntity_parentDelegations(),
        forMember_SecureDelegationEntity_exchangeDataId(),
        forMember_SecureDelegationEntity_encryptedExchangeDataId(),
        forMember_SecureDelegationEntity_permissions()
    )

    createMap(
        mapper,
        SecureDelegationEntity,
        SecureDelegation,
        forMember_SecureDelegation_delegator(),
        forMember_SecureDelegation_delegate(),
        forMember_SecureDelegation_secretIds(),
        forMember_SecureDelegation_encryptionKeys(),
        forMember_SecureDelegation_owningEntityIds(),
        forMember_SecureDelegation_parentDelegations(),
        forMember_SecureDelegation_exchangeDataId(),
        forMember_SecureDelegation_encryptedExchangeDataId(),
        forMember_SecureDelegation_permissions()
    )
}
