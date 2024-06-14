import { AdministrationQuantityDto, CodingReference, ICodingReference, mapTo } from '@icure/typescript-common'

@mapTo(AdministrationQuantityDto)
export class Quantity {
    value?: number
    code?: CodingReference
    unit?: string

    toJSON(): IQuantity {
        return {
            value: this.value,
            code: !!this.code ? this.code.toJSON() : undefined,
            unit: this.unit,
        }
    }

    constructor(json: Partial<IQuantity>) {
        if (json['value'] !== undefined) {
            this.value = json['value']!
        }
        if (json['code'] !== undefined) {
            this.code = new CodingReference(json['code']!)
        }
        if (json['unit'] !== undefined) {
            this.unit = json['unit']!
        }
    }
}

export interface IQuantity {
    value?: number
    code?: ICodingReference
    unit?: string
}
