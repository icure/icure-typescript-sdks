import { Filter } from '../Filter'
import { ContactDto } from '../../index'

export interface ContactByHcPartyPatientTagCodeDateFilter extends Filter<ContactDto> {
    desc?: string
    healthcarePartyId: string
    patientSecretForeignKey?: string
    patientSecretForeignKeys?: Array<string>
    tagType?: string
    tagCode?: string
    codeType?: string
    codeCode?: string
    startServiceValueDate?: number
    endServiceValueDate?: number
    $type: 'ContactByHcPartyPatientTagCodeDateFilter'
}
