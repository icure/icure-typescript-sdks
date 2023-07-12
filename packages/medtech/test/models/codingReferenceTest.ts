import 'mocha'

import { CodingReference } from '@icure/typescript-common'
import { assert } from 'chai'

export function newCodingReference(): CodingReference {
  return new CodingReference({
    id: 'id',
    type: 'type',
    code: 'code',
    version: 'version',
  })
}

describe('CodingReference model test', () => {
  it('Marshalling/Unmarshalling of CodingReference model - Success', () => {
    const codingReference = newCodingReference()
    const marshalledCodingReference = CodingReference.toJSON(codingReference)
    const unmarshalledCodingReference = new CodingReference(JSON.parse(JSON.stringify(marshalledCodingReference)))
    assert.deepEqual(codingReference, unmarshalledCodingReference)
    assert.deepEqual(codingReference, new CodingReference(codingReference))
  })
})
