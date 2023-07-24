import { Telecom } from '@icure/api'
import { mapTo } from '@icure/typescript-common'
import { ContactPointTelecomTypeEnum } from './enums/ContactPointTelecomType.enum'

@mapTo(Telecom)
export class ContactPoint {
    system?: ContactPointTelecomTypeEnum
    value?: string
    description?: string
    encryptedSelf?: string

    constructor(contactPoint?: IContactPoint | any) {
        this.system = contactPoint?.system
        this.value = contactPoint?.value
        this.description = contactPoint?.description
    }

    static toJSON(instance: ContactPoint): any {
        const pojo: any = {}
        if (instance.system !== undefined) pojo['system'] = instance.system
        if (instance.value !== undefined) pojo['value'] = instance.value
        if (instance.description !== undefined) pojo['description'] = instance.description
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): ContactPoint {
        const obj = {} as IContactPoint
        if (pojo['system'] !== undefined) {
            obj['system'] = pojo['system']
        }
        if (pojo['value'] !== undefined) {
            obj['value'] = pojo['value']
        }
        if (pojo['description'] !== undefined) {
            obj['description'] = pojo['description']
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        return new ContactPoint(obj)
    }
}

interface IContactPoint {
    system?: ContactPointTelecomTypeEnum
    value?: string
    description?: string
    encryptedSelf?: string
}
