import {ISO639_1} from "@icure/api";
import {CodingReference} from "./CodingReference.model";

export class Annotation {
    id?: string
    tags?: CodingReference[]
    author?: string
    created?: number
    modified?: number
    markdown?: Map<ISO639_1, string>
    target?: string
    confidential?: boolean
    encryptedSelf?: string

    static toJSON(instance: Annotation): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["tags"] = instance.tags?.map(item => CodingReference.toJSON(item))
        pojo["author"] = instance.author
        pojo["created"] = instance.created
        pojo["modified"] = instance.modified
        pojo["markdown"] = !!instance.markdown ? Object.fromEntries([...instance.markdown.entries()].map(([k, v]) => [k, v])) : undefined
        pojo["target"] = instance.target
        pojo["confidential"] = instance.confidential
        pojo["encryptedSelf"] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): Annotation {
        const instance = new Annotation()
        if (pojo["id"] === undefined) instance.id = undefined
        else instance.id = pojo["id"]
        if (pojo["tags"] === undefined) instance.tags = undefined
        else instance.tags = pojo["tags"]?.map((item: any) => CodingReference.fromJSON(item))
        if (pojo["author"] === undefined) instance.author = undefined
        else instance.author = pojo["author"]
        if (pojo["created"] === undefined) instance.created = undefined
        else instance.created = pojo["created"]
        if (pojo["modified"] === undefined) instance.modified = undefined
        else instance.modified = pojo["modified"]
        if (pojo["markdown"] === undefined) instance.markdown = undefined
        else instance.markdown = new Map(pojo["markdown"]?.map(([k, v]: [any, any]) => [k, v]) ?? [])
        if (pojo["target"] === undefined) instance.target = undefined
        else instance.target = pojo["target"]
        if (pojo["confidential"] === undefined) instance.confidential = undefined
        else instance.confidential = pojo["confidential"]
        if (pojo["encryptedSelf"] === undefined) instance.encryptedSelf = undefined
        else instance.encryptedSelf = pojo["encryptedSelf"]
        return instance
    }
}
