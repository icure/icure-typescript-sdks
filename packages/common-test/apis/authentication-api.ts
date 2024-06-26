import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, hcp3Username, setLocalStorage, TestUtils } from '../test-utils'
import { webcrypto } from 'crypto'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { TestKeyStorage, TestStorage, testStorageForUser } from '../test-storage'
import { AnonymousApiBuilder, AuthSecretDetails, AuthSecretType, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, forceUuid, NotificationTypeEnum, SecretRequest } from '@icure/typescript-common'
import { assert } from 'chai'
import { BaseApiTestContext, WithAuthenticationApi, WithDataOwnerApi, WithHcpApi, WithMaintenanceTaskApi, WithPatientApi, WithServiceApi } from './TestContexts'
import { expectArrayContainsExactlyInAnyOrder } from '../assertions'
import { beforeAll, describe, it } from '@jest/globals'
import { User } from '@icure/api'

setLocalStorage(fetch)

export function testAuthenticationApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSHcp,
    DSPatient,
    DSDataOwner extends DataOwnerWithType,
    DSService,
    DSMaintenanceTask,
>(
    name: string,
    ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> &
        WithPatientApi<DSApi, DSPatient> &
        WithAuthenticationApi<DSApi> &
        WithHcpApi<DSApi, DSHcp> &
        WithDataOwnerApi<DSApi, DSDataOwner, DSUser> &
        WithServiceApi<DSApi, DSService, DSPatient, any> &
        WithMaintenanceTaskApi<DSApi, DSMaintenanceTask>,
) {
    let env: TestVars
    let hcpId: string

    function shouldSkip(): boolean {
        if (env.backendType === 'oss') {
            console.warn('Test skipped: not supported with kraken OSS')
            return true
        }
        return false
    }

    describe(`${name} (Authentication API)`, () => {
        beforeAll(async function () {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())

            hcpId = env.dataOwnerDetails[hcp1Username].dataOwnerId
        }, 600_000)

        it("AnonymousMedTechApi shouldn't be instantiated if authServerUrl, authProcessId and specId aren't passed", async () => {
            if (shouldSkip()) return
            await expect(
                Promise.resolve().then(() =>
                    ctx
                        .newAnonymousApiBuilder()
                        .withICureBaseUrl(env!.iCureUrl)
                        .withCrypto(webcrypto as any)
                        .withMsgGwUrl(env!.msgGtwUrl)
                        .withAuthProcessByEmailId(env!.hcpAuthProcessId)
                        .withAuthProcessBySmsId(env!.hcpAuthProcessId)
                        .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                        .build(),
                ),
            ).rejects.toBeInstanceOf(Error)

            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withCrypto(webcrypto as any)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withAuthProcessByEmailId('fake-process-id')
                .withAuthProcessBySmsId('fake-process-id')
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()

            expect(anonymousMedTechApi).toBeTruthy()
        })

        it("Impossible to use authenticationApi if msgGtwUrl, msgGtwSpecId and authProcessId haven't been provided", async () => {
            if (shouldSkip()) return
            const user = env.dataOwnerDetails[hcp1Username]
            const storage = await testStorageForUser(user)
            // Given
            let api = await ctx
                .newApiBuilder()
                .withUserName(user.user)
                .withPassword(user.password)
                .withStorage(storage.storage)
                .withKeyStorage(storage.keyStorage)
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withCrypto(webcrypto as any)
                .withAuthProcessByEmailId('fake-process-id')
                .withAuthProcessBySmsId('fake-process-id')
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()

            await expect(Promise.resolve().then(() => ctx.authenticationApi(api))).rejects.toBeInstanceOf(Error)
        })

        it('Cannot instantiate the API if no AuthProcessId is passed', async () => {
            if (shouldSkip()) return
            await expect(
                Promise.resolve().then(() =>
                    ctx
                        .newAnonymousApiBuilder()
                        .withICureBaseUrl(env!.iCureUrl)
                        .withMsgGwUrl(env!.msgGtwUrl)
                        .withMsgGwSpecId(env!.specId)
                        .withCrypto(webcrypto as any)
                        .build(),
                ),
            ).rejects.toBeInstanceOf(Error)
        })

        it("User should not be able to start authentication if he didn't provide any email and mobilePhone", async () => {
            if (shouldSkip()) return
            // Given
            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessByEmailId(env!.hcpAuthProcessId)
                .withAuthProcessBySmsId(env!.hcpAuthProcessId)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
                .build()

            await expect(
                anonymousMedTechApi.authenticationApi.startAuthentication({
                    recaptcha: env!.recaptcha,
                    firstName: 'Tom',
                    lastName: 'Gideon',
                }),
            ).rejects.toBeInstanceOf(Error)
        })

        it('User should not be able to start authentication if he provided an empty email and mobilePhone', async () => {
            if (shouldSkip()) return
            // Given
            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessByEmailId(env!.hcpAuthProcessId)
                .withAuthProcessBySmsId(env!.hcpAuthProcessId)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
                .build()

            await expect(
                anonymousMedTechApi.authenticationApi.startAuthentication({
                    recaptcha: env!.recaptcha,
                    email: '',
                    phoneNumber: '',
                    firstName: 'Tom',
                    lastName: 'Gideon',
                }),
            ).rejects.toBeInstanceOf(Error)
        })

        it('User should not be able to start authentication if he provided an email but no AuthProcessByEmailId', async () => {
            if (shouldSkip()) return
            // Given
            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessBySmsId(env!.hcpAuthProcessId)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
                .build()

            await expect(
                anonymousMedTechApi.authenticationApi.startAuthentication({
                    recaptcha: env!.recaptcha,
                    email: 'a-fake-email',
                    firstName: 'Tom',
                    lastName: 'Gideon',
                }),
            ).rejects.toBeInstanceOf(Error)
        })

        it('User should not be able to start authentication if he provided an sms but no AuthProcessBySMSId', async () => {
            if (shouldSkip()) return
            // Given
            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessByEmailId(env!.hcpAuthProcessId)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
                .build()

            await expect(
                anonymousMedTechApi.authenticationApi.startAuthentication({
                    recaptcha: env!.recaptcha,
                    phoneNumber: 'a-fake-phone-number',
                    firstName: 'Tom',
                    lastName: 'Gideon',
                }),
            ).rejects.toBeInstanceOf(Error)
        })

        it('A User should be able to start the authentication by sms', async () => {
            if (shouldSkip()) return
            // Given
            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessBySmsId(env!.hcpAuthProcessId)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies([]))
                .build()

            // When
            const phoneNumber = `+${Math.ceil(Math.random() * 10000000 + 10000000)}`
            await anonymousMedTechApi.authenticationApi.startAuthentication({
                recaptcha: env!.recaptcha,
                phoneNumber: phoneNumber,
                firstName: 'Tom',
                lastName: 'Gideon',
            })
            const messages = await TestUtils.getSMS(phoneNumber)
            expect(messages?.message).not.toBeFalsy()
        })

        it('HCP should be capable of signing up using email', async () => {
            if (shouldSkip()) return
            // When
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            const hcpApiAndUser = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'hcp', hcpId!, 'recaptcha')
            const currentUser = hcpApiAndUser.user

            // Then
            expect(currentUser).toBeTruthy()
            expect(currentUser.healthcarePartyId).toBeTruthy()
            expect(forceUuid(currentUser.healthcarePartyId)).toEqual(currentUser.healthcarePartyId)
            expect(currentUser.healthcarePartyId).not.toEqual(hcpId!)

            expect(ctx.toUserDto(await ctx.userApi(hcpApiAndUser.api).getLogged()).id).toEqual(currentUser.id)
        })

        it('A user should be able of logging in with a long token', async () => {
            if (shouldSkip()) return
            // When
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            const hcpApiAndUserFromMailSignup = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'hcp', hcpId!, 'recaptcha')
            const hcpApiAndUserFromTokenLogin = await ctx
                .newApiBuilder()
                .withICureBaseUrl(env.iCureUrl)
                .withUserName(hcpApiAndUserFromMailSignup.user.login!)
                .withPassword(hcpApiAndUserFromMailSignup.token)
                .withCrypto(webcrypto as any)
                .withStorage(hcpApiAndUserFromMailSignup.api.baseApi.cryptoApi.storage)
                .withKeyStorage(hcpApiAndUserFromMailSignup.api.baseApi.cryptoApi.keyStorage)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()
            expect(ctx.toUserDto(await ctx.userApi(hcpApiAndUserFromTokenLogin).getLogged()).id).toEqual(hcpApiAndUserFromMailSignup.user.id)
        })

        it('HCP should be capable of signing up using email with friendlyCaptchaData', async () => {
            if (shouldSkip()) return
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            // TODO we need to update this method to also take the FHIR type of hcp or something else?
            const hcpApiAndUser = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'hcp', hcpId!, 'friendly-captcha')
            const currentUser = hcpApiAndUser.user

            // Then
            expect(currentUser).toBeTruthy()
            expect(currentUser.healthcarePartyId).toBeTruthy()
            expect(forceUuid(currentUser.healthcarePartyId)).toEqual(currentUser.healthcarePartyId)
            expect(currentUser.healthcarePartyId).not.toEqual(hcpId!)

            expect(ctx.toUserDto(await ctx.userApi(hcpApiAndUser.api).getLogged()).id).toEqual(currentUser.id)
        })

        it('Patient should be able to signing up through email', async () => {
            if (shouldSkip()) return
            // When
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            const patApiAndUser = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'patient', hcpId!, 'recaptcha')
            const currentUser = patApiAndUser.user

            // Then
            expect(currentUser).toBeTruthy()
            expect(currentUser.patientId).toBeTruthy()
            expect(forceUuid(currentUser.patientId)).toEqual(currentUser.patientId)
            expect(currentUser.patientId).not.toEqual(hcpId!)

            const currentPatient = ctx.toPatientDto(await ctx.patientApi(patApiAndUser.api).get(currentUser.patientId!))
            expect(currentPatient).toBeTruthy()
            expect(currentPatient.firstName).toEqual(firstName)
            expect(currentPatient.lastName).toEqual(lastName)
        })

        it('Patient should be able to signing up through email with friendlyCaptchaData', async () => {
            if (shouldSkip()) return
            // When
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            const patApiAndUser = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'patient', hcpId!, 'friendly-captcha')
            const currentUser = patApiAndUser.user

            // Then
            expect(currentUser).toBeTruthy()
            expect(currentUser.patientId).toBeTruthy()
            expect(forceUuid(currentUser.patientId)).toEqual(currentUser.patientId)
            expect(currentUser.patientId).not.toEqual(hcpId!)

            const currentPatient = ctx.toPatientDto(await ctx.patientApi(patApiAndUser.api).get(currentUser.patientId!))
            expect(currentPatient).toBeTruthy()
            expect(currentPatient.firstName).toEqual(firstName)
            expect(currentPatient.lastName).toEqual(lastName)
        })

        it('Patient should be able to retrieve its keys when re-login', async () => {
            if (shouldSkip()) return
            // When
            const { api, user, token } = await ctx.signUpUserUsingEmail(env, 'A', 'B', 'patient', hcpId)

            const keysFromFirstInit = ctx.dataOwnerApi(api).getPublicKeysOf(await ctx.dataOwnerApi(api).getDataOwner(user.patientId!))

            const newApi = await ctx
                .newApiBuilder()
                .withUserName(user.login!)
                .withPassword(token)
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessByEmailId(env!.patAuthProcessId)
                .withAuthProcessBySmsId(env!.patAuthProcessId)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()

            const keysFromNewApi = ctx.dataOwnerApi(newApi).getPublicKeysOf(await ctx.dataOwnerApi(newApi).getDataOwner(user.patientId!))

            expect(keysFromNewApi.length).toBeGreaterThan(0)
            expectArrayContainsExactlyInAnyOrder(keysFromNewApi, keysFromFirstInit)
        })

        it('Patient should be able to signing up through email using a different Storage implementation', async () => {
            if (shouldSkip()) return
            // Given
            const storage = new TestStorage()
            const keyStorage = new TestKeyStorage()

            // When
            const patApiAndUser = await ctx.signUpUserUsingEmail(env!, 'a', 'b', 'patient', hcpId, 'recaptcha', storage, keyStorage)

            // Then
            const currentUser = patApiAndUser.user
            assert(currentUser)
            assert(currentUser.patientId != null)

            const currentPatient = ctx.toPatientDto(await ctx.patientApi(patApiAndUser.api).get(currentUser.patientId!))
            assert(currentPatient)
            assert(currentPatient.firstName == 'a')
            assert(currentPatient.lastName == 'b')
            assert(Object.entries(keyStorage).length == 1)
        })

        it('A patient may login with a new RSA keypair and access his previous data if he gave access to its new key with his previous private key', async () => {
            if (shouldSkip()) return
            // Given
            const patApiAndUser = await ctx.signUpUserUsingEmail(env!, 'a', 'b', 'patient', hcpId, 'recaptcha')

            const currentPatient = await ctx.patientApi(patApiAndUser.api).get(patApiAndUser.user.patientId!)
            const createdDataSample = await ctx.createServiceForPatient(patApiAndUser.api, currentPatient)
            const keysFromFirstInit = ctx.dataOwnerApi(patApiAndUser.api).getPublicKeysOf(await ctx.dataOwnerApi(patApiAndUser.api).getDataOwner(patApiAndUser.user.patientId!))

            // User logs on another device
            const newCryptoStrategies = ctx.newSimpleCryptoStrategies([])
            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessByEmailId(env!.patAuthProcessId)
                .withAuthProcessBySmsId(env!.patAuthProcessId)
                .withStorage(new TestStorage())
                .withKeyStorage(new TestKeyStorage())
                .withCryptoStrategies(newCryptoStrategies)
                .build()

            const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication({
                recaptcha: env!.recaptcha,
                email: patApiAndUser.user.email,
            })

            // When
            const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
            const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)

            if (loginAuthResult?.api == undefined) {
                throw Error(`Couldn't login user ${patApiAndUser.user.email} on the new terminal`)
            }

            const keysAfterLoss = ctx.dataOwnerApi(loginAuthResult.api).getPublicKeysOf(await ctx.dataOwnerApi(loginAuthResult.api).getDataOwner(patApiAndUser.user.patientId!))
            expect(keysAfterLoss.length).toBeGreaterThan(keysFromFirstInit.length)
            expect(newCryptoStrategies.generatedKeyPair).toBeTruthy()

            // Then
            // User can create new data
            expect(await ctx.createServiceForPatient(loginAuthResult.api, currentPatient)).toBeTruthy()

            await ctx.checkServiceInaccessible(loginAuthResult.api, createdDataSample)

            // When he gave access back with his previous key
            await patApiAndUser.api.baseApi.cryptoApi.forceReload()
            await ctx.dataOwnerApi(patApiAndUser.api).giveAccessBackTo(patApiAndUser.user.patientId!, loginAuthResult.keyPairs[0].publicKey)

            // Then
            await loginAuthResult.api.baseApi.cryptoApi.forceReload()
            await ctx.checkServiceAccessibleAndDecrypted(loginAuthResult.api, createdDataSample, true)
        })

        it('A patient may login with a new RSA keypair and access his previous data only when a delegate gave him access back', async () => {
            if (shouldSkip()) return
            // Given
            const hcpApiAndUser = await ctx.apiForEnvUser(env, hcp3Username)
            const patApiAndUser = await ctx.signUpUserUsingEmail(env, 'A', 'B', 'patient', hcpId!, 'recaptcha')

            const currentPatient = await ctx.patientApi(patApiAndUser.api).get(patApiAndUser.user.patientId!)
            await ctx.patientApi(patApiAndUser.api).giveAccessTo(currentPatient, hcpApiAndUser.user.healthcarePartyId!)

            const createdService = await ctx.createServiceForPatient(patApiAndUser.api, currentPatient)
            const sharedService = await ctx.serviceApi(patApiAndUser.api).giveAccessTo(createdService, hcpApiAndUser.user.healthcarePartyId!)

            // User lost his key and logs back
            const newCryptoStrategies = ctx.newSimpleCryptoStrategies([])
            const anonymousMedTechApi = await ctx
                .newAnonymousApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withMsgGwUrl(env!.msgGtwUrl)
                .withMsgGwSpecId(env!.specId)
                .withCrypto(webcrypto as any)
                .withAuthProcessByEmailId(env!.patAuthProcessId)
                .withAuthProcessBySmsId(env!.patAuthProcessId)
                .withStorage(new TestStorage())
                .withKeyStorage(new TestKeyStorage())
                .withCryptoStrategies(newCryptoStrategies)
                .build()

            const loginProcess = await anonymousMedTechApi.authenticationApi.startAuthentication({
                recaptcha: env!.recaptcha,
                email: patApiAndUser.user.email,
            })

            // When
            const subjectCode = (await TestUtils.getEmail(patApiAndUser.user.email!)).subject!
            const loginAuthResult = await anonymousMedTechApi.authenticationApi.completeAuthentication(loginProcess!, subjectCode)
            expect(newCryptoStrategies.generatedKeyPair).toBeTruthy()

            if (loginAuthResult?.api == undefined) {
                throw Error(`Couldn't login user ${patApiAndUser.user.email} after he lost his RSA keypair`)
            }

            // Then
            // User can create new data
            expect(await ctx.createServiceForPatient(loginAuthResult.api, currentPatient)).toBeTruthy()
            await ctx.checkServiceInaccessible(loginAuthResult.api, createdService)

            // When the delegate gave him access back
            // Hcp checks dedicated notification
            const startTimestamp = new Date().getTime() - 100000
            const hcpNotification = (await ctx.mtApi(hcpApiAndUser.api).getPendingAfter(startTimestamp))
                .map((x) => ctx.toMtDto(x))
                .find((mt) => mt.taskType === NotificationTypeEnum.KeyPairUpdate && mt.properties?.find((prop) => prop.typedValue?.stringValue == patApiAndUser.user.patientId!) != undefined)

            expect(hcpNotification).toBeTruthy()

            const patientId = hcpNotification!.properties?.find((prop) => prop.id == 'dataOwnerConcernedId')
            expect(patientId).toBeTruthy()
            const patientPubKey = hcpNotification!.properties?.find((prop) => prop.id == 'dataOwnerConcernedPubKey')
            expect(patientPubKey).toBeTruthy()

            await ctx.dataOwnerApi(hcpApiAndUser.api).giveAccessBackTo(patientId!.typedValue!.stringValue!, patientPubKey!.typedValue!.stringValue!)

            // Then
            await loginAuthResult.api.baseApi.cryptoApi.forceReload()
            await ctx.checkServiceAccessibleAndDecrypted(loginAuthResult.api, sharedService, true)
        }, 120_000)

        it('An user is able to get his JWT token', async () => {
            // Given
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            const { api, user } = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'hcp', hcpId!, 'recaptcha')

            // When
            const token = await ctx.authenticationApi(api).getJsonWebToken()

            // Then
            expect(token).toBeTruthy()

            // When
            const response = await fetch(env!.iCureUrl + '/rest/v2/user/current', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Then
            expect(response.status).toBe(200)
            expect(((await response.json()) as User).id).toEqual(user.id)
        }, 120_000)

        it('Should be able to use an auth secret provider for login', async () => {
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            const signupApiInfo = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'hcp', hcpId!, 'recaptcha')
            let secretProviderCalled = false
            const apiWithProvider = await ctx
                .newApiBuilder()
                .withICureBaseUrl(env.iCureUrl)
                .withUserName(signupApiInfo.user.login!)
                .withAuthSecretProvider({
                    getSecret(request: SecretRequest, previousAttempts: AuthSecretDetails[]): Promise<AuthSecretDetails> {
                        secretProviderCalled = true
                        expect(request[AuthSecretType.LONG_LIVED_TOKEN].accepted).toBe(true)
                        expect(previousAttempts).toHaveLength(0)
                        return Promise.resolve({
                            value: signupApiInfo.token,
                            secretType: AuthSecretType.LONG_LIVED_TOKEN,
                        })
                    },
                })
                .withCrypto(webcrypto as any)
                .withStorage(signupApiInfo.api.baseApi.cryptoApi.storage)
                .withKeyStorage(signupApiInfo.api.baseApi.cryptoApi.keyStorage)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()
            expect(ctx.toUserDto(await ctx.userApi(apiWithProvider).getLogged()).id).toEqual(signupApiInfo.user.id)
            expect(secretProviderCalled).toBeTruthy()
        }, 120_000)

        it('Should be able to use an auth secret provider with short token for login', async () => {
            const firstName = `Gigio${forceUuid()}`
            const lastName = `Bagigio${forceUuid()}`
            const signupApiInfo = await ctx.signUpUserUsingEmail(env!, firstName, lastName, 'hcp', hcpId!, 'recaptcha')
            let secretProviderCalled = false
            const apiWithProvider = await ctx
                .newApiBuilder()
                .withICureBaseUrl(env.iCureUrl)
                .withMsgGwUrl(env.msgGtwUrl)
                .withMsgGwSpecId(env.specId)
                .withAuthProcessByEmailId(signupApiInfo.registrationProcessId)
                .withUserName(signupApiInfo.user.email!)
                .withAuthSecretProvider({
                    async getSecret(request: SecretRequest, previousAttempts: AuthSecretDetails[]): Promise<AuthSecretDetails> {
                        secretProviderCalled = true
                        expect(previousAttempts).toHaveLength(0)
                        const shortTokenRequestInfo = request[AuthSecretType.SHORT_LIVED_TOKEN]
                        if (shortTokenRequestInfo.accepted) {
                            const tokenRequest = await shortTokenRequestInfo.requestToken({
                                recaptcha: 'faketoken',
                                recaptchaType: 'recaptcha',
                            })
                            const retrievedMail = await TestUtils.getEmail(signupApiInfo.user.email!)
                            const subjectCode = retrievedMail.subject
                            expect(subjectCode).toBeTruthy()
                            return Promise.resolve({
                                value: subjectCode,
                                secretType: AuthSecretType.SHORT_LIVED_TOKEN,
                                tokenRequestId: tokenRequest.tokenRequestId,
                            })
                        } else {
                            throw new Error('Should have accepted short lived token')
                        }
                    },
                })
                .withCrypto(webcrypto as any)
                .withStorage(signupApiInfo.api.baseApi.cryptoApi.storage)
                .withKeyStorage(signupApiInfo.api.baseApi.cryptoApi.keyStorage)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()
            expect(ctx.toUserDto(await ctx.userApi(apiWithProvider).getLogged()).id).toEqual(signupApiInfo.user.id)
            expect(secretProviderCalled).toBeTruthy()
        }, 120_000)
    })
}
