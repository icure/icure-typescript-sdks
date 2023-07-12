import 'mocha'

import { assert } from 'chai'
import {PropertyType} from "@icure/typescript-common";

export function newPropertyType(): PropertyType {
  return new PropertyType({
    identifier: 'identifier',
    type: 'STRING',
  })
}

describe('PropertyType model test', () => {
  it('Marshalling/Unmarshalling of PropertyType model - Success', () => {
    const propertyType = newPropertyType()
    const marshalledPropertyType = PropertyType.toJSON(propertyType)
    const unmarshalledPropertyType = new PropertyType(JSON.parse(JSON.stringify(marshalledPropertyType)))
    assert.deepEqual(propertyType, unmarshalledPropertyType)
    assert.deepEqual(propertyType, new PropertyType(propertyType))
  })
})
