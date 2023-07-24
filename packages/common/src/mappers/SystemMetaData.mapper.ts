import { CodeStub, Device, HealthcareParty, HealthElement, MaintenanceTask, Patient, Service } from '@icure/api'
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

function toMapOfSetOfDelegations(delegations: { [p: string]: DelegationDto[] }): Map<string, Set<DelegationDto>> {
    return new Map(Object.entries(delegations).map(([k, v]) => [k, new Set(v.map(mapDelegationDtoToDelegation))]))
}

function extractInternalTags(dto: HealthElement | Service | MaintenanceTask | HealthcareParty | Patient | Device): Set<CodingReference> | undefined {
    return !!dto.tags ? new Set(dto.tags.filter((t) => t.type === ICURE_INTERNAL_FHIR_TAG_TYPE).map(mapCodeStubToCodingReference)) : undefined
}

export function toSystemMetaDataEncrypted(dto: HealthElement | Service | MaintenanceTask): SystemMetaDataEncrypted | undefined {
    return new SystemMetaDataEncrypted({
        encryptedSelf: dto.encryptedSelf,
        secretForeignKeys: dto.secretForeignKeys,
        cryptedForeignKeys: !!dto.cryptedForeignKeys ? toMapOfSetOfDelegations(dto.cryptedForeignKeys) : undefined,
        delegations: !!dto.delegations ? toMapOfSetOfDelegations(dto.delegations) : undefined,
        encryptionKeys: !!dto.encryptionKeys ? toMapOfSetOfDelegations(dto.encryptionKeys) : undefined,
        tags: extractInternalTags(dto),
    })
}

export function toSystemMetaDataOwner(dto: HealthcareParty | Patient | Device): SystemMetaDataOwner | undefined {
    return new SystemMetaDataOwner({
        hcPartyKeys: !!dto.hcPartyKeys ? new Map(Object.entries(dto.hcPartyKeys)) : undefined,
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
        hcPartyKeys: !!dto.hcPartyKeys ? new Map(Object.entries(dto.hcPartyKeys)) : undefined,
        publicKey: dto.publicKey,
        aesExchangeKeys: !!dto.aesExchangeKeys ? convertObjectToDeepNestedMap(dto.aesExchangeKeys) : undefined,
        transferKeys: !!dto.transferKeys ? convertObjectToNestedMap(dto.transferKeys) : undefined,
        privateKeyShamirPartitions: !!dto.privateKeyShamirPartitions ? convertObjectToMap(dto.privateKeyShamirPartitions) : undefined,
        publicKeysForOaepWithSha256: dto.publicKeysForOaepWithSha256,
        tags: extractInternalTags(dto),
    })
}

export function toHcPartyKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataOwner):
    | {
          [key: string]: string[]
      }
    | undefined {
    const hcPartyKeys = extractHcPartyKeys(systemMetaData)
    return !!hcPartyKeys ? Object.fromEntries(hcPartyKeys.entries()) : undefined
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

export function toSecretForeignKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted): string[] | undefined {
    return extractSecretForeignKeys(systemMetaData)
}

export function toCryptedForeignKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    const delegations = extractCryptedForeignKeys(systemMetaData)
    return !!delegations ? toObjectOfArrayOfDelegations(delegations) : undefined
}

export function toDelegations(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    const delegations = extractDelegations(systemMetaData)
    return !!delegations ? toObjectOfArrayOfDelegations(delegations) : undefined
}

export function toEncryptionKeys(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    const delegations = extractEncryptionKeys(systemMetaData)
    return !!delegations ? toObjectOfArrayOfDelegations(delegations) : undefined
}

function toObjectOfArrayOfDelegations(delegations: Map<string, Set<Delegation>>):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return Object.fromEntries(Array.from(delegations.entries()).map(([k, v]) => [k, Array.from(v).map(mapDelegationToDelegationDto)]))
}

export function toEncryptedSelf(systemMetaData: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted): string | undefined {
    return extractEncryptedSelf(systemMetaData)
}

export function systemMetaDataTags(systemMetaData?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted | SystemMetaDataOwner): Set<CodingReference> {
    return systemMetaData?.tags ?? new Set<CodingReference>()
}
