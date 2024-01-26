import { LocalComponent } from '../models/LocalComponent.model'
import { ContentDto, MeasureDto, MedicationDto, ServiceDto, TimeSeriesDto } from '@icure/typescript-common'

function toContentDtoStringValue(domain: LocalComponent): string | undefined {
    return domain.stringValue
}

function toContentDtoNumberValue(domain: LocalComponent): number | undefined {
    return undefined
}

function toContentDtoBooleanValue(domain: LocalComponent): boolean | undefined {
    return undefined
}

function toContentDtoInstantValue(domain: LocalComponent): number | undefined {
    return undefined
}

function toContentDtoFuzzyDateValue(domain: LocalComponent): number | undefined {
    return undefined
}

function toContentDtoBinaryValue(domain: LocalComponent): ArrayBuffer | undefined {
    return undefined
}

function toContentDtoDocumentId(domain: LocalComponent): string | undefined {
    return domain.documentId
}

function toContentDtoMeasureValue(domain: LocalComponent): MeasureDto | undefined {
    return undefined
}

function toContentDtoMedicationValue(domain: LocalComponent): MedicationDto | undefined {
    return undefined
}

function toContentDtoTimeSeries(domain: LocalComponent): TimeSeriesDto | undefined {
    return undefined
}

function toContentDtoCompoundValue(domain: LocalComponent): ServiceDto[] | undefined {
    return undefined
}

function toContentDtoRatio(domain: LocalComponent): MeasureDto[] | undefined {
    return undefined
}

function toContentDtoRange(domain: LocalComponent): MeasureDto[] | undefined {
    return undefined
}

function toLocalComponentStringValue(dto: ContentDto): string | undefined {
    return dto.stringValue
}

function toLocalComponentDocumentId(dto: ContentDto): string | undefined {
    return dto.documentId
}

export function mapContentDtoToLocalComponent(dto: ContentDto): LocalComponent {
    return new LocalComponent({
        stringValue: toLocalComponentStringValue(dto),
        documentId: toLocalComponentDocumentId(dto),
    })
}

export function mapLocalComponentToContentDto(domain: LocalComponent): ContentDto {
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
