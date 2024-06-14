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

    toJSON(): ITypedValueObject {
        return {
        type: this.type,
        booleanValue: this.booleanValue,
        integerValue: this.integerValue,
        doubleValue: this.doubleValue,
        stringValue: this.stringValue,
        dateValue: this.dateValue,
        encryptedSelf: this.encryptedSelf,
        }
    }

    constructor(json: Partial<ITypedValueObject> ) {
        if (json["type"] !== undefined) {
            this.type = json["type"]!
        }
        if (json["booleanValue"] !== undefined) {
            this.booleanValue = json["booleanValue"]!
        }
        if (json["integerValue"] !== undefined) {
            this.integerValue = json["integerValue"]!
        }
        if (json["doubleValue"] !== undefined) {
            this.doubleValue = json["doubleValue"]!
        }
        if (json["stringValue"] !== undefined) {
            this.stringValue = json["stringValue"]!
        }
        if (json["dateValue"] !== undefined) {
            this.dateValue = json["dateValue"]!
        }
        if (json["encryptedSelf"] !== undefined) {
            this.encryptedSelf = json["encryptedSelf"]!
        }
    }
}

export interface ITypedValueObject {
    type?: TypeEnum
    booleanValue?: boolean
    integerValue?: number
    doubleValue?: number
    stringValue?: string
    dateValue?: number
    encryptedSelf?: string
}
