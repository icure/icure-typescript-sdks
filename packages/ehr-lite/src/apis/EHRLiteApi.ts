import { Apis, DataOwnerWithType as DataOwnerWithTypeDto, IccCryptoXApi, IcureApi, KeyStorageFacade, KeyStorageImpl, LocalStorageImpl, StorageFacade } from '@icure/api'
import {
    AuthenticatedApiBuilder,
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
import {DataOwnerApi, dataOwnerApi} from './DataOwnerApi'
import {CodingApi, codingApi} from './CodingApi'
import { Patient } from '../models/Patient.model'
import {ConditionApi, conditionApi} from './ConditionApi'
import { Condition } from '../models/Condition.model'
import { Observation } from '../models/Observation.model'
import {ObservationApi, observationApi} from './ObservationApi'
import { Organisation } from '../models/Organisation.model'
import { Practitioner } from '../models/Practitioner.model'
import {OrganisationApi, organisationApi} from './OrganisationApi'
import {PatientApi, patientApi} from './PatientApi'
import {PractitionerApi, practitionerApi} from './PractitionerApi'
import {UserApi, userApi} from './UserApi'
import {NotificationApi, notificationApi} from './NotificationApi'
import { DataOwnerTypeEnum as DataOwnerTypeEnumDto } from '@icure/api/icc-api/model/DataOwnerTypeEnum'
import dataOwnerMapper from '../mappers/DataOwner.mapper'
import { authenticationApi } from './AuthenticationApi'
import {MedTechApi} from "@icure/medical-device-sdk";

export class EHRLiteApi extends CommonApi {
    private readonly _codingApi: CodingApi
    private readonly _conditionApi: ConditionApi
    private readonly _dataOwnerApi: DataOwnerApi
    private readonly _observationApi: ObservationApi
    private readonly _organisationApi: OrganisationApi
    private readonly _patientApi: PatientApi
    private readonly _practitionerApi: PractitionerApi
    private readonly _userApi: UserApi
    private readonly _notificationApi: NotificationApi

    private readonly _cryptoApi: IccCryptoXApi

    private readonly _authenticationApi?: AuthenticationApi<EHRLiteApi>

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
        super(_baseApi, _username, _password, _msgGtwUrl, _msgGtwSpecId, storage, keyStorage)

        this._cryptoApi = this._baseApi.cryptoApi

        this._dataOwnerApi = dataOwnerApi(this)

        this._codingApi = codingApi(this)

        this._conditionApi = conditionApi(this)

        this._observationApi = observationApi(this)

        this._organisationApi = organisationApi(this)

        this._patientApi = patientApi(this)

        this._practitionerApi = practitionerApi(this)

        this._authenticationApi = this.messageGatewayApi ? authenticationApi(this.errorHandler, this.sanitizer, this.messageGatewayApi, _iCureBaseUrl, _authProcessByEmailId, _authProcessBySmsId, crypto, this._storage, this._keyStorage, _cryptoStrategies) : undefined

        this._userApi = userApi(this)

        this._notificationApi = notificationApi(this)
    }

    get codingApi(): CodingApi {
        return this._codingApi
    }

    get dataOwnerApi(): DataOwnerApi {
        return this._dataOwnerApi
    }

    get conditionApi(): ConditionApi {
        return this._conditionApi
    }

    get observationApi(): ObservationApi {
        return this._observationApi
    }

    get organisationApi(): OrganisationApi {
        return this._organisationApi
    }

    get patientApi(): PatientApi {
        return this._patientApi
    }

    get practitionerApi(): PractitionerApi {
        return this._practitionerApi
    }

    get userApi(): UserApi {
        return this._userApi
    }

    get authenticationApi(): AuthenticationApi<EHRLiteApi> | undefined {
        return this._authenticationApi
    }

    get cryptoApi(): IccCryptoXApi {
        return this._cryptoApi
    }

    get notificationApi(): NotificationApi {
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
    export class Builder extends AuthenticatedApiBuilder<CryptoStrategies<DataOwnerWithType>, EHRLiteApi>{

        protected doBuild(props: {
            iCureBaseUrl: string;
            msgGwUrl: string;
            msgGwSpecId: string | undefined;
            storage: StorageFacade<string> | undefined;
            keyStorage: KeyStorageFacade | undefined;
            cryptoStrategies: CryptoStrategies<DataOwnerWithType>;
            userName: string;
            password: string;
            crypto: Crypto | undefined;
            authProcessByEmailId: string | undefined;
            authProcessBySmsId: string | undefined
        }): Promise<EHRLiteApi> {
            return IcureApi.initialise(
                props.iCureBaseUrl,
                {
                    username: props.userName,
                    password: props.password,
                },
                new CryptoStrategiesBridge<DataOwnerWithType>(
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
                    storage: props.storage,
                    keyStorage: props.keyStorage,
                    createMaintenanceTasksOnNewKey: true,
                }
            ).then(
                (api) =>
                    new EHRLiteApi(
                        api,
                        props.iCureBaseUrl,
                        props.userName,
                        props.password,
                        props.cryptoStrategies,
                        props.msgGwUrl,
                        props.msgGwSpecId,
                        props.authProcessByEmailId,
                        props.authProcessBySmsId,
                        props.storage,
                        props.keyStorage
                    )
            )
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
