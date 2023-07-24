import { CryptoStrategies, KeyPair, SimpleCryptoStrategies } from '@icure/typescript-common'
import { DataOwnerWithType } from '../models/DataOwner.model'

export interface MedTechCryptoStrategies extends CryptoStrategies<DataOwnerWithType> {}

export class SimpleMedTechCryptoStrategies extends SimpleCryptoStrategies<DataOwnerWithType> {
  constructor(availableKeys?: KeyPair[]) {
    super(availableKeys ?? [])
  }
}
