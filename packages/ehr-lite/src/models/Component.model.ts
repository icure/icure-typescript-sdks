import { ContentDto, IMeasure, ITimeSeries, Measure, TimeSeries, mapTo } from '@icure/typescript-common'
import { IObservation, Observation } from './Observation.model'

@mapTo(ContentDto)
export class Component implements IComponent {
    numberValue?: number
    booleanValue?: boolean
    instantValue?: number
    fuzzyDateValue?: number
    measureValue?: Measure
    timeSeries?: TimeSeries
    compoundValue?: Observation[] = []
    ratio?: Measure[] = []
    range?: Measure[] = []

    toJSON(): IComponent {
        return {
        numberValue: this.numberValue,
        booleanValue: this.booleanValue,
        instantValue: this.instantValue,
        fuzzyDateValue: this.fuzzyDateValue,
        measureValue: !!this.measureValue ? this.measureValue.toJSON() : undefined,
        timeSeries: !!this.timeSeries ? this.timeSeries.toJSON() : undefined,
        compoundValue: this.compoundValue?.map(item => item.toJSON()),
        ratio: this.ratio?.map(item => item.toJSON()),
        range: this.range?.map(item => item.toJSON()),
        }
    }

    constructor(json: Partial<IComponent> ) {
        if (json["numberValue"] !== undefined) {
            this.numberValue = json["numberValue"]!
        }
        if (json["booleanValue"] !== undefined) {
            this.booleanValue = json["booleanValue"]!
        }
        if (json["instantValue"] !== undefined) {
            this.instantValue = json["instantValue"]!
        }
        if (json["fuzzyDateValue"] !== undefined) {
            this.fuzzyDateValue = json["fuzzyDateValue"]!
        }
        if (json["measureValue"] !== undefined) {
            this.measureValue = new Measure(json["measureValue"]!)
        }
        if (json["timeSeries"] !== undefined) {
            this.timeSeries = new TimeSeries(json["timeSeries"]!)
        }
        if (json["compoundValue"] !== undefined) {
            this.compoundValue = json["compoundValue"]!.map((item: any) => new Observation(item))
        }
        if (json["ratio"] !== undefined) {
            this.ratio = json["ratio"]!.map((item: any) => new Measure(item))
        }
        if (json["range"] !== undefined) {
            this.range = json["range"]!.map((item: any) => new Measure(item))
        }
    }
}

export interface IComponent {
    numberValue?: number
    booleanValue?: boolean
    instantValue?: number
    fuzzyDateValue?: number
    measureValue?: IMeasure
    timeSeries?: ITimeSeries
    compoundValue?: IObservation[]
    ratio?: IMeasure[]
    range?: IMeasure[]
}
