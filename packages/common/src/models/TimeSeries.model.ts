/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { TimeSeries as TimeSeriesDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

/**
 * A high frequency time-series containing the ts in ms from the start (double) and the values
 */
@mapTo(TimeSeriesDto)
export class TimeSeries {
    constructor(json: Partial<ITimeSeries>) {
        Object.assign(this as TimeSeries, json)
    }

    'fields': Array<string>
    'samples': Array<Array<number>>
    'min': Array<number>
    'max': Array<number>
    'mean': Array<number>
    'median': Array<number>
    'variance': Array<number>

    static toJSON(instance: TimeSeries): ITimeSeries {
        const pojo: ITimeSeries = {} as ITimeSeries
        pojo['fields'] = instance.fields.map((item) => item)
        pojo['samples'] = instance.samples.map((item) => item.map((item) => item))
        pojo['min'] = instance.min.map((item) => item)
        pojo['max'] = instance.max.map((item) => item)
        pojo['mean'] = instance.mean.map((item) => item)
        pojo['median'] = instance.median.map((item) => item)
        pojo['variance'] = instance.variance.map((item) => item)
        return pojo
    }

    static fromJSON(pojo: ITimeSeries): TimeSeries {
        const obj = {} as ITimeSeries
        obj['fields'] = pojo['fields'].map((item: any) => item)
        obj['samples'] = pojo['samples'].map((item: any) => item.map((item: any) => item))
        obj['min'] = pojo['min'].map((item: any) => item)
        obj['max'] = pojo['max'].map((item: any) => item)
        obj['mean'] = pojo['mean'].map((item: any) => item)
        obj['median'] = pojo['median'].map((item: any) => item)
        obj['variance'] = pojo['variance'].map((item: any) => item)
        return new TimeSeries(obj)
    }
}

export interface ITimeSeries {
    fields: Array<string>
    samples: Array<Array<number>>
    min: Array<number>
    max: Array<number>
    mean: Array<number>
    median: Array<number>
    variance: Array<number>
}
