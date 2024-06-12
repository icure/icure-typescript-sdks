import { SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { SecureDelegation } from './SecureDelegation.model'

@mapTo(SecurityMetadataDto)
export class SecurityMetadata {
    constructor(securityMetadata?: ISecurityMetadata | any) {
        this.secureDelegations = securityMetadata?.secureDelegations
        this.keysEquivalences = securityMetadata?.keysEquivalences
    }

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

    static toJSON(instance: SecurityMetadata): any {
        const pojo: any = {}
        pojo['secureDelegations'] = Object.fromEntries(Object.entries(instance.secureDelegations).map(([k, v]) => [k, SecureDelegation.toJSON(v)]))
        pojo['keysEquivalences'] = Object.fromEntries(Object.entries(instance.keysEquivalences).map(([k, v]) => [k, v]))
        return pojo
    }

    static fromJSON(pojo: any): SecurityMetadata {
        const obj = {} as ISecurityMetadata
        obj['secureDelegations'] = Object.fromEntries(Object.entries(pojo['secureDelegations']).map(([k, v]: [any, any]) => [k, SecureDelegation.fromJSON(v)]))
        obj['keysEquivalences'] = Object.fromEntries(Object.entries(pojo['keysEquivalences']).map(([k, v]: [any, any]) => [k, v]))
        return new SecurityMetadata(obj)
    }
}

interface ISecurityMetadata {
    secureDelegations: Record<string, SecureDelegation>
    keysEquivalences: Record<string, string>
}
