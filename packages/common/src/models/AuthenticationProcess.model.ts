export class AuthenticationProcess {
    constructor(json: Partial<IAuthenticationProcess>) {
        Object.assign(this as AuthenticationProcess, json)
    }

    /**
     * Id of this process used later for reference
     */
    'requestId': string
    /**
     * Login information
     */
    'login': string
    /**
     * Bypass Token Check
     */
    'bypassTokenCheck': boolean

    static toJSON(instance: AuthenticationProcess): IAuthenticationProcess {
        const pojo: IAuthenticationProcess = {} as IAuthenticationProcess
        pojo['requestId'] = instance.requestId
        pojo['login'] = instance.login
        pojo['bypassTokenCheck'] = instance.bypassTokenCheck
        return pojo
    }

    static fromJSON(pojo: IAuthenticationProcess): AuthenticationProcess {
        const obj = {} as IAuthenticationProcess
        obj['requestId'] = pojo['requestId']
        obj['login'] = pojo['login']
        obj['bypassTokenCheck'] = pojo['bypassTokenCheck']
        return new AuthenticationProcess(obj)
    }
}

export interface IAuthenticationProcess {
    requestId: string
    bypassTokenCheck: boolean
    login: string
}
