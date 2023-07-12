import {DataOwner} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {CodeStub} from "@icure/api";

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