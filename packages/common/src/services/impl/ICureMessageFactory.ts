import { MessageFactory } from '../MessageFactory'
import { EmailMessage } from '../../models/api/EmailMessage'
import { SMSMessage } from '../../models/api/SMSMessage'

/**
 * Default message factory, should be replaced by custom implementation.
 */
export abstract class ICureMessageFactory<DSUser, DSPatient> implements MessageFactory<DSUser, any, DSPatient> {
    readonly preferredMessageType = 'email'

    getPatientInvitationEmail(recipientUser: DSUser, recipientPatient: DSPatient, recipientPassword: string, invitingUser: DSUser, invitingDataOwner: any): EmailMessage {
        return {
            from: this.emailOf(invitingUser),
            html: `Dear ${this.nameOf(recipientPatient)}, you have been invited to use an iCure-based application. You can login following credentials: ${this.loginOf(recipientUser)} & ${recipientPassword}`,
            subject: `You have been invited to use an iCure-base application`,
        }
    }

    getPatientInvitationSMS(recipientUser: DSUser, recipientPatient: any, recipientPassword: string, invitingUser: DSUser, invitingDataOwner: any): SMSMessage {
        return {
            message: `Dear ${this.nameOf(recipientPatient)}, you have been invited to use an iCure-based application. You can login following credentials: ${this.loginOf(recipientUser)} & ${recipientPassword}`,
        }
    }

    abstract loginOf(user: DSUser): string

    abstract nameOf(patient: DSPatient): string

    abstract emailOf(hcp: DSUser): string
}
