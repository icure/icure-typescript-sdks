import { Topic } from '@icure/api'
import { Filter } from '../Filter'

export interface TopicByHcPartyFilter extends Filter<Topic> {
    $type: 'TopicByHcPartyFilter'
    hcpId?: string
    desc?: string
}
