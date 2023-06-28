import { generateLocation } from '../models/Location.model'
import { Location } from '../../src/models/Location.model'
import { Address } from '@icure/api'
import { mapAddressToLocation, mapLocationToAddress } from '../../src/mappers/Location.mapper'

describe('Location', function () {
    it('should correctly map to Address and back to Location', () => {
        const instance = generateLocation()
        const iCureInstance = mapLocationToAddress(instance)
        const newInstance = mapAddressToLocation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
