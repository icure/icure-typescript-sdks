import { Filter } from '../Filter'
import { Patient } from '@icure/api'

export interface PatientByHealthcarePartySsinsFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    ssins: string[]
    $type: 'PatientByHealthcarePartySsinsFilter'
}
