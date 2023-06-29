import {Filter} from "../Filter";
import {User} from "@icure/api";

export interface UsersByPatientIdFilter extends Filter<User> {
    description?: string
    patientId: string
    '$type': 'UsersByPatientIdFilter'
}
