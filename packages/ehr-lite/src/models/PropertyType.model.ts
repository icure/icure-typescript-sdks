import { PropertyTypeStub } from '@icure/api'
import {mapTo} from "@icure/typescript-common"
import { TypeEnum } from './enums/Type.enum'

@mapTo(PropertyTypeStub)
export class PropertyType {
    identifier?: string
    type?: TypeEnum

    constructor(propertyType?: IPropertyType | any) {
        this.identifier = propertyType?.identifier
        this.type = propertyType?.type
    }

    static toJSON(instance: PropertyType): any {
        const pojo: any = {}
        pojo['identifier'] = instance.identifier
        pojo['type'] = instance.type
        return pojo
    }

    static fromJSON(pojo: any): PropertyType {
        return new PropertyType({ identifier: pojo['identifier'], type: pojo['type'] })
    }
}

interface IPropertyType {
    identifier?: string
    type?: TypeEnum
}
