import { createMap, forMember, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { Identifier as IdentifierEntity } from '@icure/api/icc-api/model/Identifier'
import { Identifier } from '../models/Identifier.model'
import { CodeStub } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'

function forMember_IdentifierEntity_id() {
    return forMember<Identifier, IdentifierEntity>(v => v.id, mapFrom(v => v.id))
}

function forMember_IdentifierEntity_assigner() {
    return forMember<Identifier, IdentifierEntity>(v => v.assigner, mapFrom(v => v.assigner))
}

function forMember_IdentifierEntity_start() {
    return forMember<Identifier, IdentifierEntity>(v => v.start, mapFrom(v => v.start))
}

function forMember_IdentifierEntity_end() {
    return forMember<Identifier, IdentifierEntity>(v => v.end, mapFrom(v => v.end))
}

function forMember_IdentifierEntity_system() {
    return forMember<Identifier, IdentifierEntity>(v => v.system, mapFrom(v => v.system))
}

function forMember_IdentifierEntity_type() {
    return forMember<Identifier, IdentifierEntity>(v => v.type, mapWith(CodeStub, CodingReference, v => v.type))
}

function forMember_IdentifierEntity_use() {
    return forMember<Identifier, IdentifierEntity>(v => v.use, mapFrom(v => v.use))
}

function forMember_IdentifierEntity_value() {
    return forMember<Identifier, IdentifierEntity>(v => v.value, mapFrom(v => v.value))
}

function forMember_Identifier_assigner() {
    return forMember<IdentifierEntity, Identifier>(v => v.assigner, mapFrom(v => v.assigner))
}

function forMember_Identifier_end() {
    return forMember<IdentifierEntity, Identifier>(v => v.end, mapFrom(v => v.end))
}

function forMember_Identifier_id() {
    return forMember<IdentifierEntity, Identifier>(v => v.id, mapFrom(v => v.id))
}

function forMember_Identifier_start() {
    return forMember<IdentifierEntity, Identifier>(v => v.start, mapFrom(v => v.start))
}

function forMember_Identifier_system() {
    return forMember<IdentifierEntity, Identifier>(v => v.system, mapFrom(v => v.system))
}

function forMember_Identifier_type() {
    return forMember<IdentifierEntity, Identifier>(v => v.type, mapWith(CodingReference, CodeStub, v => v.type))
}

function forMember_Identifier_use() {
    return forMember<IdentifierEntity, Identifier>(v => v.use, mapFrom(v => v.use))
}

function forMember_Identifier_value() {
    return forMember<IdentifierEntity, Identifier>(v => v.value, mapFrom(v => v.value))
}

export function initializeIdentifierMapper() {
    createMap(mapper, Identifier, IdentifierEntity, forMember_IdentifierEntity_id(), forMember_IdentifierEntity_assigner(), forMember_IdentifierEntity_start(), forMember_IdentifierEntity_end(), forMember_IdentifierEntity_system(), forMember_IdentifierEntity_type(), forMember_IdentifierEntity_use(), forMember_IdentifierEntity_value())

    createMap(mapper, IdentifierEntity, Identifier, forMember_Identifier_assigner(), forMember_Identifier_end(), forMember_Identifier_id(), forMember_Identifier_start(), forMember_Identifier_system(), forMember_Identifier_type(), forMember_Identifier_use(), forMember_Identifier_value())
}

export function mapIdentifierEntityToIdentifier(entity: IdentifierEntity): Identifier {
    return mapper.map(entity, IdentifierEntity, Identifier)
}

export function mapIdentifierToIdentifierEntity(model: Identifier): IdentifierEntity {
    return mapper.map(model, Identifier, IdentifierEntity)
}
