import { Measure as MeasureDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { CodingReference } from './CodingReference.model'
import { ReferenceRange } from './ReferenceRange.model'

@mapTo(MeasureDto)
export class Measure {
    value?: number
    ref?: number
    severity?: number
    severityCode?: string
    evolution?: number
    unit?: string
    unitCodes?: CodingReference[]
    comment?: string
    comparator?: string
    referenceRanges?: ReferenceRange[]

    constructor(measure: Partial<IMeasure>) {
        this.value = measure.value
        this.ref = measure.ref
        this.severity = measure.severity
        this.severityCode = measure.severityCode
        this.evolution = measure.evolution
        this.unit = measure.unit
        this.unitCodes = measure.unitCodes
        this.comment = measure.comment
        this.comparator = measure.comparator
        this.referenceRanges = measure.referenceRanges
    }

    static toJSON(instance: Measure): IMeasure {
        const pojo: IMeasure = {} as IMeasure
        if (instance.value !== undefined) pojo["value"] = instance.value
        if (instance.ref !== undefined) pojo["ref"] = instance.ref
        if (instance.severity !== undefined) pojo["severity"] = instance.severity
        if (instance.severityCode !== undefined) pojo["severityCode"] = instance.severityCode
        if (instance.evolution !== undefined) pojo["evolution"] = instance.evolution
        if (instance.unit !== undefined) pojo["unit"] = instance.unit
        if (instance.unitCodes !== undefined) pojo["unitCodes"] = instance.unitCodes.map(item => CodingReference.toJSON(item))
        if (instance.comment !== undefined) pojo["comment"] = instance.comment
        if (instance.comparator !== undefined) pojo["comparator"] = instance.comparator
        if (instance.referenceRanges !== undefined) pojo["referenceRanges"] = instance.referenceRanges.map(item => ReferenceRange.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: IMeasure): Measure {
        const obj = {} as IMeasure
        if (pojo["value"] !== undefined) {
            obj['value'] = pojo["value"]!
        }
        if (pojo["ref"] !== undefined) {
            obj['ref'] = pojo["ref"]!
        }
        if (pojo["severity"] !== undefined) {
            obj['severity'] = pojo["severity"]!
        }
        if (pojo["severityCode"] !== undefined) {
            obj['severityCode'] = pojo["severityCode"]!
        }
        if (pojo["evolution"] !== undefined) {
            obj['evolution'] = pojo["evolution"]!
        }
        if (pojo["unit"] !== undefined) {
            obj['unit'] = pojo["unit"]!
        }
        if (pojo["unitCodes"] !== undefined) {
            obj['unitCodes'] = pojo["unitCodes"]!.map((item: any) => CodingReference.fromJSON(item))
        }
        if (pojo["comment"] !== undefined) {
            obj['comment'] = pojo["comment"]!
        }
        if (pojo["comparator"] !== undefined) {
            obj['comparator'] = pojo["comparator"]!
        }
        if (pojo["referenceRanges"] !== undefined) {
            obj['referenceRanges'] = pojo["referenceRanges"]!.map((item: any) => ReferenceRange.fromJSON(item))
        }
        return new Measure(obj)
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
    unitCodes?: CodingReference[]
    comment?: string
    comparator?: string
    referenceRanges?: ReferenceRange[]
}
