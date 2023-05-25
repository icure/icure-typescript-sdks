import {generateSystemMetaDataOwner} from './SystemMetaDataOwner.test'
import {SystemMetaDataOwnerEncrypted} from '../../src/models/SystemMetaDataOwnerEncrypted.model'
import {generateSecurityMetadata} from './SecurityMetadata.test'
import {Delegation} from '@icure/api'
import {generateDelegation} from './Delegation.test'
import {generateRandomStringArray} from './utils'

export function generateSystemMetaDataOwnerEncrypted(): SystemMetaDataOwnerEncrypted {
    const fakeSystemMetaDataOwner = generateSystemMetaDataOwner()

    return new SystemMetaDataOwnerEncrypted({
        publicKey: fakeSystemMetaDataOwner.publicKey,
        hcPartyKeys: fakeSystemMetaDataOwner.hcPartyKeys,
        privateKeyShamirPartitions: fakeSystemMetaDataOwner.privateKeyShamirPartitions,
        secretForeignKeys: generateRandomStringArray(),
        cryptedForeignKeys: generateFakeDelegationMap(),
        delegations: generateFakeDelegationMap(),
        encryptionKeys: generateFakeDelegationMap(),
        aesExchangeKeys: fakeSystemMetaDataOwner.aesExchangeKeys,
        transferKeys: fakeSystemMetaDataOwner.transferKeys,
        securityMetadata: generateSecurityMetadata(),
        encryptedSelf: Math.random().toString(36).substring(2, 15),
    })
}

// Génère une map factice de Delegation
function generateFakeDelegationMap(): Map<string, Delegation[]> {
    const map: Map<string, Delegation[]> = new Map()
    for (let i = 0; i < 5; i++) {
        map.set(Math.random().toString(36).substring(2, 15), generateFakeDelegationArray())
    }
    return map
}

// Génère un tableau factice de Delegation
function generateFakeDelegationArray(): Delegation[] {
    return Array.from({ length: 5 }, () => generateDelegation())
}

describe(`SystemMetaDataOwnerEncrypted serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSystemMetaDataOwnerEncrypted()

        const json = SystemMetaDataOwnerEncrypted.toJSON(instance)
        const newInstance = SystemMetaDataOwnerEncrypted.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
