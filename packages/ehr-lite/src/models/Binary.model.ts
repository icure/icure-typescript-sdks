import { b64_2ab, ua2b64 } from '@icure/typescript-common'

export class Binary implements IBinary {
    contentType: string
    data: ArrayBuffer
    filename: string

    constructor(binary: IBinary) {
        this.contentType = binary.contentType
        this.data = binary.data
        this.filename = binary.filename
    }

    static toJSON(instance: Binary): IBinary {
        const pojo: any = {}
        pojo['contentType'] = instance.contentType
        pojo['data'] = ua2b64(instance.data)
        pojo['filename'] = instance.filename
        return pojo
    }

    static fromJSON(pojo: IBinary): Binary {
        const obj = {} as IBinary
        obj['contentType'] = pojo['contentType']
        obj['data'] = b64_2ab(pojo['data'])
        obj['filename'] = pojo['filename']
        return new Binary(obj)
    }
}

interface IBinary {
    contentType: string
    data: ArrayBuffer
    filename: string
}
