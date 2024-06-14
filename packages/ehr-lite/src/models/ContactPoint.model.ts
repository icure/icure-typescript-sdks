import { mapTo, TelecomDto } from '@icure/typescript-common'
import { ContactPointTelecomTypeEnum } from './enums/ContactPointTelecomType.enum'

@mapTo(TelecomDto)
export class ContactPoint implements IContactPoint {
    system?: ContactPointTelecomTypeEnum
    value?: string
    description?: string
    encryptedSelf?: string

    toJSON(): IContactPoint {
        return {
            system: this.system,
            value: this.value,
            description: this.description,
            encryptedSelf: this.encryptedSelf,
        }
    }

    constructor(json: Partial<IContactPoint>) {
        if (json['system'] !== undefined) {
            this.system = json['system']!
        }
        if (json['value'] !== undefined) {
            this.value = json['value']!
        }
        if (json['description'] !== undefined) {
            this.description = json['description']!
        }
        if (json['encryptedSelf'] !== undefined) {
            this.encryptedSelf = json['encryptedSelf']!
        }
    }
}

export interface IContactPoint {
    system?: ContactPointTelecomTypeEnum
    value?: string
    description?: string
    encryptedSelf?: string
}
