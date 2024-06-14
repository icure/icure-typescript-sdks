import { Annotation as AnnotationDto, ISO639_1 } from '@icure/api'
import { EntityId } from '../types'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { CodingReference, ICodingReference } from './CodingReference.model'

@mapTo(AnnotationDto)
export class Annotation {
    id: EntityId
    tags: CodingReference[] = []
    author?: string
    created?: number
    modified?: number
    markdown: Record<ISO639_1, string> = {} as Record<ISO639_1, string>
    target?: string
    encryptedSelf?: string

    toJSON(): IAnnotation {
        return {
            id: this.id,
            tags: this.tags.map((item) => item.toJSON()),
            author: this.author,
            created: this.created,
            modified: this.modified,
            markdown: { ...this.markdown },
            target: this.target,
            encryptedSelf: this.encryptedSelf,
        }
    }

    constructor(json: Partial<IAnnotation>) {
        this.id = forceUuid(json['id']!)
        if (json['tags'] !== undefined) {
            this.tags = json['tags']!.map((item: any) => new CodingReference(item))
        }
        if (json['author'] !== undefined) {
            this.author = json['author']!
        }
        if (json['created'] !== undefined) {
            this.created = json['created']!
        }
        if (json['modified'] !== undefined) {
            this.modified = json['modified']!
        }
        if (json['markdown'] !== undefined) {
            this.markdown = { ...json['markdown']! }
        }
        if (json['target'] !== undefined) {
            this.target = json['target']!
        }
        if (json['encryptedSelf'] !== undefined) {
            this.encryptedSelf = json['encryptedSelf']!
        }
    }
}

export interface IAnnotation {
    id: EntityId
    tags: ICodingReference[]
    author?: string
    created?: number
    modified?: number
    markdown: Record<ISO639_1, string>
    target?: string
    encryptedSelf?: string
}
