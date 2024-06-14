import { RelatedPractitioner } from '../../src/models/RelatedPractitioner.model'
import { generateRelatedPractitioner } from '../models/RelatedPractitioner.model'

describe(`RelatedPractitioner serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateRelatedPractitioner()

        const json = instance.toJSON()
        const newInstance = new RelatedPractitioner(json)

        expect(newInstance).toEqual(instance)
    })
})
