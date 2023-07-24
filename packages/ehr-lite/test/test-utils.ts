import { EHRLiteMessageFactory } from '../dist/ehr-lite/src/services/EhrLiteMessageFactory'
import { EmailMessage, SMSMessage, User } from '@icure/typescript-common'
import { Patient, Organisation, Practitioner } from '../src'

export class TestMessageFactory implements EHRLiteMessageFactory {
    readonly preferredMessageType = 'email'

    getPatientInvitationEmail(recipientUser: User, recipientPatient: Patient, recipientPassword: string, invitingUser: User, invitingDataOwner: Organisation | Practitioner): EmailMessage {
        return {
            from: 'nobody@nowhere.boh',
            subject: `${recipientUser.login}|${recipientPassword}`,
            html: `User: ${recipientUser.id}`,
        }
    }

    getPatientInvitationSMS(recipientUser: User, recipientPatient: Patient, recipientPassword: string, invitingUser: User, invitingDataOwner: Organisation | Practitioner): SMSMessage {
        return {
            message: `${recipientUser.login}|${recipientPassword}`,
        }
    }
}
