import { SystemMetaDataOwnerEncrypted } from '../../src'
import { generateSystemMetaDataOwner } from './SystemMetaDataOwner.model'
import { generateDelegationMap, generateRandomStringArray } from './utils'
import { generateSecurityMetadata } from './SecurityMetadata.model'

export function generateSystemMetaDataOwnerEncrypted(): SystemMetaDataOwnerEncrypted {
    const fakeSystemMetaDataOwner = generateSystemMetaDataOwner()

    return new SystemMetaDataOwnerEncrypted({
        publicKey: fakeSystemMetaDataOwner.publicKey,
        hcPartyKeys: fakeSystemMetaDataOwner.hcPartyKeys,
        privateKeyShamirPartitions: fakeSystemMetaDataOwner.privateKeyShamirPartitions,
        secretForeignKeys: generateRandomStringArray(),
        cryptedForeignKeys: generateDelegationMap(),
        delegations: generateDelegationMap(),
        encryptionKeys: generateDelegationMap(),
        aesExchangeKeys: fakeSystemMetaDataOwner.aesExchangeKeys,
        transferKeys: fakeSystemMetaDataOwner.transferKeys,
        // securityMetadata: generateSecurityMetadata(),
        encryptedSelf: Math.random().toString(36).substring(2, 15),
        tags: [],
    })
}
