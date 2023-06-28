import { ErrorHandler, MessageGatewayApiImpl, Sanitizer } from '@icure/typescript-common'

export const messageGatewayApi = (
    msgGatewayUrl: string,
    specId: string,
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    username?: string,
    password?: string,
    fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response> = typeof window !== 'undefined' ? window.fetch : typeof self !== 'undefined' ? self.fetch : fetch
) => {
    return new MessageGatewayApiImpl(msgGatewayUrl, specId, errorHandler, sanitizer, username, password, fetchImpl)
}
