import 'mocha'

import { Telecom } from '../..'
import { assert } from 'chai'

export function newTelecom(): Telecom {
  return new Telecom({
    telecomType: 'mobile',
    telecomNumber: 'telecomNumber',
    telecomDescription: 'telecomDescription',
  })
}

describe('Telecom model test', () => {
  it('Marshalling/Unmarshalling of Telecom model - Success', () => {
    const telecom = newTelecom()
    const marshalledTelecom = Telecom.toJSON(telecom)
    const unmarshalledTelecom = new Telecom(JSON.parse(JSON.stringify(marshalledTelecom)))
    assert.deepEqual(telecom, unmarshalledTelecom)
    assert.deepEqual(telecom, new Telecom(telecom))
  })
})
