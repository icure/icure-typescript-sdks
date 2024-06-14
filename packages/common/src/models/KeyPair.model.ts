export class KeyPair implements IKeyPair {
    privateKey: string
    publicKey: string

    toJSON(): IKeyPair {
        return {
        privateKey: this.privateKey,
        publicKey: this.publicKey,
        }
    }

    constructor(json: Partial<IKeyPair>) {
        this.privateKey = json["privateKey"]!
        this.publicKey = json["publicKey"]!
    }
}

export interface IKeyPair {
    privateKey: string
    publicKey: string
}
