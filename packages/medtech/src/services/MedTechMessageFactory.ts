import { HealthcareProfessional } from '../models/HealthcareProfessional.model'
import { Patient } from '../models/Patient.model'
import { ICureMessageFactory, MessageFactory, User } from '@icure/typescript-common'

export interface MedTechMessageFactory extends MessageFactory<User, HealthcareProfessional, Patient> {}

class ICureMedTechMessageFactory extends ICureMessageFactory<User, Patient> {
    emailOf(hcp: User): string {
        if (!hcp.email) throw new Error(`No email address found for hcp user ${hcp.id}`)
        return hcp.email
    }

    loginOf(user: User): string {
        if (!user.login) throw new Error(`No login found for user ${user.id}`)
        return user.login
    }

    nameOf(patient: Patient): string {
        if (!patient.firstName) throw new Error(`No first name found for patient ${patient.id}`)
        return patient.firstName
    }
}

export const iCureMedTechMessageFactory: MedTechMessageFactory = new ICureMedTechMessageFactory()
