import { Message } from '@icure/api'
import { Filter } from '../Filter'

export interface MessageByHcPartyFilter extends Filter<Message> {
    $type: 'MessageByHcPartyFilter'
    hcpId?: string
    description?: string
}
