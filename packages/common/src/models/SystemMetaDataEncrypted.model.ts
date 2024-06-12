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

    constructor(systemMetaDataEncrypted: ISystemMetaDataEncrypted) {
        this.secretForeignKeys = systemMetaDataEncrypted.secretForeignKeys ?? []
        this.cryptedForeignKeys = systemMetaDataEncrypted.cryptedForeignKeys ?? {}
        this.delegations = systemMetaDataEncrypted.delegations ?? {}
        this.encryptionKeys = systemMetaDataEncrypted.encryptionKeys ?? {}
        this.securityMetadata = systemMetaDataEncrypted.securityMetadata
        this.encryptedSelf = systemMetaDataEncrypted.encryptedSelf
        this.tags = systemMetaDataEncrypted.tags ?? new Array<CodingReference>()
    }

    static toJSON(instance: SystemMetaDataEncrypted): any {
        const pojo: any = {}
        pojo['secretForeignKeys'] = instance.secretForeignKeys.map((item) => item)
        pojo['cryptedForeignKeys'] = Object.fromEntries(Object.entries(instance.cryptedForeignKeys).map(([k, v]) => [k, ([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['delegations'] = Object.fromEntries(Object.entries(instance.delegations).map(([k, v]) => [k, ([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['encryptionKeys'] = Object.fromEntries(Object.entries(instance.encryptionKeys).map(([k, v]) => [k, ([...v].map((item) => Delegation.toJSON(item)))]))
        if (instance.securityMetadata !== undefined) pojo['securityMetadata'] = !!instance.securityMetadata ? SecurityMetadata.toJSON(instance.securityMetadata) : undefined
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        pojo['tags'] = ([...instance.tags].map((item) => CodingReference.toJSON(item)))
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataEncrypted {
        const obj = {} as ISystemMetaDataEncrypted
        obj['secretForeignKeys'] = pojo['secretForeignKeys'].map((item: any) => item)
        obj['cryptedForeignKeys'] = Object.fromEntries(Object.entries(pojo['cryptedForeignKeys']).map(([k, v]: [any, any]) => [k, (v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['delegations'] = Object.fromEntries(Object.entries(pojo['delegations']).map(([k, v]: [any, any]) => [k, (v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['encryptionKeys'] = Object.fromEntries(Object.entries(pojo['encryptionKeys']).map(([k, v]: [any, any]) => [k, (v.map((item: any) => Delegation.fromJSON(item)))]))
        if (pojo['securityMetadata'] !== undefined) {
            obj['securityMetadata'] = !!pojo['securityMetadata'] ? SecurityMetadata.fromJSON(pojo['securityMetadata']) : undefined
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        obj['tags'] = (pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        return new SystemMetaDataEncrypted(obj)
    }
}

interface ISystemMetaDataEncrypted {
    secretForeignKeys?: string[]
    cryptedForeignKeys?: Record<string, Array<Delegation>>
    delegations?: Record<string, Array<Delegation>>
    encryptionKeys?: Record<string, Array<Delegation>>
    securityMetadata?: SecurityMetadata
    encryptedSelf?: string
    tags?: Array<CodingReference>
}
