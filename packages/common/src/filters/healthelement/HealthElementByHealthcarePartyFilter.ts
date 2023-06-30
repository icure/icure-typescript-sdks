import {Filter} from "../Filter";
import {HealthElement} from "@icure/api";

export interface HealthElementByHealthcarePartyFilter extends Filter<HealthElement> {
    description?: string
    healthcarePartyId: string
  '$type': 'HealthElementByHealthcarePartyFilter'

}
