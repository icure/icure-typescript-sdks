import { SecureDelegation as SecureDelegationDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { AccessLevelEnum } from './enums/AccessLevel.enum'

@mapTo(SecureDelegationDto)
export class SecureDelegation {
    constructor(secureDelegation: ISecureDelegation) {
        this.delegator = secureDelegation.delegator
        this.delegate = secureDelegation.delegate
        this.secretIds = secureDelegation.secretIds ?? []
        this.encryptionKeys = secureDelegation.encryptionKeys ?? []
        this.owningEntityIds = secureDelegation.owningEntityIds ?? []
        this.parentDelegations = secureDelegation.parentDelegations ?? []
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
    secretIds: Array<string>
    /**
     * Encrypted aes key used for the encryption of the entity's data (data stored in `encryptedSelf`).
     */
    encryptionKeys: Array<string>
    /**
     * Encrypted id of the entity which owns the entity holding this [SecureDelegation] (formerly `cryptedForeignKey`),
     * such as the id of the patient for a contact or healthcare element.
     */
    owningEntityIds: Array<string>
    /**
     * Key of the parent delegations in the [SecurityMetadata.secureDelegations]. Users are allowed to modify/delete
     * only [SecureDelegation] that they can directly access or any children delegations.
     */
    parentDelegations: Array<string>
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
        if (instance.delegator !== undefined) pojo['delegator'] = instance.delegator
        if (instance.delegate !== undefined) pojo['delegate'] = instance.delegate
        pojo['secretIds'] = ([...instance.secretIds].map((item) => item))
        pojo['encryptionKeys'] = ([...instance.encryptionKeys].map((item) => item))
        pojo['owningEntityIds'] = ([...instance.owningEntityIds].map((item) => item))
        pojo['parentDelegations'] = ([...instance.parentDelegations].map((item) => item))
        if (instance.exchangeDataId !== undefined) pojo['exchangeDataId'] = instance.exchangeDataId
        pojo['permissions'] = instance.permissions
        return pojo
    }

    static fromJSON(pojo: any): SecureDelegation {
        const obj = {} as ISecureDelegation
        if (pojo['delegator'] !== undefined) {
            obj['delegator'] = pojo['delegator']
        }
        if (pojo['delegate'] !== undefined) {
            obj['delegate'] = pojo['delegate']
        }
        obj['secretIds'] = (pojo['secretIds'].map((item: any) => item))
        obj['encryptionKeys'] = (pojo['encryptionKeys'].map((item: any) => item))
        obj['owningEntityIds'] = (pojo['owningEntityIds'].map((item: any) => item))
        obj['parentDelegations'] = (pojo['parentDelegations'].map((item: any) => item))
        if (pojo['exchangeDataId'] !== undefined) {
            obj['exchangeDataId'] = pojo['exchangeDataId']
        }
        obj['permissions'] = pojo['permissions']
        return new SecureDelegation(obj)
    }
}

interface ISecureDelegation {
    delegator?: string
    delegate?: string
    secretIds?: Array<string>
    encryptionKeys?: Array<string>
    owningEntityIds?: Array<string>
    parentDelegations?: Array<string>
    exchangeDataId?: string
    permissions?: AccessLevelEnum
}
