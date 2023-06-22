import { createMap, forMember, mapFrom, mapWith, Mapper } from '@automapper/core'
import { Identifier as IdentifierDto } from '@icure/api/icc-api/model/Identifier'
import { Identifier } from '../models/Identifier.model'
import { CodeStub } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'

function forMember_IdentifierDto_id() {
    return forMember<Identifier, IdentifierDto>(v => v.id, mapFrom(v => v.id))
}

function forMember_IdentifierDto_assigner() {
    return forMember<Identifier, IdentifierDto>(v => v.assigner, mapFrom(v => v.assigner))
}

function forMember_IdentifierDto_start() {
    return forMember<Identifier, IdentifierDto>(v => v.start, mapFrom(v => v.start))
}

function forMember_IdentifierDto_end() {
    return forMember<Identifier, IdentifierDto>(v => v.end, mapFrom(v => v.end))
}

function forMember_IdentifierDto_system() {
    return forMember<Identifier, IdentifierDto>(v => v.system, mapFrom(v => v.system))
}

function forMember_IdentifierDto_type() {
    return forMember<Identifier, IdentifierDto>(v => v.type, mapWith(CodeStub, CodingReference, v => v.type))
}

function forMember_IdentifierDto_use() {
    return forMember<Identifier, IdentifierDto>(v => v.use, mapFrom(v => v.use))
}

function forMember_IdentifierDto_value() {
    return forMember<Identifier, IdentifierDto>(v => v.value, mapFrom(v => v.value))
}

function forMember_Identifier_assigner() {
    return forMember<IdentifierDto, Identifier>(v => v.assigner, mapFrom(v => v.assigner))
}

function forMember_Identifier_end() {
    return forMember<IdentifierDto, Identifier>(v => v.end, mapFrom(v => v.end))
}

function forMember_Identifier_id() {
    return forMember<IdentifierDto, Identifier>(v => v.id, mapFrom(v => v.id))
}

function forMember_Identifier_start() {
    return forMember<IdentifierDto, Identifier>(v => v.start, mapFrom(v => v.start))
}

function forMember_Identifier_system() {
    return forMember<IdentifierDto, Identifier>(v => v.system, mapFrom(v => v.system))
}

function forMember_Identifier_type() {
    return forMember<IdentifierDto, Identifier>(v => v.type, mapWith(CodingReference, CodeStub, v => v.type))
}

function forMember_Identifier_use() {
    return forMember<IdentifierDto, Identifier>(v => v.use, mapFrom(v => v.use))
}

function forMember_Identifier_value() {
    return forMember<IdentifierDto, Identifier>(v => v.value, mapFrom(v => v.value))
}

export function initializeIdentifierMapper(mapper: Mapper) {
    createMap(mapper, Identifier, IdentifierDto, forMember_IdentifierDto_id(), forMember_IdentifierDto_assigner(), forMember_IdentifierDto_start(), forMember_IdentifierDto_end(), forMember_IdentifierDto_system(), forMember_IdentifierDto_type(), forMember_IdentifierDto_use(), forMember_IdentifierDto_value())

    createMap(mapper, IdentifierDto, Identifier, forMember_Identifier_id(), forMember_Identifier_assigner(), forMember_Identifier_start(), forMember_Identifier_end(), forMember_Identifier_system(), forMember_Identifier_type(), forMember_Identifier_use(), forMember_Identifier_value())
}
