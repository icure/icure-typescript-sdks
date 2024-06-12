import { Coding } from '../models/Coding.model'
import { Code, Periodicity } from '@icure/api'
import { convertMapOfArrayOfGenericToObject, convertObjectToMapOfArrayOfGeneric } from '../utils/Metadata.utils'

function toCodeId(domain: Coding): string | undefined {
    return `${domain.type}|${domain.code}|${domain.version}`
}

function toCodeRev(domain: Coding): string | undefined {
    return domain.rev
}

function toCodeDeletionDate(domain: Coding): number | undefined {
    return undefined
}

function toCodeContext(domain: Coding): string | undefined {
    return undefined
}

function toCodeType(domain: Coding): string | undefined {
    return domain.type
}

function toCodeCode(domain: Coding): string | undefined {
    return domain.code
}

function toCodeVersion(domain: Coding): string | undefined {
    return domain.version
}

function toCodeLabel(domain: Coding): { [key: string]: string } | undefined {
    return !!domain.description ? Object.fromEntries(Object.entries(domain.description)) : undefined
}

function toCodeAuthor(domain: Coding): string | undefined {
    return undefined
}

function toCodeRegions(domain: Coding): string[] {
    return [...domain.regions]
}

function toCodePeriodicity(domain: Coding): Periodicity[] | undefined {
    return undefined
}

function toCodeLevel(domain: Coding): number | undefined {
    return undefined
}

function toCodeLinks(domain: Coding): string[] | undefined {
    return undefined
}

function toCodeQualifiedLinks(domain: Coding): { [key: string]: string[] } | undefined {
    return !!domain.qualifiedLinks ? convertMapOfArrayOfGenericToObject(domain.qualifiedLinks, (t) => t) : undefined
}

function toCodeFlags(domain: Coding): Code.FlagsEnum[] | undefined {
    return undefined
}

function toCodeSearchTerms(domain: Coding): { [key: string]: string[] } | undefined {
    return Object.fromEntries(Object.entries(domain.searchTerms).map(([k, v]) => [k, (v)]))
}

function toCodeData(domain: Coding): string | undefined {
    return undefined
}

function toCodeAppendices(domain: Coding): { [key: string]: string } | undefined {
    return undefined
}

function toCodeDisabled(domain: Coding): boolean | undefined {
    return undefined
}

function toCodingId(dto: Code): string {
    return dto.id!
}

function toCodingRev(dto: Code): string | undefined {
    return dto.rev
}

function toCodingType(dto: Code): string | undefined {
    return dto.type
}

function toCodingCode(dto: Code): string | undefined {
    return dto.code
}

function toCodingVersion(dto: Code): string | undefined {
    return dto.version
}

function toCodingRegions(dto: Code): Array<string> {
    return (dto.regions ?? [])
}

function toCodingDescription(dto: Code): Record<string, string> | undefined {
    return !!dto.label ? {...dto.label} : undefined
}

function toCodingQualifiedLinks(dto: Code): Record<string, string[]> {
    return !!dto.qualifiedLinks ? convertObjectToMapOfArrayOfGeneric(dto.qualifiedLinks, (t) => t) : {}
}

function toCodingSearchTerms(dto: Code): Record<string, Array<string>> {
    return !!dto.searchTerms ? {...dto.searchTerms} : ({} as Record<string, Array<string>>)
}

export function mapCodeToCoding(dto: Code): Coding {
    return new Coding({
        id: toCodingId(dto),
        rev: toCodingRev(dto),
        type: toCodingType(dto),
        code: toCodingCode(dto),
        version: toCodingVersion(dto),
        regions: toCodingRegions(dto),
        description: toCodingDescription(dto),
        qualifiedLinks: toCodingQualifiedLinks(dto),
        searchTerms: toCodingSearchTerms(dto),
    })
}

export function mapCodingToCode(domain: Coding): Code {
    return new Code({
        id: toCodeId(domain),
        rev: toCodeRev(domain),
        deletionDate: toCodeDeletionDate(domain),
        context: toCodeContext(domain),
        type: toCodeType(domain),
        code: toCodeCode(domain),
        version: toCodeVersion(domain),
        label: toCodeLabel(domain),
        author: toCodeAuthor(domain),
        regions: toCodeRegions(domain),
        periodicity: toCodePeriodicity(domain),
        level: toCodeLevel(domain),
        links: toCodeLinks(domain),
        qualifiedLinks: toCodeQualifiedLinks(domain),
        flags: toCodeFlags(domain),
        searchTerms: toCodeSearchTerms(domain),
        data: toCodeData(domain),
        appendices: toCodeAppendices(domain),
        disabled: toCodeDisabled(domain),
    })
}
