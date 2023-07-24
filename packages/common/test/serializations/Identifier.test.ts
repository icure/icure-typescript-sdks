import { Identifier } from '../../src/models/Identifier.model'
import { generateIdentifier } from '../models/Identifier.model'

describe(`Identifier serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateIdentifier()

        const json = Identifier.toJSON(instance)
        const newInstance = Identifier.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
