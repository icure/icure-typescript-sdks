import {Filter} from "../Filter";
import {Service} from "@icure/api";

export interface ServiceByHealthcarePartyHealthElementIdsFilter extends Filter<Service> {
  description?: string
  healthcarePartyId?: string
  healthcareElementIds?: Array<string>
  '$type': 'ServiceByHealthcarePartyHealthElementIdsFilter'
}
