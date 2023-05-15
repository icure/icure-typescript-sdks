import { CodeStub, ISO639_1 } from '@icure/api'
import { mapTo } from '../mappings/mapper'

@mapTo(CodeStub)
export class CodingReference {
    id?: string
    type?: string
    code?: string
    version?: string
    label?: Map<ISO639_1, string>

    constructor(codingReference: ICodingReference | any) {
        this.id = codingReference.id
        this.type = codingReference.type
        this.code = codingReference.code
        this.version = codingReference.version
        this.label = codingReference.label
    }

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
        return new CodingReference({id: pojo["id"], type: pojo["type"], code: pojo["code"], version: pojo["version"], label: pojo["label"] ? new Map(pojo["label"].map(([k, v]: [any, any]) => [k, v])) : undefined})
    }
}

interface ICodingReference {
    id?: string
    type?: string
    code?: string
    version?: string
    label?: Map<ISO639_1, string>
}
