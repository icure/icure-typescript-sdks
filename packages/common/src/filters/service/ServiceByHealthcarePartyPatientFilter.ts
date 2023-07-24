import { Filter } from '../Filter'
import { Service } from '@icure/api'

export interface ServiceByHealthcarePartyPatientFilter extends Filter<Service> {
    description?: string
    healthcarePartyId?: string
    patientSecretForeignKeys: string[]
    $type: 'ServiceByHealthcarePartyPatientFilter'
}
