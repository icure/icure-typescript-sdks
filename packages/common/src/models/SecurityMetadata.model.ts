import { SecurityMetadata as SecurityMetadataDto } from '@icure/api/icc-api/model/SecurityMetadata';
import { mapTo } from "../utils/decorators";
import { SecureDelegation } from './SecureDelegation.model';

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
    secureDelegations?: Map<string, SecureDelegation>

    /**
     * Keys equivalences
     *
     * Key: hash of the public key
     */
    keysEquivalences?: Map<string, string>

    static toJSON(instance: SecurityMetadata): any {
        const pojo: any = {}
        pojo["secureDelegations"] = !!instance.secureDelegations ? Object.fromEntries([...instance.secureDelegations.entries()].map(([k, v]) => [k, SecureDelegation.toJSON(v)])) : undefined
        pojo["keysEquivalences"] = !!instance.keysEquivalences ? Object.fromEntries([...instance.keysEquivalences.entries()].map(([k, v]) => [k, v])) : undefined
        return pojo
    }

    static fromJSON(pojo: any): SecurityMetadata {
        return new SecurityMetadata({secureDelegations: pojo["secureDelegations"] ? new Map(Object.entries(pojo["secureDelegations"]).map(([k, v]: [any, any]) => [k, SecureDelegation.fromJSON(v)])) : undefined, keysEquivalences: pojo["keysEquivalences"] ? new Map(Object.entries(pojo["keysEquivalences"]).map(([k, v]: [any, any]) => [k, v])) : undefined})
    }
}

interface ISecurityMetadata {
    secureDelegations?: Map<string, SecureDelegation>
    keysEquivalences?: Map<string, string>
}
