import { ContentDto, Measure, TimeSeries, mapTo } from '@icure/typescript-common'
import { Observation } from './Observation.model'

@mapTo(ContentDto)
export class Component implements IComponent {
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

    static toJSON(instance: Component): IComponent {
        const pojo: any = {}
        if (instance.numberValue !== undefined) pojo['numberValue'] = instance.numberValue
        if (instance.booleanValue !== undefined) pojo['booleanValue'] = instance.booleanValue
        if (instance.instantValue !== undefined) pojo['instantValue'] = instance.instantValue
        if (instance.fuzzyDateValue !== undefined) pojo['fuzzyDateValue'] = instance.fuzzyDateValue
        if (instance.measureValue !== undefined) pojo['measureValue'] = !!instance.measureValue ? Measure.toJSON(instance.measureValue) : undefined
        if (instance.timeSeries !== undefined) pojo['timeSeries'] = !!instance.timeSeries ? TimeSeries.toJSON(instance.timeSeries) : undefined
        if (instance.compoundValue !== undefined) pojo['compoundValue'] = instance.compoundValue?.map((item) => Observation.toJSON(item))
        if (instance.ratio !== undefined) pojo['ratio'] = instance.ratio?.map((item) => Measure.toJSON(item))
        if (instance.range !== undefined) pojo['range'] = instance.range?.map((item) => Measure.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: IComponent): Component {
        const obj = {} as IComponent
        if (pojo['numberValue'] !== undefined) {
            obj['numberValue'] = pojo['numberValue']
        }
        if (pojo['booleanValue'] !== undefined) {
            obj['booleanValue'] = pojo['booleanValue']
        }
        if (pojo['instantValue'] !== undefined) {
            obj['instantValue'] = pojo['instantValue']
        }
        if (pojo['fuzzyDateValue'] !== undefined) {
            obj['fuzzyDateValue'] = pojo['fuzzyDateValue']
        }
        if (pojo['measureValue'] !== undefined) {
            obj['measureValue'] = !!pojo['measureValue'] ? Measure.fromJSON(pojo['measureValue']) : undefined
        }
        if (pojo['timeSeries'] !== undefined) {
            obj['timeSeries'] = !!pojo['timeSeries'] ? TimeSeries.fromJSON(pojo['timeSeries']) : undefined
        }
        if (pojo['compoundValue'] !== undefined) {
            obj['compoundValue'] = pojo['compoundValue']?.map((item: any) => Observation.fromJSON(item))
        }
        if (pojo['ratio'] !== undefined) {
            obj['ratio'] = pojo['ratio']?.map((item: any) => Measure.fromJSON(item))
        }
        if (pojo['range'] !== undefined) {
            obj['range'] = pojo['range']?.map((item: any) => Measure.fromJSON(item))
        }
        return new Component(obj)
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
