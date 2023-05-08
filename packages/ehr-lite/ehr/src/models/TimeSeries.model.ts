export class TimeSeries {
    fields?: string[]
    samples?: number[][]
    min?: number[]
    max?: number[]
    mean?: number[]
    median?: number[]
    variance?: number[]

    static toJSON(instance: TimeSeries): any {
        const pojo: any = {}
        pojo["fields"] = instance.fields?.map(item => item)
        pojo["samples"] = instance.samples?.map(item => item.map(item => item))
        pojo["min"] = instance.min?.map(item => item)
        pojo["max"] = instance.max?.map(item => item)
        pojo["mean"] = instance.mean?.map(item => item)
        pojo["median"] = instance.median?.map(item => item)
        pojo["variance"] = instance.variance?.map(item => item)
        return pojo
    }

    static fromJSON(pojo: any): TimeSeries {
        const instance = new TimeSeries()
        if (pojo["fields"] === undefined) instance.fields = undefined
        else instance.fields = pojo["fields"]?.map((item: any) => item)
        if (pojo["samples"] === undefined) instance.samples = undefined
        else instance.samples = pojo["samples"]?.map((item: any) => item.map((item: any) => item))
        if (pojo["min"] === undefined) instance.min = undefined
        else instance.min = pojo["min"]?.map((item: any) => item)
        if (pojo["max"] === undefined) instance.max = undefined
        else instance.max = pojo["max"]?.map((item: any) => item)
        if (pojo["mean"] === undefined) instance.mean = undefined
        else instance.mean = pojo["mean"]?.map((item: any) => item)
        if (pojo["median"] === undefined) instance.median = undefined
        else instance.median = pojo["median"]?.map((item: any) => item)
        if (pojo["variance"] === undefined) instance.variance = undefined
        else instance.variance = pojo["variance"]?.map((item: any) => item)
        return instance
    }
}
