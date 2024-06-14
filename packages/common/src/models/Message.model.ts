import { Message as MessageDto } from '@icure/api'
import { EntityId } from '../types'
import { mapTo } from '../utils/decorators'
import { forceUuid } from "../utils/uuidUtils"
import { CodingReference, ICodingReference } from './CodingReference.model'
import { IMessageAttachment, MessageAttachment } from './MessageAttachment.model'
import { IMessageReadStatus, MessageReadStatus } from './MessageReadStatus.model'
import { ISystemMetaDataEncrypted, SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'

@mapTo(MessageDto)
export class Message {
    id: EntityId
    rev?: string
    created?: number
    modified?: number
    sent?: number
    readStatus?: Record<string, MessageReadStatus>
    attachments?: MessageAttachment[] = []
    author?: string
    responsible?: string
    tags: CodingReference[] = []
    codes: CodingReference[] = []
    endOfLife?: number
    deletionDate?: number
    sender?: string
    metas?: Record<string, string>
    content?: string
    topicId?: string
    systemMetadata?: SystemMetaDataEncrypted

    /**
     * Determine if the message is truncated, meaning the content is not complete and there is an attachment with the full content
     *
     * @returns true if the message is truncated, false otherwise
     *
     */
    get isTruncated(): boolean {
        return this.attachments?.some((attachment) => attachment.type === 'body') ?? false
    }

    toJSON(): IMessage {
        return {
        id: this.id,
        rev: this.rev,
        created: this.created,
        modified: this.modified,
        sent: this.sent,
        readStatus: this.readStatus ? Object.fromEntries(Object.entries(this.readStatus).map(([k, v]: [any, MessageReadStatus]) => [k, v.toJSON()])) : undefined,
        attachments: this.attachments?.map(item => item.toJSON()),
        author: this.author,
        responsible: this.responsible,
        tags: this.tags.map(item => item.toJSON()),
        codes: this.codes.map(item => item.toJSON()),
        endOfLife: this.endOfLife,
        deletionDate: this.deletionDate,
        sender: this.sender,
        metas: this.metas ? {...this.metas} : undefined,
        content: this.content,
        topicId: this.topicId,
        systemMetadata: !!this.systemMetadata ? this.systemMetadata.toJSON() : undefined,
        }
    }

    constructor(json: Partial<IMessage> ) {
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
        if (json["sent"] !== undefined) {
            this.sent = json["sent"]!
        }
        if (json["readStatus"] !== undefined) {
            this.readStatus = Object.fromEntries(Object.entries(json["readStatus"]!).map(([k, v]: [any, IMessageReadStatus]) => [k, new MessageReadStatus(v)]))
        }
        if (json["attachments"] !== undefined) {
            this.attachments = json["attachments"]!.map((item: any) => new MessageAttachment(item))
        }
        if (json["author"] !== undefined) {
            this.author = json["author"]!
        }
        if (json["responsible"] !== undefined) {
            this.responsible = json["responsible"]!
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
        if (json["sender"] !== undefined) {
            this.sender = json["sender"]!
        }
        if (json["metas"] !== undefined) {
            this.metas = {...json["metas"]!}
        }
        if (json["content"] !== undefined) {
            this.content = json["content"]!
        }
        if (json["topicId"] !== undefined) {
            this.topicId = json["topicId"]!
        }
        if (json["systemMetadata"] !== undefined) {
            this.systemMetadata = new SystemMetaDataEncrypted(json["systemMetadata"]!)
        }
    }
}

export interface IMessage {
    id: EntityId
    rev?: string
    created?: number
    modified?: number
    sent?: number
    readStatus?: Record<string, IMessageReadStatus>
    attachments?: IMessageAttachment[]
    author?: string
    responsible?: string
    tags: ICodingReference[]
    codes: ICodingReference[]
    endOfLife?: number
    deletionDate?: number
    sender?: string
    metas?: Record<string, string>
    content?: string
    topicId?: string
    systemMetadata?: ISystemMetaDataEncrypted
}
