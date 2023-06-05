import {RelatedPractitioner} from '../../src/models/RelatedPractitioner.model'
import {generateRelatedPractitioner} from "../models/RelatedPractitioner.model";

describe(`RelatedPractitioner serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateRelatedPractitioner()

        const json = RelatedPractitioner.toJSON(instance)
        const newInstance = RelatedPractitioner.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
