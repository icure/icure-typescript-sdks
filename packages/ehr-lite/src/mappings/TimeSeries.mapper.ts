import { TimeSeries } from '../models/TimeSeries.model'
import { TimeSeries as TimeSeriesEntity } from '@icure/api'
import { createMap, forMember, mapFrom } from '@automapper/core'
import { mapper } from './mapper'

function forMember_TimeSeriesEntity_fields() {
    return forMember<TimeSeries, TimeSeriesEntity>(
        (v) => v.fields,
        mapFrom((t) => t.fields)
    )
}

function forMember_TimeSeriesEntity_samples() {
    return forMember<TimeSeries, TimeSeriesEntity>(
        (v) => v.samples,
        mapFrom((t) => t.samples)
    )
}

function forMember_TimeSeriesEntity_min() {
    return forMember<TimeSeries, TimeSeriesEntity>(
        (v) => v.min,
        mapFrom((t) => t.min)
    )
}

function forMember_TimeSeriesEntity_max() {
    return forMember<TimeSeries, TimeSeriesEntity>(
        (v) => v.max,
        mapFrom((t) => t.max)
    )
}

function forMember_TimeSeriesEntity_mean() {
    return forMember<TimeSeries, TimeSeriesEntity>(
        (v) => v.mean,
        mapFrom((t) => t.mean)
    )
}

function forMember_TimeSeriesEntity_median() {
    return forMember<TimeSeries, TimeSeriesEntity>(
        (v) => v.median,
        mapFrom((t) => t.median)
    )
}

function forMember_TimeSeriesEntity_variance() {
    return forMember<TimeSeries, TimeSeriesEntity>(
        (v) => v.variance,
        mapFrom((t) => t.variance)
    )
}

function forMember_TimeSeries_fields() {
    return forMember<TimeSeriesEntity, TimeSeries>(
        (v) => v.fields,
        mapFrom((t) => t.fields)
    )
}

function forMember_TimeSeries_samples() {
    return forMember<TimeSeriesEntity, TimeSeries>(
        (v) => v.samples,
        mapFrom((t) => t.samples)
    )
}

function forMember_TimeSeries_min() {
    return forMember<TimeSeriesEntity, TimeSeries>(
        (v) => v.min,
        mapFrom((t) => t.min)
    )
}

function forMember_TimeSeries_max() {
    return forMember<TimeSeriesEntity, TimeSeries>(
        (v) => v.max,
        mapFrom((t) => t.max)
    )
}

function forMember_TimeSeries_mean() {
    return forMember<TimeSeriesEntity, TimeSeries>(
        (v) => v.mean,
        mapFrom((t) => t.mean)
    )
}

function forMember_TimeSeries_median() {
    return forMember<TimeSeriesEntity, TimeSeries>(
        (v) => v.median,
        mapFrom((t) => t.median)
    )
}

function forMember_TimeSeries_variance() {
    return forMember<TimeSeriesEntity, TimeSeries>(
        (v) => v.variance,
        mapFrom((t) => t.variance)
    )
}

export function initializeTimeSeriesMapper() {
    createMap(mapper, TimeSeries, TimeSeriesEntity, forMember_TimeSeriesEntity_fields(), forMember_TimeSeriesEntity_samples(), forMember_TimeSeriesEntity_min(), forMember_TimeSeriesEntity_max(), forMember_TimeSeriesEntity_mean(), forMember_TimeSeriesEntity_median(), forMember_TimeSeriesEntity_variance())

    createMap(mapper, TimeSeriesEntity, TimeSeries, forMember_TimeSeries_fields(), forMember_TimeSeries_samples(), forMember_TimeSeries_min(), forMember_TimeSeries_max(), forMember_TimeSeries_mean(), forMember_TimeSeries_median(), forMember_TimeSeries_variance())
}

export function mapTimeSeriesEntityToTimeSeries(entity: TimeSeriesEntity): TimeSeries {
    return mapper.map(entity, TimeSeriesEntity, TimeSeries)
}

export function mapTimeSeriesToTimeSeriesEntity(model: TimeSeries): TimeSeriesEntity {
    return mapper.map(model, TimeSeries, TimeSeriesEntity)
}
