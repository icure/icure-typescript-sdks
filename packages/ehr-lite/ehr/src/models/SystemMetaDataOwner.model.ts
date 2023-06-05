export class SystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys?: Map<string, string[]>
    privateKeyShamirPartitions?: Map<string, string>
    aesExchangeKeys?: Map<string, Map<string, Map<string, string>>>
    transferKeys?: Map<string, Map<string, string>>
    publicKeysForOaepWithSha256?: Array<string>

    constructor(systemMetaDataOwner?: ISystemMetaDataOwner) {
        this.publicKey = systemMetaDataOwner?.publicKey
        this.hcPartyKeys = systemMetaDataOwner?.hcPartyKeys
        this.privateKeyShamirPartitions = systemMetaDataOwner?.privateKeyShamirPartitions
        this.aesExchangeKeys = systemMetaDataOwner?.aesExchangeKeys
        this.transferKeys = systemMetaDataOwner?.transferKeys
        this.publicKeysForOaepWithSha256 = systemMetaDataOwner?.publicKeysForOaepWithSha256
    }

    static toJSON(instance: SystemMetaDataOwner): any {
        const pojo: any = {}
        pojo['publicKey'] = instance.publicKey
        pojo['hcPartyKeys'] = !!instance.hcPartyKeys ? Object.fromEntries([...instance.hcPartyKeys.entries()].map(([k, v]) => [k, v.map((item) => item)])) : undefined
        pojo['privateKeyShamirPartitions'] = !!instance.privateKeyShamirPartitions ? Object.fromEntries([...instance.privateKeyShamirPartitions.entries()].map(([k, v]) => [k, v])) : undefined
        pojo['aesExchangeKeys'] = !!instance.aesExchangeKeys ? Object.fromEntries([...instance.aesExchangeKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))]))])) : undefined
        pojo['transferKeys'] = !!instance.transferKeys ? Object.fromEntries([...instance.transferKeys.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))])) : undefined
        pojo['publicKeysForOaepWithSha256'] = instance.publicKeysForOaepWithSha256?.map((item) => item)
        return pojo
    }

    static fromJSON(pojo: any): SystemMetaDataOwner {
        return new SystemMetaDataOwner({
            publicKey: pojo['publicKey'],
            hcPartyKeys: pojo['hcPartyKeys'] ? new Map(Object.entries(pojo['hcPartyKeys']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)])) : undefined,
            privateKeyShamirPartitions: pojo['privateKeyShamirPartitions'] ? new Map(Object.entries(pojo['privateKeyShamirPartitions']).map(([k, v]: [any, any]) => [k, v])) : undefined,
            aesExchangeKeys: pojo['aesExchangeKeys'] ? new Map(Object.entries(pojo['aesExchangeKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))])) : undefined,
            transferKeys: pojo['transferKeys'] ? new Map(Object.entries(pojo['transferKeys']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))])) : undefined,
            publicKeysForOaepWithSha256: pojo['publicKeysForOaepWithSha256']?.map((item: any) => item),
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
}
