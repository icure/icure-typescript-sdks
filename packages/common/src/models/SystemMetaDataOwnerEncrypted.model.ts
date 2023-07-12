import { Delegation } from './Delegation.model'
import { SecurityMetadata } from './SecurityMetadata.model'
import {CodingReference} from "./CodingReference.model";

export class SystemMetaDataOwnerEncrypted {
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

    constructor(systemMetaDataOwnerEncrypted?: ISystemMetaDataOwnerEncrypted) {
        this.publicKey = systemMetaDataOwnerEncrypted?.publicKey
        this.hcPartyKeys = systemMetaDataOwnerEncrypted?.hcPartyKeys
        this.privateKeyShamirPartitions = systemMetaDataOwnerEncrypted?.privateKeyShamirPartitions
        this.secretForeignKeys = systemMetaDataOwnerEncrypted?.secretForeignKeys
        this.cryptedForeignKeys = systemMetaDataOwnerEncrypted?.cryptedForeignKeys
        this.delegations = systemMetaDataOwnerEncrypted?.delegations
        this.encryptionKeys = systemMetaDataOwnerEncrypted?.encryptionKeys
        this.aesExchangeKeys = systemMetaDataOwnerEncrypted?.aesExchangeKeys
        this.transferKeys = systemMetaDataOwnerEncrypted?.transferKeys
        this.securityMetadata = systemMetaDataOwnerEncrypted?.securityMetadata
        this.encryptedSelf = systemMetaDataOwnerEncrypted?.encryptedSelf
        this.publicKeysForOaepWithSha256 = systemMetaDataOwnerEncrypted?.publicKeysForOaepWithSha256
    }

    static toJSON(instance: SystemMetaDataOwnerEncrypted): any {
        const pojo: any = {}
        pojo['publicKey'] = instance.publicKey
        pojo['hcPartyKeys'] = !!instance.hcPartyKeys ? Object.fromEntries([...instance.hcPartyKeys.entries()].map(([k, v]) => [k, v.map((item) => item)])) : undefined
        pojo['privateKeyShamirPartitions'] = !!instance.privateKeyShamirPartitions ? Object.fromEntries([...instance.privateKeyShamirPartitions.entries()].map(([k, v]) => [k, v])) : undefined
        pojo['secretForeignKeys'] = instance.secretForeignKeys?.map((item) => item)
        pojo['cryptedForeignKeys'] = !!instance.cryptedForeignKeys ? Object.fromEntries([...instance.cryptedForeignKeys.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))])) : undefined
        pojo['delegations'] = !!instance.delegations ? Object.fromEntries([...instance.delegations.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))])) : undefined
        pojo['encryptionKeys'] = !!instance.encryptionKeys ? Object.fromEntries([...instance.encryptionKeys.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => Delegation.toJSON(item)))])) : undefined
        pojo['aesExchangeKeys'] = !!instance.aesExchangeKeys ? Object.fromEntries([...instance.aesExchangeKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))]))])) : undefined
        pojo['transferKeys'] = !!instance.transferKeys ? Object.fromEntries([...instance.transferKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))])) : undefined
        pojo['securityMetadata'] = !!instance.securityMetadata ? SecurityMetadata.toJSON(instance.securityMetadata) : undefined
        pojo['publicKeysForOaepWithSha256'] = instance.publicKeysForOaepWithSha256?.map((item) => item)
        pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataOwnerEncrypted {
        return new SystemMetaDataOwnerEncrypted({
            publicKey: pojo['publicKey'],
            hcPartyKeys: pojo['hcPartyKeys'] ? new Map(Object.entries(pojo['hcPartyKeys']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)])) : undefined,
            privateKeyShamirPartitions: pojo['privateKeyShamirPartitions'] ? new Map(Object.entries(pojo['privateKeyShamirPartitions']).map(([k, v]: [any, any]) => [k, v])) : undefined,
            secretForeignKeys: pojo['secretForeignKeys']?.map((item: any) => item),
            cryptedForeignKeys: pojo['cryptedForeignKeys'] ? new Map(Object.entries(pojo['cryptedForeignKeys']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))])) : undefined,
            delegations: pojo['delegations'] ? new Map(Object.entries(pojo['delegations']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))])) : undefined,
            encryptionKeys: pojo['encryptionKeys'] ? new Map(Object.entries(pojo['encryptionKeys']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => Delegation.fromJSON(item)))])) : undefined,
            aesExchangeKeys: pojo['aesExchangeKeys'] ? new Map(Object.entries(pojo['aesExchangeKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))])) : undefined,
            transferKeys: pojo['transferKeys'] ? new Map(Object.entries(pojo['transferKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))])) : undefined,
            securityMetadata: !!pojo['securityMetadata'] ? SecurityMetadata.fromJSON(pojo['securityMetadata']) : undefined,
            publicKeysForOaepWithSha256: pojo['publicKeysForOaepWithSha256']?.map((item: any) => item),
            encryptedSelf: pojo['encryptedSelf'],
        })
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
