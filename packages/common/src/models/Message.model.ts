import { Message as MessageDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { CodingReference } from './CodingReference.model'
import { MessageReadStatus } from './MessageReadStatus.model'
import { SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'

@mapTo(MessageDto)
export class Message {
    id?: string
    rev?: string
    created?: number
    modified?: number
    sent?: number
    readStatus?: Map<string, MessageReadStatus>
    author?: string
    responsible?: string
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    sender?: string
    recipients?: Set<string>
    metas?: Map<string, string>
    content?: string
    topicId?: string
    systemMetadata?: SystemMetaDataEncrypted

    constructor(message: IMessage) {
        this.id = message.id
        this.rev = message.rev
        this.created = message.created
        this.modified = message.modified
        this.sent = message.sent
        this.readStatus = message.readStatus
        this.author = message.author
        this.responsible = message.responsible
        this.tags = message.tags
        this.codes = message.codes
        this.endOfLife = message.endOfLife
        this.deletionDate = message.deletionDate
        this.sender = message.sender
        this.recipients = message.recipients
        this.metas = message.metas
        this.content = message.content
        this.topicId = message.topicId
        this.systemMetadata = message.systemMetadata
    }

    static toJSON(instance: Message): any {
        const pojo: any = {}
        if (instance.id !== undefined) pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.sent !== undefined) pojo['sent'] = instance.sent
        if (instance.readStatus !== undefined) pojo['readStatus'] = !!instance.readStatus ? Object.fromEntries([...instance.readStatus.entries()].map(([k, v]) => [k, MessageReadStatus.toJSON(v)])) : undefined
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        if (instance.tags !== undefined) pojo['tags'] = Array.from([...(instance.tags ?? [])]?.map((item) => CodingReference.toJSON(item)) ?? [])
        if (instance.codes !== undefined) pojo['codes'] = Array.from([...(instance.codes ?? [])]?.map((item) => CodingReference.toJSON(item)) ?? [])
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.sender !== undefined) pojo['sender'] = instance.sender
        if (instance.recipients !== undefined) pojo['recipients'] = Array.from([...(instance.recipients ?? [])]?.map((item) => item) ?? [])
        if (instance.metas !== undefined) pojo['metas'] = !!instance.metas ? Object.fromEntries([...instance.metas.entries()].map(([k, v]) => [k, v])) : undefined
        if (instance.content !== undefined) pojo['content'] = instance.content
        if (instance.topicId !== undefined) pojo['topicId'] = instance.topicId
        if (instance.systemMetadata !== undefined) pojo['systemMetadata'] = !!instance.systemMetadata ? SystemMetaDataEncrypted.toJSON(instance.systemMetadata) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Message {
        const obj = {} as IMessage
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
        if (pojo['sent'] !== undefined) {
            obj['sent'] = pojo['sent']
        }
        if (pojo['readStatus'] !== undefined) {
            obj['readStatus'] = pojo['readStatus'] ? new Map(Object.entries(pojo['readStatus']).map(([k, v]: [any, any]) => [k, MessageReadStatus.fromJSON(v)])) : undefined
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']
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
        if (pojo['sender'] !== undefined) {
            obj['sender'] = pojo['sender']
        }
        if (pojo['recipients'] !== undefined) {
            obj['recipients'] = new Set(pojo['recipients']?.map((item: any) => item) ?? [])
        }
        if (pojo['metas'] !== undefined) {
            obj['metas'] = pojo['metas'] ? new Map(Object.entries(pojo['metas']).map(([k, v]: [any, any]) => [k, v])) : undefined
        }
        if (pojo['content'] !== undefined) {
            obj['content'] = pojo['content']
        }
        if (pojo['topicId'] !== undefined) {
            obj['topicId'] = pojo['topicId']
        }
        if (pojo['systemMetadata'] !== undefined) {
            obj['systemMetadata'] = !!pojo['systemMetadata'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetadata']) : undefined
        }
        return new Message(obj)
    }
}

interface IMessage {
    id?: string
    rev?: string
    created?: number
    modified?: number
    sent?: number
    readStatus?: Map<string, MessageReadStatus>
    author?: string
    responsible?: string
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    sender?: string
    recipients?: Set<string>
    metas?: Map<string, string>
    content?: string
    topicId?: string
    systemMetadata?: SystemMetaDataEncrypted
}
