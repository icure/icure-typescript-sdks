import { ReferenceRange } from '../models/ReferenceRange.model'
import { Annotation as AnnotationDto, CodeStub, ReferenceRange as ReferenceRangeDto, Range as RangeDto } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'
import { Annotation } from '../models/Annotation.model'
import { Range } from '../models/Range.model'
import { mapCodeStubToCodingReference, mapCodingReferenceToCodeStub } from './CodingReference.mapper'
import { mapAnnotationDtoToAnnotation, mapAnnotationToAnnotationDto } from './Annotation.mapper'
import { mapRangeDtoToRange, mapRangeToRangeDto } from './Range.mapper'

function toReferenceRangeDtoLow(domain: ReferenceRange): number | undefined {
    return domain.low
}

function toReferenceRangeDtoHigh(domain: ReferenceRange): number | undefined {
    return domain.high
}

function toReferenceRangeDtoTags(domain: ReferenceRange): CodeStub[] | undefined {
    return !!domain.tags ? domain.tags.map(mapCodingReferenceToCodeStub) : undefined
}

function toReferenceRangeDtoCodes(domain: ReferenceRange): CodeStub[] | undefined {
    return !!domain.codes ? domain.codes.map(mapCodingReferenceToCodeStub) : undefined
}

function toReferenceRangeDtoNotes(domain: ReferenceRange): AnnotationDto[] | undefined {
    return !!domain.notes ? domain.notes.map(mapAnnotationToAnnotationDto) : undefined
}

function toReferenceRangeDtoAge(domain: ReferenceRange): RangeDto | undefined {
    return !!domain.age ? mapRangeToRangeDto(domain.age) : undefined
}

function toReferenceRangeDtoStringValue(domain: ReferenceRange): string | undefined {
    return domain.stringValue
}

function toReferenceRangeLow(dto: ReferenceRangeDto): number | undefined {
    return dto.low
}

function toReferenceRangeHigh(dto: ReferenceRangeDto): number | undefined {
    return dto.high
}

function toReferenceRangeTags(dto: ReferenceRangeDto): CodingReference[] | undefined {
    return !!dto.tags ? dto.tags.map(mapCodeStubToCodingReference) : undefined
}

function toReferenceRangeCodes(dto: ReferenceRangeDto): CodingReference[] | undefined {
    return !!dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : undefined
}

function toReferenceRangeNotes(dto: ReferenceRangeDto): Annotation[] | undefined {
    return !!dto.notes ? dto.notes.map(mapAnnotationDtoToAnnotation) : undefined
}

function toReferenceRangeAge(dto: ReferenceRangeDto): Range | undefined {
    return !!dto.age ? mapRangeDtoToRange(dto.age) : undefined
}

function toReferenceRangeStringValue(dto: ReferenceRangeDto): string | undefined {
    return dto.stringValue
}

export function mapReferenceRangeDtoToReferenceRange(dto: ReferenceRangeDto): ReferenceRange {
    return new ReferenceRange({
        low: toReferenceRangeLow(dto),
        high: toReferenceRangeHigh(dto),
        tags: toReferenceRangeTags(dto),
        codes: toReferenceRangeCodes(dto),
        notes: toReferenceRangeNotes(dto),
        age: toReferenceRangeAge(dto),
        stringValue: toReferenceRangeStringValue(dto),
    })
}

export function mapReferenceRangeToReferenceRangeDto(domain: ReferenceRange): ReferenceRangeDto {
    return new ReferenceRangeDto({
        low: toReferenceRangeDtoLow(domain),
        high: toReferenceRangeDtoHigh(domain),
        tags: toReferenceRangeDtoTags(domain),
        codes: toReferenceRangeDtoCodes(domain),
        notes: toReferenceRangeDtoNotes(domain),
        age: toReferenceRangeDtoAge(domain),
        stringValue: toReferenceRangeDtoStringValue(domain),
    })
}
