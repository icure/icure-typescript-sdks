import { SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { ISecureDelegation, SecureDelegation } from './SecureDelegation.model'

@mapTo(SecurityMetadataDto)
export class SecurityMetadata {
    /**
     * Secure delegations
     *
     * Key: hash of the public key
     */
    secureDelegations: Record<string, SecureDelegation>

    /**
     * Keys equivalences
     *
     * Key: hash of the public key
     */
    keysEquivalences: Record<string, string>

    toJSON(): ISecurityMetadata {
        return {
        secureDelegations: Object.fromEntries(Object.entries(this.secureDelegations).map(([k, v]: [any, SecureDelegation]) => [k, v.toJSON()])),
        keysEquivalences: {...this.keysEquivalences},
        }
    }

    constructor(json: Partial<ISecurityMetadata> & { secureDelegations: Record<string, ISecureDelegation>,keysEquivalences: Record<string, string> }) {
        this.secureDelegations = Object.fromEntries(Object.entries(json["secureDelegations"]!).map(([k, v]: [any, ISecureDelegation]) => [k, new SecureDelegation(v)]))
        this.keysEquivalences = {...json["keysEquivalences"]!}
    }
}

export interface ISecurityMetadata {
    secureDelegations: Record<string, ISecureDelegation>
    keysEquivalences: Record<string, string>
}
