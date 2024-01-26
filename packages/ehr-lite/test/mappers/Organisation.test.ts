import { generateOrganisation } from '../models/Organisation.model'
import { Organisation } from '../../src'
import { mapHealthcarePartyDtoToOrganisation, mapOrganisationToHealthcarePartyDto } from '../../src/mappers/Organisation.mapper'

describe('Organisation', function () {
    it('should correctly map to HealthcareParty and back to Organisation', () => {
        const instance = generateOrganisation()
        const iCureInstance = mapOrganisationToHealthcarePartyDto(instance)
        const newInstance = mapHealthcarePartyDtoToOrganisation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
