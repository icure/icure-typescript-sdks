export class LocalComponent {
    stringValue?: string
    documentId?: string

    static toJSON(instance: LocalComponent): any {
        const pojo: any = {}
        pojo["stringValue"] = instance.stringValue
        pojo["documentId"] = instance.documentId
        return pojo
    }

    static fromJSON(pojo: any): LocalComponent {
        const instance = new LocalComponent()
        if (pojo["stringValue"] === undefined) instance.stringValue = undefined
        else instance.stringValue = pojo["stringValue"]
        if (pojo["documentId"] === undefined) instance.documentId = undefined
        else instance.documentId = pojo["documentId"]
        return instance
    }
}
