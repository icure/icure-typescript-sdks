import { Message } from '@icure/api'
import { Filter } from '../Filter'

export interface LatestMessageByHcPartyTransportGuidFilter extends Filter<Message> {
    $type: 'LatestMessageByHcPartyTransportGuidFilter'
    healthcarePartyId?: string
    transportGuid?: string
    description?: string
}
