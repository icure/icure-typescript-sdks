import { PropertyStub, PropertyTypeStub, TypedValueObject as TypedValueObjectDto } from '@icure/api'
import { createMap, forMember, mapFrom, mapWith, Mapper } from '@automapper/core'
import {Property} from "../models/Property.model";
import {PropertyType} from "../models/PropertyType.model";
import {TypedValueObject} from "../models/TypedValueObject.model";


function forMember_PropertyStub_id() {
    return forMember<Property, PropertyStub>(
        (v) => v.id,
        mapFrom((p) => p.id)
    )
}

function forMember_PropertyStub_type() {
    return forMember<Property, PropertyStub>(
        (v) => v.type,
        mapWith(PropertyTypeStub, PropertyType, (p) => p.type)
    )
}

function forMember_PropertyStub_typedValue() {
    return forMember<Property, PropertyStub>(
        (v) => v.typedValue,
        mapWith(TypedValueObjectDto, TypedValueObject, (p) => p.typedValue)
    )
}

function forMember_PropertyStub_deletionDate() {
    return forMember<Property, PropertyStub>(
        (v) => v.deletionDate,
        mapFrom((p) => p.deleted)
    )
}

function forMember_PropertyStub_encryptedSelf() {
    return forMember<Property, PropertyStub>(
        (v) => v.encryptedSelf,
        mapFrom((p) => p.encryptedSelf)
    )
}

function forMember_Property_id() {
    return forMember<PropertyStub, Property>(
        (v) => v.id,
        mapFrom((p) => p.id)
    )
}

function forMember_Property_type() {
    return forMember<PropertyStub, Property>(
        (v) => v.type,
        mapWith(PropertyType, PropertyTypeStub, (p) => p.type)
    )
}

function forMember_Property_typedValue() {
    return forMember<PropertyStub, Property>(
        (v) => v.typedValue,
        mapWith(TypedValueObject, TypedValueObjectDto, (p) => p.typedValue)
    )
}

function forMember_Property_deleted() {
    return forMember<PropertyStub, Property>(
        (v) => v.deleted,
        mapFrom((p) => p.deletionDate)
    )
}

function forMember_Property_encryptedSelf() {
    return forMember<PropertyStub, Property>(
        (v) => v.encryptedSelf,
        mapFrom((p) => p.encryptedSelf)
    )
}

export function initializePropertyMapper(mapper: Mapper) {
    createMap(mapper, Property, PropertyStub, forMember_PropertyStub_id(), forMember_PropertyStub_type(), forMember_PropertyStub_typedValue(), forMember_PropertyStub_deletionDate(), forMember_PropertyStub_encryptedSelf())

    createMap(mapper, PropertyStub, Property, forMember_Property_id(), forMember_Property_type(), forMember_Property_typedValue(), forMember_Property_deleted(), forMember_Property_encryptedSelf())
}
