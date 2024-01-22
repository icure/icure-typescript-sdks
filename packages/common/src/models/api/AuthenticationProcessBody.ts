export type AuthenticationProcessBody = {
    'g-recaptcha-response': string | undefined
    'friendly-captcha-response': string | undefined
    firstName: string
    lastName: string
    from: string | undefined
    email: string | undefined
    mobilePhone: string | undefined
}
