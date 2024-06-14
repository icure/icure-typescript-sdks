import {
    AnonymousApiBuilder,
    AuthenticatedApiBuilder,
    AuthenticationApi,
    CommonAnonymousApi,
    CommonApi,
    CryptoStrategies,
    DataOwnerLikeApi,
    DataOwnerWithType,
    DeviceLikeApi,
    HealthcarePartyLikeApi,
    HealthElementFilter,
    HealthElementLikeApi,
    KeyPair,
    MaintenanceTaskFilter,
    MaintenanceTaskLikeApi,
    MessageFactory,
    MessageLikeApi,
    PatientLikeApi,
    RecaptchaType,
    ServiceFilter,
    ServiceLikeApi,
    SimpleCryptoStrategies,
    TopicLikeApi,
    UserLikeApi,
} from '@icure/typescript-common'
import { testStorageWithKeys } from '../test-storage'
import { webcrypto } from 'crypto'
import { getTempEmail, TestUtils } from '../test-utils'
import { assert } from 'chai'
import { DataOwnerWithType as DataOwnerWithTypeDto, Device, Document, HealthcareParty, HealthElement, KeyStorageFacade, MaintenanceTask, Message, Patient, retry, Service, ShaVersion, sleep, StorageFacade, Topic, User } from '@icure/api'
import { TestVars, UserDetails } from '@icure/test-setup/types'
import { DefaultStorageEntryKeysFactory } from '@icure/api/icc-x-api/storage/DefaultStorageEntryKeysFactory'

export abstract class BaseApiTestContext<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSMessageFactory extends MessageFactory<any, any, any>,
> {
    static readonly registerThrottlingLimit = 10000
    private registerAverageWait = 10000
    private lastRegisterCall = 0

    abstract newAnonymousApiBuilder(): AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>

    abstract newApiBuilder(): AuthenticatedApiBuilder<DSCryptoStrategies, DSMessageFactory, DSApi>

    abstract newSimpleCryptoStrategies(availableKeys?: KeyPair[]): DSCryptoStrategies & SimpleCryptoStrategies<any>

    abstract newTestMessageFactory(): DSMessageFactory

    abstract userApi(api: DSApi): UserLikeApi<DSUser, any>

    abstract toUserDto(dsUser: DSUser): User

    abstract toDSUser(userDto: User): DSUser

    abstract hcpProcessId(env: TestVars): string

    abstract patProcessId(env: TestVars): string

    async masterApi(
        env: TestVars,
        additionalBuilderSteps: (builder: AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi>) => AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi> = (x) => x,
    ): Promise<{
        api: DSApi
        user: User
    }> {
        return this.apiForCredentials(env, env.masterHcp!, additionalBuilderSteps)
    }

    async apiForEnvUser(
        env: TestVars,
        username: string,
        additionalBuilderSteps: (builder: AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi>) => AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi> = (x) => x,
    ): Promise<{
        api: DSApi
        user: User
    }> {
        return this.apiForCredentials(env, env.dataOwnerDetails[username], additionalBuilderSteps)
    }

    private async apiForCredentials(
        env: TestVars,
        credentials: UserDetails,
        additionalBuilderSteps: (builder: AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi>) => AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi> = (x) => x,
    ): Promise<{
        api: DSApi
        user: User
    }> {
        const storage = await testStorageWithKeys(new DefaultStorageEntryKeysFactory(), [
            {
                dataOwnerId: credentials.dataOwnerId,
                pairs: [
                    {
                        keyPair: { publicKey: credentials.publicKey, privateKey: credentials.privateKey },
                        shaVersion: ShaVersion.Sha1,
                    },
                ],
            },
        ])
        const builderApi = this.newApiBuilder()
            .withICureBaseUrl(env.iCureUrl)
            .withUserName(credentials.user)
            .withPassword(credentials.password)
            .withCrypto(webcrypto as any)
            .withStorage(storage.storage)
            .withKeyStorage(storage.keyStorage)
            .withCryptoStrategies(this.newSimpleCryptoStrategies())
        const api = await additionalBuilderSteps(builderApi).build()

        const foundUser = this.toUserDto(await this.userApi(api).getLogged())

        return { api, user: foundUser }
    }

    async signUpUserUsingEmail(
        env: TestVars,
        firstName: string,
        lastName: string,
        userType: 'hcp' | 'patient',
        inviterId: string,
        recaptchaType: RecaptchaType = 'recaptcha',
        storage?: StorageFacade<string>,
        keyStorage?: KeyStorageFacade,
    ): Promise<{ api: DSApi; user: User; token: string; registrationProcessId: string }> {
        if (new Date().getTime() - this.lastRegisterCall < BaseApiTestContext.registerThrottlingLimit) {
            const throttlingWait = this.returnWithinBoundaries((BaseApiTestContext.registerThrottlingLimit - this.registerAverageWait) * 5 - this.registerAverageWait, BaseApiTestContext.registerThrottlingLimit, 0)
            await sleep(throttlingWait)
            this.registerAverageWait = this.registerAverageWait + (throttlingWait - this.registerAverageWait) / 5
        }
        this.lastRegisterCall = new Date().getTime()

        const processId = await TestUtils.createTestProcess(inviterId, userType === 'hcp' ? 'PRACTITIONER' : 'PATIENT', env.testGroupId)

        const builder = this.newAnonymousApiBuilder()
            .withICureBaseUrl(env.iCureUrl)
            .withMsgGwUrl(env.msgGtwUrl)
            .withMsgGwSpecId(env.specId)
            .withCrypto(webcrypto as any)
            .withAuthProcessByEmailId(processId)
            .withCryptoStrategies(this.newSimpleCryptoStrategies())

        if (storage) {
            builder.withStorage(storage)
        }

        if (keyStorage) {
            builder.withKeyStorage(keyStorage)
        }

        const anonymousApi = await builder.build()

        const email = getTempEmail()
        const process = await anonymousApi.authenticationApi.startAuthentication({
            recaptcha: recaptchaType === 'recaptcha' ? env.recaptcha : env.friendlyCaptchaKey,
            email,
            firstName,
            lastName,
            validationCodeLength: 8,
            recaptchaType,
        })

        const emails = await TestUtils.getEmail(email)

        const subjectCode = emails.subject!

        //assert(subjectCode.length === 8, 'The subject code should be 8 characters long')
        const result = await anonymousApi.authenticationApi.completeAuthentication(process!, subjectCode)

        if (result?.api == undefined) {
            throw Error(`Couldn't sign up user by email for current test`)
        }

        const foundUser = await retry(() => this.userApi(result.api).getLogged(), 10, 1000)
        assert(result)
        assert(result!.token != null)
        assert(result!.userId != null)

        return { api: result.api, user: this.toUserDto(foundUser), token: result.token, registrationProcessId: processId }
    }

    private returnWithinBoundaries(element: number, upperBound: number, lowerBound: number): number {
        if (element <= upperBound && element >= lowerBound) return element
        else if (element > upperBound) return upperBound
        if (element <= upperBound && element >= lowerBound) return element
        else if (element > upperBound) return upperBound
        else return lowerBound
    }
}

export interface WithAuthenticationApi<DSApi extends CommonApi> {
    authenticationApi(api: DSApi): AuthenticationApi<DSApi>
}

export interface WithHcpApi<DSApi, DSHcp> {
    hcpApi(api: DSApi): HealthcarePartyLikeApi<DSHcp>

    toHcpDto(dsHcp: DSHcp): HealthcareParty

    toDSHcp(hcpDto: HealthcareParty): DSHcp
}

export interface WithPatientApi<DSApi, DSPatient> {
    patientApi(api: DSApi): PatientLikeApi<DSPatient>

    toPatientDto(dsPatient: DSPatient): Patient

    toDSPatient(patientDto: Patient): DSPatient

    createPatient(api: DSApi): Promise<DSPatient>

    checkPatientAccessibleAndDecrypted(api: DSApi, patient: DSPatient, checkDeepEquals: boolean): Promise<void>

    // checkPatientAccessibleButEncrypted(api: DSApi, patient: DSPatient): Promise<void>
    checkPatientInaccessible(api: DSApi, patient: DSPatient): Promise<void>

    checkDefaultPatientDecrypted(patient: DSPatient): void
}

export interface WithDataOwnerApi<DSApi, DSDataOwnerWithType extends DataOwnerWithType, DSUser> {
    dataOwnerApi(api: DSApi): DataOwnerLikeApi<DSDataOwnerWithType, DSUser>

    toDataOwnerDto(dsDataOwner: DSDataOwnerWithType): DataOwnerWithTypeDto

    toDSDataOwner(dataOwnerDto: DataOwnerWithTypeDto): DSDataOwnerWithType
}

export interface WithServiceApi<DSApi, DSService, DSPatient, DSDocument> {
    serviceApi(api: DSApi): ServiceLikeApi<DSService, DSPatient, DSDocument>

    toServiceDto(dsService: DSService): Service

    createServiceForPatient(api: DSApi, patient: DSPatient): Promise<DSService>

    createServicesForPatient(api: DSApi, patient: DSPatient): Promise<DSService[]>

    toDSService(serviceDto: Service): DSService

    checkServiceAccessibleAndDecrypted(api: DSApi, service: DSService, checkDeepEquals: boolean): Promise<void>

    checkServiceAccessibleButEncrypted(api: DSApi, service: DSService): Promise<void>

    checkServiceInaccessible(api: DSApi, service: DSService): Promise<void>

    checkDefaultServiceDecrypted(service: DSService): void

    newServiceFilter(api: DSApi): ServiceFilter<DSPatient>

    toDocumentDto(dsDocument: DSDocument): Document
}

export interface WithMaintenanceTaskApi<DSApi, DSMaintenanceTask> {
    mtApi(api: DSApi): MaintenanceTaskLikeApi<DSMaintenanceTask>

    toMtDto(dsMt: DSMaintenanceTask): MaintenanceTask

    toDSMt(mtDto: MaintenanceTask): DSMaintenanceTask

    createMt(api: DSApi, delegate: string): Promise<DSMaintenanceTask>

    newMtFilter(api: DSApi): MaintenanceTaskFilter
}

export interface WithHelementApi<DSApi, DSHealthElement, DSPatient> {
    helementApi(api: DSApi): HealthElementLikeApi<DSHealthElement, DSPatient>

    createHelementForPatient(api: DSApi, patient: DSPatient): Promise<DSHealthElement>

    toHelementDto(dsHelement: DSHealthElement): HealthElement

    toDSHelement(helementDto: HealthElement): DSHealthElement

    // Check the api can retrieve the helement from the server and decrypt it
    checkHelementAccessibleAndDecrypted(api: DSApi, helement: DSHealthElement, checkDeepEquals: boolean): Promise<void>

    // Check the api can retrieve the helement from the server but can't decrypt it
    // checkHelementAccessibleButEncrypted(api: DSApi, helement: DSHealthElement): Promise<void>
    // Check the api can't retrieve the helement from the server
    checkHelementInaccessible(api: DSApi, helement: DSHealthElement): Promise<void>

    // Check already retrieved helement is decrypted
    checkDefaultHelementDecrypted(helement: DSHealthElement): void

    newHelementFilter(api: DSApi): HealthElementFilter<DSPatient>
}

export interface WithDeviceApi<DSApi, DSDevice> {
    deviceApi(api: DSApi): DeviceLikeApi<DSDevice>

    toDeviceDto(dsDevice: DSDevice): Device

    toDSDevice(deviceDto: Device): DSDevice
}

export interface WithTopicApi<DSApi, DSTopic, DSHcp, DSPatient, DSService, DSHealthElement> {
    topicApi(api: DSApi): TopicLikeApi<DSTopic, DSHcp, DSPatient, DSService, DSHealthElement>

    toTopicDto(dsTopic: DSTopic): Topic

    toDSTopic(topicDto: Topic): DSTopic
}

export interface WithMessageApi<DSApi, DSMessage, DSTopic, DSBinary> {
    messageApi(api: DSApi): MessageLikeApi<DSMessage, DSTopic, DSBinary>

    toMessageDto(dsMessage: DSMessage): Message

    toDSMessage(messageDto: Message): DSMessage

    toDSBinary(
        binaryDto: {
            data: ArrayBuffer
            filename: string
            uti: string
        },
        mimeTypeProvider: (uti: string) => string,
    ): DSBinary

    toBinaryDto(
        dsBinary: DSBinary,
        utiProvider: (mimeType: string, extension: string) => string,
    ): {
        data: ArrayBuffer
        filename: string
        uti: string
    }
}
