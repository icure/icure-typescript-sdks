import { MessageGatewayApi } from '../MessageGatewayApi'
import { b2a, XHR } from '@icure/api'
import { Sanitizer } from '../../services/Sanitizer'
import { ErrorHandler } from '../../services/ErrorHandler'
import { AuthenticationProcessBody } from '../../models/api/AuthenticationProcessBody'
import { EmailMessage } from '../../models/api/EmailMessage'
import { SMSMessage } from '../../models/api/SMSMessage'
import Header = XHR.Header
import { v4 as uuid } from 'uuid'

export class MessageGatewayApiImpl implements MessageGatewayApi {
    private readonly authHeader: XHR.Header | null
    private readonly headers: Header[]

    constructor(
        private readonly msgGtwUrl: string,
        private readonly specId: string,
        private readonly errorHandler: ErrorHandler,
        private readonly sanitizer: Sanitizer,
        username?: string,
        password?: string,
        private readonly fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined' ? window.fetch : typeof self !== 'undefined' ? self.fetch : fetch
    ) {
        this.authHeader = !!username && !!password ? new Header('Authorization', 'Basic ' + b2a(`${username}:${password}`)) : null
        this.headers = [new Header('Content-Type', 'application/json')]
    }

    async sendEmail(recipientEmail: string, email: EmailMessage): Promise<boolean> {
        if (!this.authHeader) return false

        await XHR.sendCommand('POST', `${this.msgGtwUrl}/${this.specId}/email/to/${this.sanitizer.validateEmail(recipientEmail)}`, this.headers.concat([this.authHeader]), email, this.fetchImpl).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        return true
    }

    async sendSMS(recipientMobileNumber: string, sms: SMSMessage): Promise<boolean> {
        if (!this.authHeader) return false

        await XHR.sendCommand('POST', `${this.msgGtwUrl}/${this.specId}/sms/to/${this.sanitizer.validateMobilePhone(recipientMobileNumber)}`, this.headers.concat([this.authHeader]), sms, this.fetchImpl).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        return true
    }

    async startProcess(processId: string, processBody: AuthenticationProcessBody, validationCodeLength?: number): Promise<string> {
        const requestId = uuid()

        await XHR.sendCommand('POST', `${this.msgGtwUrl}/${this.specId}/process/${processId}/${requestId}?codeLength=${validationCodeLength}`, this.headers, processBody, this.fetchImpl, 'text/plain').catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        return requestId
    }

    async validateProcess(requestId: string, validationCode: string): Promise<boolean> {
        await XHR.sendCommand('GET', `${this.msgGtwUrl}/${this.specId}/process/validate/${requestId}-${validationCode}`, [], undefined, this.fetchImpl).catch((reason) => {
            throw this.errorHandler.createError(reason)
        })

        return true
    }
}
