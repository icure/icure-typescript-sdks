import {CodingReference} from '../../src/models/CodingReference.model'
import {generateCodingReference} from "../models/CodingReference.model";

describe(`CodingReference serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateCodingReference()

        const json = CodingReference.toJSON(instance)
        const newInstance = CodingReference.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
