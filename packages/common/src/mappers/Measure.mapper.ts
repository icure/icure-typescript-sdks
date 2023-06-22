import { Measure } from "../models/Measure.model"
import { Measure as MeasureDto } from "@icure/api"
import {createMap, forMember, ignore, mapFrom, Mapper} from "@automapper/core"

function forMember_MeasureDto_value() {
    return forMember<Measure, MeasureDto>(v => v.value, mapFrom(v => v.value))
}

function forMember_MeasureDto_min() {
    return forMember<Measure, MeasureDto>(v => v.min, mapFrom(v => v.min))
}

function forMember_MeasureDto_max() {
    return forMember<Measure, MeasureDto>(v => v.max, mapFrom(v => v.max))
}

function forMember_MeasureDto_ref() {
    return forMember<Measure, MeasureDto>(v => v.ref, mapFrom(v => v.ref))
}

function forMember_MeasureDto_severity() {
    return forMember<Measure, MeasureDto>(v => v.severity, mapFrom(v => v.severity))
}

function forMember_MeasureDto_severityCode() {
    return forMember<Measure, MeasureDto>(v => v.severityCode, mapFrom(v => v.severityCode))
}

function forMember_MeasureDto_evolution() {
    return forMember<Measure, MeasureDto>(v => v.evolution, mapFrom(v => v.evolution))
}

function forMember_MeasureDto_unit() {
    return forMember<Measure, MeasureDto>(v => v.unit, mapFrom(v => v.unit))
}

function forMember_MeasureDto_sign() {
    return forMember<Measure, MeasureDto>(v => v.sign, ignore())
}

function forMember_MeasureDto_unitCodes() {
    return forMember<Measure, MeasureDto>(v => v.unitCodes, mapFrom(v => v.unitCodes))
}

function forMember_MeasureDto_comment() {
    return forMember<Measure, MeasureDto>(v => v.comment, mapFrom(v => v.comment))
}

function forMember_MeasureDto_comparator() {
    return forMember<Measure, MeasureDto>(v => v.comparator, mapFrom(v => v.comparator))
}

function forMember_Measure_value() {
    return forMember<MeasureDto, Measure>(v => v.value, mapFrom(v => v.value))
}

function forMember_Measure_min() {
    return forMember<MeasureDto, Measure>(v => v.min, mapFrom(v => v.min))
}

function forMember_Measure_max() {
    return forMember<MeasureDto, Measure>(v => v.max, mapFrom(v => v.max))
}

function forMember_Measure_ref() {
    return forMember<MeasureDto, Measure>(v => v.ref, mapFrom(v => v.ref))
}

function forMember_Measure_severity() {
    return forMember<MeasureDto, Measure>(v => v.severity, mapFrom(v => v.severity))
}

function forMember_Measure_severityCode() {
    return forMember<MeasureDto, Measure>(v => v.severityCode, mapFrom(v => v.severityCode))
}

function forMember_Measure_evolution() {
    return forMember<MeasureDto, Measure>(v => v.evolution, mapFrom(v => v.evolution))
}

function forMember_Measure_unit() {
    return forMember<MeasureDto, Measure>(v => v.unit, mapFrom(v => v.unit))
}

function forMember_Measure_unitCodes() {
    return forMember<MeasureDto, Measure>(v => v.unitCodes, mapFrom(v => v.unitCodes))
}

function forMember_Measure_comment() {
    return forMember<MeasureDto, Measure>(v => v.comment, mapFrom(v => v.comment))
}

function forMember_Measure_comparator() {
    return forMember<MeasureDto, Measure>(v => v.comparator, mapFrom(v => v.comparator))
}

export function initializeMeasureMapper(mapper: Mapper) {
    createMap(mapper, Measure, MeasureDto, forMember_MeasureDto_value(), forMember_MeasureDto_min(), forMember_MeasureDto_max(), forMember_MeasureDto_ref(), forMember_MeasureDto_severity(), forMember_MeasureDto_severityCode(), forMember_MeasureDto_evolution(), forMember_MeasureDto_unit(), forMember_MeasureDto_sign(), forMember_MeasureDto_unitCodes(), forMember_MeasureDto_comment(), forMember_MeasureDto_comparator())

    createMap(mapper, MeasureDto, Measure, forMember_Measure_value(), forMember_Measure_min(), forMember_Measure_max(), forMember_Measure_ref(), forMember_Measure_severity(), forMember_Measure_severityCode(), forMember_Measure_evolution(), forMember_Measure_unit(), forMember_Measure_unitCodes(), forMember_Measure_comment(), forMember_Measure_comparator())
}
