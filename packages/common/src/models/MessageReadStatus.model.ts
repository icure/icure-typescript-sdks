import { MessageReadStatus as MessageReadStatusDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(MessageReadStatusDto)
export class MessageReadStatus {
    time: number | null
    read: boolean

    constructor(messageReadStatus: IMessageReadStatus) {
        this.time = messageReadStatus.time ?? null
        this.read = messageReadStatus.read ?? false
    }

    static toJSON(instance: MessageReadStatus): any {
        const pojo: any = {}
        if (instance.time !== undefined) pojo['time'] = instance.time
        pojo['read'] = instance.read
        return pojo
    }

    static fromJSON(pojo: any): MessageReadStatus {
        const obj = {} as IMessageReadStatus
        if (pojo['time'] !== undefined) {
            obj['time'] = pojo['time']
        }
        obj['read'] = pojo['read']
        return new MessageReadStatus(obj)
    }
}

interface IMessageReadStatus {
    time?: number | null
    read?: boolean
}
