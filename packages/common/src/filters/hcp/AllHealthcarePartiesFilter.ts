import {Filter} from "../Filter";
import {HealthcareParty} from "@icure/api";

export interface AllHealthcarePartiesFilter extends Filter<HealthcareParty> {
    description?: string
  '$type': 'AllHealthcarePartiesFilter'
}
