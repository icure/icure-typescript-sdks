import {DataOwner} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {CodeStub} from "@icure/api";
import {CodingReference} from "../models/CodingReference.model";
import {mapCodeStubToCodingReference, mapCodingReferenceToCodeStub} from "../mappers/CodingReference.mapper";
import {addUniqueObjectsToArray} from "@icure/ehr-lite-sdk/dist/utils/Array.utils";
import {systemMetaDataTags} from "../mappers/SystemMetaData.mapper";
import {SystemMetaDataEncrypted} from "../models/SystemMetaDataEncrypted.model";
import {SystemMetaDataOwner} from "../models/SystemMetaDataOwner.model";
import {SystemMetaDataOwnerEncrypted} from "../models/SystemMetaDataOwnerEncrypted.model";

const ICURE_DOMAIN_TYPE_TYPE = 'icure'
const ICURE_DOMAIN_TYPE_CODE = 'ICURE_INTERNAL_DOMAIN_TYPE'
const ICURE_DOMAIN_TYPE_VERSION = '1'

export const ICURE_DOMAIN_TYPE_ID = `${ICURE_DOMAIN_TYPE_TYPE}|${ICURE_DOMAIN_TYPE_CODE}|${ICURE_DOMAIN_TYPE_VERSION}`

export const extractDataOwnerDomainType = (dataOwnerWithType: DataOwner) => {
    const tags = dataOwnerWithType.tags || []

    const domainType = extractDomainType(tags)

    if (!domainType) {
        throw new Error(`Data owner ${dataOwnerWithType.id} has no domain type tag`)
    }

    return domainType
}

export const extractDomainTypeTag = (tags?: CodeStub[]): CodeStub | undefined => {
    return tags?.find(tag => tag.id === ICURE_DOMAIN_TYPE_ID)
}

export const extractDomainType = (tags?: CodeStub[]) => {
    const domainTypeTag = extractDomainTypeTag(tags)

    return domainTypeTag?.context
}

export const dataOwnerDomainTypeTag = (domainType: string): CodeStub => {
    return {
        id: `${ICURE_DOMAIN_TYPE_TYPE}|${ICURE_DOMAIN_TYPE_CODE}|${ICURE_DOMAIN_TYPE_VERSION}`,
        context: domainType,
        version: ICURE_DOMAIN_TYPE_VERSION,
        code: ICURE_DOMAIN_TYPE_CODE,
        type: ICURE_DOMAIN_TYPE_TYPE,
    }
}

export const filteringOutInternalTags = (domainType: string, tags?: CodeStub[], throwOnMissing: boolean = true): Set<CodingReference> | undefined => {
    const domainTypeTag = extractDomainTypeTag(tags)
    if ((!domainTypeTag || domainTypeTag.context !== domainType) && throwOnMissing) throw new Error(`${domainType} domain tag type is missing`)
    const filteredTags = tags?.filter((tag) => tag.id !== ICURE_DOMAIN_TYPE_ID)
    return !!filteredTags?.length ? new Set(filteredTags.map(mapCodeStubToCodingReference)) : undefined
}

export const mergeTagsWithInternalTags = (domainType: string, tags: Set<CodingReference> | undefined, systemMetaData: SystemMetaDataEncrypted | SystemMetaDataOwnerEncrypted | SystemMetaDataOwner | undefined): CodeStub[] => {
    const tagArray = [...(tags ?? [])]
    if (!systemMetaData) {
        return addUniqueObjectsToArray(tagArray?.map(mapCodingReferenceToCodeStub) ?? [], dataOwnerDomainTypeTag(domainType))
    }
    const systemMetaDataCodeStubs = systemMetaDataTags(systemMetaData)
    return addUniqueObjectsToArray(tagArray, ...systemMetaDataCodeStubs).map(mapCodingReferenceToCodeStub)
}