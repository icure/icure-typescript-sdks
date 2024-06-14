import { CodingReference } from '../../src/models/CodingReference.model'
import { generateCodingReference } from '../models/CodingReference.model'

describe(`CodingReference serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateCodingReference()

        const json = instance.toJSON()
        const newInstance = new CodingReference(json)

        expect(newInstance).toEqual(instance)
    })
})
