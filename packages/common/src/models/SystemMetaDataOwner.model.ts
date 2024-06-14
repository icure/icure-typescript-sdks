import { CodingReference, ICodingReference } from './CodingReference.model'

export class SystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys: Record<string, string[]> = {}
    privateKeyShamirPartitions: Record<string, string> = {}
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>> = {}
    transferKeys: Record<string, Record<string, string>> = {}
    publicKeysForOaepWithSha256: string[] = []
    tags: CodingReference[] = []

    toJSON(): ISystemMetaDataOwner {
        return {
        publicKey: this.publicKey,
        hcPartyKeys: {...this.hcPartyKeys},
        privateKeyShamirPartitions: {...this.privateKeyShamirPartitions},
        aesExchangeKeys: {...this.aesExchangeKeys},
        transferKeys: {...this.transferKeys},
        publicKeysForOaepWithSha256: this.publicKeysForOaepWithSha256.map(item => item),
        tags: this.tags.map(item => item.toJSON()),
        }
    }

    constructor(json: Partial<ISystemMetaDataOwner>) {
        if (json["publicKey"] !== undefined) {
            this.publicKey = json["publicKey"]!
        }
        if (json["hcPartyKeys"] !== undefined) {
            this.hcPartyKeys = {...json["hcPartyKeys"]!}
        }
        if (json["privateKeyShamirPartitions"] !== undefined) {
            this.privateKeyShamirPartitions = {...json["privateKeyShamirPartitions"]!}
        }
        if (json["aesExchangeKeys"] !== undefined) {
            this.aesExchangeKeys = {...json["aesExchangeKeys"]!}
        }
        if (json["transferKeys"] !== undefined) {
            this.transferKeys = {...json["transferKeys"]!}
        }
        if (json["publicKeysForOaepWithSha256"] !== undefined) {
            this.publicKeysForOaepWithSha256 = json["publicKeysForOaepWithSha256"]!.map((item: any) => item)
        }
        if (json["tags"] !== undefined) {
            this.tags = json["tags"]!.map((item: any) => new CodingReference(item))
        }
    }
}

export interface ISystemMetaDataOwner {
    publicKey?: string
    hcPartyKeys: Record<string, string[]>
    privateKeyShamirPartitions: Record<string, string>
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>>
    transferKeys: Record<string, Record<string, string>>
    publicKeysForOaepWithSha256: string[]
    tags: ICodingReference[]
}
