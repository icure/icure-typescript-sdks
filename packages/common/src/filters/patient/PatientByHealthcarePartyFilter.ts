import {Filter} from "../Filter";
import {Patient} from "@icure/api";

export interface PatientByHealthcarePartyFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId: string
  '$type': 'PatientByHealthcarePartyFilter'
}
