import {TypedValueObject} from '../../src/models/TypedValueObject.model'
import {TypeEnum} from '../../src/models/enums/Type.enum'
import {
    generateRandomBoolean,
    generateRandomDate,
    generateRandomDouble,
    generateRandomEncryptedSelf,
    generateRandomInteger,
    generateRandomString
} from './utils'

export function generateRandomTypeEnum(): TypeEnum {
    // This is a placeholder. Replace this with the appropriate logic to generate a valid TypeEnum
    const enumValues = Object.values(TypeEnum)
    return enumValues[Math.floor(Math.random() * enumValues.length)] as TypeEnum
}

export function generateTypedValueObject(): TypedValueObject {
    return new TypedValueObject({
        type: generateRandomTypeEnum(),
        booleanValue: generateRandomBoolean(),
        integerValue: generateRandomInteger(),
        doubleValue: generateRandomDouble(),
        stringValue: generateRandomString(),
        dateValue: generateRandomDate(),
        encryptedSelf: generateRandomEncryptedSelf(),
    })
}

describe(`TypedValueObject serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateTypedValueObject()

        const json = TypedValueObject.toJSON(instance)
        const newInstance = TypedValueObject.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
