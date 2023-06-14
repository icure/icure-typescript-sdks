import { Delegation } from '../models/Delegation.model'
import { Delegation as DelegationEntity } from '@icure/api'
import { createMap, forMember, ignore, mapFrom } from '@automapper/core'
import { mapper } from './mapper'

function forMember_DelegationEntity_owner() {
    return forMember<Delegation, DelegationEntity>(
        (v) => v.owner,
        mapFrom((v) => v.owner)
    )
}

function forMember_DelegationEntity_delegatedTo() {
    return forMember<Delegation, DelegationEntity>(
        (v) => v.delegatedTo,
        mapFrom((v) => v.delegatedTo)
    )
}

function forMember_DelegationEntity_key() {
    return forMember<Delegation, DelegationEntity>(
        (v) => v.key,
        mapFrom((v) => v.key)
    )
}

function forMember_DelegationEntity_tags() {
    return forMember<Delegation, DelegationEntity>((v) => v.tags, ignore())
}

function forMember_Delegation_owner() {
    return forMember<DelegationEntity, Delegation>(
        (v) => v.owner,
        mapFrom((v) => v.owner)
    )
}

function forMember_Delegation_delegatedTo() {
    return forMember<DelegationEntity, Delegation>(
        (v) => v.delegatedTo,
        mapFrom((v) => v.delegatedTo)
    )
}

function forMember_Delegation_key() {
    return forMember<DelegationEntity, Delegation>(
        (v) => v.key,
        mapFrom((v) => v.key)
    )
}

export function initializeDelegationMapper() {
    createMap(mapper, Delegation, DelegationEntity, forMember_DelegationEntity_owner(), forMember_DelegationEntity_delegatedTo(), forMember_DelegationEntity_key(), forMember_DelegationEntity_tags())

    createMap(mapper, DelegationEntity, Delegation, forMember_Delegation_owner(), forMember_Delegation_delegatedTo(), forMember_Delegation_key())
}
