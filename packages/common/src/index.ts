import 'reflect-metadata'

export * from './services/services'
export * from './models/models'
export * from './mappers/mapper'
export * from './filters/filters'
export * from './utils/utils'
export * from './apis/apis'

export { StorageFacade, KeyStorageFacade, LocalStorageImpl, KeyStorageImpl } from '@icure/api'

export { toMapSet } from './utils/mapUtils'
export { toMapSetTransform } from './utils/mapUtils'
export { toMapArrayTransform } from './utils/mapUtils'
export { toMapTransform } from './utils/mapUtils'
export { map } from './utils/mapUtils'
export { mapSetToArray } from './utils/mapUtils'
export { mapSet } from './utils/mapUtils'
export { mapReduce } from './utils/mapUtils'
export { toMap } from './utils/mapUtils'
export { forceUuid } from './utils/uuidUtils'

export const ICURE_CLOUD_URL = 'https://kraken.icure.cloud'
export const MSG_GW_CLOUD_URL = 'https://msg-gw.icure.cloud'
