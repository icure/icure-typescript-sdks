import { Identifier } from '../../src/models/Identifier.model'
import { generateIdentifier } from '../models/Identifier.model'

describe(`Identifier serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateIdentifier()

        const json = instance.toJSON()
        const newInstance = new Identifier(json)

        expect(newInstance).toEqual(instance)
    })
})
