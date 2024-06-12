import { CodingReference } from './CodingReference.model'
import { Delegation } from './Delegation.model'
import { SecurityMetadata } from './SecurityMetadata.model'

export class SystemMetaDataOwnerEncrypted {
    publicKey?: string
    hcPartyKeys: Record<string, string[]>
    privateKeyShamirPartitions: Record<string, string>
    secretForeignKeys: string[]
    cryptedForeignKeys: Record<string, Array<Delegation>>
    delegations: Record<string, Array<Delegation>>
    encryptionKeys: Record<string, Array<Delegation>>
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>>
    transferKeys: Record<string, Record<string, string>>
    securityMetadata?: SecurityMetadata
    publicKeysForOaepWithSha256: Array<string>
    encryptedSelf?: string
    tags: Array<CodingReference>

    constructor(systemMetaDataOwnerEncrypted: ISystemMetaDataOwnerEncrypted) {
        this.publicKey = systemMetaDataOwnerEncrypted.publicKey
        this.hcPartyKeys = systemMetaDataOwnerEncrypted.hcPartyKeys ?? {}
        this.privateKeyShamirPartitions = systemMetaDataOwnerEncrypted.privateKeyShamirPartitions ?? {}
        this.secretForeignKeys = systemMetaDataOwnerEncrypted.secretForeignKeys ?? []
        this.cryptedForeignKeys = systemMetaDataOwnerEncrypted.cryptedForeignKeys ?? {}
        this.delegations = systemMetaDataOwnerEncrypted.delegations ?? {}
        this.encryptionKeys = systemMetaDataOwnerEncrypted.encryptionKeys ?? {}
        this.aesExchangeKeys = systemMetaDataOwnerEncrypted.aesExchangeKeys ?? {}
        this.transferKeys = systemMetaDataOwnerEncrypted.transferKeys ?? {}
        this.securityMetadata = systemMetaDataOwnerEncrypted.securityMetadata
        this.encryptedSelf = systemMetaDataOwnerEncrypted.encryptedSelf
        this.publicKeysForOaepWithSha256 = systemMetaDataOwnerEncrypted.publicKeysForOaepWithSha256 ?? []
        this.tags = systemMetaDataOwnerEncrypted.tags ?? new Array<CodingReference>()
    }

    static toJSON(instance: SystemMetaDataOwnerEncrypted): any {
        const pojo: any = {}
        if (instance.publicKey !== undefined) pojo['publicKey'] = instance.publicKey
        pojo['hcPartyKeys'] = Object.fromEntries(Object.entries(instance.hcPartyKeys).map(([k, v]) => [k, v.map((item) => item)]))
        pojo['privateKeyShamirPartitions'] = Object.fromEntries(Object.entries(instance.privateKeyShamirPartitions).map(([k, v]) => [k, v]))
        pojo['secretForeignKeys'] = instance.secretForeignKeys.map((item) => item)
        pojo['cryptedForeignKeys'] = Object.fromEntries(Object.entries(instance.cryptedForeignKeys).map(([k, v]) => [k, ([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['delegations'] = Object.fromEntries(Object.entries(instance.delegations).map(([k, v]) => [k, ([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['encryptionKeys'] = Object.fromEntries(Object.entries(instance.encryptionKeys).map(([k, v]) => [k, ([...v].map((item) => Delegation.toJSON(item)))]))
        pojo['aesExchangeKeys'] = Object.fromEntries(Object.entries(instance.aesExchangeKeys).map(([k, v]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]) => [k, v]))]))]))
        pojo['transferKeys'] = Object.fromEntries(Object.entries(instance.transferKeys).map(([k, v]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]) => [k, v]))]))
        if (instance.securityMetadata !== undefined) pojo['securityMetadata'] = !!instance.securityMetadata ? SecurityMetadata.toJSON(instance.securityMetadata) : undefined
        pojo['publicKeysForOaepWithSha256'] = instance.publicKeysForOaepWithSha256.map((item) => item)
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        pojo['tags'] = ([...instance.tags].map((item) => CodingReference.toJSON(item)))
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataOwnerEncrypted {
        const obj = {} as ISystemMetaDataOwnerEncrypted
        if (pojo['publicKey'] !== undefined) {
            obj['publicKey'] = pojo['publicKey']
        }
        obj['hcPartyKeys'] = Object.fromEntries(Object.entries(pojo['hcPartyKeys']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)]))
        obj['privateKeyShamirPartitions'] = Object.fromEntries(Object.entries(pojo['privateKeyShamirPartitions']).map(([k, v]: [any, any]) => [k, v]))
        obj['secretForeignKeys'] = pojo['secretForeignKeys'].map((item: any) => item)
        obj['cryptedForeignKeys'] = Object.fromEntries(Object.entries(pojo['cryptedForeignKeys']).map(([k, v]: [any, any]) => [k, (v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['delegations'] = Object.fromEntries(Object.entries(pojo['delegations']).map(([k, v]: [any, any]) => [k, (v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['encryptionKeys'] = Object.fromEntries(Object.entries(pojo['encryptionKeys']).map(([k, v]: [any, any]) => [k, (v.map((item: any) => Delegation.fromJSON(item)))]))
        obj['aesExchangeKeys'] = Object.fromEntries(Object.entries(pojo['aesExchangeKeys']).map(([k, v]: [any, any]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]: [any, any]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))]))
        obj['transferKeys'] = Object.fromEntries(Object.entries(pojo['transferKeys']).map(([k, v]: [any, any]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))
        if (pojo['securityMetadata'] !== undefined) {
            obj['securityMetadata'] = !!pojo['securityMetadata'] ? SecurityMetadata.fromJSON(pojo['securityMetadata']) : undefined
        }
        obj['publicKeysForOaepWithSha256'] = pojo['publicKeysForOaepWithSha256'].map((item: any) => item)
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        obj['tags'] = (pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        return new SystemMetaDataOwnerEncrypted(obj)
    }
}

interface ISystemMetaDataOwnerEncrypted {
    publicKey?: string
    hcPartyKeys?: Record<string, string[]>
    privateKeyShamirPartitions?: Record<string, string>
    secretForeignKeys?: string[]
    cryptedForeignKeys?: Record<string, Array<Delegation>>
    delegations?: Record<string, Array<Delegation>>
    encryptionKeys?: Record<string, Array<Delegation>>
    aesExchangeKeys?: Record<string, Record<string, Record<string, string>>>
    transferKeys?: Record<string, Record<string, string>>
    securityMetadata?: SecurityMetadata
    publicKeysForOaepWithSha256?: Array<string>
    encryptedSelf?: string
    tags?: Array<CodingReference>
}
