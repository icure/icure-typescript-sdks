import {
    AnonymousApiBuilder,
    AuthenticatedApiBuilder,
    AuthenticationApi,
    CommonAnonymousApi,
    CommonApi,
    CryptoStrategies, DataOwnerLikeApi, DataOwnerWithType,
    HealthcarePartyLikeApi, HealthElementLikeApi,
    KeyPair, MaintenanceTaskLikeApi, PatientLikeApi,
    RecaptchaType, ServiceFilter, ServiceLikeApi,
    SimpleCryptoStrategies,
    UserLikeApi
} from "@icure/typescript-common";
import {testStorageWithKeys} from "../../medtech/test/TestStorage";
import {webcrypto} from "crypto";
import {getTempEmail, TestUtils} from "../test-utils";
import {assert} from "chai";
import {
    DataOwnerWithType as DataOwnerWithTypeDto,
    HealthcareParty, HealthElement,
    KeyStorageFacade,
    MaintenanceTask,
    Patient, Service,
    sleep,
    StorageFacade,
    User,
    Document
} from "@icure/api";
import {TestVars} from "@icure/test-setup/types";
import {DefaultStorageEntryKeysFactory} from "@icure/api/icc-x-api/storage/DefaultStorageEntryKeysFactory";

export abstract class BaseApiTestContext<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser
> {
    static readonly registerThrottlingLimit = 10000
    private registerAverageWait = 10000
    private lastRegisterCall = 0

    abstract newAnonymousApiBuilder(): AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>
    abstract newApiBuilder(): AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi>
    abstract newSimpleCryptoStrategies(availableKeys?: KeyPair[]): DSCryptoStrategies & SimpleCryptoStrategies<any>
    abstract userApi(api: DSApi): UserLikeApi<DSUser, any>
    abstract toUserDto(dsUser: DSUser): User
    abstract toDSUser(userDto: User): DSUser

    async apiForEnvUser(
        env: TestVars,
        username: string,
        additionalBuilderSteps: (builder: AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi>) => AuthenticatedApiBuilder<DSCryptoStrategies, any, DSApi> = (x) => x
    ): Promise<{ api: DSApi, user: User }> {
        const credentials = env.dataOwnerDetails[username]
        const storage = await testStorageWithKeys(new DefaultStorageEntryKeysFactory(), [
            {
                dataOwnerId: credentials.dataOwnerId,
                pairs: [{ keyPair: { publicKey: credentials.publicKey, privateKey: credentials.privateKey } }],
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
        userType: "hcp" | "patient",
        inviterId: string,
        recaptchaType: RecaptchaType = 'recaptcha',
        storage?: StorageFacade<string>,
        keyStorage?: KeyStorageFacade
    ): Promise<{ api: DSApi; user: User; token: string }> {
        if (new Date().getTime() - this.lastRegisterCall < BaseApiTestContext.registerThrottlingLimit) {
            const throttlingWait = this.returnWithinBoundaries(
                (BaseApiTestContext.registerThrottlingLimit - this.registerAverageWait) * 5 - this.registerAverageWait,
                BaseApiTestContext.registerThrottlingLimit,
                0
            )
            await sleep(throttlingWait)
            this.registerAverageWait = this.registerAverageWait + (throttlingWait - this.registerAverageWait) / 5
        }
        this.lastRegisterCall = new Date().getTime()

        const builder = this.newAnonymousApiBuilder()
            .withICureBaseUrl(env.iCureUrl)
            .withMsgGwUrl(env.msgGtwUrl)
            .withMsgGwSpecId(env.specId)
            .withCrypto(webcrypto as any)
            .withAuthProcessByEmailId(userType === "hcp" ? env.hcpAuthProcessId : env.patAuthProcessId)
            .withCryptoStrategies(this.newSimpleCryptoStrategies())

        if (storage) {
            builder.withStorage(storage)
        }

        if (keyStorage) {
            builder.withKeyStorage(keyStorage)
        }

        const anonymousApi = await builder.build()

        const email = getTempEmail()
        const process = await anonymousApi.authenticationApi.startAuthentication(
            recaptchaType === "recaptcha" ? env.recaptcha : env.friendlyCaptchaKey,
            email,
            undefined,
            firstName,
            lastName,
            inviterId,
            false,
            8,
            recaptchaType
        )

        const emails = await TestUtils.getEmail(email)

        const subjectCode = emails.subject!

        //assert(subjectCode.length === 8, 'The subject code should be 8 characters long')
        const result = await anonymousApi.authenticationApi.completeAuthentication(process!, subjectCode)

        if (result?.api == undefined) {
            throw Error(`Couldn't sign up user by email for current test`)
        }

        const foundUser = await this.userApi(result.api).getLogged()
        assert(result)
        assert(result!.token != null)
        assert(result!.userId != null)

        return {api: result.api, user: this.toUserDto(foundUser), token: result.token}
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
    checkServiceAccessibleAndDecrypted(api: DSApi, service: DSService): Promise<void>
    checkServiceAccessibleButEncrypted(api: DSApi, service: DSService): Promise<void>
    checkServiceInaccessible(api: DSApi, service: DSService): Promise<void>
    newServiceFilter(api: DSApi): ServiceFilter
    toDocumentDto(dsDocument: DSDocument): Document
}

export interface WithMaintenanceTaskApi<DSApi, DSMaintenanceTask> {
    mtApi(api: DSApi): MaintenanceTaskLikeApi<DSMaintenanceTask>
    toMtDto(dsMt: DSMaintenanceTask): MaintenanceTask
    toDSMt(mtDto: MaintenanceTask): DSMaintenanceTask
}

export interface WithHelementApi<DSApi, DSHealthElement, DSPatient> {
    helementApi(api: DSApi): HealthElementLikeApi<DSHealthElement, DSPatient>
    createHelemntForPatient(api: DSApi, patient: DSPatient): Promise<DSHealthElement>
    toHelementDto(dsHelement: DSHealthElement): HealthElement
    toDSHelement(helementDto: HealthElement): DSHealthElement
}
