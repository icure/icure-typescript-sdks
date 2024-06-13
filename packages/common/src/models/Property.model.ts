import { PropertyStub } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { PropertyType } from './PropertyType.model'
import { TypedValueObject } from './TypedValueObject.model'

@mapTo(PropertyStub)
export class Property {
    id: string
    type?: PropertyType
    typedValue?: TypedValueObject
    deleted?: number
    encryptedSelf?: string

    constructor(property: Partial<IProperty>) {
        this.id = property.id!
        this.type = property.type
        this.typedValue = property.typedValue
        this.deleted = property.deleted
        this.encryptedSelf = property.encryptedSelf
    }

    static toJSON(instance: Property): IProperty {
        const pojo: IProperty = {} as IProperty
        pojo['id'] = instance.id
        if (instance.type !== undefined) pojo['type'] = PropertyType.toJSON(instance.type)
        if (instance.typedValue !== undefined) pojo['typedValue'] = TypedValueObject.toJSON(instance.typedValue)
        if (instance.deleted !== undefined) pojo['deleted'] = instance.deleted
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: IProperty): Property {
        const obj = {} as IProperty
        obj['id'] = pojo['id']
        if (pojo['type'] !== undefined) {
            obj['type'] = PropertyType.fromJSON(pojo['type']!)
        }
        if (pojo['typedValue'] !== undefined) {
            obj['typedValue'] = TypedValueObject.fromJSON(pojo['typedValue']!)
        }
        if (pojo['deleted'] !== undefined) {
            obj['deleted'] = pojo['deleted']!
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']!
        }
        return new Property(obj)
    }
}

export interface IProperty {
    id: string
    type?: PropertyType
    typedValue?: TypedValueObject
    deleted?: number
    encryptedSelf?: string
}
