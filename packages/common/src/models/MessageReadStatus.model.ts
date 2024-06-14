import { MessageReadStatus as MessageReadStatusDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(MessageReadStatusDto)
export class MessageReadStatus {
    time?: number
    read: boolean

    toJSON(): IMessageReadStatus {
        return {
        time: this.time,
        read: this.read,
        }
    }

    constructor(json: Partial<IMessageReadStatus>) {
        if (json["time"] !== undefined) {
            this.time = json["time"]!
        }
        this.read = json["read"]!
    }
}

export interface IMessageReadStatus {
    time?: number
    read: boolean
}
