import 'mocha'

import { SystemMetaDataOwnerEncrypted } from '../..'
import { assert } from 'chai'
import { newDelegation } from './delegationTest'
import { recordOf } from '@icure/typescript-common'

export function newSystemMetaDataOwnerEncrypted(): SystemMetaDataOwnerEncrypted {
    return new SystemMetaDataOwnerEncrypted({
        publicKey: 'publicKey',
        hcPartyKeys: recordOf({ key: ['hcPartyKeys'] }),
        privateKeyShamirPartitions: recordOf({ key: 'privateKeyShamirPartitions' }),
        aesExchangeKeys: recordOf({ key: recordOf({ key: recordOf({ key: 'aesExchangeKeys' }) }) }),
        transferKeys: recordOf({ key: recordOf({ key: 'aesExchangeKeys' }) }),
        secretForeignKeys: ['secretForeignKeys'],
        cryptedForeignKeys: recordOf({ key: ([newDelegation()]) }),
        delegations: recordOf({ key: ([newDelegation()]) }),
        encryptionKeys: recordOf({ key: ([newDelegation()]) }),
    })
}

describe('SystemMetaDataOwnerEncrypted model test', () => {
    it('Marshalling/Unmarshalling of SystemMetaDataOwnerEncrypted model - Success', () => {
        const systemMetaDataOwnerEncrypted = newSystemMetaDataOwnerEncrypted()
        const marshalledSystemMetaDataOwnerEncrypted = SystemMetaDataOwnerEncrypted.toJSON(systemMetaDataOwnerEncrypted)
        const unmarshalledSystemMetaDataOwnerEncrypted = SystemMetaDataOwnerEncrypted.fromJSON(JSON.parse(JSON.stringify(marshalledSystemMetaDataOwnerEncrypted)))
        assert.deepEqual(systemMetaDataOwnerEncrypted, unmarshalledSystemMetaDataOwnerEncrypted)
        assert.deepEqual(systemMetaDataOwnerEncrypted, new SystemMetaDataOwnerEncrypted(systemMetaDataOwnerEncrypted))
    })
})
