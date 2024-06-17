import { AdministrationQuantityDto, CodingReference, ICodingReference, mapTo } from '@icure/typescript-common'

/**
 * Quantity model
 *
 * A measured amount (or an amount that can potentially be measured).
 *
 * @param value The value of the measured amount. The value includes an implicit precision in the presentation of the value.
 * @param code The identification of the system that provides the coded form of the unit.
 * @param unit A human-readable form of the unit. The unit may additionally be coded in some formal way using the `code` property.
 */
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
