import { RelatedPractitioner } from '../models/RelatedPractitioner.model'
import { PatientHealthCarePartyDto, ReferralPeriod } from '@icure/typescript-common'
import { PractitionerTypeEnum } from '../models/enums/PractitionerType.enum'

function toPatientHealthCarePartyDtoType(domain: RelatedPractitioner): PatientHealthCarePartyDto.TypeEnum | undefined {
    return domain.type
}

function toPatientHealthCarePartyDtoHealthcarePartyId(domain: RelatedPractitioner): string | undefined {
    return domain.healthcarePartyId
}

function toPatientHealthCarePartyDtoSendFormats(domain: RelatedPractitioner): { [key: string]: string } | undefined {
    return undefined
}

function toPatientHealthCarePartyDtoReferralPeriods(domain: RelatedPractitioner): ReferralPeriod[] | undefined {
    return undefined
}

function toPatientHealthCarePartyDtoReferral(domain: RelatedPractitioner): boolean | undefined {
    return undefined
}

function toPatientHealthCarePartyDtoEncryptedSelf(domain: RelatedPractitioner): string | undefined {
    return domain.encryptedSelf
}

function toRelatedPractitionerType(dto: PatientHealthCarePartyDto): PractitionerTypeEnum | undefined {
    return dto.type as PractitionerTypeEnum | undefined
}

function toRelatedPractitionerHealthcarePartyId(dto: PatientHealthCarePartyDto): string | undefined {
    return dto.healthcarePartyId as string | undefined
}

function toRelatedPractitionerEncryptedSelf(dto: PatientHealthCarePartyDto): string | undefined {
    return dto.encryptedSelf as string | undefined
}

export function mapPatientHealthCarePartyDtoToRelatedPractitioner(dto: PatientHealthCarePartyDto): RelatedPractitioner {
    return new RelatedPractitioner({
    type: toRelatedPractitionerType(dto),
    healthcarePartyId: toRelatedPractitionerHealthcarePartyId(dto),
    encryptedSelf: toRelatedPractitionerEncryptedSelf(dto),
    })
}

export function mapRelatedPractitionerToPatientHealthCarePartyDto(domain: RelatedPractitioner): PatientHealthCarePartyDto {
    return new PatientHealthCarePartyDto({
    type: toPatientHealthCarePartyDtoType(domain),
    healthcarePartyId: toPatientHealthCarePartyDtoHealthcarePartyId(domain),
    sendFormats: toPatientHealthCarePartyDtoSendFormats(domain),
    referralPeriods: toPatientHealthCarePartyDtoReferralPeriods(domain),
    referral: toPatientHealthCarePartyDtoReferral(domain),
    encryptedSelf: toPatientHealthCarePartyDtoEncryptedSelf(domain),
    })
}
