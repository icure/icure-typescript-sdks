import { Filter } from '../Filter'
import {Service} from "@icure/api";

export interface ServiceByHealthcarePartyTagCodeDateFilter extends Filter<Service> {
  description?: string
  healthcarePartyId?: string
  patientSecretForeignKey?: string
  status?: number
  tagCode?: string
  tagType?: string
  codeCode?: string
  codeType?: string
  startValueDate?: number
  endValueDate?: number
  descending: boolean
  $type: 'ServiceByHealthcarePartyTagCodeDateFilter'
}
