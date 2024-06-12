import { CodingReference } from './CodingReference.model'

export class SystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys: Record<string, string[]>
    privateKeyShamirPartitions: Record<string, string>
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>>
    transferKeys: Record<string, Record<string, string>>
    publicKeysForOaepWithSha256: Array<string>
    tags: Array<CodingReference>

    constructor(systemMetaDataOwner: Partial<ISystemMetaDataOwner>) {
        this.publicKey = systemMetaDataOwner.publicKey
        this.hcPartyKeys = systemMetaDataOwner.hcPartyKeys ?? {}
        this.privateKeyShamirPartitions = systemMetaDataOwner.privateKeyShamirPartitions ?? {}
        this.aesExchangeKeys = systemMetaDataOwner.aesExchangeKeys ?? {}
        this.transferKeys = systemMetaDataOwner.transferKeys ?? {}
        this.publicKeysForOaepWithSha256 = systemMetaDataOwner.publicKeysForOaepWithSha256 ?? []
        this.tags = systemMetaDataOwner.tags ?? new Array<CodingReference>()
    }

    static toJSON(instance: SystemMetaDataOwner): ISystemMetaDataOwner {
        const pojo: ISystemMetaDataOwner = {} as ISystemMetaDataOwner
        if (instance.publicKey !== undefined) pojo["publicKey"] = instance.publicKey
        pojo["hcPartyKeys"] = {...instance.hcPartyKeys}
        pojo["privateKeyShamirPartitions"] = {...instance.privateKeyShamirPartitions}
        pojo["aesExchangeKeys"] = {...instance.aesExchangeKeys}
        pojo["transferKeys"] = {...instance.transferKeys}
        pojo["publicKeysForOaepWithSha256"] = instance.publicKeysForOaepWithSha256.map(item => item)
        pojo["tags"] = instance.tags.map(item => CodingReference.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: ISystemMetaDataOwner): SystemMetaDataOwner {
        const obj = {} as ISystemMetaDataOwner
        if (pojo["publicKey"] !== undefined) {
            obj['publicKey'] = pojo["publicKey"]!
        }
        obj['hcPartyKeys'] = {...pojo["hcPartyKeys"]}
        obj['privateKeyShamirPartitions'] = {...pojo["privateKeyShamirPartitions"]}
        obj['aesExchangeKeys'] = {...pojo["aesExchangeKeys"]}
        obj['transferKeys'] = {...pojo["transferKeys"]}
        obj['publicKeysForOaepWithSha256'] = pojo["publicKeysForOaepWithSha256"].map((item: any) => item)
        obj['tags'] = pojo["tags"].map((item: any) => CodingReference.fromJSON(item))
        return new SystemMetaDataOwner(obj)
    }
}

interface ISystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys: Record<string, string[]>
    privateKeyShamirPartitions: Record<string, string>
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>>
    transferKeys: Record<string, Record<string, string>>
    publicKeysForOaepWithSha256: Array<string>
    tags: Array<CodingReference>
}
