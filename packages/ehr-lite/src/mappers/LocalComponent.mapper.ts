import { LocalComponent } from '../models/LocalComponent.model'
import { ContentDto, MeasureDto, MedicationDto, ServiceDto, TimeSeriesDto } from '@icure/typescript-common'

function toContentStringValue(domain: LocalComponent): string | undefined {
    return domain.stringValue
}

function toContentNumberValue(domain: LocalComponent): number | undefined {
    return undefined
}

function toContentBooleanValue(domain: LocalComponent): boolean | undefined {
    return undefined
}

function toContentInstantValue(domain: LocalComponent): number | undefined {
    return undefined
}

function toContentFuzzyDateValue(domain: LocalComponent): number | undefined {
    return undefined
}

function toContentBinaryValue(domain: LocalComponent): ArrayBuffer | undefined {
    return undefined
}

function toContentDocumentId(domain: LocalComponent): string | undefined {
    return domain.documentId
}

function toContentMeasureValue(domain: LocalComponent): MeasureDto | undefined {
    return undefined
}

function toContentMedicationValue(domain: LocalComponent): MedicationDto | undefined {
    return undefined
}

function toContentTimeSeries(domain: LocalComponent): TimeSeriesDto | undefined {
    return undefined
}

function toContentCompoundValue(domain: LocalComponent): ServiceDto[] | undefined {
    return undefined
}

function toContentRatio(domain: LocalComponent): MeasureDto[] | undefined {
    return undefined
}

function toContentRange(domain: LocalComponent): MeasureDto[] | undefined {
    return undefined
}

function toLocalComponentStringValue(dto: ContentDto): string | undefined {
    return dto.stringValue
}

function toLocalComponentDocumentId(dto: ContentDto): string | undefined {
    return dto.documentId
}

export function mapContentToLocalComponent(dto: ContentDto): LocalComponent {
    return new LocalComponent({
        stringValue: toLocalComponentStringValue(dto),
        documentId: toLocalComponentDocumentId(dto),
    })
}

export function mapLocalComponentToContent(domain: LocalComponent): ContentDto {
    return new ContentDto({
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
