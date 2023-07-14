import { CodingReference } from './CodingReference.model'

export class SystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys: Map<string, string[]>
    privateKeyShamirPartitions: Map<string, string>
    aesExchangeKeys: Map<string, Map<string, Map<string, string>>>
    transferKeys: Map<string, Map<string, string>>
    publicKeysForOaepWithSha256: Array<string>
    tags: Set<CodingReference>

    constructor(systemMetaDataOwner: ISystemMetaDataOwner) {
        this.publicKey = systemMetaDataOwner.publicKey
        this.hcPartyKeys = systemMetaDataOwner.hcPartyKeys ?? new Map<string, string[]>()
        this.privateKeyShamirPartitions = systemMetaDataOwner.privateKeyShamirPartitions ?? new Map<string, string>()
        this.aesExchangeKeys = systemMetaDataOwner.aesExchangeKeys ?? new Map<string, Map<string, Map<string, string>>>()
        this.transferKeys = systemMetaDataOwner.transferKeys ?? new Map<string, Map<string, string>>()
        this.publicKeysForOaepWithSha256 = systemMetaDataOwner.publicKeysForOaepWithSha256 ?? []
        this.tags = systemMetaDataOwner.tags ?? new Set<CodingReference>()
    }

    static toJSON(instance: SystemMetaDataOwner): any {
        const pojo: any = {}
        pojo['publicKey'] = instance.publicKey
        pojo['hcPartyKeys'] = Object.fromEntries([...instance.hcPartyKeys.entries()].map(([k, v]) => [k, v.map((item) => item)]))
        pojo['privateKeyShamirPartitions'] = Object.fromEntries([...instance.privateKeyShamirPartitions.entries()].map(([k, v]) => [k, v]))
        pojo['aesExchangeKeys'] = Object.fromEntries([...instance.aesExchangeKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))]))]))
        pojo['transferKeys'] = Object.fromEntries([...instance.transferKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))]))
        pojo['publicKeysForOaepWithSha256'] = instance.publicKeysForOaepWithSha256.map((item) => item)
        pojo['tags'] = Array.from([...instance.tags].map((item) => CodingReference.toJSON(item)))
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataOwner {
        return new SystemMetaDataOwner({
            publicKey: pojo['publicKey'],
            hcPartyKeys: new Map(Object.entries(pojo['hcPartyKeys']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)])),
            privateKeyShamirPartitions: new Map(Object.entries(pojo['privateKeyShamirPartitions']).map(([k, v]: [any, any]) => [k, v])),
            aesExchangeKeys: new Map(Object.entries(pojo['aesExchangeKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))])),
            transferKeys: new Map(Object.entries(pojo['transferKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))])),
            publicKeysForOaepWithSha256: pojo['publicKeysForOaepWithSha256'].map((item: any) => item),
            tags: new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item))),
        })
    }
}

interface ISystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys?: Map<string, string[]>
    privateKeyShamirPartitions?: Map<string, string>
    aesExchangeKeys?: Map<string, Map<string, Map<string, string>>>
    transferKeys?: Map<string, Map<string, string>>
    publicKeysForOaepWithSha256?: Array<string>
    tags?: Set<CodingReference>
}
