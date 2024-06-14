import 'mocha'

import { TypedValueObject } from '../..'
import { assert } from 'chai'

export function newTypedValueObject(): TypedValueObject {
    return new TypedValueObject({
        type: 'STRING',
        booleanValue: true,
        integerValue: 123,
        doubleValue: 456.123,
        stringValue: 'stringValue',
        dateValue: 123456,
    })
}

describe('TypedValueObject model test', () => {
    it('Marshalling/Unmarshalling of TypedValueObject model - Success', () => {
        const typedValueObject = newTypedValueObject()
        const marshalledTypedValueObject = TypedValueObject.toJSON(typedValueObject)
        const unmarshalledTypedValueObject = new TypedValueObject(JSON.parse(JSON.stringify(marshalledTypedValueObject)))
        assert.deepEqual(typedValueObject, unmarshalledTypedValueObject)
        assert.deepEqual(typedValueObject, new TypedValueObject(typedValueObject))
    })
})
