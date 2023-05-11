import { createMap, forMember, ignore, mapFrom } from '@automapper/core'
import { mapper } from './mapper'
import { CodeStub } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'

function forMember_CodeStub_id() {
    return forMember<CodingReference, CodeStub>(v => v.id, mapFrom(v => `${v.type ?? null}|${v.code ?? null}|${v.version ?? null}`))
}

function forMember_CodeStub_context() {
    return forMember<CodingReference, CodeStub>(v => v.context, mapFrom(v => v.context))
}

function forMember_CodeStub_type() {
    return forMember<CodingReference, CodeStub>(v => v.type, mapFrom(v => v.type))
}

function forMember_CodeStub_code() {
    return forMember<CodingReference, CodeStub>(v => v.code, mapFrom(v => v.code))
}

function forMember_CodeStub_version() {
    return forMember<CodingReference, CodeStub>(v => v.version, mapFrom(v => v.version))
}

function forMember_CodeStub_label() {
    return forMember<CodingReference, CodeStub>(v => v.label, mapFrom(v => (!!v.label ? Object.fromEntries(v.label.entries()) : undefined)))
}

function forMember_CodingReference_id() {
    return forMember<CodeStub, CodingReference>(v => v.id, mapFrom(v => `${v.type ?? null}|${v.code ?? null}|${v.version ?? null}`))
}

function forMember_CodingReference_type() {
    return forMember<CodeStub, CodingReference>(v => v.type, mapFrom(v => v.type))
}

function forMember_CodingReference_code() {
    return forMember<CodeStub, CodingReference>(v => v.code, mapFrom(v => v.code))
}

function forMember_CodingReference_version() {
    return forMember<CodeStub, CodingReference>(v => v.version, mapFrom(v => v.version))
}

function forMember_CodingReference_label() {
    return forMember<CodeStub, CodingReference>(v => v.label, mapFrom(v => (!!v.label ? new Map(Object.entries(v.label)) : undefined)))
}

export function initializeCodingReferenceMapper() {
    createMap(mapper, CodingReference, CodeStub, forMember_CodeStub_id(), forMember_CodeStub_context(), forMember_CodeStub_type(), forMember_CodeStub_code(), forMember_CodeStub_version(), forMember_CodeStub_label())

    createMap(mapper, CodeStub, CodingReference, forMember_CodingReference_id(), forMember_CodingReference_type(), forMember_CodingReference_code(), forMember_CodingReference_context(), forMember_CodingReference_version(), forMember_CodingReference_label())
}

function forMember_CodingReference_context() {
    return forMember<CodeStub, CodingReference>(v => v.context, mapFrom(v => v.context))
}
