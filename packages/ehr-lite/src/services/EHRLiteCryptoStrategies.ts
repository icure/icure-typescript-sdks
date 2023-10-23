import { CryptoStrategies, KeyPair, SimpleCryptoStrategies } from '@icure/typescript-common'
import { DataOwnerTypeEnum, DataOwnerWithType } from '../models/DataOwner.model'

export interface EHRLiteCryptoStrategies extends CryptoStrategies<DataOwnerWithType> {}

export class SimpleEHRLiteCryptoStrategies extends SimpleCryptoStrategies<DataOwnerWithType> {
    constructor(availableKeys?: KeyPair[], anonymousDataOwnerTypes?: Set<DataOwnerTypeEnum>) {
        super(availableKeys ?? [], anonymousDataOwnerTypes ?? new Set([DataOwnerTypeEnum.PATIENT]))
    }
}
