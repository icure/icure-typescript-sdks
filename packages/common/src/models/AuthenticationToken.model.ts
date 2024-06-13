/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Encrypted and time-limited Authentication tokens used for inter-applications authentication
 */
export class AuthenticationToken {
    constructor(json: Partial<IAuthenticationToken>) {
        Object.assign(this as AuthenticationToken, json)
    }

    /**
     * Encrypted token
     */
    'token': string
    /**
     * Validity starting time of the token
     */
    'creationTime': number
    /**
     * Token validity in seconds
     */
    'validity': number

    static toJSON(instance: AuthenticationToken): IAuthenticationToken {
        const pojo: IAuthenticationToken = {} as IAuthenticationToken
        pojo['token'] = instance.token
        pojo['creationTime'] = instance.creationTime
        pojo['validity'] = instance.validity
        return pojo
    }

    static fromJSON(pojo: IAuthenticationToken): AuthenticationToken {
        const obj = {} as IAuthenticationToken
        obj['token'] = pojo['token']
        obj['creationTime'] = pojo['creationTime']
        obj['validity'] = pojo['validity']
        return new AuthenticationToken(obj)
    }
}

interface IAuthenticationToken {
    token: string
    creationTime: number
    validity: number
}
