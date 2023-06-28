import { generateObservation } from '../models/Observation.model'
import { Observation } from '../../src/models/Observation.model'
import { mapObservationToService, mapServiceToObservation } from '../../src/mappers/Observation.mapper'

describe('Observation', function () {
    it('should correctly map to Service and back to Observation', () => {
        const instance = generateObservation()
        const iCureInstance = mapObservationToService(instance)
        const newInstance = mapServiceToObservation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
