import 'mocha'

import { SystemMetaDataEncrypted } from '../..'
import { assert } from 'chai'
import { newDelegation } from './delegationTest'
import { recordOf } from '@icure/typescript-common'

export function newSystemMetaDataEncrypted(): SystemMetaDataEncrypted {
    return new SystemMetaDataEncrypted({
        secretForeignKeys: ['secretForeignKeys'],
        cryptedForeignKeys: recordOf({ key: [newDelegation()] }),
        delegations: recordOf({ key: [newDelegation()] }),
        encryptionKeys: recordOf({ key: [newDelegation()] }),
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
