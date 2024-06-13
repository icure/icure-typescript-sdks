import { MessageReadStatus as MessageReadStatusDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(MessageReadStatusDto)
export class MessageReadStatus {
    time?: number
    read: boolean

    constructor(messageReadStatus: Partial<IMessageReadStatus>) {
        this.time = messageReadStatus.time
        this.read = messageReadStatus.read ?? false
    }

    static toJSON(instance: MessageReadStatus): IMessageReadStatus {
        const pojo: IMessageReadStatus = {} as IMessageReadStatus
        if (instance.time !== undefined) pojo['time'] = instance.time
        pojo['read'] = instance.read
        return pojo
    }

    static fromJSON(pojo: IMessageReadStatus): MessageReadStatus {
        const obj = {} as IMessageReadStatus
        if (pojo['time'] !== undefined) {
            obj['time'] = pojo['time']!
        }
        obj['read'] = pojo['read']
        return new MessageReadStatus(obj)
    }
}

export interface IMessageReadStatus {
    time?: number
    read: boolean
}
