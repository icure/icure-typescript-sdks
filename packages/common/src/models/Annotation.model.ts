import { Annotation as AnnotationDto, ISO639_1 } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { CodingReference } from './CodingReference.model'

@mapTo(AnnotationDto)
export class Annotation {
    id: string
    tags: Array<CodingReference>
    author?: string
    created?: number
    modified?: number
    markdown: Record<ISO639_1, string>
    target?: string
    encryptedSelf?: string

    constructor(annotation: Partial<IAnnotation>) {
        this.id = forceUuid(annotation.id)
        this.tags = annotation.tags ?? []
        this.author = annotation.author
        this.created = annotation.created
        this.modified = annotation.modified
        this.markdown = annotation.markdown ?? ({} as Record<ISO639_1, string>)
        this.target = annotation.target
        this.encryptedSelf = annotation.encryptedSelf
    }

    static toJSON(instance: Annotation): IAnnotation {
        const pojo: IAnnotation = {} as IAnnotation
        pojo['id'] = instance.id
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        pojo['markdown'] = { ...instance.markdown }
        if (instance.target !== undefined) pojo['target'] = instance.target
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: IAnnotation): Annotation {
        const obj = {} as IAnnotation
        obj['id'] = pojo['id']
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']!
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']!
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']!
        }
        obj['markdown'] = { ...pojo['markdown'] }
        if (pojo['target'] !== undefined) {
            obj['target'] = pojo['target']!
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']!
        }
        return new Annotation(obj)
    }
}

export interface IAnnotation {
    id: string
    tags: Array<CodingReference>
    author?: string
    created?: number
    modified?: number
    markdown: Record<ISO639_1, string>
    target?: string
    encryptedSelf?: string
}
