import { initializeMapper, mapper } from '../../src/mappings/mapper'
import { generateOrganisation } from '../models/Organisation.model'
import { Organisation } from '../../src/models/Organisation.model'
import { HealthcareParty } from '@icure/api'

describe('Organisation', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to HealthcareParty and back to Organisation', () => {
        const instance = generateOrganisation()
        const iCureInstance = mapper.map(instance, Organisation, HealthcareParty)
        const newInstance = mapper.map(iCureInstance, HealthcareParty, Organisation)

        expect(newInstance).toEqual(instance)
    })
})
