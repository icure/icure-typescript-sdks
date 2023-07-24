import { SecurityMetadata } from '../../src/models/SecurityMetadata.model'
import { SecureDelegation } from '../../src/models/SecureDelegation.model'
import { generateSecureDelegation } from './SecureDelegation.model'

export function generateSecurityMetadata(): SecurityMetadata {
    const secureDelegation1: SecureDelegation = generateSecureDelegation()
    const secureDelegation2: SecureDelegation = generateSecureDelegation()

    const securityMetadata = {
        secureDelegations: new Map([
            ['publicKeyHash1', secureDelegation1],
            ['publicKeyHash2', secureDelegation2],
        ]),
        keysEquivalences: new Map([
            ['publicKeyHash1', 'equivalence1'],
            ['publicKeyHash2', 'equivalence2'],
        ]),
    }

    return new SecurityMetadata(securityMetadata)
}
