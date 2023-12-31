import { PropertyTypeStub } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { TypeEnum } from './enums/Type.enum'

@mapTo(PropertyTypeStub)
export class PropertyType {
    identifier: string
    type?: TypeEnum

    constructor(propertyType: IPropertyType) {
        this.identifier = propertyType.identifier!
        this.type = propertyType.type
    }

    static toJSON(instance: PropertyType): any {
        const pojo: any = {}
        pojo['identifier'] = instance.identifier
        if (instance.type !== undefined) pojo['type'] = instance.type
        return pojo
    }

    static fromJSON(pojo: any): PropertyType {
        const obj = {} as IPropertyType
        obj['identifier'] = pojo['identifier']
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']
        }
        return new PropertyType(obj)
    }
}

interface IPropertyType {
    identifier?: string
    type?: TypeEnum
}
