export class KeyPair implements IKeyPair {
    privateKey!: string
    publicKey!: string

    constructor(json: Partial<IKeyPair>) {
        Object.assign(this as KeyPair, json)
    }

    static toJSON(instance: KeyPair): IKeyPair {
        const pojo: IKeyPair = {} as IKeyPair
        pojo['privateKey'] = instance.privateKey
        pojo['publicKey'] = instance.publicKey
        return pojo
    }

    static fromJSON(pojo: IKeyPair): KeyPair {
        const obj = {} as IKeyPair
        obj['privateKey'] = pojo['privateKey']
        obj['publicKey'] = pojo['publicKey']
        return new KeyPair(obj)
    }
}

interface IKeyPair {
    privateKey: string
    publicKey: string
}
