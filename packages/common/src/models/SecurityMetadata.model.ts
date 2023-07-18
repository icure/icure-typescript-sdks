import { SecureDelegation } from './SecureDelegation.model'

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
    secureDelegations: Map<string, SecureDelegation>

    /**
     * Keys equivalences
     *
     * Key: hash of the public key
     */
    keysEquivalences: Map<string, string>

    static toJSON(instance: SecurityMetadata): any {
        const pojo: any = {}
        pojo['secureDelegations'] = Object.fromEntries([...instance.secureDelegations.entries()].map(([k, v]) => [k, SecureDelegation.toJSON(v)]))
        pojo['keysEquivalences'] = Object.fromEntries([...instance.keysEquivalences.entries()].map(([k, v]) => [k, v]))
        return pojo
    }

    static fromJSON(pojo: any): SecurityMetadata {
        const obj = {} as ISecurityMetadata
        obj['secureDelegations'] = new Map(Object.entries(pojo['secureDelegations']).map(([k, v]: [any, any]) => [k, SecureDelegation.fromJSON(v)]))
        obj['keysEquivalences'] = new Map(Object.entries(pojo['keysEquivalences']).map(([k, v]: [any, any]) => [k, v]))
        return new SecurityMetadata(obj)
    }
}

interface ISecurityMetadata {
    secureDelegations: Map<string, SecureDelegation>
    keysEquivalences: Map<string, string>
}
