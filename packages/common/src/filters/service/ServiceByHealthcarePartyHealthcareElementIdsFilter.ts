import { Filter } from '../Filter'
import { Service } from '@icure/api'

export interface ServiceByHealthcarePartyHealthElementIdsFilter extends Filter<Service> {
    description?: string
    healthcarePartyId?: string
    healthElementIds?: Array<string>
    $type: 'ServiceByHealthcarePartyHealthElementIdsFilter'
}
