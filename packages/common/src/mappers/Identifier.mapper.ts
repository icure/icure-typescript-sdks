import { Identifier as IdentifierDto } from '@icure/api/icc-api/model/Identifier'
import { Identifier } from '../models/Identifier.model'
import { CodeStub } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'
import { mapCodeStubToCodingReference, mapCodingReferenceToCodeStub } from './CodingReference.mapper'

function toIdentifierDtoId(domain: Identifier): string | undefined {
    return domain.id
}

function toIdentifierDtoAssigner(domain: Identifier): string | undefined {
    return domain.assigner
}

function toIdentifierDtoStart(domain: Identifier): string | undefined {
    return domain.start
}

function toIdentifierDtoEnd(domain: Identifier): string | undefined {
    return domain.end
}

function toIdentifierDtoSystem(domain: Identifier): string | undefined {
    return domain.system
}

function toIdentifierDtoType(domain: Identifier): CodeStub | undefined {
    return domain.type ? mapCodingReferenceToCodeStub(domain.type) : undefined
}

function toIdentifierDtoUse(domain: Identifier): string | undefined {
    return domain.use
}

function toIdentifierDtoValue(domain: Identifier): string | undefined {
    return domain.value
}

function toIdentifierId(dto: IdentifierDto): string | undefined {
    return dto.id
}

function toIdentifierAssigner(dto: IdentifierDto): string | undefined {
    return dto.assigner
}

function toIdentifierStart(dto: IdentifierDto): string | undefined {
    return dto.start
}

function toIdentifierEnd(dto: IdentifierDto): string | undefined {
    return dto.end
}

function toIdentifierSystem(dto: IdentifierDto): string | undefined {
    return dto.system
}

function toIdentifierType(dto: IdentifierDto): CodingReference | undefined {
    return dto.type ? mapCodeStubToCodingReference(dto.type) : undefined
}

function toIdentifierUse(dto: IdentifierDto): string | undefined {
    return dto.use
}

function toIdentifierValue(dto: IdentifierDto): string | undefined {
    return dto.value
}

export function mapIdentifierDtoToIdentifier(dto: IdentifierDto): Identifier {
    return new Identifier({
    id: toIdentifierId(dto),
    assigner: toIdentifierAssigner(dto),
    start: toIdentifierStart(dto),
    end: toIdentifierEnd(dto),
    system: toIdentifierSystem(dto),
    type: toIdentifierType(dto),
    use: toIdentifierUse(dto),
    value: toIdentifierValue(dto),
    })
}

export function mapIdentifierToIdentifierDto(domain: Identifier): IdentifierDto {
    return new IdentifierDto({
    id: toIdentifierDtoId(domain),
    assigner: toIdentifierDtoAssigner(domain),
    start: toIdentifierDtoStart(domain),
    end: toIdentifierDtoEnd(domain),
    system: toIdentifierDtoSystem(domain),
    type: toIdentifierDtoType(domain),
    use: toIdentifierDtoUse(domain),
    value: toIdentifierDtoValue(domain),
    })
}
