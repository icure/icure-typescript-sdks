import { Identifier, Patient } from '@icure/api'
import { Filter } from '../Filter'

export interface PatientByHealthcarePartyIdentifiersFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    identifiers: Identifier[]
    $type: 'PatientByHealthcarePartyIdentifiersFilter'
}
