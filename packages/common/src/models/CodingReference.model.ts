import { CodeStub } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(CodeStub)
export class CodingReference {
    id: string
    type?: string
    code?: string
    version?: string

    constructor(codingReference: ICodingReference) {
        this.id = codingReference.id!
        this.type = codingReference.type
        this.code = codingReference.code
        this.version = codingReference.version
    }

    static toJSON(instance: CodingReference): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        pojo['type'] = instance.type
        pojo['code'] = instance.code
        pojo['version'] = instance.version
        return pojo
    }

    static fromJSON(pojo: any): CodingReference {
        return new CodingReference({ id: pojo['id'], type: pojo['type'], code: pojo['code'], version: pojo['version'] })
    }
}

interface ICodingReference {
    id?: string
    type?: string
    code?: string
    version?: string
}
