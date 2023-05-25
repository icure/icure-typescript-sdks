import {Location} from "../../src/models/Location.model";
import {LocationAddressTypeEnum} from "../../src/models/enums/LocationAddressType.enum";
import {generateAnnotation} from "./Annotation.model";
import {generateContactPoint} from "./ContactPoint.model";

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