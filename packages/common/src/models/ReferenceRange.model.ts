import { ReferenceRange as ReferenceRangeDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { Annotation, IAnnotation } from './Annotation.model'
import { CodingReference, ICodingReference } from './CodingReference.model'
import { IRange, Range } from './Range.model'

@mapTo(ReferenceRangeDto)
export class ReferenceRange {
    low?: number
    high?: number
    tags?: CodingReference[] = []
    codes?: CodingReference[] = []
    notes: Annotation[] = []
    age?: Range
    stringValue?: string

    toJSON(): IReferenceRange {
        return {
            low: this.low,
            high: this.high,
            tags: this.tags?.map((item) => item.toJSON()),
            codes: this.codes?.map((item) => item.toJSON()),
            notes: this.notes.map((item) => item.toJSON()),
            age: !!this.age ? this.age.toJSON() : undefined,
            stringValue: this.stringValue,
        }
    }

    constructor(json: Partial<IReferenceRange>) {
        if (json['low'] !== undefined) {
            this.low = json['low']!
        }
        if (json['high'] !== undefined) {
            this.high = json['high']!
        }
        if (json['tags'] !== undefined) {
            this.tags = json['tags']!.map((item: any) => new CodingReference(item))
        }
        if (json['codes'] !== undefined) {
            this.codes = json['codes']!.map((item: any) => new CodingReference(item))
        }
        if (json['notes'] !== undefined) {
            this.notes = json['notes']!.map((item: any) => new Annotation(item))
        }
        if (json['age'] !== undefined) {
            this.age = new Range(json['age']!)
        }
        if (json['stringValue'] !== undefined) {
            this.stringValue = json['stringValue']!
        }
    }
}

export interface IReferenceRange {
    low?: number
    high?: number
    tags?: ICodingReference[]
    codes?: ICodingReference[]
    notes: IAnnotation[]
    age?: IRange
    stringValue?: string
}
