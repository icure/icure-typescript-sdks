import { AuthenticationProcessBody } from '../models/api/AuthenticationProcessBody'
import { EmailMessage } from '../models/api/EmailMessage'
import { SMSMessage } from '../models/api/SMSMessage'

export interface MessageGatewayApi {
    // TODO should be changed to support jwt auth and should be based on email templates.
    sendEmail(recipientEmail: string, email: EmailMessage): Promise<boolean>
    // TODO should be changed to support jwt auth and should be based on email templates.
    sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<boolean>

    startProcess(processId: string, processBody: AuthenticationProcessBody, validationCodeLength?: number): Promise<string>

    validateProcess(requestId: string, validationCode: string): Promise<boolean>
}
