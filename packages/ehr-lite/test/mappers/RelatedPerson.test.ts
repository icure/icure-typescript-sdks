import { generateRelatedPerson } from '../models/RelatedPerson.model'
import { RelatedPerson } from '../../src'
import { mapPartnershipToRelatedPerson, mapRelatedPersonToPartnership } from '../../src/mappers/RelatedPerson.mapper'

describe('RelatedPerson', function () {
    it('should correctly map to Partnership and back to RelatedPerson', () => {
        const instance = generateRelatedPerson()
        const iCureInstance = mapRelatedPersonToPartnership(instance)
        const newInstance = mapPartnershipToRelatedPerson(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
