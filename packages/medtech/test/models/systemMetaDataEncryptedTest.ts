import 'mocha'

import { SystemMetaDataEncrypted } from '../..'
import { assert } from 'chai'
import { newDelegation } from './delegationTest'
import { mapOf } from '@icure/typescript-common'

export function newSystemMetaDataEncrypted(): SystemMetaDataEncrypted {
    return new SystemMetaDataEncrypted({
        secretForeignKeys: ['secretForeignKeys'],
        cryptedForeignKeys: mapOf({ key: new Set([newDelegation()]) }),
        delegations: mapOf({ key: new Set([newDelegation()]) }),
        encryptionKeys: mapOf({ key: new Set([newDelegation()]) }),
    })
}

describe('SystemMetaDataEncrypted model test', () => {
    it('Marshalling/Unmarshalling of SystemMetaDataEncrypted model - Success', () => {
        const systemMetaDataEncrypted = newSystemMetaDataEncrypted()
        const marshalledSystemMetaDataEncrypted = SystemMetaDataEncrypted.toJSON(systemMetaDataEncrypted)
        const unmarshalledSystemMetaDataEncrypted = SystemMetaDataEncrypted.fromJSON(JSON.parse(JSON.stringify(marshalledSystemMetaDataEncrypted)))
        assert.deepEqual(systemMetaDataEncrypted, unmarshalledSystemMetaDataEncrypted)
        assert.deepEqual(systemMetaDataEncrypted, new SystemMetaDataEncrypted(systemMetaDataEncrypted))
    })
})
