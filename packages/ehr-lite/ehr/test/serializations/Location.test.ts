import {LocationAddressTypeEnum} from '../../src/models/enums/LocationAddressType.enum'
import {generateAnnotation} from './Annotation.test'
import {generateContactPoint} from './ContactPoint.test'
import {Location} from '../../src/models/Location.model'

export function generateLocation(): Location {
    const location = {
        addressType: LocationAddressTypeEnum.home,
        description: 'Sample location description',
        street: 'Sample street',
        houseNumber: '123',
        postboxNumber: '456',
        postalCode: '12345',
        city: 'Sample city',
        state: 'Sample state',
        country: 'Sample country',
        notes: [generateAnnotation()],
        telecoms: [generateContactPoint()],
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new Location(location)
}

describe(`Location serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateLocation()

        const json = Location.toJSON(instance)
        const newInstance = Location.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
