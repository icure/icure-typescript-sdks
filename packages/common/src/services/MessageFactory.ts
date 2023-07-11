import { User } from '../models/User.model'
import { EmailMessage } from '../models/api/EmailMessage'
import { SMSMessage } from '../models/api/SMSMessage'

/**
 * Factory to create messages sent to the end users.
 */
export interface MessageFactory<DSUser, DSHealthcareParty, DSPatient> {
    /**
     * In cases where the recipient of the message has both an email and a mobile phone number available the sdk will
     * send a message of the preferred type.
     */
    readonly preferredMessageType: 'sms' | 'email'

    /**
     * Get an email to use for the invitation of a new user.
     * @param recipientUser the invited user
     * @param recipientPatient the patient information of the invited user
     * @param recipientPassword the initial password for the invited user
     * @param invitingUser the user that is inviting the patient
     * @param invitingDataOwner the data owner information of the user that is inviting the patient
     */
    getPatientInvitationEmail(recipientUser: DSUser, recipientPatient: DSPatient, recipientPassword: string, invitingUser: DSUser, invitingDataOwner: DSHealthcareParty): EmailMessage

    /**
     * Get an sms to use for the invitation of a new user.
     * @param recipientUser the invited patient user information
     * @param recipientPatient the information of the invited patient
     * @param recipientPassword the initial password for the invited patient
     * @param invitingUser the user that is inviting the patient
     * @param invitingDataOwner the data owner information of the user that is inviting the patient
     */
    getPatientInvitationSMS(recipientUser: DSUser, recipientPatient: DSPatient, recipientPassword: string, invitingUser: DSUser, invitingDataOwner: DSHealthcareParty): SMSMessage
}
