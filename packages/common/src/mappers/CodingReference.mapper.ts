import { CodeStub } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'

function toCodeStubId(domain: CodingReference): string | undefined {
    return `${domain.type ?? null}|${domain.code ?? null}|${domain.version ?? null}`
}

function toCodeStubContext(domain: CodingReference): string | undefined {
    return domain.context
}

function toCodeStubType(domain: CodingReference): string | undefined {
    return domain.type
}

function toCodeStubCode(domain: CodingReference): string | undefined {
    return domain.code
}

function toCodeStubVersion(domain: CodingReference): string | undefined {
    return domain.version
}

function toCodeStubLabel(domain: CodingReference): { [key: string]: string } | undefined {
    return undefined
}

function toCodingReferenceId(dto: CodeStub): string {
    return `${dto.type ?? null}|${dto.code ?? null}|${dto.version ?? null}`
}

function toCodingReferenceType(dto: CodeStub): string | undefined {
    return dto.type
}

function toCodingReferenceCode(dto: CodeStub): string | undefined {
    return dto.code
}

function toCodingReferenceVersion(dto: CodeStub): string | undefined {
    return dto.version
}

function toCodingReferenceContext(dto: CodeStub): string | undefined {
    return dto.context
}

export function mapCodeStubToCodingReference(dto: CodeStub): CodingReference {
    return new CodingReference({
        id: toCodingReferenceId(dto),
        type: toCodingReferenceType(dto),
        code: toCodingReferenceCode(dto),
        version: toCodingReferenceVersion(dto),
        context: toCodingReferenceContext(dto),
    })
}

export function mapCodingReferenceToCodeStub(domain: CodingReference): CodeStub {
    return new CodeStub({
        id: toCodeStubId(domain),
        context: toCodeStubContext(domain),
        type: toCodeStubType(domain),
        code: toCodeStubCode(domain),
        version: toCodeStubVersion(domain),
        label: toCodeStubLabel(domain),
    })
}
