import { Filter } from '../Filter'
import { ContactDto } from '../../index'

export interface ContactByServiceIdsFilter extends Filter<ContactDto> {
    desc?: string
    ids?: Array<string>
    $type: 'ContactByServiceIdsFilter'
}
