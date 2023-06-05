import {ContactPoint} from '../../src/models/ContactPoint.model'
import {generateContactPoint} from "../models/ContactPoint.model";

describe(`ContactPoint serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateContactPoint()

        const json = ContactPoint.toJSON(instance)
        const newInstance = ContactPoint.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
