import { CodingReference } from './CodingReference.model'
import { Delegation } from './Delegation.model'
import { SecurityMetadata } from './SecurityMetadata.model'

export class SystemMetaDataEncrypted {
    secretForeignKeys?: string[]
    cryptedForeignKeys?: Map<string, Set<Delegation>>
    delegations?: Map<string, Set<Delegation>>
    encryptionKeys?: Map<string, Set<Delegation>>
    securityMetadata?: SecurityMetadata
    encryptedSelf?: string
    tags?: Set<CodingReference>

    constructor(systemMetaDataEncrypted?: ISystemMetaDataEncrypted) {
        this.secretForeignKeys = systemMetaDataEncrypted?.secretForeignKeys
        this.cryptedForeignKeys = systemMetaDataEncrypted?.cryptedForeignKeys
        this.delegations = systemMetaDataEncrypted?.delegations
        this.encryptionKeys = systemMetaDataEncrypted?.encryptionKeys
        this.securityMetadata = systemMetaDataEncrypted?.securityMetadata
        this.encryptedSelf = systemMetaDataEncrypted?.encryptedSelf
    }

    static toJSON(instance: SystemMetaDataEncrypted): any {
        const pojo: any = {}
        pojo['secretForeignKeys'] = instance.secretForeignKeys?.map((item) => item)
        pojo['cryptedForeignKeys'] = !!instance.cryptedForeignKeys ? Object.fromEntries([...instance.cryptedForeignKeys.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))])) : undefined
        pojo['delegations'] = !!instance.delegations ? Object.fromEntries([...instance.delegations.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))])) : undefined
        pojo['encryptionKeys'] = !!instance.encryptionKeys ? Object.fromEntries([...instance.encryptionKeys.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))])) : undefined
        pojo['securityMetadata'] = !!instance.securityMetadata ? SecurityMetadata.toJSON(instance.securityMetadata) : undefined
        pojo['encryptedSelf'] = instance.encryptedSelf
        pojo['tags'] = Array.from([...(instance.tags ?? [])]?.map((item) => CodingReference.toJSON(item)) ?? [])
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataEncrypted {
        return new SystemMetaDataEncrypted({
            secretForeignKeys: pojo['secretForeignKeys']?.map((item: any) => item),
            cryptedForeignKeys: pojo['cryptedForeignKeys'] ? new Map(Object.entries(pojo['cryptedForeignKeys']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))])) : undefined,
            delegations: pojo['delegations'] ? new Map(Object.entries(pojo['delegations']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))])) : undefined,
            encryptionKeys: pojo['encryptionKeys'] ? new Map(Object.entries(pojo['encryptionKeys']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))])) : undefined,
            securityMetadata: !!pojo['securityMetadata'] ? SecurityMetadata.fromJSON(pojo['securityMetadata']) : undefined,
            encryptedSelf: pojo['encryptedSelf'],
            tags: new Set(pojo['tags']?.map((item: any) => CodingReference.fromJSON(item)) ?? []),
        })
    }
}

interface ISystemMetaDataEncrypted {
    secretForeignKeys?: string[]
    cryptedForeignKeys?: Map<string, Set<Delegation>>
    delegations?: Map<string, Set<Delegation>>
    encryptionKeys?: Map<string, Set<Delegation>>
    securityMetadata?: SecurityMetadata
    encryptedSelf?: string
    tags?: Set<CodingReference>
}
