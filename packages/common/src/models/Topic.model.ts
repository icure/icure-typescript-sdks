import { Topic as TopicDto } from '@icure/api'
import { EntityId } from '../types'
import { mapTo } from '../utils/decorators'
import { forceUuid } from "../utils/uuidUtils"
import { CodingReference, ICodingReference } from './CodingReference.model'
import { ISystemMetaDataEncrypted, SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'
import { TopicRoleEnum } from './enums/TopicRole.enum'

@mapTo(TopicDto)
export class Topic {
    id: EntityId
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    tags?: CodingReference[] = []
    codes?: CodingReference[] = []
    endOfLife?: number
    deletionDate?: number
    descr?: string
    linkedHealthElements?: string[] = []
    linkedServices?: string[] = []
    activeParticipants: Record<string, TopicRoleEnum> = {}
    systemMetadata?: SystemMetaDataEncrypted

    toJSON(): ITopic {
        return {
        id: this.id,
        rev: this.rev,
        created: this.created,
        modified: this.modified,
        author: this.author,
        responsible: this.responsible,
        medicalLocationId: this.medicalLocationId,
        tags: this.tags?.map(item => item.toJSON()),
        codes: this.codes?.map(item => item.toJSON()),
        endOfLife: this.endOfLife,
        deletionDate: this.deletionDate,
        descr: this.descr,
        linkedHealthElements: this.linkedHealthElements?.map(item => item),
        linkedServices: this.linkedServices?.map(item => item),
        activeParticipants: {...this.activeParticipants},
        systemMetadata: !!this.systemMetadata ? this.systemMetadata.toJSON() : undefined,
        }
    }

    constructor(json: Partial<ITopic>) {
        this.id = forceUuid(json["id"]!)
        if (json["rev"] !== undefined) {
            this.rev = json["rev"]!
        }
        if (json["created"] !== undefined) {
            this.created = json["created"]!
        }
        if (json["modified"] !== undefined) {
            this.modified = json["modified"]!
        }
        if (json["author"] !== undefined) {
            this.author = json["author"]!
        }
        if (json["responsible"] !== undefined) {
            this.responsible = json["responsible"]!
        }
        if (json["medicalLocationId"] !== undefined) {
            this.medicalLocationId = json["medicalLocationId"]!
        }
        if (json["tags"] !== undefined) {
            this.tags = json["tags"]!.map((item: any) => new CodingReference(item))
        }
        if (json["codes"] !== undefined) {
            this.codes = json["codes"]!.map((item: any) => new CodingReference(item))
        }
        if (json["endOfLife"] !== undefined) {
            this.endOfLife = json["endOfLife"]!
        }
        if (json["deletionDate"] !== undefined) {
            this.deletionDate = json["deletionDate"]!
        }
        if (json["descr"] !== undefined) {
            this.descr = json["descr"]!
        }
        if (json["linkedHealthElements"] !== undefined) {
            this.linkedHealthElements = json["linkedHealthElements"]!.map((item: any) => item)
        }
        if (json["linkedServices"] !== undefined) {
            this.linkedServices = json["linkedServices"]!.map((item: any) => item)
        }
        if (json["activeParticipants"] !== undefined) {
            this.activeParticipants = {...json["activeParticipants"]!}
        }
        if (json["systemMetadata"] !== undefined) {
            this.systemMetadata = new SystemMetaDataEncrypted(json["systemMetadata"]!)
        }
    }
}

export interface ITopic {
    id: EntityId
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    tags?: ICodingReference[]
    codes?: ICodingReference[]
    endOfLife?: number
    deletionDate?: number
    descr?: string
    linkedHealthElements?: string[]
    linkedServices?: string[]
    activeParticipants?: Record<string, TopicRoleEnum>
    systemMetadata?: ISystemMetaDataEncrypted
}
