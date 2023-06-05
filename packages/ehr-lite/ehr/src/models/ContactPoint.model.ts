import { Telecom } from '@icure/api'
import { mapTo } from '../mappings/mapper'
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
        pojo['system'] = instance.system
        pojo['value'] = instance.value
        pojo['description'] = instance.description
        pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): ContactPoint {
        return new ContactPoint({ system: pojo['system'], value: pojo['value'], description: pojo['description'], encryptedSelf: pojo['encryptedSelf'] })
    }
}

interface IContactPoint {
    system?: ContactPointTelecomTypeEnum
    value?: string
    description?: string
    encryptedSelf?: string
}
