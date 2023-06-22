import { PropertyTypeStub } from "@icure/api"
import {createMap, forMember, mapFrom, Mapper} from "@automapper/core"
import {PropertyType} from "../models/PropertyType.model";

function forMember_PropertyTypeStub_identifier() {
    return forMember<PropertyType, PropertyTypeStub>(v => v.identifier, mapFrom(pt => pt.identifier))
}

function forMember_PropertyTypeStub_type() {
    return forMember<PropertyType, PropertyTypeStub>(v => v.type, mapFrom(pt => pt.type))
}

function forMember_PropertyType_identifier() {
    return forMember<PropertyTypeStub, PropertyType>(v => v.identifier, mapFrom(pt => pt.identifier))
}

function forMember_PropertyType_type() {
    return forMember<PropertyTypeStub, PropertyType>(v => v.type, mapFrom(pt => pt.type))
}

export function initializePropertyTypeMapper(mapper: Mapper) {
    createMap(mapper, PropertyType, PropertyTypeStub, forMember_PropertyTypeStub_identifier(), forMember_PropertyTypeStub_type())

    createMap(mapper, PropertyTypeStub, PropertyType, forMember_PropertyType_identifier(), forMember_PropertyType_type())
}
