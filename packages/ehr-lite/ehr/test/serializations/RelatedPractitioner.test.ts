import {RelatedPractitioner} from '../../src/models/RelatedPractitioner.model'
import {PractitionerTypeEnum} from '../../src/models/enums/PractitionerType.enum'

export function generateRelatedPractitioner(): RelatedPractitioner {
    const relatedPractitioner = {
        type: PractitionerTypeEnum.referringphysician,
        healthcarePartyId: 'sampleHealthcarePartyId',
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new RelatedPractitioner(relatedPractitioner)
}

describe(`RelatedPractitioner serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateRelatedPractitioner()

        const json = RelatedPractitioner.toJSON(instance)
        const newInstance = RelatedPractitioner.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
