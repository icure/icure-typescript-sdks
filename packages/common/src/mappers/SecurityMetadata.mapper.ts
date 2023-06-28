import { SecurityMetadata } from '../models/SecurityMetadata.model'
import { SecureDelegation as SecureDelegationDto, SecurityMetadata as SecurityMetadataDto } from '@icure/api'
import { mapSecureDelegationDtoToSecureDelegation, mapSecureDelegationToSecureDelegationDto } from './mapper'
import { convertMapOfGenericToObject, convertMapToObject, convertObjectToMap, convertObjectToMapOfGeneric } from '../utils/Metadata.utils'
import { SecureDelegation } from '../models/SecureDelegation.model'

function toSecurityMetadataDtoSecureDelegations(domain: SecurityMetadata):
    | {
          [hash: string]: SecureDelegationDto
      }
    | undefined {
    return !!domain.secureDelegations ? convertMapOfGenericToObject<SecureDelegation, SecureDelegationDto>(domain.secureDelegations, (value) => mapSecureDelegationToSecureDelegationDto(value)) : undefined
}

function toSecurityMetadataDtoKeysEquivalences(domain: SecurityMetadata):
    | {
          [hash: string]: string
      }
    | undefined {
    return !!domain.keysEquivalences ? convertMapToObject(domain.keysEquivalences) : undefined
}

function toSecurityMetadataSecureDelegations(dto: SecurityMetadataDto): Map<string, SecureDelegation> | undefined {
    return !!dto.secureDelegations ? convertObjectToMapOfGeneric<SecureDelegationDto, SecureDelegation>(dto.secureDelegations, (value) => mapSecureDelegationDtoToSecureDelegation(value)) : undefined
}

function toSecurityMetadataKeysEquivalences(dto: SecurityMetadataDto): Map<string, string> | undefined {
    return !!dto.keysEquivalences ? convertObjectToMap(dto.keysEquivalences) : undefined
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
