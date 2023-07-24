import { Filter } from '../Filter'
import { Patient } from '@icure/api'

export interface PatientByIdsFilter extends Filter<Patient> {
    description?: string
    ids: string[]
    $type: 'PatientByIdsFilter'
}
