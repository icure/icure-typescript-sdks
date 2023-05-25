import {Practitioner} from '../../src/models/Practitioner.model'
import {generatePractitioner} from "../models/Practitioner.model";

describe(`Practitioner serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePractitioner()

        const json = Practitioner.toJSON(instance)
        const newInstance = Practitioner.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
