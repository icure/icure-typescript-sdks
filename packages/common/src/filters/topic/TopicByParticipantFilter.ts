import { Topic } from '@icure/api'
import { Filter } from '../Filter'

export interface TopicByParticipantFilter extends Filter<Topic> {
    $type: 'TopicByParticipantFilter'
    participantId?: string
    description?: string
}
