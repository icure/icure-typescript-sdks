import { RelatedPractitioner } from '../models/RelatedPractitioner.model'
import { PatientHealthCarePartyDto, ReferralPeriod } from '@icure/typescript-common'
import { PractitionerTypeEnum } from '../models/enums/PractitionerType.enum'

function toPatientHealthCarePartyType(domain: RelatedPractitioner): PatientHealthCarePartyDto.TypeEnum | undefined {
    return domain.type
}

function toPatientHealthCarePartyHealthcarePartyId(domain: RelatedPractitioner): string | undefined {
    return domain.healthcarePartyId
}

function toPatientHealthCarePartySendFormats(domain: RelatedPractitioner): { [key: string]: string } | undefined {
    return undefined
}

function toPatientHealthCarePartyReferralPeriods(domain: RelatedPractitioner): ReferralPeriod[] | undefined {
    return undefined
}

function toPatientHealthCarePartyReferral(domain: RelatedPractitioner): boolean | undefined {
    return undefined
}

function toPatientHealthCarePartyEncryptedSelf(domain: RelatedPractitioner): string | undefined {
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

export function mapPatientHealthCarePartyToRelatedPractitioner(dto: PatientHealthCarePartyDto): RelatedPractitioner {
    return new RelatedPractitioner({
        type: toRelatedPractitionerType(dto),
        healthcarePartyId: toRelatedPractitionerHealthcarePartyId(dto),
        encryptedSelf: toRelatedPractitionerEncryptedSelf(dto),
    })
}

export function mapRelatedPractitionerToPatientHealthCareParty(domain: RelatedPractitioner): PatientHealthCarePartyDto {
    return new PatientHealthCarePartyDto({
        type: toPatientHealthCarePartyType(domain),
        healthcarePartyId: toPatientHealthCarePartyHealthcarePartyId(domain),
        sendFormats: toPatientHealthCarePartySendFormats(domain),
        referralPeriods: toPatientHealthCarePartyReferralPeriods(domain),
        referral: toPatientHealthCarePartyReferral(domain),
        encryptedSelf: toPatientHealthCarePartyEncryptedSelf(domain),
    })
}
