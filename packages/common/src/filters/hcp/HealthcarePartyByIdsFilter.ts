import {Filter} from "../Filter";
import {HealthcareParty} from "@icure/api";

export interface HealthcarePartyByIdsFilter extends Filter<HealthcareParty> {
    description?: string
    ids: string[]
  '$type': 'HealthcarePartyByIdsFilter'
}
