import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted.model'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner.model'

export const extractSecretForeignKeys = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.secretForeignKeys
}

export const extractCryptedForeignKeys = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.cryptedForeignKeys
}

export const extractEncryptionKeys = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.encryptionKeys
}

export const extractDelegations = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.delegations
}

export const extractEncryptedSelf = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.encryptedSelf
}

export const extractSecurityMetadata = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.securityMetadata
}

export const extractHcPartyKeys = (value?: SystemMetaDataOwner | SystemMetaDataOwnerEncrypted) => {
    return value?.hcPartyKeys
}

export const extractAesExchangeKeys = (value?: SystemMetaDataOwner | SystemMetaDataOwnerEncrypted) => {
    return value?.aesExchangeKeys
}

export const extractTransferKeys = (value?: SystemMetaDataOwner | SystemMetaDataOwnerEncrypted) => {
    return value?.transferKeys
}

export const extractPrivateKeyShamirPartitions = (value?: SystemMetaDataOwner | SystemMetaDataOwnerEncrypted) => {
    return value?.privateKeyShamirPartitions
}

export const extractPublicKey = (value?: SystemMetaDataOwner | SystemMetaDataOwnerEncrypted) => {
    return value?.publicKey
}

export const extractPublicKeysForOaepWithSha256 = (value?: SystemMetaDataOwner | SystemMetaDataOwnerEncrypted) => {
    return value?.publicKeysForOaepWithSha256
}

export const extractSecurityMetaData = (value?: SystemMetaDataEncrypted | SystemMetaDataOwnerEncrypted) => {
    return value?.securityMetadata
}

export function convertMapToObject(map: Record<string, string>): { [key: string]: string } {
    return Object.entries(map).reduce(
        (obj, [key, value]) => {
            obj[key] = value
            return obj
        },
        {} as { [key: string]: string },
    )
}

export function convertObjectToMap(obj: { [key: string]: string }): Record<string, string> {
    return Object.fromEntries(Object.entries(obj))
}

export function convertNestedMapToObject(map: Record<string, Record<string, string>>): {
    [key: string]: { [key: string]: string }
} {
    return Object.entries(map).reduce(
        (outerObj, [outerKey, innerMap]) => {
            outerObj[outerKey] = convertMapToObject(innerMap)
            return outerObj
        },
        {} as { [key: string]: { [key: string]: string } },
    )
}

export function convertObjectToNestedMap(obj: { [key: string]: { [key: string]: string } }): Record<string, Record<string, string>> {
    return Object.fromEntries(Object.entries(obj).map(([outerKey, innerObj]) => [outerKey, convertObjectToMap(innerObj)]))
}

export function convertDeepNestedMapToObject(map: Record<string, Record<string, Record<string, string>>>): {
    [key: string]: { [key: string]: { [key: string]: string } }
} {
    return Object.entries(map).reduce(
        (outerObj, [outerKey, innerMap]) => {
            outerObj[outerKey] = convertNestedMapToObject(innerMap)
            return outerObj
        },
        {} as { [key: string]: { [key: string]: { [key: string]: string } } },
    )
}

export function convertObjectToDeepNestedMap(obj: { [key: string]: { [key: string]: { [key: string]: string } } }): Record<string, Record<string, Record<string, string>>> {
    return Object.fromEntries(Object.entries(obj).map(([outerKey, innerObj]) => [outerKey, convertObjectToNestedMap(innerObj)]))
}

export function convertMapOfArrayOfGenericToObject<T, U>(
    map: Record<string, T[]>,
    mapping: (t: T[]) => U[],
): {
    [key: string]: U[]
} {
    return Object.entries(map).reduce(
        (obj, [key, value]) => {
            obj[key] = mapping(value)
            return obj
        },
        {} as { [key: string]: U[] },
    )
}

export function convertObjectToMapOfArrayOfGeneric<U, T>(
    obj: {
        [key: string]: U[]
    },
    mapping: (u: U[]) => T[],
): Record<string, T[]> {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, mapping(value)]))
}
