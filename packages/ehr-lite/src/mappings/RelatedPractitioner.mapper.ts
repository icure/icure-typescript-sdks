import { RelatedPractitioner } from '../models/RelatedPractitioner.model'
import { PatientHealthCareParty } from '@icure/api'
import { createMap, forMember, ignore, mapFrom } from '@automapper/core'
import { mapper } from './mapper'

function forMember_PatientHealthCareParty_type() {
    return forMember<RelatedPractitioner, PatientHealthCareParty>(
        (v) => v.type,
        mapFrom((v) => v.type)
    )
}

function forMember_PatientHealthCareParty_healthcarePartyId() {
    return forMember<RelatedPractitioner, PatientHealthCareParty>(
        (v) => v.healthcarePartyId,
        mapFrom((v) => v.healthcarePartyId)
    )
}

function forMember_PatientHealthCareParty_sendFormats() {
    return forMember<RelatedPractitioner, PatientHealthCareParty>((v) => v.sendFormats, ignore())
}

function forMember_PatientHealthCareParty_referralPeriods() {
    return forMember<RelatedPractitioner, PatientHealthCareParty>((v) => v.referralPeriods, ignore())
}

function forMember_PatientHealthCareParty_referral() {
    return forMember<RelatedPractitioner, PatientHealthCareParty>((v) => v.referral, ignore())
}

function forMember_PatientHealthCareParty_encryptedSelf() {
    return forMember<RelatedPractitioner, PatientHealthCareParty>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

function forMember_RelatedPractitioner_type() {
    return forMember<PatientHealthCareParty, RelatedPractitioner>(
        (v) => v.type,
        mapFrom((v) => v.type)
    )
}

function forMember_RelatedPractitioner_healthcarePartyId() {
    return forMember<PatientHealthCareParty, RelatedPractitioner>(
        (v) => v.healthcarePartyId,
        mapFrom((v) => v.healthcarePartyId)
    )
}

function forMember_RelatedPractitioner_encryptedSelf() {
    return forMember<PatientHealthCareParty, RelatedPractitioner>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

export function initializeRelatedPractitionerMapper() {
    createMap(mapper, RelatedPractitioner, PatientHealthCareParty, forMember_PatientHealthCareParty_type(), forMember_PatientHealthCareParty_healthcarePartyId(), forMember_PatientHealthCareParty_sendFormats(), forMember_PatientHealthCareParty_referralPeriods(), forMember_PatientHealthCareParty_referral(), forMember_PatientHealthCareParty_encryptedSelf())

    createMap(mapper, PatientHealthCareParty, RelatedPractitioner, forMember_RelatedPractitioner_type(), forMember_RelatedPractitioner_healthcarePartyId(), forMember_RelatedPractitioner_encryptedSelf())
}

export function mapPatientHealthCarePartyToRelatedPractitioner(entity: PatientHealthCareParty): RelatedPractitioner {
    return mapper.map(entity, PatientHealthCareParty, RelatedPractitioner)
}

export function mapRelatedPractitionerToPatientHealthCareParty(model: RelatedPractitioner): PatientHealthCareParty {
    return mapper.map(model, RelatedPractitioner, PatientHealthCareParty)
}
