import {Filter} from "../Filter";
import {HealthcareParty} from "@icure/api";

export interface HealthcarePartyByLabelCodeFilter extends Filter<HealthcareParty> {
    codeCode?: string
    codeType?: string
    description?: string
    labelCode?: string
    labelType?: string
    '$type': 'HealthcarePartyByLabelCodeFilter'
}
