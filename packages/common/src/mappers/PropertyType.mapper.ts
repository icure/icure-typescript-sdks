import {PropertyTypeStub} from "@icure/api"
import {PropertyType} from "../models/PropertyType.model";
import {TypeEnum} from "../models/enums/Type.enum";

function toPropertyTypeStubIdentifier(domain: PropertyType): string | undefined {
    return domain.identifier
}

function toPropertyTypeStubType(domain: PropertyType): PropertyTypeStub.TypeEnum | undefined {
    return domain.type
}

function toPropertyTypeIdentifier(dto: PropertyTypeStub): string | undefined {
    return dto.identifier
}

function toPropertyTypeType(dto: PropertyTypeStub): TypeEnum | undefined {
    return dto.type as TypeEnum
}

export function mapPropertyTypeStubToPropertyType(dto: PropertyTypeStub): PropertyType {
    return new PropertyType({
        identifier: toPropertyTypeIdentifier(dto),
        type: toPropertyTypeType(dto),
    })
}

export function mapPropertyTypeToPropertyTypeStub(domain: PropertyType): PropertyTypeStub {
    return new PropertyTypeStub({
        identifier: toPropertyTypeStubIdentifier(domain),
        type: toPropertyTypeStubType(domain),
    })
}
