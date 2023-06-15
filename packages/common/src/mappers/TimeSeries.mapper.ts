import { TimeSeries } from '../models/TimeSeries.model'
import { TimeSeries as TimeSeriesDto } from '@icure/api'
import { createMap, forMember, mapFrom } from '@automapper/core'
import { mapper } from './mapper'

function forMember_TimeSeriesDto_fields() {
    return forMember<TimeSeries, TimeSeriesDto>(
        (v) => v.fields,
        mapFrom((t) => t.fields)
    )
}

function forMember_TimeSeriesDto_samples() {
    return forMember<TimeSeries, TimeSeriesDto>(
        (v) => v.samples,
        mapFrom((t) => t.samples)
    )
}

function forMember_TimeSeriesDto_min() {
    return forMember<TimeSeries, TimeSeriesDto>(
        (v) => v.min,
        mapFrom((t) => t.min)
    )
}

function forMember_TimeSeriesDto_max() {
    return forMember<TimeSeries, TimeSeriesDto>(
        (v) => v.max,
        mapFrom((t) => t.max)
    )
}

function forMember_TimeSeriesDto_mean() {
    return forMember<TimeSeries, TimeSeriesDto>(
        (v) => v.mean,
        mapFrom((t) => t.mean)
    )
}

function forMember_TimeSeriesDto_median() {
    return forMember<TimeSeries, TimeSeriesDto>(
        (v) => v.median,
        mapFrom((t) => t.median)
    )
}

function forMember_TimeSeriesDto_variance() {
    return forMember<TimeSeries, TimeSeriesDto>(
        (v) => v.variance,
        mapFrom((t) => t.variance)
    )
}

function forMember_TimeSeries_fields() {
    return forMember<TimeSeriesDto, TimeSeries>(
        (v) => v.fields,
        mapFrom((t) => t.fields)
    )
}

function forMember_TimeSeries_samples() {
    return forMember<TimeSeriesDto, TimeSeries>(
        (v) => v.samples,
        mapFrom((t) => t.samples)
    )
}

function forMember_TimeSeries_min() {
    return forMember<TimeSeriesDto, TimeSeries>(
        (v) => v.min,
        mapFrom((t) => t.min)
    )
}

function forMember_TimeSeries_max() {
    return forMember<TimeSeriesDto, TimeSeries>(
        (v) => v.max,
        mapFrom((t) => t.max)
    )
}

function forMember_TimeSeries_mean() {
    return forMember<TimeSeriesDto, TimeSeries>(
        (v) => v.mean,
        mapFrom((t) => t.mean)
    )
}

function forMember_TimeSeries_median() {
    return forMember<TimeSeriesDto, TimeSeries>(
        (v) => v.median,
        mapFrom((t) => t.median)
    )
}

function forMember_TimeSeries_variance() {
    return forMember<TimeSeriesDto, TimeSeries>(
        (v) => v.variance,
        mapFrom((t) => t.variance)
    )
}

export function initializeTimeSeriesMapper() {
    createMap(mapper, TimeSeries, TimeSeriesDto, forMember_TimeSeriesDto_fields(), forMember_TimeSeriesDto_samples(), forMember_TimeSeriesDto_min(), forMember_TimeSeriesDto_max(), forMember_TimeSeriesDto_mean(), forMember_TimeSeriesDto_median(), forMember_TimeSeriesDto_variance())

    createMap(mapper, TimeSeriesDto, TimeSeries, forMember_TimeSeries_fields(), forMember_TimeSeries_samples(), forMember_TimeSeries_min(), forMember_TimeSeries_max(), forMember_TimeSeries_mean(), forMember_TimeSeries_median(), forMember_TimeSeries_variance())
}

export function mapTimeSeriesDtoToTimeSeries(entity: TimeSeriesDto): TimeSeries {
    return mapper.map(entity, TimeSeriesDto, TimeSeries)
}

export function mapTimeSeriesToTimeSeriesDto(model: TimeSeries): TimeSeriesDto {
    return mapper.map(model, TimeSeries, TimeSeriesDto)
}
