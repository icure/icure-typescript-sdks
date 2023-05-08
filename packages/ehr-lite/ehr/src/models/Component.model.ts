import {Measure} from "./Measure.model";
import {TimeSeries} from "./TimeSeries.model";
import {Observation} from "./Observation.model";

export class Component {
    numberValue?: number
    booleanValue?: boolean
    instantValue?: number
    fuzzyDateValue?: number
    measureValue?: Measure
    timeSeries?: TimeSeries
    compoundValue?: Observation[]
    ratio?: Measure[]
    range?: Measure[]

    static toJSON(instance: Component): any {
        const pojo: any = {}
        pojo["numberValue"] = instance.numberValue
        pojo["booleanValue"] = instance.booleanValue
        pojo["instantValue"] = instance.instantValue
        pojo["fuzzyDateValue"] = instance.fuzzyDateValue
        pojo["measureValue"] = !!instance.measureValue ? Measure.toJSON(instance.measureValue) : undefined
        pojo["timeSeries"] = !!instance.timeSeries ? TimeSeries.toJSON(instance.timeSeries) : undefined
        pojo["compoundValue"] = instance.compoundValue?.map(item => Observation.toJSON(item))
        pojo["ratio"] = instance.ratio?.map(item => Measure.toJSON(item))
        pojo["range"] = instance.range?.map(item => Measure.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: any): Component {
        const instance = new Component()
        if (pojo["numberValue"] === undefined) instance.numberValue = undefined
        else instance.numberValue = pojo["numberValue"]
        if (pojo["booleanValue"] === undefined) instance.booleanValue = undefined
        else instance.booleanValue = pojo["booleanValue"]
        if (pojo["instantValue"] === undefined) instance.instantValue = undefined
        else instance.instantValue = pojo["instantValue"]
        if (pojo["fuzzyDateValue"] === undefined) instance.fuzzyDateValue = undefined
        else instance.fuzzyDateValue = pojo["fuzzyDateValue"]
        if (pojo["measureValue"] === undefined) instance.measureValue = undefined
        else instance.measureValue = !!pojo["measureValue"] ? Measure.fromJSON(pojo["measureValue"]) : undefined
        if (pojo["timeSeries"] === undefined) instance.timeSeries = undefined
        else instance.timeSeries = !!pojo["timeSeries"] ? TimeSeries.fromJSON(pojo["timeSeries"]) : undefined
        if (pojo["compoundValue"] === undefined) instance.compoundValue = undefined
        else instance.compoundValue = pojo["compoundValue"]?.map((item: any) => Observation.fromJSON(item))
        if (pojo["ratio"] === undefined) instance.ratio = undefined
        else instance.ratio = pojo["ratio"]?.map((item: any) => Measure.fromJSON(item))
        if (pojo["range"] === undefined) instance.range = undefined
        else instance.range = pojo["range"]?.map((item: any) => Measure.fromJSON(item))
        return instance
    }
}
