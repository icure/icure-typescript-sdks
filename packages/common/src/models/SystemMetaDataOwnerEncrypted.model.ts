import { CodingReference, ICodingReference } from './CodingReference.model'
import { Delegation, IDelegation } from './Delegation.model'
import { ISecurityMetadata, SecurityMetadata } from './SecurityMetadata.model'

export class SystemMetaDataOwnerEncrypted {
    publicKey?: string
    hcPartyKeys: Record<string, string[]> = {}
    privateKeyShamirPartitions: Record<string, string> = {}
    secretForeignKeys: string[] = []
    cryptedForeignKeys: Record<string, Delegation[]> = {}
    delegations: Record<string, Delegation[]> = {}
    encryptionKeys: Record<string, Delegation[]> = {}
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>> = {}
    transferKeys: Record<string, Record<string, string>> = {}
    securityMetadata?: SecurityMetadata
    publicKeysForOaepWithSha256: string[] = []
    encryptedSelf?: string
    tags: CodingReference[] = []

    toJSON(): ISystemMetaDataOwnerEncrypted {
        return {
        publicKey: this.publicKey,
        hcPartyKeys: {...this.hcPartyKeys},
        privateKeyShamirPartitions: {...this.privateKeyShamirPartitions},
        secretForeignKeys: this.secretForeignKeys.map(item => item),
        cryptedForeignKeys: Object.fromEntries(Object.entries(this.cryptedForeignKeys).map(([k, v]: [any, Delegation[]]) => [k, v.map(item => item.toJSON())])),
        delegations: Object.fromEntries(Object.entries(this.delegations).map(([k, v]: [any, Delegation[]]) => [k, v.map(item => item.toJSON())])),
        encryptionKeys: Object.fromEntries(Object.entries(this.encryptionKeys).map(([k, v]: [any, Delegation[]]) => [k, v.map(item => item.toJSON())])),
        aesExchangeKeys: {...this.aesExchangeKeys},
        transferKeys: {...this.transferKeys},
        securityMetadata: !!this.securityMetadata ? this.securityMetadata.toJSON() : undefined,
        publicKeysForOaepWithSha256: this.publicKeysForOaepWithSha256.map(item => item),
        encryptedSelf: this.encryptedSelf,
        tags: this.tags.map(item => item.toJSON()),
        }
    }

    constructor(json: Partial<ISystemMetaDataOwnerEncrypted>) {
        if (json["publicKey"] !== undefined) {
            this.publicKey = json["publicKey"]!
        }
        if (json["hcPartyKeys"] !== undefined) {
            this.hcPartyKeys = {...json["hcPartyKeys"]!}
        }
        if (json["privateKeyShamirPartitions"] !== undefined) {
            this.privateKeyShamirPartitions = {...json["privateKeyShamirPartitions"]!}
        }
        if (json["secretForeignKeys"] !== undefined) {
            this.secretForeignKeys = json["secretForeignKeys"]!.map((item: any) => item)
        }
        if (json["cryptedForeignKeys"] !== undefined) {
            this.cryptedForeignKeys = Object.fromEntries(Object.entries(json["cryptedForeignKeys"]!).map(([k, v]: [any, IDelegation[]]) => [k, v.map((item: any) => new Delegation(item))]))
        }
        if (json["delegations"] !== undefined) {
            this.delegations = Object.fromEntries(Object.entries(json["delegations"]!).map(([k, v]: [any, IDelegation[]]) => [k, v.map((item: any) => new Delegation(item))]))
        }
        if (json["encryptionKeys"] !== undefined) {
            this.encryptionKeys = Object.fromEntries(Object.entries(json["encryptionKeys"]!).map(([k, v]: [any, IDelegation[]]) => [k, v.map((item: any) => new Delegation(item))]))
        }
        if (json["aesExchangeKeys"] !== undefined) {
            this.aesExchangeKeys = {...json["aesExchangeKeys"]!}
        }
        if (json["transferKeys"] !== undefined) {
            this.transferKeys = {...json["transferKeys"]!}
        }
        if (json["securityMetadata"] !== undefined) {
            this.securityMetadata = new SecurityMetadata(json["securityMetadata"]!)
        }
        if (json["publicKeysForOaepWithSha256"] !== undefined) {
            this.publicKeysForOaepWithSha256 = json["publicKeysForOaepWithSha256"]!.map((item: any) => item)
        }
        if (json["encryptedSelf"] !== undefined) {
            this.encryptedSelf = json["encryptedSelf"]!
        }
        if (json["tags"] !== undefined) {
            this.tags = json["tags"]!.map((item: any) => new CodingReference(item))
        }
    }
}

export interface ISystemMetaDataOwnerEncrypted {
    publicKey?: string
    hcPartyKeys: Record<string, string[]>
    privateKeyShamirPartitions: Record<string, string>
    secretForeignKeys: string[]
    cryptedForeignKeys: Record<string, Array<IDelegation>>
    delegations: Record<string, Array<IDelegation>>
    encryptionKeys: Record<string, Array<IDelegation>>
    aesExchangeKeys: Record<string, Record<string, Record<string, string>>>
    transferKeys: Record<string, Record<string, string>>
    securityMetadata?: ISecurityMetadata
    publicKeysForOaepWithSha256: string[]
    encryptedSelf?: string
    tags: ICodingReference[]
}
