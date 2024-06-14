export class AuthenticationProcess {
    /**
     * Id of this process used later for reference
     */
    requestId: string
    /**
     * Login information
     */
    login: string
    /**
     * Bypass Token Check
     */
    bypassTokenCheck: boolean

    toJSON(): IAuthenticationProcess {
        return {
            requestId: this.requestId,
            login: this.login,
            bypassTokenCheck: this.bypassTokenCheck,
        }
    }

    constructor(json: Partial<IAuthenticationProcess> & { requestId: string; login: string; bypassTokenCheck: boolean }) {
        this.requestId = json['requestId']!
        this.login = json['login']!
        this.bypassTokenCheck = json['bypassTokenCheck']!
    }
}

export interface IAuthenticationProcess {
    requestId: string
    bypassTokenCheck: boolean
    login: string
}
