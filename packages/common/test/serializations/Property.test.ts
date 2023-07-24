import { Property } from '../../src/models/Property.model'
import { generateProperty } from '../models/Property.model'

describe(`Property serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateProperty()

        const json = Property.toJSON(instance)
        const newInstance = Property.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
