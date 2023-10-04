import { SecurityMetadata } from '../models/SecurityMetadata.model'
import { SecureDelegation as SecureDelegationDto, SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { SecureDelegation } from '../models/SecureDelegation.model'
import { mapSecureDelegationDtoToSecureDelegation, mapSecureDelegationToSecureDelegationDto } from './SecureDelegation.mapper'

function toSecurityMetadataDtoSecureDelegations(domain: SecurityMetadata): { [hash: string]: SecureDelegationDto } | undefined {
    return Object.fromEntries([...domain.secureDelegations.entries()].map(([k, v]) => [k, mapSecureDelegationToSecureDelegationDto(v)]))
}

function toSecurityMetadataDtoKeysEquivalences(domain: SecurityMetadata): { [hash: string]: string } | undefined {
    return Object.fromEntries([...domain.keysEquivalences.entries()])
}

function toSecurityMetadataSecureDelegations(dto: SecurityMetadataDto): Map<string, SecureDelegation> {
    return new Map(Object.entries(dto.secureDelegations ?? {}).map(([k, v]) => [k, mapSecureDelegationDtoToSecureDelegation(v)]))
}

function toSecurityMetadataKeysEquivalences(dto: SecurityMetadataDto): Map<string, string> {
    return new Map(Object.entries(dto.keysEquivalences ?? {}))
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
