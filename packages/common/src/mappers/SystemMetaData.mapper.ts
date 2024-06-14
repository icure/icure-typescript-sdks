import { Device, Document as DocumentDto, HealthcareParty, HealthElement, MaintenanceTask, Message as MessageDto, Patient, SecurityMetadata as SecurityMetadataDto, Service, Topic as TopicDto } from '@icure/api'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'
import { mapDelegationDtoToDelegation, mapDelegationToDelegationDto } from './Delegation.mapper'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner.model'
import {
    convertDeepNestedMapToObject,
    convertMapToObject,
    convertNestedMapToObject,
    convertObjectToDeepNestedMap,
    convertObjectToMap,
    convertObjectToNestedMap,
    extractAesExchangeKeys,
    extractCryptedForeignKeys,
    extractDelegations,
    extractEncryptedSelf,
    extractEncryptionKeys,
    extractHcPartyKeys,
    extractPrivateKeyShamirPartitions,
    extractPublicKey,
    extractPublicKeysForOaepWithSha256,
    extractSecretForeignKeys,
    extractTransferKeys,
} from '../utils/Metadata.utils'
import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted.model'
import { Delegation as DelegationDto } from '@icure/api/icc-api/model/Delegation'
import { Delegation } from '../models/Delegation.model'
import { mapCodeStubToCodingReference } from './CodingReference.mapper'
import { CodingReference } from '../models/CodingReference.model'
import { ICURE_INTERNAL_FHIR_TAG_TYPE } from '../utils/domain'
import { mapSecurityMetadataDtoToSecurityMetadata, mapSecurityMetadataToSecurityMetadataDto } from './SecurityMetadata.mapper'

function toMapOfSetOfDelegations(delegations: { [p: string]: DelegationDto[] }): Record<string, Array<DelegationDto>> {
    return Object.fromEntries(Object.entries(delegations).map(([k, v]) => [k, v.map(mapDelegationDtoToDelegation)]))
}

function extractInternalTags(dto: HealthElement | Service | MaintenanceTask | HealthcareParty | Patient | Device): Array<CodingReference> | undefined {
    return !!dto.tags ? dto.tags.filter((t) => t.type === ICURE_INTERNAL_FHIR_TAG_TYPE).map(mapCodeStubToCodingReference) : undefined
}

export function toSystemMetaDataEncrypted(dto: HealthElement | Service | MaintenanceTask | DocumentDto | MessageDto | TopicDto): SystemMetaDataEncrypted | undefined {
    return new SystemMetaDataEncrypted({
        encryptedSelf: dto.encryptedSelf,
        secretForeignKeys: dto.secretForeignKeys,
        cryptedForeignKeys: !!dto.cryptedForeignKeys ? toMapOfSetOfDelegations(dto.cryptedForeignKeys) : undefined,
        delegations: !!dto.delegations ? toMapOfSetOfDelegations(dto.delegations) : undefined,
        encryptionKeys: !!dto.encryptionKeys ? toMapOfSetOfDelegations(dto.encryptionKeys) : undefined,
        tags: extractInternalTags(dto),
        securityMetadata: !!dto.securityMetadata ? mapSecurityMetadataDtoToSecurityMetadata(dto.securityMetadata) : undefined,
    })
}

export function toSystemMetaDataOwner(dto: HealthcareParty | Patient | Device): SystemMetaDataOwner | undefined {
    return new SystemMetaDataOwner({
        hcPartyKeys: !!dto.hcPartyKeys ? Object.fromEntries(Object.entries(dto.hcPartyKeys)) : undefined,
        publicKey: dto.publicKey,
        aesExchangeKeys: !!dto.aesExchangeKeys ? convertObjectToDeepNestedMap(dto.aesExchangeKeys) : undefined,
        transferKeys: !!dto.transferKeys ? convertObjectToNestedMap(dto.transferKeys) : undefined,
        privateKeyShamirPartitions: !!dto.privateKeyShamirPartitions ? convertObjectToMap(dto.privateKeyShamirPartitions) : undefined,
        publicKeysForOaepWithSha256: dto.publicKeysForOaepWithSha256,
        tags: extractInternalTags(dto),
    })
}

export function toSystemMetaDataOwnerEncrypted(dto: Patient): SystemMetaDataOwnerEncrypted | undefined {
    return new SystemMetaDataOwnerEncrypted({
        encryptedSelf: dto.encryptedSelf,
        cryptedForeignKeys: !!dto.cryptedForeignKeys ? toMapOfSetOfDelegations(dto.cryptedForeignKeys) : undefined,
        delegations: !!dto.delegations ? toMapOfSetOfDelegations(dto.delegations) : undefined,
        encryptionKeys: !!dto.encryptionKeys ? toMapOfSetOfDelegations(dto.encryptionKeys) : undefined,
        secretForeignKeys: dto.secretForeignKeys,
        hcPartyKeys: !!dto.hcPartyKeys ? Object.fromEntries(Object.entries(dto.hcPartyKeys)) : undefined,
        publicKey: dto.publicKey,
        aesExchangeKeys: !!dto.aesExchangeKeys ? convertObjectToDeepNestedMap(dto.aesExchangeKeys) : undefined,
        transferKeys: !!dto.transferKeys ? convertObjectToNestedMap(dto.transferKeys) : undefined,
        privateKeyShamirPartitions: !!dto.privateKeyShamirPartitions ? convertObjectToMap(dto.privateKeyShamirPartitions) : undefined,
        publicKeysForOaepWithSha256: dto.publicKeysForOaepWithSha256,
        tags: extractInternalTags(dto),
        securityMetadata: !!dto.securityMetadata ? mapSecurityMetadataDtoToSecurityMetadata(dto.securityMetadata) : undefined,
    })
}

export function toHcPartyKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataOwner):
    | {
          [key: string]: string[]
      }
    | undefined {
    const hcPartyKeys = extractHcPartyKeys(systemMetaData)
    return !!hcPartyKeys ? { ...hcPartyKeys } : undefined
}

export function toAesExchangeKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataOwner):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    const aesExchangeKeys = extractAesExchangeKeys(systemMetaData)
    return !!aesExchangeKeys ? convertDeepNestedMapToObject(aesExchangeKeys) : undefined
}

export function toTransferKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataOwner):
    | {
          [key: string]: { [key: string]: string }
      }
    | undefined {
    const transferKeys = extractTransferKeys(systemMetaData)
    return !!transferKeys ? convertNestedMapToObject(transferKeys) : undefined
}

export function toPrivateKeyShamirPartitions(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataOwner):
    | {
          [key: string]: string
      }
    | undefined {
    const privateKeyShamirPartitions = extractPrivateKeyShamirPartitions(systemMetaData)
    return !!privateKeyShamirPartitions ? convertMapToObject(privateKeyShamirPartitions) : undefined
}

export function toPublicKey(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataOwner): string | undefined {
    return extractPublicKey(systemMetaData)
}

export function toPublicKeysForOaepWithSha256(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataOwner): string[] | undefined {
    return extractPublicKeysForOaepWithSha256(systemMetaData)
}

export function toSecretForeignKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | undefined): string[] | undefined {
    if (!systemMetaData) return undefined
    return extractSecretForeignKeys(systemMetaData)
}

export function toCryptedForeignKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | undefined):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    if (!systemMetaData) return undefined
    const delegations = extractCryptedForeignKeys(systemMetaData)
    return !!delegations ? toObjectOfArrayOfDelegations(delegations) : undefined
}

export function toDelegations(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | undefined):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    if (!systemMetaData) return undefined
    const delegations = extractDelegations(systemMetaData)
    return !!delegations ? toObjectOfArrayOfDelegations(delegations) : undefined
}

export function toEncryptionKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | undefined):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    if (!systemMetaData) return undefined
    const delegations = extractEncryptionKeys(systemMetaData)
    return !!delegations ? toObjectOfArrayOfDelegations(delegations) : undefined
}

function toObjectOfArrayOfDelegations(delegations: Record<string, Array<Delegation>>):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return Object.fromEntries(Object.entries(delegations).map(([k, v]) => [k, v.map(mapDelegationToDelegationDto)]))
}

export function toEncryptedSelf(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | undefined): string | undefined {
    return systemMetaData ? extractEncryptedSelf(systemMetaData) : undefined
}

export function toSecurityMetadataDto(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | undefined): SecurityMetadataDto | undefined {
    return !!systemMetaData?.securityMetadata ? mapSecurityMetadataToSecurityMetadataDto(systemMetaData.securityMetadata) : undefined
}

export function systemMetaDataTags(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | SystemMetaDataOwner | undefined): Array<CodingReference> {
    return systemMetaData?.tags ?? new Array<CodingReference>()
}
