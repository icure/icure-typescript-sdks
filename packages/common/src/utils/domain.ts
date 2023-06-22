import {DataOwner} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {CodeStub} from "@icure/api";

const ICURE_DOMAIN_TYPE_TYPE = 'icure'
const ICURE_DOMAIN_TYPE_CODE = 'ICURE_INTERNAL_DOMAIN_TYPE'
const ICURE_DOMAIN_TYPE_VERSION = '1'

export const extractDataOwnerDomainType = (dataOwnerWithType: DataOwner) => {
    const tags = dataOwnerWithType.tags || []

    const domainType = extractDomainType(tags)

    if (!domainType) {
        throw new Error(`Data owner ${dataOwnerWithType.id} has no domain type tag`)
    }

    return domainType
}

export const extractDomainType = (tags: CodeStub[]) => {
    const domainTypeTag = tags.find(tag => tag.id === `${ICURE_DOMAIN_TYPE_TYPE}|${ICURE_DOMAIN_TYPE_CODE}|${ICURE_DOMAIN_TYPE_VERSION}`)

    return domainTypeTag?.context
}