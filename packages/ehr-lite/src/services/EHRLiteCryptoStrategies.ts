import { CryptoStrategies, KeyPair, SimpleCryptoStrategies } from '@icure/typescript-common'
import { DataOwnerWithType } from '../models/DataOwner.model'

export interface EHRLiteCryptoStrategies extends CryptoStrategies<DataOwnerWithType> {}

export class SimpleEHRLiteCryptoStrategies extends SimpleCryptoStrategies<DataOwnerWithType> {
    constructor(availableKeys?: KeyPair[]) {
        super(availableKeys ?? [])
    }
}
