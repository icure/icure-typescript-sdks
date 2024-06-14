import { base64string } from '@icure/typescript-common'

export class Binary implements IBinary {
    contentType: string
    data: base64string
    filename: string

    toJSON(): IBinary {
        return {
            contentType: this.contentType,
            data: this.data,
            filename: this.filename,
        }
    }

    constructor(json: Partial<IBinary> & { contentType: string; data: string; filename: string }) {
        this.contentType = json['contentType']!
        this.data = json['data']!
        this.filename = json['filename']!
    }
}

export interface IBinary {
    contentType: string
    data: base64string
    filename: string
}
