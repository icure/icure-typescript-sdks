import 'reflect-metadata'

export * from './services/services'
export * from './models/models'
export * from './mappers/mapper'
export * from './filters/filters'
export * from './utils/utils'
export * from './apis/apis'
export * from './types'

export {
    StorageFacade,
    KeyStorageFacade,
    LocalStorageImpl,
    KeyStorageImpl,
    Apis,
    IccCryptoXApi,
    DataOwnerWithType as DataOwnerWithTypeDto,
    IcureApi,
    Connection,
    Patient as PatientDto,
    SubscriptionOptions,
    MaintenanceTask as MaintenanceTaskDto,
    Device as DeviceDto,
    HealthcareParty as HealthcarePartyDto,
    Document as DocumentDto,
    Service as ServiceDto,
    Contact as ContactDto,
    SubContact as SubContactDto,
    Substanceproduct as SubstanceproductDto,
    Medicinalproduct as MedicinalproductDto,
    Duration as DurationDto,
    Renewal as RenewalDto,
    RegimenItem as RegimenItemDto,
    ParagraphAgreement as ParagraphAgreementDto,
    Suspension as SuspensionDto,
    AdministrationQuantity as AdministrationQuantityDto,
    Weekday as WeekdayDto,
    Code as CodeDto,
    Telecom as TelecomDto,
    HealthElement as HealthElementDto,
    Address as AddressDto,
    Partnership as PartnershipDto,
    User as UserDto,
    PatientHealthCareParty as PatientHealthCarePartyDto,
    ReferralPeriod,
    ISO639_1,
    b64_2ab,
    ua2b64,
    IccAuthApi,
    CryptoPrimitives,
    Annotation as AnnotationDto,
    CodeStub,
    Delegation as DelegationDto,
    EmploymentInfo,
    FinancialInstitutionInformation,
    Identifier as IdentifierDto,
    Insurability,
    MedicalHouseContract,
    PersonName as PersonNameDto,
    PropertyStub,
    SchoolingInfo,
    SecurityMetadata as SecurityMetadataDto,
    Content as ContentDto,
    CareTeamMember,
    Episode,
    PlanOfAction,
    FlatRateTarification,
    HealthcarePartyHistoryStatus,
    Medication as MedicationDto,
    Measure as MeasureDto,
    TimeSeries as TimeSeriesDto,
    Message as MessageDto,
    Topic as TopicDto,
    ReferenceRange as ReferenceRangeDto,
} from '@icure/api'
export { NativeCryptoPrimitivesBridge } from '@icure/api/icc-x-api/crypto/NativeCryptoPrimitivesBridge'
export { DataOwnerTypeEnum as DataOwnerTypeEnumDto } from '@icure/api/icc-api/model/DataOwnerTypeEnum'
export { JwtBridgedAuthService } from '@icure/api/icc-x-api/auth/JwtBridgedAuthService'
export { AuthSecretProviderBridge } from './services/impl/AuthSecretProviderBridge'

export { toMapArrayTransform } from './utils/mapUtils'
export { toMapTransform } from './utils/mapUtils'
export { map } from './utils/mapUtils'
export { mapSetToArray } from './utils/mapUtils'
export { mapArray } from './utils/mapUtils'
export { mapReduce } from './utils/mapUtils'
export { toMap } from './utils/mapUtils'
export { forceUuid } from './utils/uuidUtils'

export const ICURE_CLOUD_URL = 'https://kraken.icure.cloud'
export const MSG_GW_CLOUD_URL = 'https://msg-gw.icure.cloud'
