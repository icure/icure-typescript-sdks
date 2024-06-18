import { Filter } from '../Filter'
import { ContactDto } from '../../index'

export interface ContactByHcPartyTagCodeDateFilter extends Filter<ContactDto> {
    desc?: string
    healthcarePartyId: string
    tagType?: string
    tagCode?: string
    codeType?: string
    codeCode?: string
    startOfContactOpeningDate?: number
    endOfContactOpeningDate?: number
    $type: 'ContactByHcPartyTagCodeDateFilter'
}
