import { RelatedPerson } from '../../src/models/RelatedPerson.model'
import { generateRelatedPerson } from '../models/RelatedPerson.model'

describe(`RelatedPerson serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateRelatedPerson()

        const json = RelatedPerson.toJSON(instance)
        const newInstance = RelatedPerson.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
