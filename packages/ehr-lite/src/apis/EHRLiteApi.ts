import { Apis, DataOwnerWithType as DataOwnerWithTypeDto, IccCryptoXApi, IcureApi, KeyStorageFacade, StorageFacade } from '@icure/api'
import { AuthenticatedApiBuilder, CommonApi, CryptoStrategies, CryptoStrategiesBridge, extractDomainType } from '@icure/typescript-common'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../models/DataOwner.model'
import { DataOwnerApi, dataOwnerApi } from './DataOwnerApi'
import { CodingApi, codingApi } from './CodingApi'
import { ConditionApi, conditionApi } from './ConditionApi'
import { ObservationApi, observationApi } from './ObservationApi'
import { OrganisationApi, organisationApi } from './OrganisationApi'
import { PatientApi, patientApi } from './PatientApi'
import { PractitionerApi, practitionerApi } from './PractitionerApi'
import { UserApi, userApi } from './UserApi'
import { NotificationApi, notificationApi } from './NotificationApi'
import { DataOwnerTypeEnum as DataOwnerTypeEnumDto } from '@icure/api/icc-api/model/DataOwnerTypeEnum'
import dataOwnerMapper from '../mappers/DataOwner.mapper'
import { authenticationApi, AuthenticationApi } from './AuthenticationApi'
import { EHRLiteCryptoStrategies } from '../services/EHRLiteCryptoStrategies'
import { EHRLiteMessageFactory, iCureEHRLiteMessageFactory } from '../services/EHRLiteMessageFactory'
import { topicApi, TopicApi } from './TopicApi'
import { messageApi, MessageApi } from './MessageApi'

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
    private readonly _topicApi: TopicApi
    private readonly _messageApi: MessageApi

    private readonly _cryptoApi: IccCryptoXApi

    private readonly _authenticationApi?: AuthenticationApi

    private readonly _messageFactory: EHRLiteMessageFactory

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
        private readonly _messageCharactersLimit: number,
        storage?: StorageFacade<string>,
        keyStorage?: KeyStorageFacade,
        messageFactory?: EHRLiteMessageFactory,
    ) {
        super(_baseApi, _username, _password, _msgGtwUrl, _msgGtwSpecId, storage, keyStorage)

        this._cryptoApi = this._baseApi.cryptoApi

        this._dataOwnerApi = dataOwnerApi(this)

        this._codingApi = codingApi(this)

        this._conditionApi = conditionApi(this, _iCureBaseUrl)

        this._observationApi = observationApi(this, _iCureBaseUrl)

        this._organisationApi = organisationApi(this, _iCureBaseUrl)

        this._patientApi = patientApi(this, _iCureBaseUrl)

        this._practitionerApi = practitionerApi(this, _iCureBaseUrl)

        this._authenticationApi = this.messageGatewayApi
            ? authenticationApi(this.errorHandler, this.sanitizer, this.messageGatewayApi, _iCureBaseUrl, _authProcessByEmailId, _authProcessBySmsId, _baseApi.cryptoApi.primitives.crypto, this._storage, this._keyStorage, _cryptoStrategies)
            : undefined

        this._messageFactory = messageFactory ?? iCureEHRLiteMessageFactory

        this._userApi = userApi(this, this._messageFactory, _iCureBaseUrl)

        this._notificationApi = notificationApi(this, _iCureBaseUrl)

        this._topicApi = topicApi(this)

        this._messageApi = messageApi(this, this.messageCharactersLimit)
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

    get authenticationApi(): AuthenticationApi {
        if (!this._authenticationApi) {
            throw Error("authenticationApi couldn't be initialized. Make sure you provided the following arguments : msgGwUrl, msgGwSpecId, and at least one of authProcessByEmailId and authProcessBySMSId")
        }

        return this._authenticationApi
    }

    get cryptoApi(): IccCryptoXApi {
        return this._cryptoApi
    }

    get notificationApi(): NotificationApi {
        return this._notificationApi
    }

    get topicApi(): TopicApi {
        return this._topicApi
    }

    get messageApi(): MessageApi {
        return this._messageApi
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

    get messageFactory(): EHRLiteMessageFactory {
        return this._messageFactory
    }

    /**
     * @internal this property is for internal use only and may be changed without notice
     */
    get messageCharactersLimit(): number {
        return this._messageCharactersLimit ?? 2_000
    }

    /**
     * @internal this property is for internal use only and may be changed without notice
     */
    get cryptoStrategies(): CryptoStrategies<DataOwnerWithType> {
        return this._cryptoStrategies
    }
}

export namespace EHRLiteApi {
    export class Builder extends AuthenticatedApiBuilder<EHRLiteCryptoStrategies, EHRLiteMessageFactory, EHRLiteApi> {
        constructor(initialisationApi?: EHRLiteApi) {
            super()
            if (initialisationApi) {
                super.withICureBaseUrl(initialisationApi.iCureBaseUrl)
                super.withCrypto(initialisationApi.cryptoApi.primitives.crypto)
                super.withUserName(initialisationApi.username)
                super.withPassword(initialisationApi.password)
                super.withStorage(initialisationApi.storage)
                super.withKeyStorage(initialisationApi.keyStorage)
                super.withCryptoStrategies(initialisationApi.cryptoStrategies)
                super.withMessageFactory(initialisationApi.messageFactory)
                super.withMessageCharactersLimit(initialisationApi.messageCharactersLimit)
            }
        }

        protected doBuild(props: {
            iCureBaseUrl: string
            msgGwUrl: string
            msgGwSpecId: string | undefined
            storage: StorageFacade<string> | undefined
            keyStorage: KeyStorageFacade | undefined
            cryptoStrategies: CryptoStrategies<DataOwnerWithType>
            userName: string
            password: string
            crypto: Crypto | undefined
            authProcessByEmailId: string | undefined
            authProcessBySmsId: string | undefined
            messageFactory: EHRLiteMessageFactory | undefined
            messageCharactersLimit: number
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
                    },
                ),
                this.crypto,
                fetch,
                {
                    storage: props.storage,
                    keyStorage: props.keyStorage,
                    createMaintenanceTasksOnNewKey: true,
                    disableParentKeysInitialisation: true,
                    encryptedFieldsConfig: {
                        message: ['subject'],
                    },
                },
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
                        props.messageCharactersLimit,
                        props.storage,
                        props.keyStorage,
                        props.messageFactory,
                    ),
            )
        }
    }
}
