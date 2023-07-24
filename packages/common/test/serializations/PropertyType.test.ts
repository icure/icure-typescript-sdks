import { PropertyType } from '../../src/models/PropertyType.model'
import { generatePropertyType } from '../models/PropertyType.model'

describe(`PropertyType serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePropertyType()

        const json = PropertyType.toJSON(instance)
        const newInstance = PropertyType.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
