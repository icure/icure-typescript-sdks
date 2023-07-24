import { Filter } from '../Filter'
import { HealthElement } from '@icure/api'

export interface HealthElementByHealthcarePartyPatientFilter extends Filter<HealthElement> {
    description?: string
    healthcarePartyId?: string
    patientSecretForeignKeys: string[]
    $type: 'HealthElementByHealthcarePartyPatientFilter'
}
