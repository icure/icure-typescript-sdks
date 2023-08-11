export class MessageReadStatus {
    time?: number
    read?: boolean

    constructor(messageReadStatus: IMessageReadStatus) {
        this.time = messageReadStatus.time
        this.read = messageReadStatus.read
    }

    static toJSON(instance: MessageReadStatus): any {
        const pojo: any = {}
        if (instance.time !== undefined) pojo['time'] = instance.time
        if (instance.read !== undefined) pojo['read'] = instance.read
        return pojo
    }

    static fromJSON(pojo: any): MessageReadStatus {
        const obj = {} as IMessageReadStatus
        if (pojo['time'] !== undefined) {
            obj['time'] = pojo['time']
        }
        if (pojo['read'] !== undefined) {
            obj['read'] = pojo['read']
        }
        return new MessageReadStatus(obj)
    }
}

interface IMessageReadStatus {
    time?: number
    read?: boolean
}
