import { Range as RangeDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(RangeDto)
export class Range {
    low?: number
    high?: number

    constructor(range: IRange) {
        this.low = range.low
        this.high = range.high
    }

    static toJSON(instance: Range): any {
        const pojo: any = {}
        if (instance.low !== undefined) pojo['low'] = instance.low
        if (instance.high !== undefined) pojo['high'] = instance.high
        return pojo
    }

    static fromJSON(pojo: any): Range {
        const obj = {} as IRange
        if (pojo['low'] !== undefined) {
            obj['low'] = pojo['low']
        }
        if (pojo['high'] !== undefined) {
            obj['high'] = pojo['high']
        }
        return new Range(obj)
    }
}

interface IRange {
    low?: number
    high?: number
}
