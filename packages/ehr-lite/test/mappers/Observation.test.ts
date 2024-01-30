import { generateObservation } from '../models/Observation.model'
import { Observation } from '../../src'
import { mapObservationToServiceDto, mapServiceDtoToObservation } from '../../src/mappers/Observation.mapper'

describe('Observation', function () {
    it('should correctly map to Service and back to Observation', () => {
        const instance = generateObservation()
        const iCureInstance = mapObservationToServiceDto(instance)
        const newInstance = mapServiceDtoToObservation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
