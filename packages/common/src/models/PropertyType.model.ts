import { PropertyTypeStub } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { TypeEnum } from './enums/Type.enum'

@mapTo(PropertyTypeStub)
export class PropertyType {
    identifier?: string
    type?: TypeEnum

    toJSON(): IPropertyType {
        return {
        identifier: this.identifier,
        type: this.type,
        }
    }

    constructor(json: Partial<IPropertyType>) {
        if (json["identifier"] !== undefined) {
            this.identifier = json["identifier"]!
        }
        if (json["type"] !== undefined) {
            this.type = json["type"]!
        }
    }
}

export interface IPropertyType {
    identifier?: string
    type?: TypeEnum
}
