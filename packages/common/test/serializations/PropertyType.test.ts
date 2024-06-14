import { PropertyType } from '../../src/models/PropertyType.model'
import { generatePropertyType } from '../models/PropertyType.model'

describe(`PropertyType serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePropertyType()

        const json = instance.toJSON()
        const newInstance = new PropertyType(json)

        expect(newInstance).toEqual(instance)
    })
})
