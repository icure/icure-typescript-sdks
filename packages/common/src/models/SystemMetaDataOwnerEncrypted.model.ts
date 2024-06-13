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

    constructor(systemMetaDataOwnerEncrypted: Partial<ISystemMetaDataOwnerEncrypted>) {
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

    static toJSON(instance: SystemMetaDataOwnerEncrypted): ISystemMetaDataOwnerEncrypted {
        const pojo: ISystemMetaDataOwnerEncrypted = {} as ISystemMetaDataOwnerEncrypted
        if (instance.publicKey !== undefined) pojo['publicKey'] = instance.publicKey
        pojo['hcPartyKeys'] = { ...instance.hcPartyKeys }
        pojo['privateKeyShamirPartitions'] = { ...instance.privateKeyShamirPartitions }
        pojo['secretForeignKeys'] = instance.secretForeignKeys.map((item) => item)
        pojo['cryptedForeignKeys'] = { ...instance.cryptedForeignKeys }
        pojo['delegations'] = { ...instance.delegations }
        pojo['encryptionKeys'] = { ...instance.encryptionKeys }
        pojo['aesExchangeKeys'] = { ...instance.aesExchangeKeys }
        pojo['transferKeys'] = { ...instance.transferKeys }
        if (instance.securityMetadata !== undefined) pojo['securityMetadata'] = SecurityMetadata.toJSON(instance.securityMetadata)
        pojo['publicKeysForOaepWithSha256'] = instance.publicKeysForOaepWithSha256.map((item) => item)
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: ISystemMetaDataOwnerEncrypted): SystemMetaDataOwnerEncrypted {
        const obj = {} as ISystemMetaDataOwnerEncrypted
        if (pojo['publicKey'] !== undefined) {
            obj['publicKey'] = pojo['publicKey']!
        }
        obj['hcPartyKeys'] = { ...pojo['hcPartyKeys'] }
        obj['privateKeyShamirPartitions'] = { ...pojo['privateKeyShamirPartitions'] }
        obj['secretForeignKeys'] = pojo['secretForeignKeys'].map((item: any) => item)
        obj['cryptedForeignKeys'] = { ...pojo['cryptedForeignKeys'] }
        obj['delegations'] = { ...pojo['delegations'] }
        obj['encryptionKeys'] = { ...pojo['encryptionKeys'] }
        obj['aesExchangeKeys'] = { ...pojo['aesExchangeKeys'] }
        obj['transferKeys'] = { ...pojo['transferKeys'] }
        if (pojo['securityMetadata'] !== undefined) {
            obj['securityMetadata'] = SecurityMetadata.fromJSON(pojo['securityMetadata']!)
        }
        obj['publicKeysForOaepWithSha256'] = pojo['publicKeysForOaepWithSha256'].map((item: any) => item)
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']!
        }
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        return new SystemMetaDataOwnerEncrypted(obj)
    }
}

interface ISystemMetaDataOwnerEncrypted {
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
}
