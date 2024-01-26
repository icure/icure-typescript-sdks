import { generateRelatedPractitioner } from '../models/RelatedPractitioner.model'
import { RelatedPractitioner } from '../../src'
import { mapPatientHealthCarePartyDtoToRelatedPractitioner, mapRelatedPractitionerToPatientHealthCarePartyDto } from '../../src/mappers/RelatedPractitioner.mapper'

describe('RelatedPractitioner', function () {
    it('should correctly map to PatientHealthCareParty and back to RelatedPractitioner', () => {
        const instance = generateRelatedPractitioner()
        const iCureInstance = mapRelatedPractitionerToPatientHealthCarePartyDto(instance)
        const newInstance = mapPatientHealthCarePartyDtoToRelatedPractitioner(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
