import { Message as MessageDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { CodingReference } from './CodingReference.model'
import { MessageAttachment } from './MessageAttachment.model'
import { MessageReadStatus } from './MessageReadStatus.model'
import { SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'

@mapTo(MessageDto)
export class Message {
    id: string
    rev?: string
    created?: number
    modified?: number
    sent?: number
    readStatus?: Record<string, MessageReadStatus>
    attachments?: MessageAttachment[]
    author?: string
    responsible?: string
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    endOfLife?: number
    deletionDate?: number
    sender?: string
    metas?: Record<string, string>
    content?: string
    topicId?: string
    systemMetadata?: SystemMetaDataEncrypted

    constructor(message: Partial<IMessage>) {
        this.id = forceUuid(message.id)
        this.rev = message.rev
        this.created = message.created
        this.modified = message.modified
        this.sent = message.sent
        this.readStatus = message.readStatus
        this.author = message.author
        this.responsible = message.responsible
        this.tags = message.tags ?? []
        this.codes = message.codes ?? []
        this.endOfLife = message.endOfLife
        this.deletionDate = message.deletionDate
        this.sender = message.sender
        this.metas = message.metas
        this.content = message.content
        this.topicId = message.topicId
        this.systemMetadata = message.systemMetadata
        this.attachments = message.attachments
    }

    /**
     * Determine if the message is truncated, meaning the content is not complete and there is an attachment with the full content
     *
     * @returns true if the message is truncated, false otherwise
     *
     */
    get isTruncated(): boolean {
        return this.attachments?.some((attachment) => attachment.type === 'body') ?? false
    }

    static toJSON(instance: Message): IMessage {
        const pojo: IMessage = {} as IMessage
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.sent !== undefined) pojo['sent'] = instance.sent
        if (instance.readStatus !== undefined) pojo['readStatus'] = { ...instance.readStatus }
        if (instance.attachments !== undefined) pojo['attachments'] = instance.attachments.map((item) => MessageAttachment.toJSON(item))
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.sender !== undefined) pojo['sender'] = instance.sender
        if (instance.metas !== undefined) pojo['metas'] = { ...instance.metas }
        if (instance.content !== undefined) pojo['content'] = instance.content
        if (instance.topicId !== undefined) pojo['topicId'] = instance.topicId
        if (instance.systemMetadata !== undefined) pojo['systemMetadata'] = SystemMetaDataEncrypted.toJSON(instance.systemMetadata)
        return pojo
    }

    static fromJSON(pojo: IMessage): Message {
        const obj = {} as IMessage
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']!
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']!
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']!
        }
        if (pojo['sent'] !== undefined) {
            obj['sent'] = pojo['sent']!
        }
        if (pojo['readStatus'] !== undefined) {
            obj['readStatus'] = { ...pojo['readStatus']! }
        }
        if (pojo['attachments'] !== undefined) {
            obj['attachments'] = pojo['attachments']!.map((item: any) => MessageAttachment.fromJSON(item))
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']!
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']!
        }
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']!
        }
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']!
        }
        if (pojo['sender'] !== undefined) {
            obj['sender'] = pojo['sender']!
        }
        if (pojo['metas'] !== undefined) {
            obj['metas'] = { ...pojo['metas']! }
        }
        if (pojo['content'] !== undefined) {
            obj['content'] = pojo['content']!
        }
        if (pojo['topicId'] !== undefined) {
            obj['topicId'] = pojo['topicId']!
        }
        if (pojo['systemMetadata'] !== undefined) {
            obj['systemMetadata'] = SystemMetaDataEncrypted.fromJSON(pojo['systemMetadata']!)
        }
        return new Message(obj)
    }
}

export interface IMessage {
    id: string
    rev?: string
    created?: number
    modified?: number
    sent?: number
    readStatus?: Record<string, MessageReadStatus>
    attachments?: MessageAttachment[]
    author?: string
    responsible?: string
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    endOfLife?: number
    deletionDate?: number
    sender?: string
    metas?: Record<string, string>
    content?: string
    topicId?: string
    systemMetadata?: SystemMetaDataEncrypted
}
