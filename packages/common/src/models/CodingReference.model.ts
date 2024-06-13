import { CodeStub } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(CodeStub)
export class CodingReference {
    id: string
    type?: string
    code?: string
    version?: string
    context?: string
    contextLabel?: string

    constructor(codingReference: Partial<ICodingReference>) {
        this.id = codingReference.id!
        this.type = codingReference.type
        this.code = codingReference.code
        this.version = codingReference.version
        this.context = codingReference.context
        this.contextLabel = codingReference.contextLabel
    }

    static toJSON(instance: CodingReference): ICodingReference {
        const pojo: ICodingReference = {} as ICodingReference
        pojo['id'] = instance.id
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.code !== undefined) pojo['code'] = instance.code
        if (instance.version !== undefined) pojo['version'] = instance.version
        if (instance.context !== undefined) pojo['context'] = instance.context
        if (instance.contextLabel !== undefined) pojo['contextLabel'] = instance.contextLabel
        return pojo
    }

    static fromJSON(pojo: ICodingReference): CodingReference {
        const obj = {} as ICodingReference
        obj['id'] = pojo['id']
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']!
        }
        if (pojo['code'] !== undefined) {
            obj['code'] = pojo['code']!
        }
        if (pojo['version'] !== undefined) {
            obj['version'] = pojo['version']!
        }
        if (pojo['context'] !== undefined) {
            obj['context'] = pojo['context']!
        }
        if (pojo['contextLabel'] !== undefined) {
            obj['contextLabel'] = pojo['contextLabel']!
        }
        return new CodingReference(obj)
    }
}

interface ICodingReference {
    id: string
    type?: string
    code?: string
    version?: string
    context?: string
    contextLabel?: string
}
