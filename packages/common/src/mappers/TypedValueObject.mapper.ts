import { TypedValueObject as TypedValueObjectDto } from '@icure/api'
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core'
import {TypedValueObject} from "../models/TypedValueObject.model";

function forMember_TypedValueObjectDto_type() {
    return forMember<TypedValueObject, TypedValueObjectDto>(
        (v) => v.type,
        mapFrom((t) => t.type)
    )
}

function forMember_TypedValueObjectDto_booleanValue() {
    return forMember<TypedValueObject, TypedValueObjectDto>(
        (v) => v.booleanValue,
        mapFrom((t) => t.booleanValue)
    )
}

function forMember_TypedValueObjectDto_integerValue() {
    return forMember<TypedValueObject, TypedValueObjectDto>(
        (v) => v.integerValue,
        mapFrom((t) => t.integerValue)
    )
}

function forMember_TypedValueObjectDto_doubleValue() {
    return forMember<TypedValueObject, TypedValueObjectDto>(
        (v) => v.doubleValue,
        mapFrom((t) => t.doubleValue)
    )
}

function forMember_TypedValueObjectDto_stringValue() {
    return forMember<TypedValueObject, TypedValueObjectDto>(
        (v) => v.stringValue,
        mapFrom((t) => t.stringValue)
    )
}

function forMember_TypedValueObjectDto_dateValue() {
    return forMember<TypedValueObject, TypedValueObjectDto>(
        (v) => v.dateValue,
        mapFrom((t) => t.dateValue)
    )
}

function forMember_TypedValueObjectDto_encryptedSelf() {
    return forMember<TypedValueObject, TypedValueObjectDto>(
        (v) => v.encryptedSelf,
        mapFrom((t) => t.encryptedSelf)
    )
}

function forMember_TypedValueObject_type() {
    return forMember<TypedValueObjectDto, TypedValueObject>(
        (v) => v.type,
        mapFrom((t) => t.type)
    )
}

function forMember_TypedValueObject_booleanValue() {
    return forMember<TypedValueObjectDto, TypedValueObject>(
        (v) => v.booleanValue,
        mapFrom((t) => t.booleanValue)
    )
}

function forMember_TypedValueObject_integerValue() {
    return forMember<TypedValueObjectDto, TypedValueObject>(
        (v) => v.integerValue,
        mapFrom((t) => t.integerValue)
    )
}

function forMember_TypedValueObject_doubleValue() {
    return forMember<TypedValueObjectDto, TypedValueObject>(
        (v) => v.doubleValue,
        mapFrom((t) => t.doubleValue)
    )
}

function forMember_TypedValueObject_stringValue() {
    return forMember<TypedValueObjectDto, TypedValueObject>(
        (v) => v.stringValue,
        mapFrom((t) => t.stringValue)
    )
}

function forMember_TypedValueObject_dateValue() {
    return forMember<TypedValueObjectDto, TypedValueObject>(
        (v) => v.dateValue,
        mapFrom((t) => t.dateValue)
    )
}

function forMember_TypedValueObject_encryptedSelf() {
    return forMember<TypedValueObjectDto, TypedValueObject>(
        (v) => v.encryptedSelf,
        mapFrom((t) => t.encryptedSelf)
    )
}

export function initializeTypedValueObjectMapper(mapper: Mapper) {
    createMap(mapper, TypedValueObject, TypedValueObjectDto, forMember_TypedValueObjectDto_type(), forMember_TypedValueObjectDto_booleanValue(), forMember_TypedValueObjectDto_integerValue(), forMember_TypedValueObjectDto_doubleValue(), forMember_TypedValueObjectDto_stringValue(), forMember_TypedValueObjectDto_dateValue(), forMember_TypedValueObjectDto_encryptedSelf())

    createMap(mapper, TypedValueObjectDto, TypedValueObject, forMember_TypedValueObject_type(), forMember_TypedValueObject_booleanValue(), forMember_TypedValueObject_integerValue(), forMember_TypedValueObject_doubleValue(), forMember_TypedValueObject_stringValue(), forMember_TypedValueObject_dateValue(), forMember_TypedValueObject_encryptedSelf())
}
