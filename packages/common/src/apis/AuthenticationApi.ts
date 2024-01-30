import { RecaptchaType } from '../models/RecaptchaType.model'
import { AuthenticationProcess } from '../models/AuthenticationProcess.model'
import { AuthenticationResult } from '../models/AuthenticationResult.model'
import { CommonApi } from './CommonApi'

/**
 * The AuthenticationApi interface provides methods to authenticate and register users.
 */
export interface AuthenticationApi<DSApi extends CommonApi> {
    /**
     * Starts the authentication of a user by sending him/her a validation code by email and/or by SMS.
     * Use this service if you would like to register or login your user in the iCure system.
     *
     * Provide at least one authentication tool (email and/or phoneNumber) to start the process.
     *
     * This method can be used to register/login any kind of data owner (patient, doctor, organisation, device, ...).
     * The type of data owner created when registering depends on the process id used when instantiating the apis.
     *
     * @param recaptcha To authenticate through iCure, we ask you to implement reCAPTCHA v3 (Check
     * https://developers.google.com/recaptcha/docs/v3) or friendly-captcha (https://friendlycaptcha.com/) verification.
     * Use the friendly-recaptcha if you would like to avoid tracking solution of Google reCAPTCHA. This argument
     * corresponds to the resulting key of the recaptcha procedure.
     * @param email The email to use to authenticate the user (Mandatory if no phoneNumber provided)
     * @param phoneNumber The phone number to use to authenticate the user (Mandatory if no email provided)
     * @param firstName The firstname of the user to authenticate (Mandatory for registration only)
     * @param lastName The lastname of the user to authenticate (Mandatory for registration only)
     * @param bypassTokenCheck Prevent the token check during the validation process. Activates this flag **ONLY** for
     * dedicated use cases and users, like the submission on the Apple / Google Store. (false by default)
     * @param validationCodeLength The length of the validation code to send to the user. (6 by default)
     * @param recaptchaType The type of ReCAPTCHA you used during your authentication flow. Can either be Google reCAPTCHA v3 {@link https://developers.google.com/recaptcha/docs/v3} or the * friendly-captcha {@link https://friendlycaptcha.com/}. Use the friendly-recaptcha if you would like to avoid tracking solution of Google reCAPTCHA.
     * @return The AuthenticationProcess information needed to complete the authentication in the completeAuthentication service
     */
    startAuthentication({
        recaptcha,
        email,
        phoneNumber,
        firstName = '',
        lastName = '',
        bypassTokenCheck = false,
        validationCodeLength = 6,
        recaptchaType = 'recaptcha',
    }: {
        recaptcha: string
        email?: string
        phoneNumber?: string
        firstName?: string
        lastName?: string
        bypassTokenCheck?: boolean
        validationCodeLength?: number
        recaptchaType?: RecaptchaType
    }): Promise<AuthenticationProcess>

    /**
     * Completes the authentication process of a user, by verifying the provided validation code and :
     * - In the case of a sign-up, create the user data;
     * - In the case of a login, re-generate keys if needed (new keys different from previous ones);
     * @param process The AuthenticationProcess previously provided in the startAuthentication service
     * @param validationCode The validation code the user received by email/mobile phone
     * @param tokenDurationInSeconds The duration of the token to create (in seconds)
     *
     * @return The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
     * user.
     */
    completeAuthentication(process: AuthenticationProcess, validationCode: string, tokenDurationInSeconds?: number): Promise<AuthenticationResult<DSApi>>

    /**
     * Completes the authentication process of a user created from a Patient.
     * - It creates the private and public key for the user
     * - It creates a long-lived authentication token
     * - Send a NotificationModel to all the delegated HCP to ask for access to the data of the Patient
     * @param userLogin The login of the user
     * @param shortLivedToken The short-lived authentication token created by the HCP
     * @param tokenDurationInSeconds The duration of the token to create (in seconds)
     *
     * @return The result of the authentication and the related MedTechApi object corresponding to the newly authenticated
     * user.
     */
    authenticateAndAskAccessToItsExistingData(userLogin: string, shortLivedToken: string, tokenDurationInSeconds?: number): Promise<AuthenticationResult<DSApi>>

    /**
     * Get the JWT token of the current user
     *
     * @return The JWT token of the current user
     */
    getJsonWebToken(): Promise<string | undefined>
}
