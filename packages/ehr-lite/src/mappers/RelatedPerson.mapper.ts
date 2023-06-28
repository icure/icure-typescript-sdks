import { RelatedPerson } from '../models/RelatedPerson.model'
import { Partnership } from '@icure/api'
import { RelatedPersonTypeEnum } from '../models/enums/RelatedPersonType.enum'
import { RelatedPersonStatusEnum } from '../models/enums/RelatedPersonStatus.enum'

function toPartnershipType(domain: RelatedPerson): Partnership.TypeEnum | undefined {
    return domain.type
}

function toPartnershipStatus(domain: RelatedPerson): Partnership.StatusEnum | undefined {
    return domain.status
}

function toPartnershipPartnerId(domain: RelatedPerson): string | undefined {
    return domain.personId
}

function toPartnershipMeToOtherRelationshipDescription(domain: RelatedPerson): string | undefined {
    return undefined
}

function toPartnershipOtherToMeRelationshipDescription(domain: RelatedPerson): string | undefined {
    return undefined
}

function toRelatedPersonType(dto: Partnership): RelatedPersonTypeEnum | undefined {
    return dto.type as RelatedPersonTypeEnum | undefined
}

function toRelatedPersonStatus(dto: Partnership): RelatedPersonStatusEnum | undefined {
    return dto.status as RelatedPersonStatusEnum | undefined
}

function toRelatedPersonPersonId(dto: Partnership): string | undefined {
    return dto.partnerId
}

export function mapPartnershipToRelatedPerson(dto: Partnership): RelatedPerson {
    return new RelatedPerson({
        type: toRelatedPersonType(dto),
        status: toRelatedPersonStatus(dto),
        personId: toRelatedPersonPersonId(dto),
    })
}

export function mapRelatedPersonToPartnership(domain: RelatedPerson): Partnership {
    return new Partnership({
        type: toPartnershipType(domain),
        status: toPartnershipStatus(domain),
        partnerId: toPartnershipPartnerId(domain),
        meToOtherRelationshipDescription: toPartnershipMeToOtherRelationshipDescription(domain),
        otherToMeRelationshipDescription: toPartnershipOtherToMeRelationshipDescription(domain),
    })
}
