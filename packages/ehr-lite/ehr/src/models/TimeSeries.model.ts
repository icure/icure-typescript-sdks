import { TimeSeries as TimeSeriesEntity } from '@icure/api'
import { mapTo } from '../mappings/mapper'

@mapTo(TimeSeriesEntity)
export class TimeSeries {
    fields?: string[]
    samples?: number[][]
    min?: number[]
    max?: number[]
    mean?: number[]
    median?: number[]
    variance?: number[]

    constructor(timeSeries?: ITimeSeries | any) {
        this.fields = timeSeries?.fields
        this.samples = timeSeries?.samples
        this.min = timeSeries?.min
        this.max = timeSeries?.max
        this.mean = timeSeries?.mean
        this.median = timeSeries?.median
        this.variance = timeSeries?.variance
    }

    static toJSON(instance: TimeSeries): any {
        const pojo: any = {}
        pojo['fields'] = instance.fields?.map((item) => item)
        pojo['samples'] = instance.samples?.map((item) => item.map((item) => item))
        pojo['min'] = instance.min?.map((item) => item)
        pojo['max'] = instance.max?.map((item) => item)
        pojo['mean'] = instance.mean?.map((item) => item)
        pojo['median'] = instance.median?.map((item) => item)
        pojo['variance'] = instance.variance?.map((item) => item)
        return pojo
    }

    static fromJSON(pojo: any): TimeSeries {
        return new TimeSeries({
            fields: pojo['fields']?.map((item: any) => item),
            samples: pojo['samples']?.map((item: any) => item.map((item: any) => item)),
            min: pojo['min']?.map((item: any) => item),
            max: pojo['max']?.map((item: any) => item),
            mean: pojo['mean']?.map((item: any) => item),
            median: pojo['median']?.map((item: any) => item),
            variance: pojo['variance']?.map((item: any) => item),
        })
    }
}

export interface ITimeSeries {
    fields?: string[]
    samples?: number[][]
    min?: number[]
    max?: number[]
    mean?: number[]
    median?: number[]
    variance?: number[]
}
