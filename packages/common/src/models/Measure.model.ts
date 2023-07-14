import { Measure as MeasureDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { CodingReference } from './CodingReference.model'

@mapTo(MeasureDto)
export class Measure {
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

    constructor(measure: IMeasure) {
        this.value = measure.value
        this.min = measure.min
        this.max = measure.max
        this.ref = measure.ref
        this.severity = measure.severity
        this.severityCode = measure.severityCode
        this.evolution = measure.evolution
        this.unit = measure.unit
        this.unitCodes = measure.unitCodes
        this.comment = measure.comment
        this.comparator = measure.comparator
    }

    static toJSON(instance: Measure): any {
        const pojo: any = {}
        pojo['value'] = instance.value
        pojo['min'] = instance.min
        pojo['max'] = instance.max
        pojo['ref'] = instance.ref
        pojo['severity'] = instance.severity
        pojo['severityCode'] = instance.severityCode
        pojo['evolution'] = instance.evolution
        pojo['unit'] = instance.unit
        pojo['unitCodes'] = instance.unitCodes?.map((item) => CodingReference.toJSON(item))
        pojo['comment'] = instance.comment
        pojo['comparator'] = instance.comparator
        return pojo
    }

    static fromJSON(pojo: any): Measure {
        return new Measure({
            value: pojo['value'],
            min: pojo['min'],
            max: pojo['max'],
            ref: pojo['ref'],
            severity: pojo['severity'],
            severityCode: pojo['severityCode'],
            evolution: pojo['evolution'],
            unit: pojo['unit'],
            unitCodes: pojo['unitCodes']?.map((item: any) => CodingReference.fromJSON(item)),
            comment: pojo['comment'],
            comparator: pojo['comparator'],
        })
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
}
