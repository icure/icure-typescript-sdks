import {Property} from "../../src/models/Property.model";
import {generatePropertyType} from "./PropertyType.model";
import {generateTypedValueObject} from "./TypedValueObject.model";

export function generateProperty(): Property {
    const property = {
        id: 'sampleId',
        type: generatePropertyType(),
        typedValue: generateTypedValueObject(),
        deleted: 1621872000000,
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new Property(property)
}