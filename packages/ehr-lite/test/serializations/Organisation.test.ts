import { Organisation } from '../../src/models/Organisation.model'
import { generateOrganisation } from '../models/Organisation.model'

describe(`Organisation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateOrganisation()

        const json = Organisation.toJSON(instance)
        const newInstance = Organisation.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
