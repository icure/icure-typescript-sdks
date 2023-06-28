import { LocalComponent } from '../models/LocalComponent.model'
import { Content, Measure, Medication, Service, TimeSeries } from '@icure/api'

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

function toContentMeasureValue(domain: LocalComponent): Measure | undefined {
    return undefined
}

function toContentMedicationValue(domain: LocalComponent): Medication | undefined {
    return undefined
}

function toContentTimeSeries(domain: LocalComponent): TimeSeries | undefined {
    return undefined
}

function toContentCompoundValue(domain: LocalComponent): Service[] | undefined {
    return undefined
}

function toContentRatio(domain: LocalComponent): Measure[] | undefined {
    return undefined
}

function toContentRange(domain: LocalComponent): Measure[] | undefined {
    return undefined
}

function toLocalComponentStringValue(dto: Content): string | undefined {
    return dto.stringValue
}

function toLocalComponentDocumentId(dto: Content): string | undefined {
    return dto.documentId
}

export function mapContentToLocalComponent(dto: Content): LocalComponent {
    return new LocalComponent({
        stringValue: toLocalComponentStringValue(dto),
        documentId: toLocalComponentDocumentId(dto),
    })
}

export function mapLocalComponentToContent(domain: LocalComponent): Content {
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
