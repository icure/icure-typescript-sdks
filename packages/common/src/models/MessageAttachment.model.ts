import { MessageAttachment as MessageAttachmentDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(MessageAttachmentDto)
export class MessageAttachment {
    type?: 'annex' | 'body'
    ids?: string[] = []

    toJSON(): IMessageAttachment {
        return {
        type: this.type,
        ids: this.ids?.map(item => item),
        }
    }

    constructor(json: Partial<IMessageAttachment>) {
        if (json["type"] !== undefined) {
            this.type = json["type"]!
        }
        if (json["ids"] !== undefined) {
            this.ids = json["ids"]!.map((item: any) => item)
        }
    }
}

export interface IMessageAttachment {
    type?: 'annex' | 'body'
    ids?: string[]
}
