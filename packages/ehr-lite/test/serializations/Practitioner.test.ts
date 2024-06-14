import { Practitioner } from '../../src'
import { generatePractitioner } from '../models/Practitioner.model'

describe(`Practitioner serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePractitioner()

        const json = instance.toJSON()
        const newInstance = new Practitioner(json)

        expect(newInstance).toEqual(instance)
    })
})
