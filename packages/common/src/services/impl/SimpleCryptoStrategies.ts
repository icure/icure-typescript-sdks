import { CryptoStrategies } from '../CryptoStrategies'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { DataOwnerWithType } from '../../models/DataOwner.model'
import { KeyPair } from '../../models/KeyPair.model'

/**
 * Implementation of med-tech crypto strategies which uses pre-loaded keys for initialisation and puts full trust on the
 * server in regard to public keys.
 *
 * The pre-loaded keys are used during the initialisation as recovered keys if some keys could not be found
 * automatically by the api initialisation procedure. There is no need to provide keys from the key storage if they
 * were stored at standard entries, nor keys recovered from transfer keys and/or shamir splits, as these will be
 * automatically loaded by the initialisation procedure.
 */
export class SimpleCryptoStrategies<DSDataOwnerWithType extends DataOwnerWithType> implements CryptoStrategies<DSDataOwnerWithType> {
    private _generatedKeyPair: KeyPair | undefined

    /**
     * Builds a new instance of simple med-tech crypto strategies:
     * @param availableKeys pre-loaded available keys which may not be contained yet in the key storage. Will be also
     * considered as verified.
     */
    // * @param anonymousDataOwnerTypes data owner types which require anonymous delegations
    constructor(
        private readonly availableKeys: KeyPair[], // private readonly anonymousDataOwnerTypes: Set<DSDataOwnerWithType['type']>
    ) {}

    /**
     * If a new key pair was initialised during api initialisation this will return the generated keypair.
     */
    get generatedKeyPair(): KeyPair | undefined {
        return this._generatedKeyPair ? { ...this._generatedKeyPair } : undefined
    }

    allowNewKeyPairGeneration(self: DSDataOwnerWithType): Promise<boolean> {
        return Promise.resolve(true)
    }

    recoverAndVerifyKeys(
        self: DSDataOwnerWithType,
        missingKeys: string[],
        unverifiedKeys: string[],
    ): Promise<{
        recoveredKeyPairs: KeyPair[]
        verifiedKeys: { [p: string]: CryptoStrategies.KeyVerificationBehaviour }
    }> {
        const availableKeysByPublic = Object.fromEntries(this.availableKeys.map((keyPair) => [keyPair.publicKey, keyPair] as [string, KeyPair]))
        const recoveredKeyPairs = missingKeys.flatMap((missingKey) => {
            const availableKey = availableKeysByPublic[missingKey]
            return availableKey ? [availableKey] : []
        })
        const recoveredPublicKeysSet = new Set(recoveredKeyPairs.map((keyPair) => keyPair.publicKey))
        const verifiedKeys = Object.fromEntries(
            unverifiedKeys
                .filter((unverifiedKey) => !recoveredPublicKeysSet.has(unverifiedKey))
                .map((unverifiedKey) => [unverifiedKey, !!availableKeysByPublic[unverifiedKey] ? CryptoStrategies.KeyVerificationBehaviour.MARK_VERIFIED : CryptoStrategies.KeyVerificationBehaviour.TEMPORARILY_UNVERIFIED] as [string, CryptoStrategies.KeyVerificationBehaviour]),
        )
        return Promise.resolve({ recoveredKeyPairs, verifiedKeys })
    }

    async notifyKeyPairGeneration(keyPair: KeyPair): Promise<void> {
        if (!!this._generatedKeyPair) throw new Error('A new key pair was already created')
        this._generatedKeyPair = keyPair
    }

    verifyDelegatePublicKeys(delegateId: string, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]> {
        return Promise.resolve(publicKeys)
    }

    // TODO will be needed for api v8
    // dataOwnerRequiresAnonymousDelegation(dataOwnerId: string, dataOwnerType: DSDataOwnerWithType['type']): boolean {
    //   return this.anonymousDataOwnerTypes.has(dataOwnerType)
    // }
}
