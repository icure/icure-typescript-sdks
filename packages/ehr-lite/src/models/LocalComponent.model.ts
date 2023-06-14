import { Content } from '@icure/api'
import {mapTo} from "@icure/typescript-common"

@mapTo(Content)
export class LocalComponent {
    stringValue?: string
    documentId?: string

    constructor(localComponent?: ILocalComponent | any) {
        this.stringValue = localComponent?.stringValue
        this.documentId = localComponent?.documentId
    }

    static toJSON(instance: LocalComponent): any {
        const pojo: any = {}
        pojo['stringValue'] = instance.stringValue
        pojo['documentId'] = instance.documentId
        return pojo
    }

    static fromJSON(pojo: any): LocalComponent {
        return new LocalComponent({ stringValue: pojo['stringValue'], documentId: pojo['documentId'] })
    }
}

interface ILocalComponent {
    stringValue?: string
    documentId?: string
}
