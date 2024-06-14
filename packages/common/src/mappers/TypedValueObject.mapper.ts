import { TypedValueObject as TypedValueObjectDto } from '@icure/api'
import { TypedValueObject } from '../models/TypedValueObject.model'
import { TypeEnum } from '../models/enums/Type.enum'

function toTypedValueObjectDtoType(domain: TypedValueObject): TypedValueObjectDto.TypeEnum | undefined {
    return domain.type
}

function toTypedValueObjectDtoBooleanValue(domain: TypedValueObject): boolean | undefined {
    return domain.booleanValue
}

function toTypedValueObjectDtoIntegerValue(domain: TypedValueObject): number | undefined {
    return domain.integerValue
}

function toTypedValueObjectDtoDoubleValue(domain: TypedValueObject): number | undefined {
    return domain.doubleValue
}

function toTypedValueObjectDtoStringValue(domain: TypedValueObject): string | undefined {
    return domain.stringValue
}

function toTypedValueObjectDtoDateValue(domain: TypedValueObject): number | undefined {
    return domain.dateValue
}

function toTypedValueObjectDtoEncryptedSelf(domain: TypedValueObject): string | undefined {
    return domain.encryptedSelf
}

function toTypedValueObjectType(dto: TypedValueObjectDto): TypeEnum | undefined {
    return dto.type as TypeEnum
}

function toTypedValueObjectBooleanValue(dto: TypedValueObjectDto): boolean | undefined {
    return dto.booleanValue
}

function toTypedValueObjectIntegerValue(dto: TypedValueObjectDto): number | undefined {
    return dto.integerValue
}

function toTypedValueObjectDoubleValue(dto: TypedValueObjectDto): number | undefined {
    return dto.doubleValue
}

function toTypedValueObjectStringValue(dto: TypedValueObjectDto): string | undefined {
    return dto.stringValue
}

function toTypedValueObjectDateValue(dto: TypedValueObjectDto): number | undefined {
    return dto.dateValue
}

function toTypedValueObjectEncryptedSelf(dto: TypedValueObjectDto): string | undefined {
    return dto.encryptedSelf
}

export function mapTypedValueObjectDtoToTypedValueObject(dto: TypedValueObjectDto): TypedValueObject {
    return new TypedValueObject({
    type: toTypedValueObjectType(dto),
    booleanValue: toTypedValueObjectBooleanValue(dto),
    integerValue: toTypedValueObjectIntegerValue(dto),
    doubleValue: toTypedValueObjectDoubleValue(dto),
    stringValue: toTypedValueObjectStringValue(dto),
    dateValue: toTypedValueObjectDateValue(dto),
    encryptedSelf: toTypedValueObjectEncryptedSelf(dto),
    })
}

export function mapTypedValueObjectToTypedValueObjectDto(domain: TypedValueObject): TypedValueObjectDto {
    return new TypedValueObjectDto({
    type: toTypedValueObjectDtoType(domain),
    booleanValue: toTypedValueObjectDtoBooleanValue(domain),
    integerValue: toTypedValueObjectDtoIntegerValue(domain),
    doubleValue: toTypedValueObjectDtoDoubleValue(domain),
    stringValue: toTypedValueObjectDtoStringValue(domain),
    dateValue: toTypedValueObjectDtoDateValue(domain),
    encryptedSelf: toTypedValueObjectDtoEncryptedSelf(domain),
    })
}
