import { Component } from '../models/Component.model'
import { Content, Measure as MeasureEntity, Medication, Service, TimeSeries as TimeSeriesEntity } from '@icure/api'
import { createMap, forMember, ignore, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { TimeSeries } from '../models/TimeSeries.model'
import { Observation } from '../models/Observation.model'
import { Measure } from '../models/Measure.model'

function forMember_Content_stringValue() {
    return forMember<Component, Content>((v) => v.stringValue, ignore())
}

function forMember_Content_numberValue() {
    return forMember<Component, Content>(
        (v) => v.numberValue,
        mapFrom((v) => v.numberValue)
    )
}

function forMember_Content_booleanValue() {
    return forMember<Component, Content>(
        (v) => v.booleanValue,
        mapFrom((v) => v.booleanValue)
    )
}

function forMember_Content_instantValue() {
    return forMember<Component, Content>(
        (v) => v.instantValue,
        mapFrom((v) => v.instantValue)
    )
}

function forMember_Content_fuzzyDateValue() {
    return forMember<Component, Content>(
        (v) => v.fuzzyDateValue,
        mapFrom((v) => v.fuzzyDateValue)
    )
}

function forMember_Content_binaryValue() {
    return forMember<Component, Content>((v) => v.binaryValue, ignore())
}

function forMember_Content_documentId() {
    return forMember<Component, Content>((v) => v.documentId, ignore())
}

function forMember_Content_measureValue() {
    return forMember<Component, Content>(
        (v) => v.measureValue,
        mapWith(MeasureEntity, Measure, (v) => v.measureValue)
    )
}

function forMember_Content_medicationValue() {
    return forMember<Component, Content>((v) => v.medicationValue, ignore())
}

function forMember_Content_timeSeries() {
    return forMember<Component, Content>(
        (v) => v.timeSeries,
        mapWith(TimeSeriesEntity, TimeSeries, (v) => v.timeSeries)
    )
}

function forMember_Content_compoundValue() {
    return forMember<Component, Content>(
        (v) => v.compoundValue,
        mapWith(Observation, Service, (v) => v.compoundValue)
    )
}

function forMember_Content_ratio() {
    return forMember<Component, Content>(
        (v) => v.ratio,
        mapWith(MeasureEntity, Measure, (v) => v.ratio)
    )
}

function forMember_Content_range() {
    return forMember<Component, Content>(
        (v) => v.range,
        mapWith(MeasureEntity, Measure, (v) => v.ratio)
    )
}

function forMember_Component_numberValue() {
    return forMember<Content, Component>(
        (v) => v.numberValue,
        mapFrom((v) => v.numberValue)
    )
}

function forMember_Component_booleanValue() {
    return forMember<Content, Component>(
        (v) => v.booleanValue,
        mapFrom((v) => v.booleanValue)
    )
}

function forMember_Component_instantValue() {
    return forMember<Content, Component>(
        (v) => v.instantValue,
        mapFrom((v) => v.instantValue)
    )
}

function forMember_Component_fuzzyDateValue() {
    return forMember<Content, Component>(
        (v) => v.fuzzyDateValue,
        mapFrom((v) => v.fuzzyDateValue)
    )
}

function forMember_Component_measureValue() {
    return forMember<Content, Component>(
        (v) => v.measureValue,
        mapFrom((v) => v.measureValue)
    )
}

function forMember_Component_timeSeries() {
    return forMember<Content, Component>(
        (v) => v.timeSeries,
        mapWith(TimeSeries, TimeSeriesEntity, (v) => v.timeSeries)
    )
}

function forMember_Component_compoundValue() {
    return forMember<Content, Component>(
        (v) => v.compoundValue,
        mapWith(Observation, Service, (v) => v.compoundValue)
    )
}

function forMember_Component_ratio() {
    return forMember<Content, Component>(
        (v) => v.ratio,
        mapWith(MeasureEntity, Measure, (v) => v.ratio)
    )
}

function forMember_Component_range() {
    return forMember<Content, Component>(
        (v) => v.range,
        mapWith(MeasureEntity, Measure, (v) => v.ratio)
    )
}

export function initializeComponentMapper() {
    createMap(
        mapper,
        Component,
        Content,
        forMember_Content_stringValue(),
        forMember_Content_numberValue(),
        forMember_Content_booleanValue(),
        forMember_Content_instantValue(),
        forMember_Content_fuzzyDateValue(),
        forMember_Content_binaryValue(),
        forMember_Content_documentId(),
        forMember_Content_measureValue(),
        forMember_Content_medicationValue(),
        forMember_Content_timeSeries(),
        forMember_Content_compoundValue(),
        forMember_Content_ratio(),
        forMember_Content_range()
    )

    createMap(
        mapper,
        Content,
        Component,
        forMember_Component_numberValue(),
        forMember_Component_booleanValue(),
        forMember_Component_instantValue(),
        forMember_Component_fuzzyDateValue(),
        forMember_Component_measureValue(),
        forMember_Component_timeSeries(),
        forMember_Component_compoundValue(),
        forMember_Component_ratio(),
        forMember_Component_range(),
    )
}
