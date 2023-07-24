import { Filter } from '../Filter'
import { User } from '@icure/api'

export interface UserByIdsFilter extends Filter<User> {
    description?: string
    ids: string[]
    $type: 'UserByIdsFilter'
}
