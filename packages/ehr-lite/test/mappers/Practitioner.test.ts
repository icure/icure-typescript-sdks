import { generatePractitioner } from '../models/Practitioner.model'
import { Practitioner } from '../../src'
import { mapHealthcarePartyDtoToPractitioner, mapPractitionerToHealthcarePartyDto } from '../../src/mappers/Practitioner.mapper'

describe('Practitioner', function () {
    it('should correctly map to HealthcareParty and back to Practitioner', () => {
        const instance = generatePractitioner()
        const iCureInstance = mapPractitionerToHealthcarePartyDto(instance)
        const newInstance = mapHealthcarePartyDtoToPractitioner(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
