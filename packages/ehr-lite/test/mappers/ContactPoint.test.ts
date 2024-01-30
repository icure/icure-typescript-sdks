import { generateContactPoint } from '../models/ContactPoint.model'
import { ContactPoint } from '../../src'
import { mapContactPointToTelecomDto, mapTelecomDtoToContactPoint } from '../../src/mappers/ContactPoint.mapper'

describe('ContactPoint', function () {
    it('should correctly map to Telecom and back to ContactPoint', () => {
        const instance = generateContactPoint()
        const iCureInstance = mapContactPointToTelecomDto(instance)
        const newInstance = mapTelecomDtoToContactPoint(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
