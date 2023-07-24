import { PropertyType } from '../../src/models/PropertyType.model'
import { TypeEnum } from '../../src/models/enums/Type.enum'

export function generatePropertyType(): PropertyType {
    const propertyType = {
        identifier: 'sampleIdentifier',
        type: TypeEnum.STRING,
    }

    return new PropertyType(propertyType)
}
