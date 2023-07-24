import { HealthElement, Identifier } from '@icure/api'
import { Filter } from '../Filter'

export interface HealthElementByHealthcarePartyIdentifiersFilter extends Filter<HealthElement> {
    description?: string
    healthcarePartyId?: string
    identifiers: Identifier[]
    $type: 'HealthElementByHealthcarePartyIdentifiersFilter'
}
