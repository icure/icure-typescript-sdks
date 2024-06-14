import { SecureDelegation as SecureDelegationDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { AccessLevelEnum } from './enums/AccessLevel.enum'

@mapTo(SecureDelegationDto)
export class SecureDelegation {
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
    secretIds: string[]
    /**
     * Encrypted aes key used for the encryption of the entity's data (data stored in `encryptedSelf`).
     */
    encryptionKeys: string[]
    /**
     * Encrypted id of the entity which owns the entity holding this [SecureDelegation] (formerly `cryptedForeignKey`),
     * such as the id of the patient for a contact or healthcare element.
     */
    owningEntityIds: string[]
    /**
     * Key of the parent delegations in the [SecurityMetadata.secureDelegations]. Users are allowed to modify/delete
     * only [SecureDelegation] that they can directly access or any children delegations.
     */
    parentDelegations: string[]
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

    toJSON(): ISecureDelegation {
        return {
        delegator: this.delegator,
        delegate: this.delegate,
        secretIds: this.secretIds.map(item => item),
        encryptionKeys: this.encryptionKeys.map(item => item),
        owningEntityIds: this.owningEntityIds.map(item => item),
        parentDelegations: this.parentDelegations.map(item => item),
        exchangeDataId: this.exchangeDataId,
        permissions: this.permissions,
        }
    }

    constructor(json: Partial<ISecureDelegation> & { secretIds: string[],encryptionKeys: string[],owningEntityIds: string[],parentDelegations: string[],permissions: import("/Users/aduchate/Sources/icure/icure-typescript-sdks/packages/common/src/models/enums/AccessLevel.enum").AccessLevelEnum }) {
        if (json["delegator"] !== undefined) {
            this.delegator = json["delegator"]!
        }
        if (json["delegate"] !== undefined) {
            this.delegate = json["delegate"]!
        }
        this.secretIds = json["secretIds"]!.map((item: any) => item)
        this.encryptionKeys = json["encryptionKeys"]!.map((item: any) => item)
        this.owningEntityIds = json["owningEntityIds"]!.map((item: any) => item)
        this.parentDelegations = json["parentDelegations"]!.map((item: any) => item)
        if (json["exchangeDataId"] !== undefined) {
            this.exchangeDataId = json["exchangeDataId"]!
        }
        this.permissions = json["permissions"]!
    }
}

export interface ISecureDelegation {
    delegator?: string
    delegate?: string
    secretIds: string[]
    encryptionKeys: string[]
    owningEntityIds: string[]
    parentDelegations: string[]
    exchangeDataId?: string
    permissions: AccessLevelEnum
}
