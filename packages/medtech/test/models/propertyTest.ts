import 'mocha'

import { Property } from '../..'
import { assert } from 'chai'
import { newPropertyType } from './propertyTypeTest'
import { newTypedValueObject } from './typedValueObjectTest'

export function newProperty(): Property {
  return new Property({
    id: 'id',
    type: newPropertyType(),
    typedValue: newTypedValueObject(),
    deleted: 123,
  })
}

describe('Property model test', () => {
  it('Marshalling/Unmarshalling of Property model - Success', () => {
    const property = newProperty()
    const marshalledProperty = Property.toJSON(property)
    const unmarshalledProperty = new Property(JSON.parse(JSON.stringify(marshalledProperty)))
    assert.deepEqual(property, unmarshalledProperty)
    assert.deepEqual(property, new Property(property))
  })
})
