import { RelatedPerson } from '../models/RelatedPerson.model'
import { PartnershipDto } from '@icure/typescript-common'
import { RelatedPersonTypeEnum } from '../models/enums/RelatedPersonType.enum'
import { RelatedPersonStatusEnum } from '../models/enums/RelatedPersonStatus.enum'

function toPartnershipType(domain: RelatedPerson): PartnershipDto.TypeEnum | undefined {
    return domain.type
}

function toPartnershipStatus(domain: RelatedPerson): PartnershipDto.StatusEnum | undefined {
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

function toRelatedPersonType(dto: PartnershipDto): RelatedPersonTypeEnum | undefined {
    return dto.type as RelatedPersonTypeEnum | undefined
}

function toRelatedPersonStatus(dto: PartnershipDto): RelatedPersonStatusEnum | undefined {
    return dto.status as RelatedPersonStatusEnum | undefined
}

function toRelatedPersonPersonId(dto: PartnershipDto): string | undefined {
    return dto.partnerId
}

export function mapPartnershipToRelatedPerson(dto: PartnershipDto): RelatedPerson {
    return new RelatedPerson({
        type: toRelatedPersonType(dto),
        status: toRelatedPersonStatus(dto),
        personId: toRelatedPersonPersonId(dto),
    })
}

export function mapRelatedPersonToPartnership(domain: RelatedPerson): PartnershipDto {
    return new PartnershipDto({
        type: toPartnershipType(domain),
        status: toPartnershipStatus(domain),
        partnerId: toPartnershipPartnerId(domain),
        meToOtherRelationshipDescription: toPartnershipMeToOtherRelationshipDescription(domain),
        otherToMeRelationshipDescription: toPartnershipOtherToMeRelationshipDescription(domain),
    })
}
