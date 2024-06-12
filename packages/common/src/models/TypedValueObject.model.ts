import { TypedValueObject as TypedValueObjectDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { TypeEnum } from './enums/Type.enum'

@mapTo(TypedValueObjectDto)
export class TypedValueObject {
    type?: TypeEnum
    booleanValue?: boolean
    integerValue?: number
    doubleValue?: number
    stringValue?: string
    dateValue?: number
    encryptedSelf?: string

    constructor(typedValueObject?: Partial<ITypedValueObject>) {
        this.type = typedValueObject?.type
        this.booleanValue = typedValueObject?.booleanValue
        this.integerValue = typedValueObject?.integerValue
        this.doubleValue = typedValueObject?.doubleValue
        this.stringValue = typedValueObject?.stringValue
        this.dateValue = typedValueObject?.dateValue
        this.encryptedSelf = typedValueObject?.encryptedSelf
    }

    static toJSON(instance: TypedValueObject): ITypedValueObject {
        const pojo: ITypedValueObject = {} as ITypedValueObject
        if (instance.type !== undefined) pojo["type"] = instance.type
        if (instance.booleanValue !== undefined) pojo["booleanValue"] = instance.booleanValue
        if (instance.integerValue !== undefined) pojo["integerValue"] = instance.integerValue
        if (instance.doubleValue !== undefined) pojo["doubleValue"] = instance.doubleValue
        if (instance.stringValue !== undefined) pojo["stringValue"] = instance.stringValue
        if (instance.dateValue !== undefined) pojo["dateValue"] = instance.dateValue
        if (instance.encryptedSelf !== undefined) pojo["encryptedSelf"] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: ITypedValueObject): TypedValueObject {
        const obj = {} as ITypedValueObject
        if (pojo["type"] !== undefined) {
            obj['type'] = pojo["type"]!
        }
        if (pojo["booleanValue"] !== undefined) {
            obj['booleanValue'] = pojo["booleanValue"]!
        }
        if (pojo["integerValue"] !== undefined) {
            obj['integerValue'] = pojo["integerValue"]!
        }
        if (pojo["doubleValue"] !== undefined) {
            obj['doubleValue'] = pojo["doubleValue"]!
        }
        if (pojo["stringValue"] !== undefined) {
            obj['stringValue'] = pojo["stringValue"]!
        }
        if (pojo["dateValue"] !== undefined) {
            obj['dateValue'] = pojo["dateValue"]!
        }
        if (pojo["encryptedSelf"] !== undefined) {
            obj['encryptedSelf'] = pojo["encryptedSelf"]!
        }
        return new TypedValueObject(obj)
    }
}

interface ITypedValueObject {
    type?: TypeEnum
    booleanValue?: boolean
    integerValue?: number
    doubleValue?: number
    stringValue?: string
    dateValue?: number
    encryptedSelf?: string
}
