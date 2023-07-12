import 'mocha'

import { SystemMetaDataOwner } from '../..'
import { assert } from 'chai'
import {mapOf} from "@icure/typescript-common";

export function newSystemMetaDataOwner(): SystemMetaDataOwner {
  return new SystemMetaDataOwner({
    publicKey: 'publicKey',
    hcPartyKeys: mapOf({ key: ['hcPartyKeys'] }),
    privateKeyShamirPartitions: mapOf({ key: 'privateKeyShamirPartitions' }),
    aesExchangeKeys: mapOf({ key: mapOf({ key: mapOf({ key: 'aesExchangeKeys' }) }) }),
    transferKeys: mapOf({ key: mapOf({ key: 'transferKeys' }) }),
  })
}

describe('SystemMetaDataOwner model test', () => {
  it('Marshalling/Unmarshalling of SystemMetaDataOwner model - Success', () => {
    const systemMetaDataOwner = newSystemMetaDataOwner()
    const marshalledSystemMetaDataOwner = SystemMetaDataOwner.toJSON(systemMetaDataOwner)
    const unmarshalledSystemMetaDataOwner = new SystemMetaDataOwner(JSON.parse(JSON.stringify(marshalledSystemMetaDataOwner)))
    assert.deepEqual(systemMetaDataOwner, unmarshalledSystemMetaDataOwner)
    assert.deepEqual(systemMetaDataOwner, new SystemMetaDataOwner(systemMetaDataOwner))
  })
})
