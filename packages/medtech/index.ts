export * from './src/models/all'
export * from './src/apis/AnonymousMedTechApi'
export * from './src/apis/AuthenticationApi'
export * from './src/apis/CodingApi'
export * from './src/apis/DataSampleApi'
export * from './src/apis/HealthcareElementApi'
export * from './src/apis/HealthcareProfessionalApi'
export * from './src/apis/MedicalDeviceApi'
export * from './src/apis/NotificationApi'
export * from './src/apis/PatientApi'
export * from './src/apis/UserApi'
export * from './src/apis/DataOwnerApi'
export * from './src/apis/MedTechApi'
export * from './src/filter'

export { CryptoStrategies, CryptoStrategiesBridge, SimpleCryptoStrategies, NativeCryptoPrimitivesBridge } from '@icure/typescript-common'

export { recordOf } from '@icure/typescript-common'

export * from '@icure/api/icc-x-api/utils/binary-utils'
export * from '@icure/api/icc-x-api/utils/formatting-util'
export * from '@icure/api/icc-x-api/utils/uuid-encoder'

export { KeyStorageFacade, StorageFacade, LocalStorageImpl, KeyStorageImpl } from '@icure/api'

export const ICURE_CLOUD_URL = 'https://kraken.icure.cloud'
export const ICURE_FREE_URL = 'http://localhost:16043'
export const MSG_GW_CLOUD_URL = 'https://msg-gw.icure.cloud'
