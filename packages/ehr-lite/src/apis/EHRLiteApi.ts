import { Api, Apis, DataOwnerWithType as DataOwnerWithTypeDto, IccCryptoXApi, KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade } from '@icure/api'
import {
    AuthenticationApi,
    CodeLikeApi,
    Coding,
    CommonApi,
    CryptoStrategies,
    CryptoStrategiesBridge,
    DataOwnerLikeApi,
    Document,
    ErrorHandlerImpl,
    extractDomainType,
    formatICureApiUrl,
    HealthcarePartyLikeApi,
    HealthElementLikeApi,
    ICURE_CLOUD_URL,
    MaintenanceTaskLikeApiImpl,
    MessageGatewayApi,
    MSG_GW_CLOUD_URL,
    Notification,
    PatientLikeApi,
    SanitizerImpl,
    ServiceLikeApi,
    User,
    UserLikeApi,
} from '@icure/typescript-common'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../models/DataOwner.model'
import { dataOwnerApi } from './DataOwnerApi'
import { codingApi } from './CodingApi'
import { Patient } from '../models/Patient.model'
import { conditionApi } from './ConditionApi'
import { Condition } from '../models/Condition.model'
import { Observation } from '../models/Observation.model'
import { observationApi } from './ObservationApi'
import { Organisation } from '../models/Organisation.model'
import { Practitioner } from '../models/Practitioner.model'
import { organisationApi } from './OrganisationApi'
import { patientApi } from './PatientApi'
import { practitionerApi } from './PractitionerApi'
import { userApi } from './UserApi'
import { messageGatewayApi } from './MessageGatewayApi'
import { notificationApi } from './NotificationApi'
import { DataOwnerTypeEnum as DataOwnerTypeEnumDto } from '@icure/api/icc-api/model/DataOwnerTypeEnum'
import dataOwnerMapper from '../mappers/DataOwner.mapper'

export class EHRLiteApi extends CommonApi {
    private readonly _codingApi: CodeLikeApi<Coding>
    private readonly _conditionApi: HealthElementLikeApi<Condition, Patient>
    private readonly _dataOwnerApi: DataOwnerLikeApi<DataOwnerWithType, User>
    private readonly _observationApi: ServiceLikeApi<Observation, Patient, Document>
    private readonly _organisationApi: HealthcarePartyLikeApi<Organisation>
    private readonly _patientApi: PatientLikeApi<Patient>
    private readonly _practitionerApi: HealthcarePartyLikeApi<Practitioner>
    private readonly _userApi: UserLikeApi<User, Patient>
    private readonly _notificationApi: MaintenanceTaskLikeApiImpl<Notification>

    private readonly _cryptoApi: IccCryptoXApi

    private readonly _authenticationApi?: AuthenticationApi<EHRLiteApi>
    private readonly _messageGatewayApi?: MessageGatewayApi

    private readonly _storage: StorageFacade<string>
    private readonly _keyStorage: KeyStorageFacade

    constructor(
        _baseApi: Apis,
        private readonly _iCureBaseUrl: string,
        private readonly _username: string,
        private readonly _password: string,
        private readonly _cryptoStrategies: CryptoStrategies<DataOwnerWithType>,
        private readonly _msgGtwUrl: string | undefined = undefined,
        private readonly _msgGtwSpecId: string | undefined = undefined,
        private readonly _authProcessByEmailId: string | undefined = undefined,
        private readonly _authProcessBySmsId: string | undefined = undefined,
        storage?: StorageFacade<string>,
        keyStorage?: KeyStorageFacade
    ) {
        super(_baseApi)
        const errorHandler = new ErrorHandlerImpl()
        const sanitizer = new SanitizerImpl(errorHandler)

        this._storage = storage || new LocalStorageImpl()
        this._keyStorage = keyStorage || new KeyStorageImpl(this._storage)

        this._cryptoApi = this._baseApi.cryptoApi

        this._dataOwnerApi = dataOwnerApi(errorHandler, this._baseApi.dataOwnerApi, this._baseApi.patientApi, this._baseApi.icureMaintenanceTaskApi)

        this._codingApi = codingApi(errorHandler, this._baseApi.codeApi)

        this._conditionApi = conditionApi(errorHandler, this._baseApi.healthcareElementApi, this._baseApi.userApi, this._baseApi.patientApi, this._baseApi.dataOwnerApi, this._baseApi.cryptoApi)

        this._observationApi = observationApi(errorHandler, this._baseApi.contactApi, this._baseApi.userApi, this._baseApi.patientApi, this._baseApi.healthcareElementApi, this._baseApi.cryptoApi, this._baseApi.dataOwnerApi)

        this._organisationApi = organisationApi(errorHandler, this._baseApi.healthcarePartyApi)

        this._patientApi = patientApi(errorHandler, this._baseApi.patientApi, this._baseApi.userApi, this._baseApi.dataOwnerApi)

        this._practitionerApi = practitionerApi(errorHandler, this._baseApi.healthcarePartyApi)

        const msgGwApi = _msgGtwUrl && _msgGtwSpecId ? messageGatewayApi(_msgGtwUrl, _msgGtwSpecId, errorHandler, sanitizer, _username, _password) : undefined

        this._messageGatewayApi = msgGwApi

        this._userApi = userApi(errorHandler, sanitizer, this._baseApi.userApi, msgGwApi)

        this._notificationApi = notificationApi(errorHandler, this._baseApi.maintenanceTaskApi, this._baseApi.userApi, this._baseApi.dataOwnerApi)
    }

    get codingApi(): CodeLikeApi<Coding> {
        return this._codingApi
    }

    get dataOwnerApi(): DataOwnerLikeApi<DataOwnerWithType, User> {
        return this._dataOwnerApi
    }

    get conditionApi(): HealthElementLikeApi<Condition, Patient> {
        return this._conditionApi
    }

    get observationApi(): ServiceLikeApi<Observation, Patient, Document> {
        return this._observationApi
    }

    get organisationApi(): HealthcarePartyLikeApi<Organisation> {
        return this._organisationApi
    }

    get patientApi(): PatientLikeApi<Patient> {
        return this._patientApi
    }

    get practitionerApi(): HealthcarePartyLikeApi<Practitioner> {
        return this._practitionerApi
    }

    get userApi(): UserLikeApi<User, Patient> {
        return this._userApi
    }

    get messageGatewayApi(): MessageGatewayApi | undefined {
        return this._messageGatewayApi
    }

    get authenticationApi(): AuthenticationApi<EHRLiteApi> | undefined {
        return this._authenticationApi
    }

    get cryptoApi(): IccCryptoXApi {
        return this._cryptoApi
    }

    get notificationApi(): MaintenanceTaskLikeApiImpl<Notification> {
        return this._notificationApi
    }

    get iCureBaseUrl(): string {
        return this._iCureBaseUrl
    }

    get username(): string {
        return this._username
    }

    get password(): string {
        return this._password
    }

    get storage(): StorageFacade<string> {
        return this._storage
    }

    get keyStorage(): KeyStorageFacade {
        return this._keyStorage
    }

    /**
     * @internal this property is for internal use only and may be changed without notice
     */
    get cryptoStrategies(): CryptoStrategies<DataOwnerWithType> {
        return this._cryptoStrategies
    }
}

export namespace EHRLite {
    export class Builder {
        private iCureBaseUrl?: string = ICURE_CLOUD_URL
        private userName?: string
        private password?: string
        private crypto?: Crypto
        private msgGwUrl?: string = MSG_GW_CLOUD_URL
        private msgGwSpecId?: string
        private authProcessByEmailId?: string
        private authProcessBySmsId?: string
        private cryptoStrategies?: CryptoStrategies<DataOwnerWithType>
        private storage?: StorageFacade<string>
        private keyStorage?: KeyStorageFacade

        withICureBaseUrl(newICureBaseUrl: string): Builder {
            this.iCureBaseUrl = formatICureApiUrl(newICureBaseUrl)
            return this
        }

        withUserName(newUserName: string): Builder {
            this.userName = newUserName
            return this
        }

        withPassword(newPassword: string): Builder {
            this.password = newPassword
            return this
        }

        withMsgGwUrl(newMsgGwUrl: string | undefined): Builder {
            this.msgGwUrl = newMsgGwUrl
            return this
        }

        withMsgGwSpecId(newSpecId: string | undefined): Builder {
            this.msgGwSpecId = newSpecId
            return this
        }

        withAuthProcessByEmailId(authProcessByEmailId: string): Builder {
            this.authProcessByEmailId = authProcessByEmailId
            return this
        }

        withAuthProcessBySmsId(authProcessBySmsId: string): Builder {
            this.authProcessBySmsId = authProcessBySmsId
            return this
        }

        withCrypto(newCrypto: Crypto): Builder {
            this.crypto = newCrypto
            return this
        }

        withStorage(storage: StorageFacade<string>): Builder {
            this.storage = storage
            return this
        }

        withKeyStorage(keyStorage: KeyStorageFacade): Builder {
            this.keyStorage = keyStorage
            return this
        }

        withCryptoStrategies(strategies: CryptoStrategies<DataOwnerWithType>): Builder {
            this.cryptoStrategies = strategies
            return this
        }

        async build(): Promise<EHRLiteApi> {
            const baseUrl = this.iCureBaseUrl
            const userName = this.userName
            const password = this.password
            const cryptoStrategies = this.cryptoStrategies
            const crypto = this.crypto
            const msgGwUrl = this.msgGwUrl
            const msgGwSpecId = this.msgGwSpecId
            const authProcessByEmailId = this.authProcessByEmailId
            const authProcessBySmsId = this.authProcessBySmsId
            const storage = this.storage
            const keyStorage = this.keyStorage
            if (baseUrl == undefined) {
                throw new Error('iCureBaseUrl is required')
            }
            if (userName == undefined) {
                throw new Error('userName is required')
            }
            if (password == undefined) {
                throw new Error('password is required')
            }
            if (cryptoStrategies == undefined) {
                throw new Error('cryptoStrategies is required')
            }

            return Api(
                baseUrl,
                {
                    username: userName,
                    password: password,
                },
                new CryptoStrategiesBridge<DataOwnerWithType>(
                    cryptoStrategies,
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
                                return DataOwnerTypeEnum.PATIENT
                            }
                            case DataOwnerTypeEnumDto.Hcp: {
                                const domainType = stubWithType.stub.tags ? extractDomainType(stubWithType.stub.tags) : undefined

                                if (domainType === undefined) {
                                    throw new Error('Domain type is not found')
                                }

                                if (domainType === DataOwnerTypeEnum.PRACTITIONER) {
                                    return DataOwnerTypeEnum.PRACTITIONER
                                }

                                if (domainType === DataOwnerTypeEnum.ORGANISATION) {
                                    return DataOwnerTypeEnum.ORGANISATION
                                }

                                throw new Error('Unknown domain type')
                            }
                            default: {
                                throw new Error('Unsupported data owner type')
                            }
                        }
                    }
                ),
                crypto,
                fetch,
                {
                    storage: storage,
                    keyStorage: keyStorage,
                    createMaintenanceTasksOnNewKey: true,
                }
            ).then((api) => new EHRLiteApi(api, baseUrl, userName, password, cryptoStrategies, msgGwUrl, msgGwSpecId, authProcessByEmailId, authProcessBySmsId, storage, keyStorage))
        }
    }

    export const api = (api?: EHRLiteApi) => {
        const apiBuilder = new Builder()
        if (api) {
            return apiBuilder.withICureBaseUrl(api.iCureBaseUrl).withCrypto(api.cryptoApi.primitives.crypto).withUserName(api.username).withPassword(api.password).withStorage(api.storage).withKeyStorage(api.keyStorage).withCryptoStrategies(api.cryptoStrategies)
        }

        return apiBuilder
    }
}
