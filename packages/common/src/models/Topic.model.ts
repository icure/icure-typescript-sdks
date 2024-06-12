import { Topic as TopicDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { CodingReference } from './CodingReference.model'
import { SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'
import { TopicRole } from './enums/TopicRole.enum'

@mapTo(TopicDto)
export class Topic {
    id: string
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    tags?: Array<CodingReference>
    codes?: Array<CodingReference>
    endOfLife?: number
    deletionDate?: number
    descr?: string
    linkedHealthElements?: Array<string>
    linkedServices?: Array<string>
    activeParticipants: Record<string, TopicRole>
    systemMetadata?: SystemMetaDataEncrypted

    constructor(topic: Partial<ITopic>) {
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
        this.activeParticipants = topic.activeParticipants ?? {}
        this.systemMetadata = topic.systemMetadata
    }

    static toJSON(instance: Topic): ITopic {
        const pojo: ITopic = {} as ITopic
        pojo["id"] = instance.id
        if (instance.rev !== undefined) pojo["rev"] = instance.rev
        if (instance.created !== undefined) pojo["created"] = instance.created
        if (instance.modified !== undefined) pojo["modified"] = instance.modified
        if (instance.author !== undefined) pojo["author"] = instance.author
        if (instance.responsible !== undefined) pojo["responsible"] = instance.responsible
        if (instance.medicalLocationId !== undefined) pojo["medicalLocationId"] = instance.medicalLocationId
        if (instance.tags !== undefined) pojo["tags"] = instance.tags.map(item => CodingReference.toJSON(item))
        if (instance.codes !== undefined) pojo["codes"] = instance.codes.map(item => CodingReference.toJSON(item))
        if (instance.endOfLife !== undefined) pojo["endOfLife"] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo["deletionDate"] = instance.deletionDate
        if (instance.descr !== undefined) pojo["descr"] = instance.descr
        if (instance.linkedHealthElements !== undefined) pojo["linkedHealthElements"] = instance.linkedHealthElements.map(item => item)
        if (instance.linkedServices !== undefined) pojo["linkedServices"] = instance.linkedServices.map(item => item)
        pojo["activeParticipants"] = {...instance.activeParticipants}
        if (instance.systemMetadata !== undefined) pojo["systemMetadata"] = SystemMetaDataEncrypted.toJSON(instance.systemMetadata)
        return pojo
    }

    static fromJSON(pojo: ITopic): Topic {
        const obj = {} as ITopic
        obj['id'] = pojo["id"]
        if (pojo["rev"] !== undefined) {
            obj['rev'] = pojo["rev"]!
        }
        if (pojo["created"] !== undefined) {
            obj['created'] = pojo["created"]!
        }
        if (pojo["modified"] !== undefined) {
            obj['modified'] = pojo["modified"]!
        }
        if (pojo["author"] !== undefined) {
            obj['author'] = pojo["author"]!
        }
        if (pojo["responsible"] !== undefined) {
            obj['responsible'] = pojo["responsible"]!
        }
        if (pojo["medicalLocationId"] !== undefined) {
            obj['medicalLocationId'] = pojo["medicalLocationId"]!
        }
        if (pojo["tags"] !== undefined) {
            obj['tags'] = pojo["tags"]!.map((item: any) => CodingReference.fromJSON(item))
        }
        if (pojo["codes"] !== undefined) {
            obj['codes'] = pojo["codes"]!.map((item: any) => CodingReference.fromJSON(item))
        }
        if (pojo["endOfLife"] !== undefined) {
            obj['endOfLife'] = pojo["endOfLife"]!
        }
        if (pojo["deletionDate"] !== undefined) {
            obj['deletionDate'] = pojo["deletionDate"]!
        }
        if (pojo["descr"] !== undefined) {
            obj['descr'] = pojo["descr"]!
        }
        if (pojo["linkedHealthElements"] !== undefined) {
            obj['linkedHealthElements'] = pojo["linkedHealthElements"]!.map((item: any) => item)
        }
        if (pojo["linkedServices"] !== undefined) {
            obj['linkedServices'] = pojo["linkedServices"]!.map((item: any) => item)
        }
        obj['activeParticipants'] = {...pojo["activeParticipants"]}
        if (pojo["systemMetadata"] !== undefined) {
            obj['systemMetadata'] = SystemMetaDataEncrypted.fromJSON(pojo["systemMetadata"]!)
        }
        return new Topic(obj)
    }
}

interface ITopic {
    id: string
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    tags?: Array<CodingReference>
    codes?: Array<CodingReference>
    endOfLife?: number
    deletionDate?: number
    descr?: string
    linkedHealthElements?: Array<string>
    linkedServices?: Array<string>
    activeParticipants?: Record<string, TopicRole>
    systemMetadata?: SystemMetaDataEncrypted
}
