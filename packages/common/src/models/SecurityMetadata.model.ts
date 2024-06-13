import { SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { SecureDelegation } from './SecureDelegation.model'

@mapTo(SecurityMetadataDto)
export class SecurityMetadata {
    constructor(securityMetadata?: Partial<ISecurityMetadata>) {
        this.secureDelegations = securityMetadata?.secureDelegations ?? {}
        this.keysEquivalences = securityMetadata?.keysEquivalences ?? {}
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

    static toJSON(instance: SecurityMetadata): ISecurityMetadata {
        const pojo: ISecurityMetadata = {} as ISecurityMetadata
        pojo['secureDelegations'] = { ...instance.secureDelegations }
        pojo['keysEquivalences'] = { ...instance.keysEquivalences }
        return pojo
    }

    static fromJSON(pojo: ISecurityMetadata): SecurityMetadata {
        const obj = {} as ISecurityMetadata
        obj['secureDelegations'] = { ...pojo['secureDelegations'] }
        obj['keysEquivalences'] = { ...pojo['keysEquivalences'] }
        return new SecurityMetadata(obj)
    }
}

interface ISecurityMetadata {
    secureDelegations: Record<string, SecureDelegation>
    keysEquivalences: Record<string, string>
}
