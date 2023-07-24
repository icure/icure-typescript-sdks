import { Delegation as DelegationDto } from '@icure/api'
import { Delegation } from '../models/Delegation.model'

function toDelegationDtoOwner(domain: Delegation): string | undefined {
    return domain.owner
}

function toDelegationDtoDelegatedTo(domain: Delegation): string | undefined {
    return domain.delegatedTo
}

function toDelegationDtoKey(domain: Delegation): string | undefined {
    return domain.key
}

function toDelegationDtoTags(domain: Delegation): string[] | undefined {
    return undefined
}

function toDelegationOwner(dto: DelegationDto): string | undefined {
    return dto.owner
}

function toDelegationDelegatedTo(dto: DelegationDto): string | undefined {
    return dto.delegatedTo
}

function toDelegationKey(dto: DelegationDto): string | undefined {
    return dto.key
}

export function mapDelegationDtoToDelegation(dto: DelegationDto): Delegation {
    return new Delegation({
        owner: toDelegationOwner(dto),
        delegatedTo: toDelegationDelegatedTo(dto),
        key: toDelegationKey(dto),
    })
}

export function mapDelegationToDelegationDto(domain: Delegation): DelegationDto {
    return new DelegationDto({
        owner: toDelegationDtoOwner(domain),
        delegatedTo: toDelegationDtoDelegatedTo(domain),
        key: toDelegationDtoKey(domain),
        tags: toDelegationDtoTags(domain),
    })
}
