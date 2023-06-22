import { Delegation as DelegationDto } from '@icure/api'
import {createMap, forMember, ignore, mapFrom, Mapper} from '@automapper/core'
import {Delegation} from "../models/Delegation.model";

function forMember_DelegationDto_owner() {
    return forMember<Delegation, DelegationDto>(
        (v) => v.owner,
        mapFrom((v) => v.owner)
    )
}

function forMember_DelegationDto_delegatedTo() {
    return forMember<Delegation, DelegationDto>(
        (v) => v.delegatedTo,
        mapFrom((v) => v.delegatedTo)
    )
}

function forMember_DelegationDto_key() {
    return forMember<Delegation, DelegationDto>(
        (v) => v.key,
        mapFrom((v) => v.key)
    )
}

function forMember_DelegationDto_tags() {
    return forMember<Delegation, DelegationDto>((v) => v.tags, ignore())
}

function forMember_Delegation_owner() {
    return forMember<DelegationDto, Delegation>(
        (v) => v.owner,
        mapFrom((v) => v.owner)
    )
}

function forMember_Delegation_delegatedTo() {
    return forMember<DelegationDto, Delegation>(
        (v) => v.delegatedTo,
        mapFrom((v) => v.delegatedTo)
    )
}

function forMember_Delegation_key() {
    return forMember<DelegationDto, Delegation>(
        (v) => v.key,
        mapFrom((v) => v.key)
    )
}

export function initializeDelegationMapper(mapper: Mapper) {
    createMap(mapper, Delegation, DelegationDto, forMember_DelegationDto_owner(), forMember_DelegationDto_delegatedTo(), forMember_DelegationDto_key(), forMember_DelegationDto_tags())

    createMap(mapper, DelegationDto, Delegation, forMember_Delegation_owner(), forMember_Delegation_delegatedTo(), forMember_Delegation_key())
}
