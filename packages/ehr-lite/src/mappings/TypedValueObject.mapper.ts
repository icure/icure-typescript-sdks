import { TypedValueObject } from '../models/TypedValueObject.model'
import { TypedValueObject as TypedValueObjectEntity } from '@icure/api'
import { createMap, forMember, mapFrom } from '@automapper/core'
import { mapper } from './mapper'

function forMember_TypedValueObjectEntity_type() {
    return forMember<TypedValueObject, TypedValueObjectEntity>(
        (v) => v.type,
        mapFrom((t) => t.type)
    )
}

function forMember_TypedValueObjectEntity_booleanValue() {
    return forMember<TypedValueObject, TypedValueObjectEntity>(
        (v) => v.booleanValue,
        mapFrom((t) => t.booleanValue)
    )
}

function forMember_TypedValueObjectEntity_integerValue() {
    return forMember<TypedValueObject, TypedValueObjectEntity>(
        (v) => v.integerValue,
        mapFrom((t) => t.integerValue)
    )
}

function forMember_TypedValueObjectEntity_doubleValue() {
    return forMember<TypedValueObject, TypedValueObjectEntity>(
        (v) => v.doubleValue,
        mapFrom((t) => t.doubleValue)
    )
}

function forMember_TypedValueObjectEntity_stringValue() {
    return forMember<TypedValueObject, TypedValueObjectEntity>(
        (v) => v.stringValue,
        mapFrom((t) => t.stringValue)
    )
}

function forMember_TypedValueObjectEntity_dateValue() {
    return forMember<TypedValueObject, TypedValueObjectEntity>(
        (v) => v.dateValue,
        mapFrom((t) => t.dateValue)
    )
}

function forMember_TypedValueObjectEntity_encryptedSelf() {
    return forMember<TypedValueObject, TypedValueObjectEntity>(
        (v) => v.encryptedSelf,
        mapFrom((t) => t.encryptedSelf)
    )
}

function forMember_TypedValueObject_type() {
    return forMember<TypedValueObjectEntity, TypedValueObject>(
        (v) => v.type,
        mapFrom((t) => t.type)
    )
}

function forMember_TypedValueObject_booleanValue() {
    return forMember<TypedValueObjectEntity, TypedValueObject>(
        (v) => v.booleanValue,
        mapFrom((t) => t.booleanValue)
    )
}

function forMember_TypedValueObject_integerValue() {
    return forMember<TypedValueObjectEntity, TypedValueObject>(
        (v) => v.integerValue,
        mapFrom((t) => t.integerValue)
    )
}

function forMember_TypedValueObject_doubleValue() {
    return forMember<TypedValueObjectEntity, TypedValueObject>(
        (v) => v.doubleValue,
        mapFrom((t) => t.doubleValue)
    )
}

function forMember_TypedValueObject_stringValue() {
    return forMember<TypedValueObjectEntity, TypedValueObject>(
        (v) => v.stringValue,
        mapFrom((t) => t.stringValue)
    )
}

function forMember_TypedValueObject_dateValue() {
    return forMember<TypedValueObjectEntity, TypedValueObject>(
        (v) => v.dateValue,
        mapFrom((t) => t.dateValue)
    )
}

function forMember_TypedValueObject_encryptedSelf() {
    return forMember<TypedValueObjectEntity, TypedValueObject>(
        (v) => v.encryptedSelf,
        mapFrom((t) => t.encryptedSelf)
    )
}

export function initializeTypedValueObjectMapper() {
    createMap(mapper, TypedValueObject, TypedValueObjectEntity, forMember_TypedValueObjectEntity_type(), forMember_TypedValueObjectEntity_booleanValue(), forMember_TypedValueObjectEntity_integerValue(), forMember_TypedValueObjectEntity_doubleValue(), forMember_TypedValueObjectEntity_stringValue(), forMember_TypedValueObjectEntity_dateValue(), forMember_TypedValueObjectEntity_encryptedSelf())

    createMap(mapper, TypedValueObjectEntity, TypedValueObject, forMember_TypedValueObject_type(), forMember_TypedValueObject_booleanValue(), forMember_TypedValueObject_integerValue(), forMember_TypedValueObject_doubleValue(), forMember_TypedValueObject_stringValue(), forMember_TypedValueObject_dateValue(), forMember_TypedValueObject_encryptedSelf())
}

export function mapTypedValueObjectEntityToTypedValueObject(entity: TypedValueObjectEntity): TypedValueObject {
    return mapper.map(entity, TypedValueObjectEntity, TypedValueObject)
}

export function mapTypedValueObjectToTypedValueObjectEntity(model: TypedValueObject): TypedValueObjectEntity {
    return mapper.map(model, TypedValueObject, TypedValueObjectEntity)
}
