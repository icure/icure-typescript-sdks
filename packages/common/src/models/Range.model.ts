import { Range as RangeDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(RangeDto)
export class Range {
    low?: number
    high?: number

    toJSON(): IRange {
        return {
        low: this.low,
        high: this.high,
        }
    }

    constructor(json: Partial<IRange>) {
        if (json["low"] !== undefined) {
            this.low = json["low"]!
        }
        if (json["high"] !== undefined) {
            this.high = json["high"]!
        }
    }
}

export interface IRange {
    low?: number
    high?: number
}
