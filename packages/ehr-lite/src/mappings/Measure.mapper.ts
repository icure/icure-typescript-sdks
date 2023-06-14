import { Measure } from "../models/Measure.model"
import { Measure as MeasureEntity } from "@icure/api"
import {createMap, forMember, ignore, mapFrom} from "@automapper/core"
import { mapper } from "./mapper"

function forMember_MeasureEntity_value() {
    return forMember<Measure, MeasureEntity>(v => v.value, mapFrom(v => v.value))
}

function forMember_MeasureEntity_min() {
    return forMember<Measure, MeasureEntity>(v => v.min, mapFrom(v => v.min))
}

function forMember_MeasureEntity_max() {
    return forMember<Measure, MeasureEntity>(v => v.max, mapFrom(v => v.max))
}

function forMember_MeasureEntity_ref() {
    return forMember<Measure, MeasureEntity>(v => v.ref, mapFrom(v => v.ref))
}

function forMember_MeasureEntity_severity() {
    return forMember<Measure, MeasureEntity>(v => v.severity, mapFrom(v => v.severity))
}

function forMember_MeasureEntity_severityCode() {
    return forMember<Measure, MeasureEntity>(v => v.severityCode, mapFrom(v => v.severityCode))
}

function forMember_MeasureEntity_evolution() {
    return forMember<Measure, MeasureEntity>(v => v.evolution, mapFrom(v => v.evolution))
}

function forMember_MeasureEntity_unit() {
    return forMember<Measure, MeasureEntity>(v => v.unit, mapFrom(v => v.unit))
}

function forMember_MeasureEntity_sign() {
    return forMember<Measure, MeasureEntity>(v => v.sign, ignore())
}

function forMember_MeasureEntity_unitCodes() {
    return forMember<Measure, MeasureEntity>(v => v.unitCodes, mapFrom(v => v.unitCodes))
}

function forMember_MeasureEntity_comment() {
    return forMember<Measure, MeasureEntity>(v => v.comment, mapFrom(v => v.comment))
}

function forMember_MeasureEntity_comparator() {
    return forMember<Measure, MeasureEntity>(v => v.comparator, mapFrom(v => v.comparator))
}

function forMember_Measure_value() {
    return forMember<MeasureEntity, Measure>(v => v.value, mapFrom(v => v.value))
}

function forMember_Measure_min() {
    return forMember<MeasureEntity, Measure>(v => v.min, mapFrom(v => v.min))
}

function forMember_Measure_max() {
    return forMember<MeasureEntity, Measure>(v => v.max, mapFrom(v => v.max))
}

function forMember_Measure_ref() {
    return forMember<MeasureEntity, Measure>(v => v.ref, mapFrom(v => v.ref))
}

function forMember_Measure_severity() {
    return forMember<MeasureEntity, Measure>(v => v.severity, mapFrom(v => v.severity))
}

function forMember_Measure_severityCode() {
    return forMember<MeasureEntity, Measure>(v => v.severityCode, mapFrom(v => v.severityCode))
}

function forMember_Measure_evolution() {
    return forMember<MeasureEntity, Measure>(v => v.evolution, mapFrom(v => v.evolution))
}

function forMember_Measure_unit() {
    return forMember<MeasureEntity, Measure>(v => v.unit, mapFrom(v => v.unit))
}

function forMember_Measure_unitCodes() {
    return forMember<MeasureEntity, Measure>(v => v.unitCodes, mapFrom(v => v.unitCodes))
}

function forMember_Measure_comment() {
    return forMember<MeasureEntity, Measure>(v => v.comment, mapFrom(v => v.comment))
}

function forMember_Measure_comparator() {
    return forMember<MeasureEntity, Measure>(v => v.comparator, mapFrom(v => v.comparator))
}

export function initializeMeasureMapper() {
    createMap(mapper, Measure, MeasureEntity, forMember_MeasureEntity_value(), forMember_MeasureEntity_min(), forMember_MeasureEntity_max(), forMember_MeasureEntity_ref(), forMember_MeasureEntity_severity(), forMember_MeasureEntity_severityCode(), forMember_MeasureEntity_evolution(), forMember_MeasureEntity_unit(), forMember_MeasureEntity_sign(), forMember_MeasureEntity_unitCodes(), forMember_MeasureEntity_comment(), forMember_MeasureEntity_comparator())

    createMap(mapper, MeasureEntity, Measure, forMember_Measure_value(), forMember_Measure_min(), forMember_Measure_max(), forMember_Measure_ref(), forMember_Measure_severity(), forMember_Measure_severityCode(), forMember_Measure_evolution(), forMember_Measure_unit(), forMember_Measure_unitCodes(), forMember_Measure_comment(), forMember_Measure_comparator())
}
