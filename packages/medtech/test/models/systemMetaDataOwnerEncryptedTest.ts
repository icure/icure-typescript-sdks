import 'mocha'

import { SystemMetaDataOwnerEncrypted } from '../..'
import { assert } from 'chai'
import { newDelegation } from './delegationTest'
import { mapOf } from '@icure/typescript-common'

export function newSystemMetaDataOwnerEncrypted(): SystemMetaDataOwnerEncrypted {
    return new SystemMetaDataOwnerEncrypted({
        publicKey: 'publicKey',
        hcPartyKeys: mapOf({ key: ['hcPartyKeys'] }),
        privateKeyShamirPartitions: mapOf({ key: 'privateKeyShamirPartitions' }),
        aesExchangeKeys: mapOf({ key: mapOf({ key: mapOf({ key: 'aesExchangeKeys' }) }) }),
        transferKeys: mapOf({ key: mapOf({ key: 'aesExchangeKeys' }) }),
        secretForeignKeys: ['secretForeignKeys'],
        cryptedForeignKeys: mapOf({ key: ([newDelegation()]) }),
        delegations: mapOf({ key: ([newDelegation()]) }),
        encryptionKeys: mapOf({ key: ([newDelegation()]) }),
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
