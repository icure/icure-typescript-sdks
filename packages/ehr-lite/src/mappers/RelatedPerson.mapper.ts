import { RelatedPerson } from '../models/RelatedPerson.model'
import { Partnership } from '@icure/api'
import { createMap, forMember, ignore, mapFrom, Mapper } from '@automapper/core'

function forMember_Partnership_type() {
    return forMember<RelatedPerson, Partnership>(
        (v) => v.type,
        mapFrom((v) => v.type)
    )
}

function forMember_Partnership_status() {
    return forMember<RelatedPerson, Partnership>(
        (v) => v.status,
        mapFrom((v) => v.status)
    )
}

function forMember_Partnership_partnerId() {
    return forMember<RelatedPerson, Partnership>(
        (v) => v.partnerId,
        mapFrom((v) => v.personId)
    )
}

function forMember_Partnership_meToOtherRelationshipDescription() {
    return forMember<RelatedPerson, Partnership>((v) => v.meToOtherRelationshipDescription, ignore())
}

function forMember_Partnership_otherToMeRelationshipDescription() {
    return forMember<RelatedPerson, Partnership>((v) => v.otherToMeRelationshipDescription, ignore())
}

function forMember_RelatedPerson_type() {
    return forMember<Partnership, RelatedPerson>(
        (v) => v.type,
        mapFrom((v) => v.type)
    )
}

function forMember_RelatedPerson_status() {
    return forMember<Partnership, RelatedPerson>(
        (v) => v.status,
        mapFrom((v) => v.status)
    )
}

function forMember_RelatedPerson_personId() {
    return forMember<Partnership, RelatedPerson>(
        (v) => v.personId,
        mapFrom((v) => v.partnerId)
    )
}

export function initializeRelatedPersonMapper(mapper: Mapper) {
    createMap(mapper, RelatedPerson, Partnership, forMember_Partnership_type(), forMember_Partnership_status(), forMember_Partnership_partnerId(), forMember_Partnership_meToOtherRelationshipDescription(), forMember_Partnership_otherToMeRelationshipDescription())

    createMap(mapper, Partnership, RelatedPerson, forMember_RelatedPerson_type(), forMember_RelatedPerson_status(), forMember_RelatedPerson_personId())
}
