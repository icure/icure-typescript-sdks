import { CodingReference } from './CodingReference.model'

export class SystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys: Record<string, string[]>
    privateKeyShamirPartitions: Record<string, string>
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>>
    transferKeys: Record<string, Record<string, string>>
    publicKeysForOaepWithSha256: Array<string>
    tags: Array<CodingReference>

    constructor(systemMetaDataOwner: ISystemMetaDataOwner) {
        this.publicKey = systemMetaDataOwner.publicKey
        this.hcPartyKeys = systemMetaDataOwner.hcPartyKeys ?? {}
        this.privateKeyShamirPartitions = systemMetaDataOwner.privateKeyShamirPartitions ?? {}
        this.aesExchangeKeys = systemMetaDataOwner.aesExchangeKeys ?? {}
        this.transferKeys = systemMetaDataOwner.transferKeys ?? {}
        this.publicKeysForOaepWithSha256 = systemMetaDataOwner.publicKeysForOaepWithSha256 ?? []
        this.tags = systemMetaDataOwner.tags ?? new Array<CodingReference>()
    }

    static toJSON(instance: SystemMetaDataOwner): any {
        const pojo: any = {}
        if (instance.publicKey !== undefined) pojo['publicKey'] = instance.publicKey
        pojo['hcPartyKeys'] = Object.fromEntries(Object.entries(instance.hcPartyKeys).map(([k, v]) => [k, v.map((item) => item)]))
        pojo['privateKeyShamirPartitions'] = Object.fromEntries(Object.entries(instance.privateKeyShamirPartitions).map(([k, v]) => [k, v]))
        pojo['aesExchangeKeys'] = Object.fromEntries(Object.entries(instance.aesExchangeKeys).map(([k, v]) => [k, Object.fromEntries([...Object.entries(v)].map(([k, v]) => [k, Object.fromEntries([...Object.entries(v)].map(([k, v]) => [k, v]))]))]))
        pojo['transferKeys'] = Object.fromEntries(Object.entries(instance.transferKeys).map(([k, v]) => [k, Object.fromEntries([...Object.entries(v)].map(([k, v]) => [k, v]))]))
        pojo['publicKeysForOaepWithSha256'] = instance.publicKeysForOaepWithSha256.map((item) => item)
        pojo['tags'] = ([...instance.tags].map((item) => CodingReference.toJSON(item)))
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataOwner {
        const obj = {} as ISystemMetaDataOwner
        if (pojo['publicKey'] !== undefined) {
            obj['publicKey'] = pojo['publicKey']
        }
        obj['hcPartyKeys'] = Object.fromEntries(Object.entries(pojo['hcPartyKeys']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)]))
        obj['privateKeyShamirPartitions'] = Object.fromEntries(Object.entries(pojo['privateKeyShamirPartitions']).map(([k, v]: [any, any]) => [k, v]))
        obj['aesExchangeKeys'] = Object.fromEntries(Object.entries(pojo['aesExchangeKeys']).map(([k, v]: [any, any]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]: [any, any]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))]))
        obj['transferKeys'] = Object.fromEntries(Object.entries(pojo['transferKeys']).map(([k, v]: [any, any]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))
        obj['publicKeysForOaepWithSha256'] = pojo['publicKeysForOaepWithSha256'].map((item: any) => item)
        obj['tags'] = (pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        return new SystemMetaDataOwner(obj)
    }
}

interface ISystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys?: Record<string, string[]>
    privateKeyShamirPartitions?: Record<string, string>
    aesExchangeKeys?: Record<string, Record<string, Record<string, string>>>
    transferKeys?: Record<string, Record<string, string>>
    publicKeysForOaepWithSha256?: Array<string>
    tags?: Array<CodingReference>
}
