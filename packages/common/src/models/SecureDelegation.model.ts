import { AccessLevelEnum } from './enums/AccessLevel.enum'

export class SecureDelegation {
    constructor(secureDelegation: ISecureDelegation) {
        this.delegator = secureDelegation.delegator
        this.delegate = secureDelegation.delegate
        this.secretIds = secureDelegation.secretIds ?? new Set()
        this.encryptionKeys = secureDelegation.encryptionKeys ?? new Set()
        this.owningEntityIds = secureDelegation.owningEntityIds ?? new Set()
        this.parentDelegations = secureDelegation.parentDelegations ?? new Set()
        this.exchangeDataId = secureDelegation.exchangeDataId
        this.permissions = secureDelegation.permissions!
    }

    /**
     * Optionally the id of the delegator data owner for this [SecureDelegation]. May be null if this information must
     * be hidden to prevent data leakages (see class documentation for more details).
     */
    delegator?: string
    /**
     * Optionally the id of the delegate data owner for this [SecureDelegation]. May be null if this information must
     * be hidden to prevent data leakages (see class documentation for more details).
     */
    delegate?: string
    /**
     * Secret id of the entity holding this [SecureDelegation] (formerly `delegation`). The id will appear in plaintext in the
     * `secretForeignKeys` field of children entities.
     */
    secretIds: Set<string>
    /**
     * Encrypted aes key used for the encryption of the entity's data (data stored in `encryptedSelf`).
     */
    encryptionKeys: Set<string>
    /**
     * Encrypted id of the entity which owns the entity holding this [SecureDelegation] (formerly `cryptedForeignKey`),
     * such as the id of the patient for a contact or healthcare element.
     */
    owningEntityIds: Set<string>
    /**
     * Key of the parent delegations in the [SecurityMetadata.secureDelegations]. Users are allowed to modify/delete
     * only [SecureDelegation] that they can directly access or any children delegations.
     */
    parentDelegations: Set<string>
    /**
     * If both the [delegator] and [delegate] are explicit in this secure delegation this field will hold the id of the exchange
     * data used for the encryption of this delegation. Otherwise, this will be null.
     */
    exchangeDataId?: string

    /**
     * Permissions of users with access to this [SecureDelegation] on the corresponding entity.
     * The permissions only refer to the actual content of the entity and not to any metadata (excluding the `encryptedSelf`):
     * any data owner will always be allowed to use the methods to share the with other data owners, even if these method
     * require to modify the entity and the data owner has read-only permissions.
     * Delegations without any parents will always have full read-write permissions.
     */
    permissions: AccessLevelEnum

    static toJSON(instance: SecureDelegation): any {
        const pojo: any = {}
        pojo['delegator'] = instance.delegator
        pojo['delegate'] = instance.delegate
        pojo['secretIds'] = Array.from([...instance.secretIds].map((item) => item))
        pojo['encryptionKeys'] = Array.from([...instance.encryptionKeys].map((item) => item))
        pojo['owningEntityIds'] = Array.from([...instance.owningEntityIds].map((item) => item))
        pojo['parentDelegations'] = Array.from([...instance.parentDelegations].map((item) => item))
        pojo['exchangeDataId'] = instance.exchangeDataId
        pojo['permissions'] = instance.permissions
        return pojo
    }

    static fromJSON(pojo: any): SecureDelegation {
        return new SecureDelegation({
            delegator: pojo['delegator'],
            delegate: pojo['delegate'],
            secretIds: new Set(pojo['secretIds'].map((item: any) => item)),
            encryptionKeys: new Set(pojo['encryptionKeys'].map((item: any) => item)),
            owningEntityIds: new Set(pojo['owningEntityIds'].map((item: any) => item)),
            parentDelegations: new Set(pojo['parentDelegations'].map((item: any) => item)),
            exchangeDataId: pojo['exchangeDataId'],
            permissions: pojo['permissions'],
        })
    }
}

interface ISecureDelegation {
    delegator?: string
    delegate?: string
    secretIds?: Set<string>
    encryptionKeys?: Set<string>
    owningEntityIds?: Set<string>
    parentDelegations?: Set<string>
    exchangeDataId?: string
    permissions?: AccessLevelEnum
}
