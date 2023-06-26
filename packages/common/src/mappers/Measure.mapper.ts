import {Measure} from "../models/Measure.model"
import {CodeStub, Measure as MeasureDto} from "@icure/api"
import {mapCodeStubToCodingReference, mapCodingReferenceToCodeStub} from "./CodingReference.mapper";
import {CodingReference} from "../models/CodingReference.model";

function toMeasureDtoValue(domain: Measure): number | undefined {
    return domain.value
}

function toMeasureDtoMin(domain: Measure): number | undefined {
    return domain.min
}

function toMeasureDtoMax(domain: Measure): number | undefined {
    return domain.max
}

function toMeasureDtoRef(domain: Measure): number | undefined {
    return domain.ref
}

function toMeasureDtoSeverity(domain: Measure): number | undefined {
    return domain.severity
}

function toMeasureDtoSeverityCode(domain: Measure): string | undefined {
    return domain.severityCode
}

function toMeasureDtoEvolution(domain: Measure): number | undefined {
    return domain.evolution
}

function toMeasureDtoUnit(domain: Measure): string | undefined {
    return domain.unit
}

function toMeasureDtoSign(domain: Measure): string | undefined {
    return undefined
}

function toMeasureDtoUnitCodes(domain: Measure): CodeStub[] | undefined {
    return !!domain.unitCodes ? domain.unitCodes.map(mapCodingReferenceToCodeStub) : undefined
}

function toMeasureDtoComment(domain: Measure): string | undefined {
    return domain.comment
}

function toMeasureDtoComparator(domain: Measure): string | undefined {
    return domain.comparator
}

function toMeasureValue(dto: MeasureDto): number | undefined {
    return dto.value
}

function toMeasureMin(dto: MeasureDto): number | undefined {
    return dto.min
}

function toMeasureMax(dto: MeasureDto): number | undefined {
    return dto.max
}

function toMeasureRef(dto: MeasureDto): number | undefined {
    return dto.ref
}

function toMeasureSeverity(dto: MeasureDto): number | undefined {
    return dto.severity
}

function toMeasureSeverityCode(dto: MeasureDto): string | undefined {
    return dto.severityCode
}

function toMeasureEvolution(dto: MeasureDto): number | undefined {
    return dto.evolution
}

function toMeasureUnit(dto: MeasureDto): string | undefined {
    return dto.unit
}

function toMeasureUnitCodes(dto: MeasureDto): CodingReference[] | undefined {
    return !!dto.unitCodes ? dto.unitCodes.map(mapCodeStubToCodingReference) : undefined
}

function toMeasureComment(dto: MeasureDto): string | undefined {
    return dto.comment
}

function toMeasureComparator(dto: MeasureDto): string | undefined {
    return dto.comparator
}

export function mapMeasureDtoToMeasure(dto: MeasureDto): Measure {
    return new Measure({
        value: toMeasureValue(dto),
        min: toMeasureMin(dto),
        max: toMeasureMax(dto),
        ref: toMeasureRef(dto),
        severity: toMeasureSeverity(dto),
        severityCode: toMeasureSeverityCode(dto),
        evolution: toMeasureEvolution(dto),
        unit: toMeasureUnit(dto),
        unitCodes: toMeasureUnitCodes(dto),
        comment: toMeasureComment(dto),
        comparator: toMeasureComparator(dto),
    })
}

export function mapMeasureToMeasureDto(domain: Measure): MeasureDto {
    return new MeasureDto({
        value: toMeasureDtoValue(domain),
        min: toMeasureDtoMin(domain),
        max: toMeasureDtoMax(domain),
        ref: toMeasureDtoRef(domain),
        severity: toMeasureDtoSeverity(domain),
        severityCode: toMeasureDtoSeverityCode(domain),
        evolution: toMeasureDtoEvolution(domain),
        unit: toMeasureDtoUnit(domain),
        sign: toMeasureDtoSign(domain),
        unitCodes: toMeasureDtoUnitCodes(domain),
        comment: toMeasureDtoComment(domain),
        comparator: toMeasureDtoComparator(domain),
    })
}
