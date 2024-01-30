import { Component } from '../models/Component.model'
import { Observation } from '../models/Observation.model'
import { mapMeasureDtoToMeasure, mapMeasureToMeasureDto, mapTimeSeriesDtoToTimeSeries, mapTimeSeriesToTimeSeriesDto, Measure, TimeSeries, ContentDto, MeasureDto, MedicationDto, ServiceDto, TimeSeriesDto } from '@icure/typescript-common'
import { mapObservationToServiceDto, mapServiceDtoToObservation } from './Observation.mapper'

function toContentDtoStringValue(domain: Component): string | undefined {
    return undefined
}

function toContentDtoNumberValue(domain: Component): number | undefined {
    return domain.numberValue
}

function toContentDtoBooleanValue(domain: Component): boolean | undefined {
    return domain.booleanValue
}

function toContentDtoInstantValue(domain: Component): number | undefined {
    return domain.instantValue
}

function toContentDtoFuzzyDateValue(domain: Component): number | undefined {
    return domain.fuzzyDateValue
}

function toContentDtoBinaryValue(domain: Component): ArrayBuffer | undefined {
    return undefined
}

function toContentDtoDocumentId(domain: Component): string | undefined {
    return undefined
}

function toContentDtoMeasureValue(domain: Component): MeasureDto | undefined {
    return !!domain.measureValue ? mapMeasureToMeasureDto(domain.measureValue) : undefined
}

function toContentDtoMedicationValue(domain: Component): MedicationDto | undefined {
    return undefined
}

function toContentDtoTimeSeries(domain: Component): TimeSeriesDto | undefined {
    return !!domain.timeSeries ? mapTimeSeriesToTimeSeriesDto(domain.timeSeries) : undefined
}

function toContentDtoCompoundValue(domain: Component): ServiceDto[] | undefined {
    return !!domain.compoundValue ? domain.compoundValue.map(mapObservationToServiceDto) : undefined
}

function toContentDtoRatio(domain: Component): MeasureDto[] | undefined {
    return !!domain.ratio ? domain.ratio.map(mapMeasureToMeasureDto) : undefined
}

function toContentDtoRange(domain: Component): MeasureDto[] | undefined {
    return !!domain.range ? domain.range.map(mapMeasureToMeasureDto) : undefined
}

function toComponentNumberValue(dto: ContentDto): number | undefined {
    return dto.numberValue
}

function toComponentBooleanValue(dto: ContentDto): boolean | undefined {
    return dto.booleanValue
}

function toComponentInstantValue(dto: ContentDto): number | undefined {
    return dto.instantValue
}

function toComponentFuzzyDateValue(dto: ContentDto): number | undefined {
    return dto.fuzzyDateValue
}

function toComponentMeasureValue(dto: ContentDto): Measure | undefined {
    return !!dto.measureValue ? mapMeasureDtoToMeasure(dto.measureValue) : undefined
}

function toComponentTimeSeries(dto: ContentDto): TimeSeries | undefined {
    return !!dto.timeSeries ? mapTimeSeriesDtoToTimeSeries(dto.timeSeries) : undefined
}

function toComponentCompoundValue(dto: ContentDto): Observation[] | undefined {
    return !!dto.compoundValue ? dto.compoundValue.map(mapServiceDtoToObservation) : undefined
}

function toComponentRatio(dto: ContentDto): Measure[] | undefined {
    return !!dto.ratio ? dto.ratio.map(mapMeasureDtoToMeasure) : undefined
}

function toComponentRange(dto: ContentDto): Measure[] | undefined {
    return !!dto.range ? dto.range.map(mapMeasureDtoToMeasure) : undefined
}

export function mapContentDtoToComponent(dto: ContentDto): Component {
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

export function mapComponentToContentDto(domain: Component): ContentDto {
    return new ContentDto({
        stringValue: toContentDtoStringValue(domain),
        numberValue: toContentDtoNumberValue(domain),
        booleanValue: toContentDtoBooleanValue(domain),
        instantValue: toContentDtoInstantValue(domain),
        fuzzyDateValue: toContentDtoFuzzyDateValue(domain),
        binaryValue: toContentDtoBinaryValue(domain),
        documentId: toContentDtoDocumentId(domain),
        measureValue: toContentDtoMeasureValue(domain),
        medicationValue: toContentDtoMedicationValue(domain),
        timeSeries: toContentDtoTimeSeries(domain),
        compoundValue: toContentDtoCompoundValue(domain),
        ratio: toContentDtoRatio(domain),
        range: toContentDtoRange(domain),
    })
}
