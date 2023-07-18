import { Annotation as AnnotationDto, ISO639_1 } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { CodingReference } from './CodingReference.model'

@mapTo(AnnotationDto)
export class Annotation {
    id: string
    tags: Set<CodingReference>
    author?: string
    created?: number
    modified?: number
    markdown: Map<ISO639_1, string>
    target?: string
    confidential?: boolean
    encryptedSelf?: string

    constructor(annotation: IAnnotation) {
        this.id = forceUuid(annotation.id)
        this.tags = annotation.tags ?? new Set()
        this.author = annotation.author
        this.created = annotation.created
        this.modified = annotation.modified
        this.markdown = annotation.markdown ?? new Map()
        this.target = annotation.target
        this.confidential = annotation.confidential
        this.encryptedSelf = annotation.encryptedSelf
    }

    static toJSON(instance: Annotation): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        pojo['tags'] = Array.from([...instance.tags].map((item) => CodingReference.toJSON(item)))
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        pojo['markdown'] = Object.fromEntries([...instance.markdown.entries()].map(([k, v]) => [k, v]))
        if (instance.target !== undefined) pojo['target'] = instance.target
        if (instance.confidential !== undefined) pojo['confidential'] = instance.confidential
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): Annotation {
        const obj = {} as IAnnotation
        obj['id'] = pojo['id']
        obj['tags'] = new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        obj['markdown'] = new Map(Object.entries(pojo['markdown']).map(([k, v]: [any, any]) => [k, v]))
        if (pojo['target'] !== undefined) {
            obj['target'] = pojo['target']
        }
        if (pojo['confidential'] !== undefined) {
            obj['confidential'] = pojo['confidential']
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        return new Annotation(obj)
    }
}

interface IAnnotation {
    id?: string
    tags?: Set<CodingReference>
    author?: string
    created?: number
    modified?: number
    markdown?: Map<ISO639_1, string>
    target?: string
    confidential?: boolean
    encryptedSelf?: string
}
