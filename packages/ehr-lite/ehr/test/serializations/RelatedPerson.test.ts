import {RelatedPerson} from '../../src/models/RelatedPerson.model'
import {RelatedPersonTypeEnum} from '../../src/models/enums/RelatedPersonType.enum'
import {RelatedPersonStatusEnum} from '../../src/models/enums/RelatedPersonStatus.enum'

export function generateRelatedPerson(): RelatedPerson {
    const relatedPerson = {
        type: RelatedPersonTypeEnum.family,
        status: RelatedPersonStatusEnum.active,
        personId: 'samplePersonId',
    }

    return new RelatedPerson(relatedPerson)
}

describe(`RelatedPerson serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateRelatedPerson()

        const json = RelatedPerson.toJSON(instance)
        const newInstance = RelatedPerson.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
