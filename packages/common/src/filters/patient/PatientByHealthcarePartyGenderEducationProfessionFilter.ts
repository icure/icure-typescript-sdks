import {Filter} from "../Filter";
import {Patient} from "@icure/api";

export interface PatientByHealthcarePartyGenderEducationProfessionFilter extends Filter<Patient> {
    description?: string
    healthcarePartyId?: string
    gender?: Patient.GenderEnum
    education?: string
    profession?: string
  '$type': 'PatientByHealthcarePartyGenderEducationProfessionFilter'
}
