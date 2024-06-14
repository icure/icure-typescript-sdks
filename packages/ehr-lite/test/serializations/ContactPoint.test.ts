import { ContactPoint } from '../../src/models/ContactPoint.model'
import { generateContactPoint } from '../models/ContactPoint.model'

describe(`ContactPoint serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateContactPoint()

        const json = instance.toJSON()
        const newInstance = new ContactPoint(json)

        expect(newInstance).toEqual(instance)
    })
})
