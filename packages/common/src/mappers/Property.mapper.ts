import {PropertyStub, PropertyTypeStub, TypedValueObject as TypedValueObjectDto} from '@icure/api'
import {forMember, mapFrom, mapWith} from '@automapper/core'
import {Property} from "../models/Property.model";
import {PropertyType} from "../models/PropertyType.model";
import {TypedValueObject} from "../models/TypedValueObject.model";
import {mapPropertyTypeStubToPropertyType} from "./PropertyType.mapper";
import {mapTypedValueObjectDtoToTypedValueObject} from "./TypedValueObject.mapper";

function toPropertyStubId(domain: Property): string | undefined {
    return domain.id
}

function toPropertyStubType(domain: Property): PropertyTypeStub | undefined {
    return !!domain.type ? mapPropertyTypeStubToPropertyType(domain.type) : undefined
}

function toPropertyStubTypedValue(domain: Property): TypedValueObject | undefined {
    return !!domain.typedValue ? mapTypedValueObjectDtoToTypedValueObject(domain.typedValue) : undefined
}

function toPropertyStubDeletionDate(domain: Property): number | undefined {
    return domain.deleted
}

function toPropertyStubEncryptedSelf(domain: Property): string | undefined {
    return domain.encryptedSelf
}

function toPropertyId(dto: PropertyStub): string | undefined {
    return dto.id
}

function toPropertyType(dto: PropertyStub): PropertyType | undefined {
    return !!dto.type ? mapPropertyTypeStubToPropertyType(dto.type) : undefined
}

function toPropertyTypedValue(dto: PropertyStub): TypedValueObject | undefined {
    return !!dto.typedValue ? mapTypedValueObjectDtoToTypedValueObject(dto.typedValue) : undefined
}

function toPropertyDeleted(dto: PropertyStub): number | undefined {
    return dto.deletionDate
}

function toPropertyEncryptedSelf(dto: PropertyStub): string | undefined {
    return dto.encryptedSelf
}

export function mapPropertyStubToProperty(dto: PropertyStub): Property {
    return new Property({
        id: toPropertyId(dto),
        type: toPropertyType(dto),
        typedValue: toPropertyTypedValue(dto),
        deleted: toPropertyDeleted(dto),
        encryptedSelf: toPropertyEncryptedSelf(dto),
    })
}

export function mapPropertyToPropertyStub(domain: Property): PropertyStub {
    return new PropertyStub({
        id: toPropertyStubId(domain),
        type: toPropertyStubType(domain),
        typedValue: toPropertyStubTypedValue(domain),
        deletionDate: toPropertyStubDeletionDate(domain),
        encryptedSelf: toPropertyStubEncryptedSelf(domain),
    })
}
