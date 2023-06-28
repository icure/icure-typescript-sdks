import { Component } from '../models/Component.model'
import { Content, Measure as MeasureDto, Medication, Service, TimeSeries as TimeSeriesDto } from '@icure/api'
import { Observation } from '../models/Observation.model'
import { mapMeasureDtoToMeasure, mapMeasureToMeasureDto, mapTimeSeriesDtoToTimeSeries, mapTimeSeriesToTimeSeriesDto, Measure, TimeSeries } from '@icure/typescript-common'
import { mapObservationToService, mapServiceToObservation } from './Observation.mapper'

function toContentStringValue(domain: Component): string | undefined {
    return undefined
}

function toContentNumberValue(domain: Component): number | undefined {
    return domain.numberValue
}

function toContentBooleanValue(domain: Component): boolean | undefined {
    return domain.booleanValue
}

function toContentInstantValue(domain: Component): number | undefined {
    return domain.instantValue
}

function toContentFuzzyDateValue(domain: Component): number | undefined {
    return domain.fuzzyDateValue
}

function toContentBinaryValue(domain: Component): ArrayBuffer | undefined {
    return undefined
}

function toContentDocumentId(domain: Component): string | undefined {
    return undefined
}

function toContentMeasureValue(domain: Component): MeasureDto | undefined {
    return !!domain.measureValue ? mapMeasureToMeasureDto(domain.measureValue) : undefined
}

function toContentMedicationValue(domain: Component): Medication | undefined {
    return undefined
}

function toContentTimeSeries(domain: Component): TimeSeriesDto | undefined {
    return !!domain.timeSeries ? mapTimeSeriesToTimeSeriesDto(domain.timeSeries) : undefined
}

function toContentCompoundValue(domain: Component): Service[] | undefined {
    return !!domain.compoundValue ? domain.compoundValue.map(mapObservationToService) : undefined
}

function toContentRatio(domain: Component): MeasureDto[] | undefined {
    return !!domain.ratio ? domain.ratio.map(mapMeasureToMeasureDto) : undefined
}

function toContentRange(domain: Component): MeasureDto[] | undefined {
    return !!domain.range ? domain.range.map(mapMeasureToMeasureDto) : undefined
}

function toComponentNumberValue(dto: Content): number | undefined {
    return dto.numberValue
}

function toComponentBooleanValue(dto: Content): boolean | undefined {
    return dto.booleanValue
}

function toComponentInstantValue(dto: Content): number | undefined {
    return dto.instantValue
}

function toComponentFuzzyDateValue(dto: Content): number | undefined {
    return dto.fuzzyDateValue
}

function toComponentMeasureValue(dto: Content): Measure | undefined {
    return !!dto.measureValue ? mapMeasureDtoToMeasure(dto.measureValue) : undefined
}

function toComponentTimeSeries(dto: Content): TimeSeries | undefined {
    return !!dto.timeSeries ? mapTimeSeriesDtoToTimeSeries(dto.timeSeries) : undefined
}

function toComponentCompoundValue(dto: Content): Observation[] | undefined {
    return !!dto.compoundValue ? dto.compoundValue.map(mapServiceToObservation) : undefined
}

function toComponentRatio(dto: Content): Measure[] | undefined {
    return !!dto.ratio ? dto.ratio.map(mapMeasureDtoToMeasure) : undefined
}

function toComponentRange(dto: Content): Measure[] | undefined {
    return !!dto.range ? dto.range.map(mapMeasureDtoToMeasure) : undefined
}

export function mapContentToComponent(dto: Content): Component {
    return new Component({
        numberValue: toComponentNumberValue(dto),
        booleanValue: toComponentBooleanValue(dto),
        instantValue: toComponentInstantValue(dto),
        fuzzyDateValue: toComponentFuzzyDateValue(dto),
        measureValue: toComponentMeasureValue(dto),
        timeSeries: toComponentTimeSeries(dto),
        compoundValue: toComponentCompoundValue(dto),
        ratio: toComponentRatio(dto),
        range: toComponentRange(dto),
    })
}

export function mapComponentToContent(domain: Component): Content {
    return new Content({
        stringValue: toContentStringValue(domain),
        numberValue: toContentNumberValue(domain),
        booleanValue: toContentBooleanValue(domain),
        instantValue: toContentInstantValue(domain),
        fuzzyDateValue: toContentFuzzyDateValue(domain),
        binaryValue: toContentBinaryValue(domain),
        documentId: toContentDocumentId(domain),
        measureValue: toContentMeasureValue(domain),
        medicationValue: toContentMedicationValue(domain),
        timeSeries: toContentTimeSeries(domain),
        compoundValue: toContentCompoundValue(domain),
        ratio: toContentRatio(domain),
        range: toContentRange(domain),
    })
}
