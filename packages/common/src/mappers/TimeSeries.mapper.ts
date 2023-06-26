import {TimeSeries as TimeSeriesDto} from '@icure/api'
import {TimeSeries} from "../models/TimeSeries.model";

function toTimeSeriesDtoFields(domain: TimeSeries): string[] | undefined {
    return domain.fields
}

function toTimeSeriesDtoSamples(domain: TimeSeries): number[][] | undefined {
    return domain.samples
}

function toTimeSeriesDtoMin(domain: TimeSeries): number[] | undefined {
    return domain.min
}

function toTimeSeriesDtoMax(domain: TimeSeries): number[] | undefined {
    return domain.max
}

function toTimeSeriesDtoMean(domain: TimeSeries): number[] | undefined {
    return domain.mean
}

function toTimeSeriesDtoMedian(domain: TimeSeries): number[] | undefined {
    return domain.median
}

function toTimeSeriesDtoVariance(domain: TimeSeries): number[] | undefined {
    return domain.variance
}

function toTimeSeriesFields(dto: TimeSeriesDto): string[] {
    return dto.fields ?? []
}

function toTimeSeriesSamples(dto: TimeSeriesDto): number[][] {
    return dto.samples ?? []
}

function toTimeSeriesMin(dto: TimeSeriesDto): number[] {
    return dto.min ?? []
}

function toTimeSeriesMax(dto: TimeSeriesDto): number[] {
    return dto.max ?? []
}

function toTimeSeriesMean(dto: TimeSeriesDto): number[] {
    return dto.mean ?? []
}

function toTimeSeriesMedian(dto: TimeSeriesDto): number[] {
    return dto.median ?? []
}

function toTimeSeriesVariance(dto: TimeSeriesDto): number[] {
    return dto.variance ?? []
}

export function mapTimeSeriesDtoToTimeSeries(dto: TimeSeriesDto): TimeSeries {
    return new TimeSeries({
        fields: toTimeSeriesFields(dto),
        samples: toTimeSeriesSamples(dto),
        min: toTimeSeriesMin(dto),
        max: toTimeSeriesMax(dto),
        mean: toTimeSeriesMean(dto),
        median: toTimeSeriesMedian(dto),
        variance: toTimeSeriesVariance(dto),
    })
}

export function mapTimeSeriesToTimeSeriesDto(domain: TimeSeries): TimeSeriesDto {
    return new TimeSeriesDto({
        fields: toTimeSeriesDtoFields(domain),
        samples: toTimeSeriesDtoSamples(domain),
        min: toTimeSeriesDtoMin(domain),
        max: toTimeSeriesDtoMax(domain),
        mean: toTimeSeriesDtoMean(domain),
        median: toTimeSeriesDtoMedian(domain),
        variance: toTimeSeriesDtoVariance(domain),
    })
}
