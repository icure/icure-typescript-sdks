import { Content } from '../models/Content.model'
import { ContentDto, mapMeasureDtoToMeasure, mapMeasureToMeasureDto, mapTimeSeriesDtoToTimeSeries, mapTimeSeriesToTimeSeriesDto, Measure, MeasureDto, MedicationDto, ServiceDto, TimeSeries, TimeSeriesDto } from '@icure/typescript-common'
import { DataSample } from '../models/DataSample.model'
import { mapDataSampleToServiceDto, mapServiceDtoToDataSample } from './DataSample.mapper'
import { b64_2ab, ua2b64 } from '@icure/api'

function toContentDtoStringValue(domain: Content): string | undefined {
    return domain.stringValue
}

function toContentDtoNumberValue(domain: Content): number | undefined {
    return domain.numberValue
}

function toContentDtoBooleanValue(domain: Content): boolean | undefined {
    return domain.booleanValue
}

function toContentDtoInstantValue(domain: Content): number | undefined {
    return domain.instantValue
}

function toContentDtoFuzzyDateValue(domain: Content): number | undefined {
    return domain.fuzzyDateValue
}

function toContentDtoBinaryValue(domain: Content): ArrayBuffer | undefined {
    return domain.binaryValue ? b64_2ab(domain.binaryValue) : undefined
}

function toContentDtoDocumentId(domain: Content): string | undefined {
    return domain.documentId
}

function toContentDtoMeasureValue(domain: Content): MeasureDto | undefined {
    return domain.measureValue ? mapMeasureToMeasureDto(domain.measureValue) : undefined
}

function toContentDtoMedicationValue(domain: Content): MedicationDto | undefined {
    return undefined
}

function toContentDtoTimeSeries(domain: Content): TimeSeriesDto | undefined {
    return domain.timeSeries ? mapTimeSeriesToTimeSeriesDto(domain.timeSeries) : undefined
}

function toContentDtoCompoundValue(domain: Content): ServiceDto[] | undefined {
    return domain.compoundValue?.map(mapDataSampleToServiceDto)
}

function toContentDtoRatio(domain: Content): MeasureDto[] | undefined {
    return domain.ratio?.map(mapMeasureToMeasureDto)
}

function toContentDtoRange(domain: Content): MeasureDto[] | undefined {
    return domain.range?.map(mapMeasureToMeasureDto)
}

function toContentStringValue(dto: ContentDto): string | undefined {
    return dto.stringValue
}

function toContentNumberValue(dto: ContentDto): number | undefined {
    return dto.numberValue
}

function toContentBooleanValue(dto: ContentDto): boolean | undefined {
    return dto.booleanValue
}

function toContentInstantValue(dto: ContentDto): number | undefined {
    return dto.instantValue
}

function toContentFuzzyDateValue(dto: ContentDto): number | undefined {
    return dto.fuzzyDateValue
}

function toContentBinaryValue(dto: ContentDto): string | undefined {
    return dto.binaryValue ? ua2b64(dto.binaryValue) : undefined
}

function toContentDocumentId(dto: ContentDto): string | undefined {
    return dto.documentId
}

function toContentMeasureValue(dto: ContentDto): Measure | undefined {
    return dto.measureValue ? mapMeasureDtoToMeasure(dto.measureValue) : undefined
}

function toContentTimeSeries(dto: ContentDto): TimeSeries | undefined {
    return dto.timeSeries ? mapTimeSeriesDtoToTimeSeries(dto.timeSeries) : undefined
}

function toContentCompoundValue(dto: ContentDto): DataSample[] | undefined {
    return dto.compoundValue?.map(mapServiceDtoToDataSample)
}

function toContentRatio(dto: ContentDto): Measure[] | undefined {
    return dto.ratio?.map(mapMeasureDtoToMeasure)
}

function toContentRange(dto: ContentDto): Measure[] | undefined {
    return dto.range?.map(mapMeasureDtoToMeasure)
}

export function mapContentDtoToContent(dto: ContentDto): Content {
    return new Content({
        stringValue: toContentStringValue(dto),
        numberValue: toContentNumberValue(dto),
        booleanValue: toContentBooleanValue(dto),
        instantValue: toContentInstantValue(dto),
        fuzzyDateValue: toContentFuzzyDateValue(dto),
        binaryValue: toContentBinaryValue(dto),
        documentId: toContentDocumentId(dto),
        measureValue: toContentMeasureValue(dto),
        timeSeries: toContentTimeSeries(dto),
        compoundValue: toContentCompoundValue(dto),
        ratio: toContentRatio(dto),
        range: toContentRange(dto),
    })
}

export function mapContentToContentDto(domain: Content): ContentDto {
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
