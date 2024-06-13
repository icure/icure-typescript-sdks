import { ContentDto, mapTo } from '@icure/typescript-common'

@mapTo(ContentDto)
export class LocalComponent implements ILocalComponent {
    stringValue?: string
    documentId?: string

    constructor(localComponent: Partial<ILocalComponent>) {
        this.stringValue = localComponent?.stringValue
        this.documentId = localComponent?.documentId
    }

    static toJSON(instance: LocalComponent): ILocalComponent {
        const pojo: ILocalComponent = {} as ILocalComponent
        if (instance.stringValue !== undefined) pojo['stringValue'] = instance.stringValue
        if (instance.documentId !== undefined) pojo['documentId'] = instance.documentId
        return pojo
    }

    static fromJSON(pojo: ILocalComponent): LocalComponent {
        const obj = {} as ILocalComponent
        if (pojo['stringValue'] !== undefined) {
            obj['stringValue'] = pojo['stringValue']!
        }
        if (pojo['documentId'] !== undefined) {
            obj['documentId'] = pojo['documentId']!
        }
        return new LocalComponent(obj)
    }
}

export interface ILocalComponent {
    stringValue?: string
    documentId?: string
}
