import { PropertyStub } from '@icure/api'
import { forceUuid } from "@icure/typescript-common"
import { EntityId } from '../types'
import { mapTo } from '../utils/decorators'
import { IPropertyType, PropertyType } from './PropertyType.model'
import { ITypedValueObject, TypedValueObject } from './TypedValueObject.model'

@mapTo(PropertyStub)
export class Property {
    id: EntityId
    type?: PropertyType
    typedValue?: TypedValueObject
    deleted?: number
    encryptedSelf?: string

    toJSON(): IProperty {
        return {
        id: this.id,
        type: !!this.type ? this.type.toJSON() : undefined,
        typedValue: !!this.typedValue ? this.typedValue.toJSON() : undefined,
        deleted: this.deleted,
        encryptedSelf: this.encryptedSelf,
        }
    }

    constructor(json: Partial<IProperty>) {
        this.id = forceUuid(json["id"]!)
        if (json["type"] !== undefined) {
            this.type = new PropertyType(json["type"]!)
        }
        if (json["typedValue"] !== undefined) {
            this.typedValue = new TypedValueObject(json["typedValue"]!)
        }
        if (json["deleted"] !== undefined) {
            this.deleted = json["deleted"]!
        }
        if (json["encryptedSelf"] !== undefined) {
            this.encryptedSelf = json["encryptedSelf"]!
        }
    }
}

export interface IProperty {
    id: EntityId
    type?: IPropertyType
    typedValue?: ITypedValueObject
    deleted?: number
    encryptedSelf?: string
}
