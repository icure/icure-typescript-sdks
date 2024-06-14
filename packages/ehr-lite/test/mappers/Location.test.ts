import { generateLocation } from '../models/Location.model'
import { Location } from '../../src'
import { mapAddressDtoToLocation, mapLocationToAddressDto } from '../../src/mappers/Location.mapper'

describe('Location', function () {
    it('should correctly map to Address and back to Location', () => {
        const instance = generateLocation()
        const iCureInstance = mapLocationToAddressDto(instance)
        const newInstance = mapAddressDtoToLocation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
