import {
    authenticationApi,
    AuthenticationApi,
    CodingApi,
    codingApi,
    DataOwnerApi,
    dataOwnerApi,
    DataOwnerTypeEnum,
    DataOwnerWithType,
    DataSampleApi,
    dataSampleApi,
    HealthcareElementApi,
    healthcareElementApi,
    HealthcareProfessionalApi,
    healthcareProfessionalApi,
    MedicalDeviceApi,
    medicalDeviceApi,
    NotificationApi,
    notificationApi,
    PatientApi,
    patientApi,
    UserApi,
    userApi,
} from '../../index'
import {
    AuthenticatedApiBuilder,
    CommonApi,
    CryptoStrategies,
    CryptoStrategiesBridge,
    KeyStorageFacade,
    StorageFacade,
    Apis,
    IccCryptoXApi,
    DataOwnerWithTypeDto,
    DataOwnerTypeEnumDto,
    JwtBridgedAuthService,
    IcureApi,
    AuthSecretProvider,
    ErrorHandler,
    Sanitizer,
} from '@icure/typescript-common'
import dataOwnerMapper from '../mappers/DataOwner.mapper'
import { MedTechCryptoStrategies } from '../services/MedTechCryptoStrategies'
import { iCureMedTechMessageFactory, MedTechMessageFactory } from '../services/MedTechMessageFactory'
import { AuthSecretProviderBridge } from '@icure/typescript-common/dist/services/impl/AuthSecretProviderBridge'

export class MedTechApi extends CommonApi {
    private readonly _codingApi: CodingApi
    private readonly _userApi: UserApi
    private readonly _patientApi: PatientApi
    private readonly _healthcareElementApi: HealthcareElementApi
    private readonly _notificationApi: NotificationApi
    private readonly _medicalDeviceApi: MedicalDeviceApi
    private readonly _healthcareProfessionalApi: HealthcareProfessionalApi
    private readonly _dataSampleApi: DataSampleApi
    private readonly _dataOwnerApi: DataOwnerApi
    private readonly _cryptoApi: IccCryptoXApi
    private readonly _messageFactory: MedTechMessageFactory

    private readonly _iCureBaseUrl: string
    private readonly _username: string
    private readonly _password: string | undefined
    private readonly _authSecretProvider: AuthSecretProvider | undefined

    private readonly _authenticationApi: AuthenticationApi | undefined
    private readonly _cryptoStrategies: CryptoStrategies<DataOwnerWithType>

    constructor(
        api: Apis,
        basePath: string,
        username: string,
        password: string | undefined,
        authSecretProvider: AuthSecretProvider | undefined,
        cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
        msgGtwUrl: string | undefined = undefined,
        msgGtwSpecId: string | undefined = undefined,
        authProcessByEmailId: string | undefined = undefined,
        authProcessBySmsId: string | undefined = undefined,
        storage?: StorageFacade<string>,
        keyStorage?: KeyStorageFacade,
        messageFactory?: MedTechMessageFactory,
        errorHandler?: ErrorHandler,
        sanitizer?: Sanitizer,
    ) {
        super(api, username, password, msgGtwUrl, msgGtwSpecId, storage, keyStorage)

        this._iCureBaseUrl = basePath
        this._username = username
        this._password = password
        this._authSecretProvider = authSecretProvider
        this._messageFactory = messageFactory ?? iCureMedTechMessageFactory

        this._authenticationApi =
            (authProcessByEmailId || authProcessBySmsId) && this._messageGatewayApi && msgGtwUrl && msgGtwSpecId
                ? authenticationApi(
                      this.errorHandler,
                      this.sanitizer,
                      this._messageGatewayApi,
                      basePath,
                      authProcessByEmailId,
                      authProcessBySmsId,
                      api.cryptoApi.primitives.crypto,
                      this.storage,
                      this.keyStorage,
                      this.cryptoStrategies,
                      this._baseApi.authApi.authenticationProvider,
                      msgGtwSpecId,
                      msgGtwUrl,
                  )
                : undefined
        this._dataSampleApi = dataSampleApi(this, basePath)
        this._codingApi = codingApi(this)
        this._medicalDeviceApi = medicalDeviceApi(this, basePath)
        this._patientApi = patientApi(this, basePath)
        this._userApi = userApi(this, this._messageFactory, basePath)
        this._healthcareElementApi = healthcareElementApi(this, basePath)

        this._healthcareProfessionalApi = healthcareProfessionalApi(this, basePath)
        this._notificationApi = notificationApi(this, basePath)
        this._dataOwnerApi = dataOwnerApi(this)

        this._cryptoApi = api.cryptoApi
        this._cryptoStrategies = cryptoStrategies
    }

    get codingApi(): CodingApi {
        return this._codingApi
    }

    get userApi(): UserApi {
        return this._userApi
    }

    get patientApi(): PatientApi {
        return this._patientApi
    }

    get healthcareElementApi(): HealthcareElementApi {
        return this._healthcareElementApi
    }

    get notificationApi(): NotificationApi {
        return this._notificationApi
    }

    get medicalDeviceApi(): MedicalDeviceApi {
        return this._medicalDeviceApi
    }

    get healthcareProfessionalApi(): HealthcareProfessionalApi {
        return this._healthcareProfessionalApi
    }

    get dataSampleApi(): DataSampleApi {
        return this._dataSampleApi
    }

    get dataOwnerApi(): DataOwnerApi {
        return this._dataOwnerApi
    }

    get cryptoApi(): IccCryptoXApi {
        return this._cryptoApi
    }

    get authenticationApi(): AuthenticationApi {
        if (!this._authenticationApi) {
            throw Error("authenticationApi couldn't be initialized. Make sure you provided the following arguments : msgGwUrl, msgGwSpecId, and at least one of authProcessByEmailId and authProcessBySMSId")
        }

        return this._authenticationApi
    }

    get iCureBaseUrl(): string {
        return this._iCureBaseUrl
    }

    get username(): string {
        return this._username
    }

    get password(): string | undefined {
        return this._password
    }

    get authSecretProvider(): AuthSecretProvider | undefined {
        return this._authSecretProvider
    }

    get storage(): StorageFacade<string> {
        return this._storage
    }

    get keyStorage(): KeyStorageFacade {
        return this._keyStorage
    }

    get messageFactory(): MedTechMessageFactory {
        return this._messageFactory
    }

    /**
     * @internal this property is for internal use only and may be changed without notice
     */
    get cryptoStrategies(): CryptoStrategies<DataOwnerWithType> {
        return this._cryptoStrategies
    }

    /**
     * Forces a reload/refresh of the api clearing any cached data. You may need this if the current user can't find or
     * access some data which got recently shared with him.
     */
    forceReload(): Promise<void> {
        return this._cryptoApi.forceReload()
    }
}

/**
 * @deprecated replace with {@link MedTechApi.Builder}
 */
export function medTechApi(initialisationApi?: MedTechApi) {
    return new MedTechApi.Builder(initialisationApi)
}
export namespace MedTechApi {
    export class Builder extends AuthenticatedApiBuilder<MedTechCryptoStrategies, MedTechMessageFactory, MedTechApi> {
        constructor(initialisationApi?: MedTechApi) {
            super()
            if (initialisationApi) {
                super.withICureBaseUrl(initialisationApi.iCureBaseUrl)
                super.withCrypto(initialisationApi.cryptoApi.primitives.crypto)
                super.withUserName(initialisationApi.username)
                if (!!initialisationApi.password) {
                    super.withPassword(initialisationApi.password)
                }
                if (!!initialisationApi.authSecretProvider) {
                    super.withAuthSecretProvider(initialisationApi.authSecretProvider)
                }
                super.withStorage(initialisationApi.storage)
                super.withKeyStorage(initialisationApi.keyStorage)
                super.withCryptoStrategies(initialisationApi.cryptoStrategies)
                super.withMessageFactory(initialisationApi.messageFactory)
            }
        }

        protected doBuild(props: {
            iCureBaseUrl: string
            msgGwUrl: string
            msgGwSpecId: string | undefined
            storage: StorageFacade<string> | undefined
            keyStorage: KeyStorageFacade | undefined
            cryptoStrategies: MedTechCryptoStrategies
            loginDetails:
                | {
                      username: string
                      password: string
                  }
                | {
                      icureTokens: { token: string; refreshToken: string }
                      credentials: { username: string; password: string }
                  }
                | {
                      username: string
                      secretProvider: AuthSecretProviderBridge
                      password: string | undefined
                      initialAuthToken: string | undefined
                      initialRefreshToken: string | undefined
                  }
            crypto: Crypto | undefined
            authProcessByEmailId: string | undefined
            authProcessBySmsId: string | undefined
            messageFactory: MedTechMessageFactory | undefined
            errorHandler: ErrorHandler
            sanitizer: Sanitizer
        }): Promise<MedTechApi> {
            return IcureApi.initialise(
                props.iCureBaseUrl,
                props.loginDetails,
                new CryptoStrategiesBridge(
                    props.cryptoStrategies,
                    {
                        toDomain(dto: DataOwnerWithTypeDto): DataOwnerWithType {
                            return dataOwnerMapper.toDomain(dto)
                        },
                        toDto(domain: DataOwnerWithType): DataOwnerWithTypeDto {
                            return dataOwnerMapper.toDto(domain)
                        },
                    },
                    (stubWithType) => {
                        switch (stubWithType.type) {
                            case DataOwnerTypeEnumDto.Patient: {
                                return DataOwnerTypeEnum.Patient
                            }
                            case DataOwnerTypeEnumDto.Hcp: {
                                return DataOwnerTypeEnum.HealthcareProfessional
                            }
                            case DataOwnerTypeEnumDto.Device: {
                                return DataOwnerTypeEnum.MedicalDevice
                            }
                            default: {
                                throw new Error('Unsupported data owner type')
                            }
                        }
                    },
                ),
                props.crypto,
                fetch,
                {
                    storage: props.storage,
                    keyStorage: props.keyStorage,
                    createMaintenanceTasksOnNewKey: true,
                    disableParentKeysInitialisation: true,
                },
            ).then(
                (api) =>
                    new MedTechApi(
                        api,
                        props.iCureBaseUrl,
                        'username' in props.loginDetails ? props.loginDetails.username : props.loginDetails.credentials.username,
                        'password' in props.loginDetails ? props.loginDetails.password : props.loginDetails.credentials.password,
                        'secretProvider' in props.loginDetails ? props.loginDetails.secretProvider.provider : undefined,
                        props.cryptoStrategies,
                        props.msgGwUrl,
                        props.msgGwSpecId,
                        props.authProcessByEmailId,
                        props.authProcessBySmsId,
                        props.storage,
                        props.keyStorage,
                        props.messageFactory,
                        props.errorHandler,
                        props.sanitizer,
                    ),
            )
        }
    }
}
