import { AuthSecretDetails as BaseAuthSecretDetails, AuthSecretProvider as BaseAuthSecretProvider, AuthSecretType } from '@icure/api/icc-x-api/auth/SmartAuthProvider'
import { AuthSecretProvider, RequestTokenFunction, ShortLivedTokenRequestType } from '../AuthSecretProvider'
import { Sanitizer } from '../Sanitizer'
import { MessageGatewayApiImpl } from '../../apis/impl/MessageGatewayApiImpl'
import { AuthenticationProcessBody } from '../../models/api/AuthenticationProcessBody'
import { RecaptchaType } from '../../models/RecaptchaType.model'

/**
 * @internal
 */
export class AuthSecretProviderBridge implements BaseAuthSecretProvider {
    private readonly requestSms: undefined | RequestTokenFunction = undefined
    private readonly requestEmail: undefined | RequestTokenFunction = undefined

    constructor(
        readonly provider: AuthSecretProvider,
        private readonly msgGw: MessageGatewayApiImpl | undefined,
        loginProcesses: {
            email: string | undefined
            sms: string | undefined
        },
        username: string,
        sanitizer: Sanitizer
    ) {
        if (!!msgGw) {
            if (!!loginProcesses.email && !!sanitizer.tryValidateEmail(username)) {
                this.requestEmail = async (params) => {
                    const tokenRequestId = await msgGw.startProcess(
                        loginProcesses.email!,
                        getProcessBody({
                            recaptcha: params.recaptcha,
                            recaptchaType: params.recaptchaType,
                            email: username,
                            mobilePhone: undefined,
                        }),
                        params.validationCodeLength
                    )
                    return { tokenRequestType: ShortLivedTokenRequestType.EMAIL, tokenRequestId }
                }
            } else if (!!loginProcesses.sms && !!sanitizer.tryValidateMobilePhone(username)) {
                this.requestSms = async (params) => {
                    const tokenRequestId = await msgGw.startProcess(
                        loginProcesses.email!,
                        getProcessBody({
                            recaptcha: params.recaptcha,
                            recaptchaType: params.recaptchaType,
                            email: undefined,
                            mobilePhone: username,
                        }),
                        params.validationCodeLength
                    )
                    return { tokenRequestType: ShortLivedTokenRequestType.SMS, tokenRequestId }
                }
            }
        }
    }

    async getSecret(acceptedSecrets: AuthSecretType[], previousAttempts: BaseAuthSecretDetails[]): Promise<BaseAuthSecretDetails> {
        let shortLivedTokenParams: { accepted: true; requestToken: RequestTokenFunction } | undefined = undefined
        if (acceptedSecrets.includes(AuthSecretType.SHORT_LIVED_TOKEN)) {
            if (!!this.requestEmail) {
                shortLivedTokenParams = {
                    accepted: true,
                    requestToken: this.requestEmail,
                }
            } else if (!!this.requestSms) {
                shortLivedTokenParams = {
                    accepted: true,
                    requestToken: this.requestSms,
                }
            }
        }
        const params = {
            [AuthSecretType.SHORT_LIVED_TOKEN]: shortLivedTokenParams ?? { accepted: false },
            [AuthSecretType.PASSWORD]: {
                accepted: acceptedSecrets.includes(AuthSecretType.PASSWORD),
            },
            [AuthSecretType.LONG_LIVED_TOKEN]: {
                accepted: acceptedSecrets.includes(AuthSecretType.LONG_LIVED_TOKEN),
            },
            [AuthSecretType.TWO_FACTOR_AUTHENTICATION_TOKEN]: {
                accepted: acceptedSecrets.includes(AuthSecretType.TWO_FACTOR_AUTHENTICATION_TOKEN),
            },
            [AuthSecretType.EXTERNAL_AUTHENTICATION]: {
                accepted: acceptedSecrets.includes(AuthSecretType.EXTERNAL_AUTHENTICATION),
            },
        }
        const secretDetails = await this.provider.getSecret(params, previousAttempts)
        if (secretDetails.secretType == AuthSecretType.SHORT_LIVED_TOKEN && !!this.msgGw) {
            try {
                await this.msgGw.validateProcess(secretDetails.tokenRequestId, secretDetails.value)
            } catch (e) {
                console.warn('Failed to validate process')
                console.warn(e instanceof Error ? e.stack : JSON.stringify(e))
            }
        }
        return secretDetails
    }
}

/**
 * @internal
 */
function getProcessBody(
    params: {
        recaptcha: string
        recaptchaType: RecaptchaType
    } & ({ email: string; mobilePhone: undefined } | { email: undefined; mobilePhone: string })
): AuthenticationProcessBody {
    return {
        firstName: '',
        lastName: '',
        from: params.email ?? params.mobilePhone, // may be needed by some old processes
        email: params.email,
        mobilePhone: params.mobilePhone,
        ...(params.recaptchaType == 'friendly-captcha' ? { 'friendly-captcha-response': params.recaptcha, 'g-recaptcha-response': undefined } : { 'friendly-captcha-response': undefined, 'g-recaptcha-response': params.recaptcha }),
    }
}
