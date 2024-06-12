import { CryptoStrategies, KeyPair, SimpleCryptoStrategies } from '@icure/typescript-common'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../models/DataOwner.model'

export interface MedTechCryptoStrategies extends CryptoStrategies<DataOwnerWithType> {}

export class SimpleMedTechCryptoStrategies extends SimpleCryptoStrategies<DataOwnerWithType> {
    constructor(availableKeys?: KeyPair[], anonymousDataOwnerTypes?: Array<DataOwnerTypeEnum>) {
        super(availableKeys ?? [], anonymousDataOwnerTypes ?? ([DataOwnerTypeEnum.Patient]))
    }
}
