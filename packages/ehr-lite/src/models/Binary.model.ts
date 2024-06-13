import { base64string } from '@icure/typescript-common'

export class Binary implements IBinary {
    contentType: string
    data: base64string
    filename: string

    constructor(binary: IBinary) {
        this.contentType = binary.contentType
        this.data = binary.data
        this.filename = binary.filename
    }

    static toJSON(instance: Binary): IBinary {
        const pojo: IBinary = {} as IBinary
        pojo['contentType'] = instance.contentType
        pojo['data'] = instance.data
        pojo['filename'] = instance.filename
        return pojo
    }

    static fromJSON(pojo: IBinary): Binary {
        const obj = {} as IBinary
        obj['contentType'] = pojo['contentType']
        obj['data'] = pojo['data']
        obj['filename'] = pojo['filename']
        return new Binary(obj)
    }
}

export interface IBinary {
    contentType: string
    data: base64string
    filename: string
}
