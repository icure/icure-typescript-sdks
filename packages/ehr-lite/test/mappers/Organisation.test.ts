import { generateOrganisation } from '../models/Organisation.model'
import { Organisation } from '../../src/models/Organisation.model'
import { mapHealthcarePartyToOrganisation, mapOrganisationToHealthcareParty } from '../../src/mappers/Organisation.mapper'

describe('Organisation', function () {
    it('should correctly map to HealthcareParty and back to Organisation', () => {
        const instance = generateOrganisation()
        const iCureInstance = mapOrganisationToHealthcareParty(instance)
        const newInstance = mapHealthcarePartyToOrganisation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
