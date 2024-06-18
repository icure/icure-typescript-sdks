import { Quantity } from '../models/Quantity.model'
import { CodingReference, AdministrationQuantityDto, CodeStub, mapCodingReferenceToCodeStub, mapCodeStubToCodingReference } from '@icure/typescript-common'

function toAdministrationQuantityDtoQuantity(domain: Quantity): number | undefined {
    return domain.value
}

function toAdministrationQuantityDtoAdministrationUnit(domain: Quantity): CodeStub | undefined {
    return domain.code ? mapCodingReferenceToCodeStub(domain.code) : undefined
}

function toAdministrationQuantityDtoUnit(domain: Quantity): string | undefined {
    return domain.unit
}

function toQuantityValue(dto: AdministrationQuantityDto): number | undefined {
    return dto.quantity
}

function toQuantityCode(dto: AdministrationQuantityDto): CodingReference | undefined {
    return dto.administrationUnit ? mapCodeStubToCodingReference(dto.administrationUnit) : undefined
}

function toQuantityUnit(dto: AdministrationQuantityDto): string | undefined {
    return dto.unit
}

export function mapAdministrationQuantityDtoToQuantity(dto: AdministrationQuantityDto): Quantity {
    return new Quantity({
        value: toQuantityValue(dto),
        code: toQuantityCode(dto),
        unit: toQuantityUnit(dto),
    })
}

export function mapQuantityToAdministrationQuantityDto(domain: Quantity): AdministrationQuantityDto {
    return new AdministrationQuantityDto({
        quantity: toAdministrationQuantityDtoQuantity(domain),
        administrationUnit: toAdministrationQuantityDtoAdministrationUnit(domain),
        unit: toAdministrationQuantityDtoUnit(domain),
    })
}
