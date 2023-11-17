import { mapTo, ContentDto } from '@icure/typescript-common'

@mapTo(ContentDto)
export class LocalComponent {
    stringValue?: string
    documentId?: string

    constructor(localComponent?: ILocalComponent | any) {
        this.stringValue = localComponent?.stringValue
        this.documentId = localComponent?.documentId
    }

    static toJSON(instance: LocalComponent): any {
        const pojo: any = {}
        if (instance.stringValue !== undefined) pojo['stringValue'] = instance.stringValue
        if (instance.documentId !== undefined) pojo['documentId'] = instance.documentId
        return pojo
    }

    static fromJSON(pojo: any): LocalComponent {
        const obj = {} as ILocalComponent
        if (pojo['stringValue'] !== undefined) {
            obj['stringValue'] = pojo['stringValue']
        }
        if (pojo['documentId'] !== undefined) {
            obj['documentId'] = pojo['documentId']
        }
        return new LocalComponent(obj)
    }
}

interface ILocalComponent {
    stringValue?: string
    documentId?: string
}
