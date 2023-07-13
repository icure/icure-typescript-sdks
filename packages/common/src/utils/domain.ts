import { DataOwner } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { CodeStub } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'
import { mapCodeStubToCodingReference, mapCodingReferenceToCodeStub } from '../mappers/CodingReference.mapper'
import { systemMetaDataTags } from '../mappers/SystemMetaData.mapper'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner.model'
import { SystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted.model'
import {addUniqueObjectsToArray} from "./Array.utils";

const ICURE_INTERNAL_FHIR_TAG_TYPE = 'ICURE_INTERNAL'
const ICURE_INTERNAL_FHIR_TAG_CODE = 'FHIR_TYPE'
const ICURE_INTERNAL_FHIR_TAG_VERSION = '5'

export const ICURE_INTERNAL_FHIR_TAG_ID = `${ICURE_INTERNAL_FHIR_TAG_TYPE}|${ICURE_INTERNAL_FHIR_TAG_CODE}|${ICURE_INTERNAL_FHIR_TAG_VERSION}`

export const extractDataOwnerDomainType = (dataOwnerWithType: DataOwner) => {
    const tags = dataOwnerWithType.tags || []

    const domainType = extractDomainType(tags)

    if (!domainType) {
        throw new Error(`Data owner ${dataOwnerWithType.id} has no domain type tag`)
    }

    return domainType
}

export const extractDomainTypeTag = (tags?: CodeStub[]): CodeStub | undefined => {
    return tags?.find((tag) => tag.id === ICURE_INTERNAL_FHIR_TAG_ID)
}

export const extractDomainType = (tags?: CodeStub[]) => {
    const domainTypeTag = extractDomainTypeTag(tags)

    return domainTypeTag?.context
}

export const dataOwnerDomainTypeTag = (domainType: string): CodeStub => {
    return new CodeStub({
        id: `${ICURE_INTERNAL_FHIR_TAG_TYPE}|${ICURE_INTERNAL_FHIR_TAG_CODE}|${ICURE_INTERNAL_FHIR_TAG_VERSION}`,
        context: domainType,
        version: ICURE_INTERNAL_FHIR_TAG_VERSION,
        code: ICURE_INTERNAL_FHIR_TAG_CODE,
        type: ICURE_INTERNAL_FHIR_TAG_TYPE,
    })
}

export const filteringOutInternalTags = (fhirType: string, tags?: CodeStub[], throwOnMissing: boolean = true): Set<CodingReference> | undefined => {
    const domainTypeTag = extractDomainTypeTag(tags)
    if ((!domainTypeTag || domainTypeTag.context !== fhirType) && throwOnMissing) throw new Error(`${fhirType} domain tag type is missing`)
    const filteredTags = tags?.filter((tag) => tag.id !== ICURE_INTERNAL_FHIR_TAG_ID)
    return !!filteredTags?.length ? new Set(filteredTags.map(mapCodeStubToCodingReference)) : undefined
}

export const mergeTagsWithInternalTags = (fhir: string, tags: Set<CodingReference> | undefined, systemMetaData: SystemMetaDataEncrypted | SystemMetaDataOwnerEncrypted | SystemMetaDataOwner | undefined): CodeStub[] => {
    const tagArray = [...(tags ?? [])]
    if (!systemMetaData) {
        return addUniqueObjectsToArray(tagArray?.map(mapCodingReferenceToCodeStub) ?? [], dataOwnerDomainTypeTag(fhir))
    }
    const systemMetaDataCodeStubs = systemMetaDataTags(systemMetaData)
    return addUniqueObjectsToArray(tagArray, ...systemMetaDataCodeStubs).map(mapCodingReferenceToCodeStub)
}
