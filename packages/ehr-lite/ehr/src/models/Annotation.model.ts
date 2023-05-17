import { Annotation as AnnotationEntity, ISO639_1 } from '@icure/api'
import { mapTo } from '../mappings/mapper'
import { CodingReference } from './CodingReference.model'

@mapTo(AnnotationEntity)
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

    constructor(annotation: IAnnotation | any) {
        this.id = annotation.id
        this.tags = annotation.tags
        this.author = annotation.author
        this.created = annotation.created
        this.modified = annotation.modified
        this.markdown = annotation.markdown
        this.target = annotation.target
        this.confidential = annotation.confidential
        this.encryptedSelf = annotation.encryptedSelf
    }

    static toJSON(instance: Annotation): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        pojo['tags'] = instance.tags?.map((item) => CodingReference.toJSON(item))
        pojo['author'] = instance.author
        pojo['created'] = instance.created
        pojo['modified'] = instance.modified
        pojo['markdown'] = !!instance.markdown ? Object.fromEntries([...instance.markdown.entries()].map(([k, v]) => [k, v])) : undefined
        pojo['target'] = instance.target
        pojo['confidential'] = instance.confidential
        pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): Annotation {
        return new Annotation({
            id: pojo['id'],
            tags: pojo['tags']?.map((item: any) => CodingReference.fromJSON(item)),
            author: pojo['author'],
            created: pojo['created'],
            modified: pojo['modified'],
            markdown: pojo['markdown'] ? new Map(Object.entries(pojo['markdown']).map(([k, v]: [any, any]) => [k, v])) : undefined,
            target: pojo['target'],
            confidential: pojo['confidential'],
            encryptedSelf: pojo['encryptedSelf'],
        })
    }
}

interface IAnnotation {
    id?: string
    tags?: CodingReference[]
    author?: string
    created?: number
    modified?: number
    markdown?: Map<ISO639_1, string>
    target?: string
    confidential?: boolean
    encryptedSelf?: string
}
