import { Filter } from '../Filter'
import { Service } from '@icure/api'

export interface ServiceByIdsFilter extends Filter<Service> {
    description?: string
    ids: string[]
    $type: 'ServiceByIdsFilter'
}
