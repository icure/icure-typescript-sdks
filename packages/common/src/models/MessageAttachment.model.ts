import { MessageAttachment as MessageAttachmentDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(MessageAttachmentDto)
export class MessageAttachment {
    type?: 'annex' | 'body'
    ids?: string[]

    constructor(data: IMessageAttachment) {
        Object.assign(this, data)
    }

    static toJSON(instance: MessageAttachment): any {
        const pojo: any = {}
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.ids !== undefined) pojo['ids'] = instance.ids?.map((item) => item)
        return pojo
    }

    static fromJSON(pojo: any): MessageAttachment {
        const obj = {} as IMessageAttachment
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']
        }
        if (pojo['ids'] !== undefined) {
            obj['ids'] = pojo['ids']?.map((item: any) => item)
        }
        return new MessageAttachment(obj)
    }
}

interface IMessageAttachment {
    type?: 'annex' | 'body'
    ids?: string[]
}
