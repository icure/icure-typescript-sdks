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

    constructor(property: IProperty) {
        this.id = property.id!
        this.type = property.type
        this.typedValue = property.typedValue
        this.deleted = property.deleted
        this.encryptedSelf = property.encryptedSelf
    }

    static toJSON(instance: Property): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.type !== undefined) pojo['type'] = !!instance.type ? PropertyType.toJSON(instance.type) : undefined
        if (instance.typedValue !== undefined) pojo['typedValue'] = !!instance.typedValue ? TypedValueObject.toJSON(instance.typedValue) : undefined
        if (instance.deleted !== undefined) pojo['deleted'] = instance.deleted
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): Property {
        const obj = {} as IProperty
        obj['id'] = pojo['id']
        if (pojo['type'] !== undefined) {
            obj['type'] = !!pojo['type'] ? PropertyType.fromJSON(pojo['type']) : undefined
        }
        if (pojo['typedValue'] !== undefined) {
            obj['typedValue'] = !!pojo['typedValue'] ? TypedValueObject.fromJSON(pojo['typedValue']) : undefined
        }
        if (pojo['deleted'] !== undefined) {
            obj['deleted'] = pojo['deleted']
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        return new Property(obj)
    }
}

interface IProperty {
    id?: string
    type?: PropertyType
    typedValue?: TypedValueObject
    deleted?: number
    encryptedSelf?: string
}
