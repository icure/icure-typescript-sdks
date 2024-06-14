import { SecurityMetadata } from '../models/SecurityMetadata.model'
import { SecureDelegation as SecureDelegationDto, SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { SecureDelegation } from '../models/SecureDelegation.model'
import { mapSecureDelegationDtoToSecureDelegation, mapSecureDelegationToSecureDelegationDto } from './SecureDelegation.mapper'

function toSecurityMetadataDtoSecureDelegations(domain: SecurityMetadata): { [hash: string]: SecureDelegationDto } | undefined {
    return Object.fromEntries(Object.entries(domain.secureDelegations).map(([k, v]) => [k, mapSecureDelegationToSecureDelegationDto(v)]))
}

function toSecurityMetadataDtoKeysEquivalences(domain: SecurityMetadata): { [hash: string]: string } | undefined {
    return Object.fromEntries(Object.entries(domain.keysEquivalences))
}

function toSecurityMetadataSecureDelegations(dto: SecurityMetadataDto): Record<string, SecureDelegation> {
    return Object.fromEntries(Object.entries(dto.secureDelegations ?? {}).map(([k, v]) => [k, mapSecureDelegationDtoToSecureDelegation(v)]))
}

function toSecurityMetadataKeysEquivalences(dto: SecurityMetadataDto): Record<string, string> {
    return Object.fromEntries(Object.entries(dto.keysEquivalences ?? {}))
}

export function mapSecurityMetadataDtoToSecurityMetadata(dto: SecurityMetadataDto): SecurityMetadata {
    return new SecurityMetadata({
    secureDelegations: toSecurityMetadataSecureDelegations(dto),
    keysEquivalences: toSecurityMetadataKeysEquivalences(dto),
    })
}

export function mapSecurityMetadataToSecurityMetadataDto(domain: SecurityMetadata): SecurityMetadataDto {
    return new SecurityMetadataDto({
    secureDelegations: toSecurityMetadataDtoSecureDelegations(domain),
    keysEquivalences: toSecurityMetadataDtoKeysEquivalences(domain),
    })
}
