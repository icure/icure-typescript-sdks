import { Filter } from '../Filter'
import { HealthcareParty } from '@icure/api'

export interface HealthcarePartyByNameFilter extends Filter<HealthcareParty> {
    description?: string
    name: string
    descending?: boolean
    $type: 'HealthcarePartyByNameFilter'
}
