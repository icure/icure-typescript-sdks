import { Patient } from '../models/Patient.model'
import { User, MessageFactory, ICureMessageFactory } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { Organisation } from '../models/Organisation.model'

// any hcp like?
export interface EHRLiteMessageFactory extends MessageFactory<User, Practitioner | Organisation, Patient> {}

class ICureEHRLiteMessageFactory extends ICureMessageFactory<User, Patient> {
    emailOf(hcp: User): string {
        if (!hcp.email) throw new Error(`No email address found for hcp user ${hcp.id}`)
        return hcp.email
    }

    loginOf(user: User): string {
        if (!user.login) throw new Error(`No login found for user ${user.id}`)
        return user.login
    }

    nameOf(patient: Patient): string {
        const name = patient.names?.[0]?.given?.[0]
        if (!name) throw new Error(`No first name found for patient ${patient.id}`)
        return name
    }
}
export const iCureEHRLiteMessageFactory: EHRLiteMessageFactory = new ICureEHRLiteMessageFactory()
