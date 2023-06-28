import { generateRelatedPractitioner } from '../models/RelatedPractitioner.model'
import { RelatedPractitioner } from '../../src/models/RelatedPractitioner.model'
import { mapPatientHealthCarePartyToRelatedPractitioner, mapRelatedPractitionerToPatientHealthCareParty } from '../../src/mappers/RelatedPractitioner.mapper'

describe('RelatedPractitioner', function () {
    it('should correctly map to PatientHealthCareParty and back to RelatedPractitioner', () => {
        const instance = generateRelatedPractitioner()
        const iCureInstance = mapRelatedPractitionerToPatientHealthCareParty(instance)
        const newInstance = mapPatientHealthCarePartyToRelatedPractitioner(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
