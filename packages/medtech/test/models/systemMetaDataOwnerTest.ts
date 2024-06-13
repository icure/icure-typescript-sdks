import 'mocha'

import { SystemMetaDataOwner } from '../..'
import { assert } from 'chai'
import { recordOf } from '@icure/typescript-common'

export function newSystemMetaDataOwner(): SystemMetaDataOwner {
    return new SystemMetaDataOwner({
        publicKey: 'publicKey',
        hcPartyKeys: recordOf({ key: ['hcPartyKeys'] }),
        privateKeyShamirPartitions: recordOf({ key: 'privateKeyShamirPartitions' }),
        aesExchangeKeys: recordOf({ key: recordOf({ key: recordOf({ key: 'aesExchangeKeys' }) }) }),
        transferKeys: recordOf({ key: recordOf({ key: 'transferKeys' }) }),
    })
}

describe('SystemMetaDataOwner model test', () => {
    it('Marshalling/Unmarshalling of SystemMetaDataOwner model - Success', () => {
        const systemMetaDataOwner = newSystemMetaDataOwner()
        const marshalledSystemMetaDataOwner = SystemMetaDataOwner.toJSON(systemMetaDataOwner)
        const unmarshalledSystemMetaDataOwner = SystemMetaDataOwner.fromJSON(JSON.parse(JSON.stringify(marshalledSystemMetaDataOwner)))
        assert.deepEqual(systemMetaDataOwner, unmarshalledSystemMetaDataOwner)
        assert.deepEqual(systemMetaDataOwner, new SystemMetaDataOwner(systemMetaDataOwner))
    })
})
