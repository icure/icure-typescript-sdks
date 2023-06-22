import { PropertyStub } from '@icure/api';
import { mapTo } from "../utils/decorators";
import { PropertyType } from './PropertyType.model';
import { TypedValueObject } from './TypedValueObject.model';

@mapTo(PropertyStub)
export class Property {
    id?: string
    type?: PropertyType
    typedValue?: TypedValueObject
    deleted?: number
    encryptedSelf?: string

    constructor(property?: IProperty | any) {
        this.id = property?.id
        this.type = property?.type
        this.typedValue = property?.typedValue
        this.deleted = property?.deleted
        this.encryptedSelf = property?.encryptedSelf
    }

    static toJSON(instance: Property): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["type"] = !!instance.type ? PropertyType.toJSON(instance.type) : undefined
        pojo["typedValue"] = !!instance.typedValue ? TypedValueObject.toJSON(instance.typedValue) : undefined
        pojo["deleted"] = instance.deleted
        pojo["encryptedSelf"] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): Property {
        return new Property({id: pojo["id"], type: !!pojo["type"] ? PropertyType.fromJSON(pojo["type"]) : undefined, typedValue: !!pojo["typedValue"] ? TypedValueObject.fromJSON(pojo["typedValue"]) : undefined, deleted: pojo["deleted"], encryptedSelf: pojo["encryptedSelf"]})
    }
}

interface IProperty {
    id?: string
    type?: PropertyType
    typedValue?: TypedValueObject
    deleted?: number
    encryptedSelf?: string
}
