import { Measure as MeasureDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { CodingReference, ICodingReference } from './CodingReference.model'
import { IReferenceRange, ReferenceRange } from './ReferenceRange.model'

@mapTo(MeasureDto)
export class Measure {
    value?: number
    ref?: number
    severity?: number
    severityCode?: string
    evolution?: number
    unit?: string
    unitCodes?: CodingReference[] = []
    comment?: string
    comparator?: string
    referenceRanges?: ReferenceRange[] = []

    toJSON(): IMeasure {
        return {
            value: this.value,
            ref: this.ref,
            severity: this.severity,
            severityCode: this.severityCode,
            evolution: this.evolution,
            unit: this.unit,
            unitCodes: this.unitCodes?.map((item) => item.toJSON()),
            comment: this.comment,
            comparator: this.comparator,
            referenceRanges: this.referenceRanges?.map((item) => item.toJSON()),
        }
    }

    constructor(json: Partial<IMeasure>) {
        if (json['value'] !== undefined) {
            this.value = json['value']!
        }
        if (json['ref'] !== undefined) {
            this.ref = json['ref']!
        }
        if (json['severity'] !== undefined) {
            this.severity = json['severity']!
        }
        if (json['severityCode'] !== undefined) {
            this.severityCode = json['severityCode']!
        }
        if (json['evolution'] !== undefined) {
            this.evolution = json['evolution']!
        }
        if (json['unit'] !== undefined) {
            this.unit = json['unit']!
        }
        if (json['unitCodes'] !== undefined) {
            this.unitCodes = json['unitCodes']!.map((item: any) => new CodingReference(item))
        }
        if (json['comment'] !== undefined) {
            this.comment = json['comment']!
        }
        if (json['comparator'] !== undefined) {
            this.comparator = json['comparator']!
        }
        if (json['referenceRanges'] !== undefined) {
            this.referenceRanges = json['referenceRanges']!.map((item: any) => new ReferenceRange(item))
        }
    }
}

export interface IMeasure {
    value?: number
    min?: number
    max?: number
    ref?: number
    severity?: number
    severityCode?: string
    evolution?: number
    unit?: string
    unitCodes?: ICodingReference[]
    comment?: string
    comparator?: string
    referenceRanges?: IReferenceRange[]
}
