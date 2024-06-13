import { CodingReference } from './CodingReference.model'
import { Delegation } from './Delegation.model'
import { SecurityMetadata } from './SecurityMetadata.model'

export class SystemMetaDataEncrypted {
    secretForeignKeys: string[]
    cryptedForeignKeys: Record<string, Array<Delegation>>
    delegations: Record<string, Array<Delegation>>
    encryptionKeys: Record<string, Array<Delegation>>
    securityMetadata?: SecurityMetadata
    encryptedSelf?: string
    tags: Array<CodingReference>

    constructor(systemMetaDataEncrypted: Partial<ISystemMetaDataEncrypted>) {
        this.secretForeignKeys = systemMetaDataEncrypted.secretForeignKeys ?? []
        this.cryptedForeignKeys = systemMetaDataEncrypted.cryptedForeignKeys ?? {}
        this.delegations = systemMetaDataEncrypted.delegations ?? {}
        this.encryptionKeys = systemMetaDataEncrypted.encryptionKeys ?? {}
        this.securityMetadata = systemMetaDataEncrypted.securityMetadata
        this.encryptedSelf = systemMetaDataEncrypted.encryptedSelf
        this.tags = systemMetaDataEncrypted.tags ?? new Array<CodingReference>()
    }

    static toJSON(instance: SystemMetaDataEncrypted): ISystemMetaDataEncrypted {
        const pojo: ISystemMetaDataEncrypted = {} as ISystemMetaDataEncrypted
        pojo['secretForeignKeys'] = instance.secretForeignKeys.map((item) => item)
        pojo['cryptedForeignKeys'] = { ...instance.cryptedForeignKeys }
        pojo['delegations'] = { ...instance.delegations }
        pojo['encryptionKeys'] = { ...instance.encryptionKeys }
        if (instance.securityMetadata !== undefined) pojo['securityMetadata'] = SecurityMetadata.toJSON(instance.securityMetadata)
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: ISystemMetaDataEncrypted): SystemMetaDataEncrypted {
        const obj = {} as ISystemMetaDataEncrypted
        obj['secretForeignKeys'] = pojo['secretForeignKeys'].map((item: any) => item)
        obj['cryptedForeignKeys'] = { ...pojo['cryptedForeignKeys'] }
        obj['delegations'] = { ...pojo['delegations'] }
        obj['encryptionKeys'] = { ...pojo['encryptionKeys'] }
        if (pojo['securityMetadata'] !== undefined) {
            obj['securityMetadata'] = SecurityMetadata.fromJSON(pojo['securityMetadata']!)
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']!
        }
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        return new SystemMetaDataEncrypted(obj)
    }
}

export interface ISystemMetaDataEncrypted {
    secretForeignKeys: string[]
    cryptedForeignKeys: Record<string, Array<Delegation>>
    delegations: Record<string, Array<Delegation>>
    encryptionKeys: Record<string, Array<Delegation>>
    securityMetadata?: SecurityMetadata
    encryptedSelf?: string
    tags: Array<CodingReference>
}
