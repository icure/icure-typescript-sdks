import { CodingReference, ICodingReference } from './CodingReference.model'
import { Delegation, IDelegation } from './Delegation.model'
import { ISecurityMetadata, SecurityMetadata } from './SecurityMetadata.model'

export class SystemMetaDataEncrypted {
    secretForeignKeys: string[] = []
    cryptedForeignKeys: Record<string, Delegation[]> = {}
    delegations: Record<string, Delegation[]> = {}
    encryptionKeys: Record<string, Delegation[]> = {}
    securityMetadata?: SecurityMetadata
    encryptedSelf?: string
    tags: CodingReference[] = []

    toJSON(): ISystemMetaDataEncrypted {
        return {
            secretForeignKeys: this.secretForeignKeys.map((item) => item),
            cryptedForeignKeys: Object.fromEntries(Object.entries(this.cryptedForeignKeys).map(([k, v]: [any, Delegation[]]) => [k, v.map((item) => item.toJSON())])),
            delegations: Object.fromEntries(Object.entries(this.delegations).map(([k, v]: [any, Delegation[]]) => [k, v.map((item) => item.toJSON())])),
            encryptionKeys: Object.fromEntries(Object.entries(this.encryptionKeys).map(([k, v]: [any, Delegation[]]) => [k, v.map((item) => item.toJSON())])),
            securityMetadata: !!this.securityMetadata ? this.securityMetadata.toJSON() : undefined,
            encryptedSelf: this.encryptedSelf,
            tags: this.tags.map((item) => item.toJSON()),
        }
    }

    constructor(json: Partial<ISystemMetaDataEncrypted>) {
        if (json['secretForeignKeys'] !== undefined) {
            this.secretForeignKeys = json['secretForeignKeys']!.map((item: any) => item)
        }
        if (json['cryptedForeignKeys'] !== undefined) {
            this.cryptedForeignKeys = Object.fromEntries(Object.entries(json['cryptedForeignKeys']!).map(([k, v]: [any, IDelegation[]]) => [k, v.map((item: any) => new Delegation(item))]))
        }
        if (json['delegations'] !== undefined) {
            this.delegations = Object.fromEntries(Object.entries(json['delegations']!).map(([k, v]: [any, IDelegation[]]) => [k, v.map((item: any) => new Delegation(item))]))
        }
        if (json['encryptionKeys'] !== undefined) {
            this.encryptionKeys = Object.fromEntries(Object.entries(json['encryptionKeys']!).map(([k, v]: [any, IDelegation[]]) => [k, v.map((item: any) => new Delegation(item))]))
        }
        if (json['securityMetadata'] !== undefined) {
            this.securityMetadata = new SecurityMetadata(json['securityMetadata']!)
        }
        if (json['encryptedSelf'] !== undefined) {
            this.encryptedSelf = json['encryptedSelf']!
        }
        if (json['tags'] !== undefined) {
            this.tags = json['tags']!.map((item: any) => new CodingReference(item))
        }
    }
}

export interface ISystemMetaDataEncrypted {
    secretForeignKeys: string[]
    cryptedForeignKeys: Record<string, Array<IDelegation>>
    delegations: Record<string, Array<IDelegation>>
    encryptionKeys: Record<string, Array<IDelegation>>
    securityMetadata?: ISecurityMetadata
    encryptedSelf?: string
    tags: ICodingReference[]
}
