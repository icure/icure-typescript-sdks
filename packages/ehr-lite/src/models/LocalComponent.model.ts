import { ContentDto, mapTo } from '@icure/typescript-common'

@mapTo(ContentDto)
export class LocalComponent implements ILocalComponent {
    stringValue?: string
    documentId?: string

    toJSON(): ILocalComponent {
        return {
            stringValue: this.stringValue,
            documentId: this.documentId,
        }
    }

    constructor(json: Partial<ILocalComponent>) {
        if (json['stringValue'] !== undefined) {
            this.stringValue = json['stringValue']!
        }
        if (json['documentId'] !== undefined) {
            this.documentId = json['documentId']!
        }
    }
}

export interface ILocalComponent {
    stringValue?: string
    documentId?: string
}
