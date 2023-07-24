export class KeyPair implements IKeyPair {
    privateKey!: string
    publicKey!: string

    constructor(json: IKeyPair | undefined) {
        Object.assign(this as KeyPair, json)
    }

    static toJSON(instance: KeyPair): any {
        const pojo: any = {}
        pojo['privateKey'] = instance.privateKey
        pojo['publicKey'] = instance.publicKey
        return pojo
    }

    static fromJSON(pojo: any): KeyPair {
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
