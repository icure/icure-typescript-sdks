import { PatientHealthCareParty, PatientHealthCarePartyTypeEnum } from '../models/PatientHealthCareParty.model'
import { PatientHealthCareParty as PatientHealthCarePartyDto, ReferralPeriod } from '@icure/api'

function toPatientHealthCarePartyDtoType(domain: PatientHealthCareParty): PatientHealthCarePartyDto.TypeEnum | undefined {
  return domain.type
}

function toPatientHealthCarePartyDtoHealthcarePartyId(domain: PatientHealthCareParty): string | undefined {
  return domain.healthcarePartyId
}

function toPatientHealthCarePartyDtoSendFormats(domain: PatientHealthCareParty): { [key: string]: string } | undefined {
  return undefined
}

function toPatientHealthCarePartyDtoReferralPeriods(domain: PatientHealthCareParty): ReferralPeriod[] | undefined {
  return undefined
}

function toPatientHealthCarePartyDtoReferral(domain: PatientHealthCareParty): boolean | undefined {
  return undefined
}

function toPatientHealthCarePartyDtoEncryptedSelf(domain: PatientHealthCareParty): string | undefined {
  return undefined
}

function toPatientHealthCarePartyType(dto: PatientHealthCarePartyDto): PatientHealthCarePartyTypeEnum | undefined {
  return dto.type
}

function toPatientHealthCarePartyHealthcarePartyId(dto: PatientHealthCarePartyDto): string | undefined {
  return dto.healthcarePartyId
}

export function mapPatientHealthCarePartyDtoToPatientHealthCareParty(dto: PatientHealthCarePartyDto): PatientHealthCareParty {
  return new PatientHealthCareParty({
    type: toPatientHealthCarePartyType(dto),
    healthcarePartyId: toPatientHealthCarePartyHealthcarePartyId(dto),
  })
}

export function mapPatientHealthCarePartyToPatientHealthCarePartyDto(domain: PatientHealthCareParty): PatientHealthCarePartyDto {
  return new PatientHealthCarePartyDto({
    type: toPatientHealthCarePartyDtoType(domain),
    healthcarePartyId: toPatientHealthCarePartyDtoHealthcarePartyId(domain),
    sendFormats: toPatientHealthCarePartyDtoSendFormats(domain),
    referralPeriods: toPatientHealthCarePartyDtoReferralPeriods(domain),
    referral: toPatientHealthCarePartyDtoReferral(domain),
    encryptedSelf: toPatientHealthCarePartyDtoEncryptedSelf(domain),
  })
}
