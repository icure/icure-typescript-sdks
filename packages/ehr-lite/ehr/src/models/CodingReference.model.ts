import {ISO639_1} from "@icure/api";

export class CodingReference {
    id?: string
    type?: string
    code?: string
    version?: string
    label?: Map<ISO639_1, string>

    static toJSON(instance: CodingReference): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["type"] = instance.type
        pojo["code"] = instance.code
        pojo["version"] = instance.version
        pojo["label"] = !!instance.label ? Object.fromEntries([...instance.label.entries()].map(([k, v]) => [k, v])) : undefined
        return pojo
    }

    static fromJSON(pojo: any): CodingReference {
        const instance = new CodingReference()
        if (pojo["id"] === undefined) instance.id = undefined
        else instance.id = pojo["id"]
        if (pojo["type"] === undefined) instance.type = undefined
        else instance.type = pojo["type"]
        if (pojo["code"] === undefined) instance.code = undefined
        else instance.code = pojo["code"]
        if (pojo["version"] === undefined) instance.version = undefined
        else instance.version = pojo["version"]
        if (pojo["label"] === undefined) instance.label = undefined
        else instance.label = new Map(pojo["label"]?.map(([k, v]: [any, any]) => [k, v]) ?? [])
        return instance
    }
}
