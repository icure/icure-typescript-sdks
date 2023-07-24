import { Filter } from '../Filter'
import { Service } from '@icure/api'

export interface ServiceByHealthcarePartyFilter extends Filter<Service> {
    description?: string
    hcpId: string
    $type: 'ServiceByHealthcarePartyFilter'
}
