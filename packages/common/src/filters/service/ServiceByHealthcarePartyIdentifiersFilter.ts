import { Filter } from '../Filter'
import { Identifier, Service } from '@icure/api'

export interface ServiceByHealthcarePartyIdentifiersFilter extends Filter<Service> {
    description?: string
    healthcarePartyId?: string
    identifiers: Identifier[]
    $type: 'ServiceByHealthcarePartyIdentifiersFilter'
}
