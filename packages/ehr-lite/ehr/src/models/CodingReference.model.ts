import { CodeStub, ISO639_1 } from '@icure/api'
import { mapTo } from '../mappings/mapper'

@mapTo(CodeStub)
export class CodingReference {
    id?: string
    type?: string
    code?: string
    context?: string
    version?: string
    label?: Map<ISO639_1, string>

    static toJSON(instance: CodingReference): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["type"] = instance.type
        pojo["code"] = instance.code
        pojo["context"] = instance.context
        pojo["version"] = instance.version
        pojo["label"] = !!instance.label ? Object.fromEntries([...instance.label.entries()].map(([k, v]) => [k, v])) : undefined
        return pojo
    }

    static fromJSON(pojo: any): CodingReference {
        const instance = new CodingReference()
        if (pojo["id"] === undefined) instance.id = undefined
        instance.id = pojo["id"]
        if (pojo["type"] === undefined) instance.type = undefined
        instance.type = pojo["type"]
        if (pojo["code"] === undefined) instance.code = undefined
        instance.code = pojo["code"]
        if (pojo["context"] === undefined) instance.context = undefined
        instance.context = pojo["context"]
        if (pojo["version"] === undefined) instance.version = undefined
        instance.version = pojo["version"]
        if (pojo["label"] === undefined) instance.label = undefined
        instance.label = pojo["label"] ? new Map(pojo["label"].map(([k, v]: [any, any]) => [k, v])) : undefined
        return instance
    }
}
