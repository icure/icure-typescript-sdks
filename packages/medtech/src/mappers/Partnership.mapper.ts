import { Partnership, PartnershipStatusEnum, PartnershipTypeEnum } from '../models/Partnership.model'
import { Partnership as PartnershipDto } from '@icure/api'

function toPartnershipDtoType(domain: Partnership): PartnershipDto.TypeEnum | undefined {
  return domain.type
}

function toPartnershipDtoStatus(domain: Partnership): PartnershipDto.StatusEnum | undefined {
  return domain.status
}

function toPartnershipDtoPartnerId(domain: Partnership): string | undefined {
  return domain.partnerId
}

function toPartnershipDtoMeToOtherRelationshipDescription(domain: Partnership): string | undefined {
  return undefined
}

function toPartnershipDtoOtherToMeRelationshipDescription(domain: Partnership): string | undefined {
  return undefined
}

function toPartnershipType(dto: PartnershipDto): PartnershipTypeEnum | undefined {
  return dto.type
}

function toPartnershipStatus(dto: PartnershipDto): PartnershipStatusEnum | undefined {
  return dto.status
}

function toPartnershipPartnerId(dto: PartnershipDto): string | undefined {
  return dto.partnerId
}

export function mapPartnershipDtoToPartnership(dto: PartnershipDto): Partnership {
  return new Partnership({
    type: toPartnershipType(dto),
    status: toPartnershipStatus(dto),
    partnerId: toPartnershipPartnerId(dto),
  })
}

export function mapPartnershipToPartnershipDto(domain: Partnership): PartnershipDto {
  return new PartnershipDto({
    type: toPartnershipDtoType(domain),
    status: toPartnershipDtoStatus(domain),
    partnerId: toPartnershipDtoPartnerId(domain),
    meToOtherRelationshipDescription: toPartnershipDtoMeToOtherRelationshipDescription(domain),
    otherToMeRelationshipDescription: toPartnershipDtoOtherToMeRelationshipDescription(domain),
  })
}
