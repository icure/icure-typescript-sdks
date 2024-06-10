import { AdministrationQuantityDto, CodingReference, mapTo } from '@icure/typescript-common'

@mapTo(AdministrationQuantityDto)
export class Quantity {
    value?: number
    code?: CodingReference
    unit?: string

    constructor(quantity: IQuantity) {
        this.value = quantity.value
        this.code = quantity.code
        this.unit = quantity.unit
    }

    static toJSON(instance: Quantity): any {
        const pojo: any = {}
        if (instance.value !== undefined) pojo['value'] = instance.value
        if (instance.code !== undefined) pojo['code'] = !!instance.code ? CodingReference.toJSON(instance.code) : undefined
        if (instance.unit !== undefined) pojo['unit'] = instance.unit
        return pojo
    }

    static fromJSON(pojo: any): Quantity {
        const obj = {} as IQuantity
        if (pojo['value'] !== undefined) {
            obj['value'] = pojo['value']
        }
        if (pojo['code'] !== undefined) {
            obj['code'] = !!pojo['code'] ? CodingReference.fromJSON(pojo['code']) : undefined
        }
        if (pojo['unit'] !== undefined) {
            obj['unit'] = pojo['unit']
        }
        return new Quantity(obj)
    }
}

interface IQuantity {
    value?: number
    code?: CodingReference
    unit?: string
}
