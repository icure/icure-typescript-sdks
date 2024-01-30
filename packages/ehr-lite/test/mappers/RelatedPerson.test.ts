import { generateRelatedPerson } from '../models/RelatedPerson.model'
import { RelatedPerson } from '../../src'
import { mapPartnershipDtoToRelatedPerson, mapRelatedPersonToPartnershipDto } from '../../src/mappers/RelatedPerson.mapper'

describe('RelatedPerson', function () {
    it('should correctly map to Partnership and back to RelatedPerson', () => {
        const instance = generateRelatedPerson()
        const iCureInstance = mapRelatedPersonToPartnershipDto(instance)
        const newInstance = mapPartnershipDtoToRelatedPerson(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
