import {Filter} from "../Filter";
import {HealthElement} from "@icure/api";

export interface HealthElementByHealthcarePartyLabelCodeFilter extends Filter<HealthElement> {
    codeCode?: string
    codeType?: string
    description?: string
    healthcarePartyId?: string
    status?: number
    tagCode?: string
    tagType?: string
  '$type': 'HealthElementByHealthcarePartyLabelCodeFilter'
}
