import { SecureDelegation as SecureDelegationEntity } from '@icure/api/icc-api/model/SecureDelegation'
import { mapTo } from '../mappings/mapper'
import { AccessLevelEnum } from './enums/AccessLevel.enum'

@mapTo(SecureDelegationEntity)
export class SecureDelegation {
    constructor(secureDelegation?: ISecureDelegation | any) {
        this.delegator = secureDelegation?.delegator
        this.delegate = secureDelegation?.delegate
        this.secretIds = secureDelegation?.secretIds
        this.encryptionKeys = secureDelegation?.encryptionKeys
        this.owningEntityIds = secureDelegation?.owningEntityIds
        this.parentDelegations = secureDelegation?.parentDelegations
        this.exchangeDataId = secureDelegation?.exchangeDataId
        this.encryptedExchangeDataId = secureDelegation?.encryptedExchangeDataId
        this.permissions = secureDelegation?.permissions
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
    secretIds?: string[]
    /**
     * Encrypted aes key used for the encryption of the entity's data (data stored in `encryptedSelf`).
     */
    encryptionKeys?: string[]
    /**
     * Encrypted id of the entity which owns the entity holding this [SecureDelegation] (formerly `cryptedForeignKey`),
     * such as the id of the patient for a contact or healthcare element.
     */
    owningEntityIds?: string[]
    /**
     * Key of the parent delegations in the [SecurityMetadata.secureDelegations]. Users are allowed to modify/delete
     * only [SecureDelegation] that they can directly access or any children delegations.
     */
    parentDelegations?: string[]
    /**
     * If both the [delegator] and [delegate] are explicit in this secure delegation this field will hold the id of the exchange
     * data used for the encryption of this delegation. Otherwise, this will be null.
     */
    exchangeDataId?: string
    /**
     * If only the [delegator] or only the [delegate] is explicit in this secure delegation this field will hold the id of the
     * exchange data used for the encryption encrypted with the public keys of that data owner. Otherwise, this will be null.
     *
     * The keys of this map are the public key fingerprints of the data owners.
     */
    encryptedExchangeDataId?: Map<string, string>

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
        pojo['secretIds'] = instance.secretIds?.map((item) => item)
        pojo['encryptionKeys'] = instance.encryptionKeys?.map((item) => item)
        pojo['owningEntityIds'] = instance.owningEntityIds?.map((item) => item)
        pojo['parentDelegations'] = instance.parentDelegations?.map((item) => item)
        pojo['exchangeDataId'] = instance.exchangeDataId
        pojo['encryptedExchangeDataId'] = !!instance.encryptedExchangeDataId ? Object.fromEntries([...instance.encryptedExchangeDataId.entries()].map(([k, v]) => [k, v])) : undefined
        pojo['permissions'] = instance.permissions
        return pojo
    }

    static fromJSON(pojo: any): SecureDelegation {
        return new SecureDelegation({
            delegator: pojo['delegator'],
            delegate: pojo['delegate'],
            secretIds: pojo['secretIds']?.map((item: any) => item),
            encryptionKeys: pojo['encryptionKeys']?.map((item: any) => item),
            owningEntityIds: pojo['owningEntityIds']?.map((item: any) => item),
            parentDelegations: pojo['parentDelegations']?.map((item: any) => item),
            exchangeDataId: pojo['exchangeDataId'],
            encryptedExchangeDataId: pojo['encryptedExchangeDataId'] ? new Map(Object.entries(pojo['encryptedExchangeDataId']).map(([k, v]: [any, any]) => [k, v])) : undefined,
            permissions: pojo['permissions'],
        })
    }
}

interface ISecureDelegation {
    delegator?: string
    delegate?: string
    secretIds?: string[]
    encryptionKeys?: string[]
    owningEntityIds?: string[]
    parentDelegations?: string[]
    exchangeDataId?: string
    encryptedExchangeDataId?: Map<string, string>
    permissions: AccessLevelEnum
}
