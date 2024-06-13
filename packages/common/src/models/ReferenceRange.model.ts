import { ReferenceRange as ReferenceRangeDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { Annotation } from './Annotation.model'
import { CodingReference } from './CodingReference.model'
import { Range } from './Range.model'

@mapTo(ReferenceRangeDto)
export class ReferenceRange {
    low?: number
    high?: number
    tags?: CodingReference[]
    codes?: CodingReference[]
    notes?: Annotation[]
    age?: Range
    stringValue?: string

    constructor(referenceRange: Partial<IReferenceRange>) {
        this.low = referenceRange.low
        this.high = referenceRange.high
        this.tags = referenceRange.tags
        this.codes = referenceRange.codes
        this.notes = referenceRange.notes
        this.age = referenceRange.age
        this.stringValue = referenceRange.stringValue
    }

    static toJSON(instance: ReferenceRange): IReferenceRange {
        const pojo: IReferenceRange = {} as IReferenceRange
        if (instance.low !== undefined) pojo['low'] = instance.low
        if (instance.high !== undefined) pojo['high'] = instance.high
        if (instance.tags !== undefined) pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        if (instance.codes !== undefined) pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        if (instance.notes !== undefined) pojo['notes'] = instance.notes.map((item) => Annotation.toJSON(item))
        if (instance.age !== undefined) pojo['age'] = Range.toJSON(instance.age)
        if (instance.stringValue !== undefined) pojo['stringValue'] = instance.stringValue
        return pojo
    }

    static fromJSON(pojo: IReferenceRange): ReferenceRange {
        const obj = {} as IReferenceRange
        if (pojo['low'] !== undefined) {
            obj['low'] = pojo['low']!
        }
        if (pojo['high'] !== undefined) {
            obj['high'] = pojo['high']!
        }
        if (pojo['tags'] !== undefined) {
            obj['tags'] = pojo['tags']!.map((item: any) => CodingReference.fromJSON(item))
        }
        if (pojo['codes'] !== undefined) {
            obj['codes'] = pojo['codes']!.map((item: any) => CodingReference.fromJSON(item))
        }
        if (pojo['notes'] !== undefined) {
            obj['notes'] = pojo['notes']!.map((item: any) => Annotation.fromJSON(item))
        }
        if (pojo['age'] !== undefined) {
            obj['age'] = Range.fromJSON(pojo['age']!)
        }
        if (pojo['stringValue'] !== undefined) {
            obj['stringValue'] = pojo['stringValue']!
        }
        return new ReferenceRange(obj)
    }
}

export interface IReferenceRange {
    low?: number
    high?: number
    tags?: CodingReference[]
    codes?: CodingReference[]
    notes?: Annotation[]
    age?: Range
    stringValue?: string
}
