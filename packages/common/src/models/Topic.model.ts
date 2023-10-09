import { Topic as TopicDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { CodingReference } from './CodingReference.model'
import { SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'
import { TopicRole } from './enums/TopicRole.enum'

@mapTo(TopicDto)
export class Topic {
    id?: string
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    descr?: string
    linkedHealthElements?: Set<string>
    linkedServices?: Set<string>
    activeParticipants: Map<string, TopicRole>
    systemMetadata?: SystemMetaDataEncrypted

    constructor(topic: ITopic) {
        this.id = forceUuid(topic.id)
        this.rev = topic.rev
        this.created = topic.created
        this.modified = topic.modified
        this.author = topic.author
        this.responsible = topic.responsible
        this.medicalLocationId = topic.medicalLocationId
        this.tags = topic.tags
        this.codes = topic.codes
        this.endOfLife = topic.endOfLife
        this.deletionDate = topic.deletionDate
        this.descr = topic.descr
        this.linkedHealthElements = topic.linkedHealthElements
        this.linkedServices = topic.linkedServices
        this.activeParticipants = topic.activeParticipants ?? new Map()
        this.systemMetadata = topic.systemMetadata
    }

    static toJSON(instance: Topic): any {
        const pojo: any = {}
        if (instance.id !== undefined) pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        if (instance.medicalLocationId !== undefined) pojo['medicalLocationId'] = instance.medicalLocationId
        if (instance.tags !== undefined) pojo['tags'] = Array.from([...(instance.tags ?? [])]?.map((item) => CodingReference.toJSON(item)) ?? [])
        if (instance.codes !== undefined) pojo['codes'] = Array.from([...(instance.codes ?? [])]?.map((item) => CodingReference.toJSON(item)) ?? [])
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.descr !== undefined) pojo['descr'] = instance.descr
        if (instance.linkedHealthElements !== undefined) pojo['linkedHealthElements'] = Array.from([...(instance.linkedHealthElements ?? [])]?.map((item) => item) ?? [])
        if (instance.linkedServices !== undefined) pojo['linkedServices'] = Array.from([...(instance.linkedServices ?? [])]?.map((item) => item) ?? [])
        pojo['activeParticipants'] = Object.fromEntries([...instance.activeParticipants.entries()].map(([k, v]) => [k, v]))
        if (instance.systemMetadata !== undefined) pojo['systemMetadata'] = !!instance.systemMetadata ? SystemMetaDataEncrypted.toJSON(instance.systemMetadata) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Topic {
        const obj = {} as ITopic
        if (pojo['id'] !== undefined) {
            obj['id'] = pojo['id']
        }
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']
        }
        if (pojo['medicalLocationId'] !== undefined) {
            obj['medicalLocationId'] = pojo['medicalLocationId']
        }
        if (pojo['tags'] !== undefined) {
            obj['tags'] = new Set(pojo['tags']?.map((item: any) => CodingReference.fromJSON(item)) ?? [])
        }
        if (pojo['codes'] !== undefined) {
            obj['codes'] = new Set(pojo['codes']?.map((item: any) => CodingReference.fromJSON(item)) ?? [])
        }
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']
        }
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']
        }
        if (pojo['descr'] !== undefined) {
            obj['descr'] = pojo['descr']
        }
        if (pojo['linkedHealthElements'] !== undefined) {
            obj['linkedHealthElements'] = new Set(pojo['linkedHealthElements']?.map((item: any) => item) ?? [])
        }
        if (pojo['linkedServices'] !== undefined) {
            obj['linkedServices'] = new Set(pojo['linkedServices']?.map((item: any) => item) ?? [])
        }
        obj['activeParticipants'] = new Map(Object.entries(pojo['activeParticipants']).map(([k, v]: [any, any]) => [k, v]))
        if (pojo['systemMetadata'] !== undefined) {
            obj['systemMetadata'] = !!pojo['systemMetadata'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetadata']) : undefined
        }
        return new Topic(obj)
    }
}

interface ITopic {
    id?: string
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    descr?: string
    linkedHealthElements?: Set<string>
    linkedServices?: Set<string>
    activeParticipants?: Map<string, TopicRole>
    systemMetadata?: SystemMetaDataEncrypted
}
