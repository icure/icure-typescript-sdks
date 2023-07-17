import { CodingReference, SecurityMetadata, SystemMetaDataEncrypted } from '../../src'
import { generateSecurityMetadata } from './SecurityMetadata.model'
import { generateDelegationMap } from './utils'

export function generateSystemMetaDataEncrypted(domainTagType?: CodingReference): SystemMetaDataEncrypted {
    const secretForeignKeys: string[] = Array.from({ length: 5 }, () => Math.random().toString(36).substring(2, 15))

    const cryptedForeignKeys = generateDelegationMap()

    const delegations = generateDelegationMap()

    const encryptionKeys = generateDelegationMap()

    // const securityMetadata: SecurityMetadata = generateSecurityMetadata()

    const encryptedSelf: string = Math.random().toString(36).substring(2, 15)

    return new SystemMetaDataEncrypted({
        secretForeignKeys,
        cryptedForeignKeys,
        delegations,
        encryptionKeys,
        // securityMetadata,
        encryptedSelf,
        tags: new Set([domainTagType] ?? []),
    })
}
