import { RelatedPerson } from '../../src/models/RelatedPerson.model'
import { generateRelatedPerson } from '../models/RelatedPerson.model'

describe(`RelatedPerson serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateRelatedPerson()

        const json = instance.toJSON()
        const newInstance = new RelatedPerson(json)

        expect(newInstance).toEqual(instance)
    })
})
