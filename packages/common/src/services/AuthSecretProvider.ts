import { AuthSecretType } from '@icure/api/icc-x-api/auth/SmartAuthProvider'
import { RecaptchaType } from '../models/RecaptchaType.model'
import { OAuthThirdParty } from '@icure/api/icc-api/api/IccAuthApi'

export { AuthSecretType } from '@icure/api/icc-x-api/auth/SmartAuthProvider'
export { OAuthThirdParty } from '@icure/api/icc-api/api/IccAuthApi'

export type AuthSecretDetails =
    | {
          value: string
          secretType: Exclude<Exclude<AuthSecretType, AuthSecretType.EXTERNAL_AUTHENTICATION>, AuthSecretType.SHORT_LIVED_TOKEN>
      }
    | {
          value: string
          secretType: AuthSecretType.EXTERNAL_AUTHENTICATION
          oauthType: OAuthThirdParty
      }
    | {
          value: string
          secretType: AuthSecretType.SHORT_LIVED_TOKEN
          tokenRequestId: string
      }

export enum ShortLivedTokenRequestType {
    EMAIL,
    SMS,
}

export type SecretRequest = {
    [AuthSecretType.PASSWORD]: { accepted: boolean }
    [AuthSecretType.LONG_LIVED_TOKEN]: { accepted: boolean }
    [AuthSecretType.SHORT_LIVED_TOKEN]:
        | {
              accepted: true
              requestToken: RequestTokenFunction
          }
        | { accepted: false }
    [AuthSecretType.TWO_FACTOR_AUTHENTICATION_TOKEN]: { accepted: boolean }
    [AuthSecretType.EXTERNAL_AUTHENTICATION]: { accepted: boolean }
}

/**
 * A function that can be used to request a token
 */
export type RequestTokenFunction = (params: { recaptcha: string; recaptchaType: RecaptchaType; validationCodeLength?: number }) => Promise<{ tokenRequestType: ShortLivedTokenRequestType; tokenRequestId: string }>

export interface AuthSecretProvider {
    /**
     * Provides a secret for authentication to the iCure SDK.
     *
     * ## Request
     *
     * The method will be provided with set of acceptable secret types for the method call through {@link request}.
     * Usually the request will contain multiple accepted secrets, depending on various factors such as the group
     * configuration, the user (if he has 2fa setup or not), or the operation being performed.
     * For example, in groups using default configurations and for patients without 2fa enabled for example the array will
     * always contain the {@link AuthSecretType.PASSWORD} element (note that this may be the case even if the user does
     * not have set a password and uses only passwordless login).
     * Usually the array will also contain the {@link AuthSecretType.LONG_LIVED_TOKEN} element, but if the user is
     * attempting to perform a sensitive operations (such as changing his password) and the group uses default
     * configuration this may not be the case.
     *
     * Regardless of the number of elements in the array only one secret of the accepted types is sufficient for the
     * operation to succeed.
     *
     * ## SHORT_LIVED_TOKEN authentication type
     *
     * If a SHORT_LIVED_TOKEN is a valid authentication method for the operation that the SDK needs to perform, and during
     * instantiation of the iCure api you have provided an email as username and an email authentication process id (or
     * a SMS as username and a SMS authentication process id), then the request will also provide a function that you can
     * use to request a new short-lived token (the function will automatically determine whether the code will be sent by
     * email or SMS depending on the username you provided).
     *
     * If you didn't instantiate the api with an email or SMS and a corresponding authentication process id then the SDK
     * will never ask for a SHORT_LIVED_TOKEN.
     *
     * ## TWO_FACTOR_AUTHENTICATION_TOKEN secret type
     *
     * The {@link AuthSecretType.TWO_FACTOR_AUTHENTICATION_TOKEN} secret type is only used when the user has 2fa enabled.
     * If you provide a valid password as a result to this method but the user has been configured to use 2fa, the SDK
     * will perform a second call to this method, this time containing only the {@link AuthSecretType.PASSWORD} as
     * accepted secret type.
     *
     * Future calls to this method from the same provider instance may not contain the {@link AuthSecretType.PASSWORD}
     * element anymore, as it will be cached by the SDK, and instead the SDK will directly ask for a
     * {@link AuthSecretType.TWO_FACTOR_AUTHENTICATION_TOKEN} instead.
     *
     * Note that the 2fa token is not needed for logging in through a long-lived or short-lived token, it is only used in
     * combination with a password.
     *
     * @param request information on the types of secrets that are accepted as valid results.
     * @param previousAttempts the secrets that were previously attempted by the SDK for this operation. This array will be empty the first time this
     * method is called for a given operation, but it may contain multiple elements if the SDK has already called this method multiple times because the
     * previously returned secrets were not valid. The first element is the first secret that was attempted, and the last element is the most recently
     * attempted.
     * @return a promise that resolves with the secret and the secret type to use for authentication. If the promise rejects then the ongoing SDK
     * operation will fail without being re-attempted.
     */
    getSecret(request: SecretRequest, previousAttempts: Omit<AuthSecretDetails, 'tokenRequestId'>[]): Promise<AuthSecretDetails>
}
