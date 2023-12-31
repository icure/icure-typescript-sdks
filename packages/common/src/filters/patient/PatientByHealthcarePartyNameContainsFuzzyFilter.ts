import { Filter } from '../Filter'
import { Patient } from '@icure/api'

export interface PatientByHealthcarePartyNameContainsFuzzyFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId: string
    searchString?: string
    $type: 'PatientByHealthcarePartyNameContainsFuzzyFilter'
}
