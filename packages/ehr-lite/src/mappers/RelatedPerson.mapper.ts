import { RelatedPerson } from '../models/RelatedPerson.model'
import { PartnershipDto } from '@icure/typescript-common'
import { RelatedPersonTypeEnum } from '../models/enums/RelatedPersonType.enum'
import { RelatedPersonStatusEnum } from '../models/enums/RelatedPersonStatus.enum'

function toPartnershipDtoType(domain: RelatedPerson): PartnershipDto.TypeEnum | undefined {
    return domain.type
}

function toPartnershipDtoStatus(domain: RelatedPerson): PartnershipDto.StatusEnum | undefined {
    return domain.status
}

function toPartnershipDtoPartnerId(domain: RelatedPerson): string | undefined {
    return domain.personId
}

function toPartnershipDtoMeToOtherRelationshipDescription(domain: RelatedPerson): string | undefined {
    return undefined
}

function toPartnershipDtoOtherToMeRelationshipDescription(domain: RelatedPerson): string | undefined {
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

export function mapPartnershipDtoToRelatedPerson(dto: PartnershipDto): RelatedPerson {
    return new RelatedPerson({
        type: toRelatedPersonType(dto),
        status: toRelatedPersonStatus(dto),
        personId: toRelatedPersonPersonId(dto),
    })
}

export function mapRelatedPersonToPartnershipDto(domain: RelatedPerson): PartnershipDto {
    return new PartnershipDto({
        type: toPartnershipDtoType(domain),
        status: toPartnershipDtoStatus(domain),
        partnerId: toPartnershipDtoPartnerId(domain),
        meToOtherRelationshipDescription: toPartnershipDtoMeToOtherRelationshipDescription(domain),
        otherToMeRelationshipDescription: toPartnershipDtoOtherToMeRelationshipDescription(domain),
    })
}
