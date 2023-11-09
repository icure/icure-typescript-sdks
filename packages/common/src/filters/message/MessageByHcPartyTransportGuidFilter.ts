import { Message } from '@icure/api'
import { Filter } from '../Filter'

export interface MessageByHcPartyTransportGuidFilter extends Filter<Message> {
    $type: 'MessageByHcPartyTransportGuidFilter'
    healthcarePartyId?: string
    transportGuid?: string
    description?: string
}
