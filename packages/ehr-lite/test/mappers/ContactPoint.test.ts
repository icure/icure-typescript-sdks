import { generateContactPoint } from '../models/ContactPoint.model'
import { ContactPoint } from '../../src/models/ContactPoint.model'
import { mapContactPointToTelecom, mapTelecomToContactPoint } from '../../src/mappers/ContactPoint.mapper'

describe('ContactPoint', function () {
    it('should correctly map to Telecom and back to ContactPoint', () => {
        const instance = generateContactPoint()
        const iCureInstance = mapContactPointToTelecom(instance)
        const newInstance = mapTelecomToContactPoint(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
