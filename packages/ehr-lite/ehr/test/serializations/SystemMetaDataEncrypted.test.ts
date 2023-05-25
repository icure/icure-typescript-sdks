import {generateDelegation} from './Delegation.test'
import {SystemMetaDataEncrypted} from '../../src/models/SystemMetaDataEncrypted.model'
import {Delegation} from '../../src/models/Delegation.model'
import {SecurityMetadata} from '../../src/models/SecurityMetadata.model'
import {generateSecurityMetadata} from './SecurityMetadata.test'

export function generateSystemMetaDataEncrypted(): SystemMetaDataEncrypted {
    const secretForeignKeys: string[] = Array.from({ length: 5 }, () => Math.random().toString(36).substring(2, 15))

    const cryptedForeignKeys: Map<string, Delegation[]> = new Map()
    for (let i = 0; i < 5; i++) {
        cryptedForeignKeys.set(Math.random().toString(36).substring(2, 15), generateDelegationArray())
    }

    const delegations: Map<string, Delegation[]> = new Map()
    for (let i = 0; i < 5; i++) {
        delegations.set(Math.random().toString(36).substring(2, 15), generateDelegationArray())
    }

    const encryptionKeys: Map<string, Delegation[]> = new Map()
    for (let i = 0; i < 5; i++) {
        encryptionKeys.set(Math.random().toString(36).substring(2, 15), generateDelegationArray())
    }

    const securityMetadata: SecurityMetadata = generateSecurityMetadata()

    const encryptedSelf: string = Math.random().toString(36).substring(2, 15)

    return new SystemMetaDataEncrypted({
        secretForeignKeys,
        cryptedForeignKeys,
        delegations,
        encryptionKeys,
        securityMetadata,
        encryptedSelf,
    })
}

function generateDelegationArray(): Delegation[] {
    return Array.from({ length: 5 }, () => generateDelegation())
}

describe(`SystemMetaDataEncrypted serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSystemMetaDataEncrypted()

        const json = SystemMetaDataEncrypted.toJSON(instance)
        const newInstance = SystemMetaDataEncrypted.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
