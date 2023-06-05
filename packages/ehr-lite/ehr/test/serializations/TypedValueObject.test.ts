import {TypedValueObject} from '../../src/models/TypedValueObject.model'
import {generateTypedValueObject} from "../models/TypedValueObject.model";

describe(`TypedValueObject serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateTypedValueObject()

        const json = TypedValueObject.toJSON(instance)
        const newInstance = TypedValueObject.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
