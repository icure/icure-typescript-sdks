import { generatePractitioner } from '../models/Practitioner.model'
import { Practitioner } from '../../src/models/Practitioner.model'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from '../../src/mappers/Practitioner.mapper'

describe('Practitioner', function () {
    it('should correctly map to HealthcareParty and back to Practitioner', () => {
        const instance = generatePractitioner()
        const iCureInstance = mapPractitionerToHealthcareParty(instance)
        const newInstance = mapHealthcarePartyToPractitioner(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
