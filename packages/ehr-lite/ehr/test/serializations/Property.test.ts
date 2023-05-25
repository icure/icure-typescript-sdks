import {Property} from '../../src/models/Property.model'
import {generatePropertyType} from './PropertyType.test'
import {generateTypedValueObject} from './TypedValueObject.test'

export function generateProperty(): Property {
    const property = {
        id: 'sampleId',
        type: generatePropertyType(),
        typedValue: generateTypedValueObject(),
        deleted: 1621872000000, // Sample timestamp in milliseconds
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new Property(property)
}

describe(`Property serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateProperty()

        const json = Property.toJSON(instance)
        const newInstance = Property.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
