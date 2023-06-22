import { Content } from '@icure/api'
import { mapTo, Measure, TimeSeries } from "@icure/typescript-common"
import { Observation } from './Observation.model'

@mapTo(Content)
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

    constructor(component?: IComponent | any) {
        this.numberValue = component?.numberValue
        this.booleanValue = component?.booleanValue
        this.instantValue = component?.instantValue
        this.fuzzyDateValue = component?.fuzzyDateValue
        this.measureValue = component?.measureValue
        this.timeSeries = component?.timeSeries
        this.compoundValue = component?.compoundValue
        this.ratio = component?.ratio
        this.range = component?.range
    }

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
        return new Component({numberValue: pojo["numberValue"], booleanValue: pojo["booleanValue"], instantValue: pojo["instantValue"], fuzzyDateValue: pojo["fuzzyDateValue"], measureValue: !!pojo["measureValue"] ? Measure.fromJSON(pojo["measureValue"]) : undefined, timeSeries: !!pojo["timeSeries"] ? TimeSeries.fromJSON(pojo["timeSeries"]) : undefined, compoundValue: pojo["compoundValue"]?.map((item: any) => Observation.fromJSON(item)), ratio: pojo["ratio"]?.map((item: any) => Measure.fromJSON(item)), range: pojo["range"]?.map((item: any) => Measure.fromJSON(item))})
    }
}

interface IComponent {
    numberValue?: number
    booleanValue?: boolean
    instantValue?: number
    fuzzyDateValue?: number
    measureValue?: Measure
    timeSeries?: TimeSeries
    compoundValue?: Observation[]
    ratio?: Measure[]
    range?: Measure[]
}
