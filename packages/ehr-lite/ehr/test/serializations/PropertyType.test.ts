import {PropertyType} from '../../src/models/PropertyType.model'
import {TypeEnum} from '../../src/models/enums/Type.enum'

export function generatePropertyType(): PropertyType {
    const propertyType = {
        identifier: 'sampleIdentifier',
        type: TypeEnum.STRING,
    }

    return new PropertyType(propertyType)
}

describe(`PropertyType serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePropertyType()

        const json = PropertyType.toJSON(instance)
        const newInstance = PropertyType.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
