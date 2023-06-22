import { LocalComponent } from "../models/LocalComponent.model"
import { Content } from "@icure/api"
import {createMap, forMember, ignore, mapFrom, Mapper} from "@automapper/core"

function forMember_Content_stringValue() {
    return forMember<LocalComponent, Content>(v => v.stringValue, mapFrom(v => v.stringValue))
}

function forMember_Content_numberValue() {
    return forMember<LocalComponent, Content>(v => v.numberValue, ignore())
}

function forMember_Content_booleanValue() {
    return forMember<LocalComponent, Content>(v => v.booleanValue, ignore())
}

function forMember_Content_instantValue() {
    return forMember<LocalComponent, Content>(v => v.instantValue, ignore())
}

function forMember_Content_fuzzyDateValue() {
    return forMember<LocalComponent, Content>(v => v.fuzzyDateValue, ignore())
}

function forMember_Content_binaryValue() {
    return forMember<LocalComponent, Content>(v => v.binaryValue, ignore())
}

function forMember_Content_documentId() {
    return forMember<LocalComponent, Content>(v => v.documentId, mapFrom(v => v.documentId))
}

function forMember_Content_measureValue() {
    return forMember<LocalComponent, Content>(v => v.measureValue, ignore())
}

function forMember_Content_medicationValue() {
    return forMember<LocalComponent, Content>(v => v.medicationValue, ignore())
}

function forMember_Content_timeSeries() {
    return forMember<LocalComponent, Content>(v => v.timeSeries, ignore())
}

function forMember_Content_compoundValue() {
    return forMember<LocalComponent, Content>(v => v.compoundValue, ignore())
}

function forMember_Content_ratio() {
    return forMember<LocalComponent, Content>(v => v.ratio, ignore())
}

function forMember_Content_range() {
    return forMember<LocalComponent, Content>(v => v.range, ignore())
}

function forMember_LocalComponent_stringValue() {
    return forMember<Content, LocalComponent>(v => v.stringValue, mapFrom(v => v.stringValue))
}

function forMember_LocalComponent_documentId() {
    return forMember<Content, LocalComponent>(v => v.documentId, mapFrom(v => v.documentId))
}

export function initializeLocalComponentMapper(mapper: Mapper) {
    createMap(mapper, LocalComponent, Content, forMember_Content_stringValue(), forMember_Content_numberValue(), forMember_Content_booleanValue(), forMember_Content_instantValue(), forMember_Content_fuzzyDateValue(), forMember_Content_binaryValue(), forMember_Content_documentId(), forMember_Content_measureValue(), forMember_Content_medicationValue(), forMember_Content_timeSeries(), forMember_Content_compoundValue(), forMember_Content_ratio(), forMember_Content_range())

    createMap(mapper, Content, LocalComponent, forMember_LocalComponent_stringValue(), forMember_LocalComponent_documentId())
}
