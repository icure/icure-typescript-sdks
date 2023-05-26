import { TypedValueObject as TypedValueObjectEntity } from '@icure/api'
import { mapTo } from '../mappings/mapper'
import { TypeEnum } from './enums/Type.enum'

@mapTo(TypedValueObjectEntity)
export class TypedValueObject {
    type?: TypeEnum
    booleanValue?: boolean
    integerValue?: number
    doubleValue?: number
    stringValue?: string
    dateValue?: number
    encryptedSelf?: string

    constructor(typedValueObject?: ITypedValueObject | any) {
        this.type = typedValueObject?.type
        this.booleanValue = typedValueObject?.booleanValue
        this.integerValue = typedValueObject?.integerValue
        this.doubleValue = typedValueObject?.doubleValue
        this.stringValue = typedValueObject?.stringValue
        this.dateValue = typedValueObject?.dateValue
        this.encryptedSelf = typedValueObject?.encryptedSelf
    }

    static toJSON(instance: TypedValueObject): any {
        const pojo: any = {}
        pojo['type'] = instance.type
        pojo['booleanValue'] = instance.booleanValue
        pojo['integerValue'] = instance.integerValue
        pojo['doubleValue'] = instance.doubleValue
        pojo['stringValue'] = instance.stringValue
        pojo['dateValue'] = instance.dateValue
        pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): TypedValueObject {
        return new TypedValueObject({ type: pojo['type'], booleanValue: pojo['booleanValue'], integerValue: pojo['integerValue'], doubleValue: pojo['doubleValue'], stringValue: pojo['stringValue'], dateValue: pojo['dateValue'], encryptedSelf: pojo['encryptedSelf'] })
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
