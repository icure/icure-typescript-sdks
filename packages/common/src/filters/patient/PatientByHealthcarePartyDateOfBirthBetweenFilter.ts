import { Filter } from '../Filter'
import { Patient } from '@icure/api'

export interface PatientByHealthcarePartyDateOfBirthBetweenFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    minDateOfBirth?: number
    maxDateOfBirth?: number
    $type: 'PatientByHealthcarePartyDateOfBirthBetweenFilter'
}
