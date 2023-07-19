import { CodingReference } from './CodingReference.model'
import { Delegation } from './Delegation.model'
import { SecurityMetadata } from './SecurityMetadata.model'

export class SystemMetaDataOwnerEncrypted {
    publicKey?: string
    hcPartyKeys: Map<string, string[]>
    privateKeyShamirPartitions: Map<string, string>
    secretForeignKeys: string[]
    cryptedForeignKeys: Map<string, Set<Delegation>>
    delegations: Map<string, Set<Delegation>>
    encryptionKeys: Map<string, Set<Delegation>>
    aesExchangeKeys: Map<string, Map<string, Map<string, string>>>
    transferKeys: Map<string, Map<string, string>>
    securityMetadata?: SecurityMetadata
    publicKeysForOaepWithSha256: Array<string>
    encryptedSelf?: string
    tags: Set<CodingReference>

    constructor(systemMetaDataOwnerEncrypted: ISystemMetaDataOwnerEncrypted) {
        this.publicKey = systemMetaDataOwnerEncrypted.publicKey
        this.hcPartyKeys = systemMetaDataOwnerEncrypted.hcPartyKeys ?? new Map<string, string[]>()
        this.privateKeyShamirPartitions = systemMetaDataOwnerEncrypted.privateKeyShamirPartitions ?? new Map<string, string>()
        this.secretForeignKeys = systemMetaDataOwnerEncrypted.secretForeignKeys ?? []
        this.cryptedForeignKeys = systemMetaDataOwnerEncrypted.cryptedForeignKeys ?? new Map<string, Set<Delegation>>()
        this.delegations = systemMetaDataOwnerEncrypted.delegations ?? new Map<string, Set<Delegation>>()
        this.encryptionKeys = systemMetaDataOwnerEncrypted.encryptionKeys ?? new Map<string, Set<Delegation>>()
        this.aesExchangeKeys = systemMetaDataOwnerEncrypted.aesExchangeKeys ?? new Map<string, Map<string, Map<string, string>>>()
        this.transferKeys = systemMetaDataOwnerEncrypted.transferKeys ?? new Map<string, Map<string, string>>()
        this.securityMetadata = systemMetaDataOwnerEncrypted.securityMetadata
        this.encryptedSelf = systemMetaDataOwnerEncrypted.encryptedSelf
        this.publicKeysForOaepWithSha256 = systemMetaDataOwnerEncrypted.publicKeysForOaepWithSha256 ?? []
        this.tags = systemMetaDataOwnerEncrypted.tags ?? new Set<CodingReference>()
    }

    static toJSON(instance: SystemMetaDataOwnerEncrypted): any {
        const pojo: any = {}
        if (instance.publicKey !== undefined) pojo['publicKey'] = instance.publicKey
        pojo['hcPartyKeys'] = Object.fromEntries([...instance.hcPartyKeys.entries()].map(([k, v]) => [k, v.map((item) => item)]))
        pojo['privateKeyShamirPartitions'] = Object.fromEntries([...instance.privateKeyShamirPartitions.entries()].map(([k, v]) => [k, v]))
        pojo['secretForeignKeys'] = instance.secretForeignKeys.map((item) => item)
        pojo['cryptedForeignKeys'] = Object.fromEntries([...instance.cryptedForeignKeys.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['delegations'] = Object.fromEntries([...instance.delegations.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['encryptionKeys'] = Object.fromEntries([...instance.encryptionKeys.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['aesExchangeKeys'] = Object.fromEntries([...instance.aesExchangeKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))]))]))
        pojo['transferKeys'] = Object.fromEntries([...instance.transferKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))]))
        if (instance.securityMetadata !== undefined) pojo['securityMetadata'] = !!instance.securityMetadata ? SecurityMetadata.toJSON(instance.securityMetadata) : undefined
        pojo['publicKeysForOaepWithSha256'] = instance.publicKeysForOaepWithSha256.map((item) => item)
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        pojo['tags'] = Array.from([...instance.tags].map((item) => CodingReference.toJSON(item)))
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataOwnerEncrypted {
        const obj = {} as ISystemMetaDataOwnerEncrypted
        if (pojo['publicKey'] !== undefined) {
            obj['publicKey'] = pojo['publicKey']
        }
        obj['hcPartyKeys'] = new Map(Object.entries(pojo['hcPartyKeys']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)]))
        obj['privateKeyShamirPartitions'] = new Map(Object.entries(pojo['privateKeyShamirPartitions']).map(([k, v]: [any, any]) => [k, v]))
        obj['secretForeignKeys'] = pojo['secretForeignKeys'].map((item: any) => item)
        obj['cryptedForeignKeys'] = new Map(Object.entries(pojo['cryptedForeignKeys']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['delegations'] = new Map(Object.entries(pojo['delegations']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['encryptionKeys'] = new Map(Object.entries(pojo['encryptionKeys']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['aesExchangeKeys'] = new Map(Object.entries(pojo['aesExchangeKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))]))
        obj['transferKeys'] = new Map(Object.entries(pojo['transferKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))
        if (pojo['securityMetadata'] !== undefined) {
            obj['securityMetadata'] = !!pojo['securityMetadata'] ? SecurityMetadata.fromJSON(pojo['securityMetadata']) : undefined
        }
        obj['publicKeysForOaepWithSha256'] = pojo['publicKeysForOaepWithSha256'].map((item: any) => item)
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        obj['tags'] = new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        return new SystemMetaDataOwnerEncrypted(obj)
    }
}

interface ISystemMetaDataOwnerEncrypted {
    publicKey?: string
    hcPartyKeys?: Map<string, string[]>
    privateKeyShamirPartitions?: Map<string, string>
    secretForeignKeys?: string[]
    cryptedForeignKeys?: Map<string, Set<Delegation>>
    delegations?: Map<string, Set<Delegation>>
    encryptionKeys?: Map<string, Set<Delegation>>
    aesExchangeKeys?: Map<string, Map<string, Map<string, string>>>
    transferKeys?: Map<string, Map<string, string>>
    securityMetadata?: SecurityMetadata
    publicKeysForOaepWithSha256?: Array<string>
    encryptedSelf?: string
    tags?: Set<CodingReference>
}
