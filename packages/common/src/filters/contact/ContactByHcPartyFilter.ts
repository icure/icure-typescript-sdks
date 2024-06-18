import { Filter } from '../Filter'
import { ContactDto } from '../../index'

export interface ContactByHcPartyFilter extends Filter<ContactDto> {
    desc?: string
    hcpId: string
    $type: 'ContactByHcPartyFilter'
}
