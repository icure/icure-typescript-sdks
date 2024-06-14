import { CryptoStrategies as BaseCryptoStrategies } from '@icure/api/icc-x-api/crypto/CryptoStrategies'
import { CryptoStrategies } from '../../services/CryptoStrategies'
import { DataOwnerWithType as DataOwnerWithTypeDto, hex2ua, ShaVersion, ua2hex } from '@icure/api'
import { CryptoPrimitives } from '@icure/api/icc-x-api/crypto/CryptoPrimitives'
import { KeyPair as RSAKeyPair } from '@icure/api/icc-x-api/crypto/RSA'
import { KeyPair } from '../../models/KeyPair.model'
import { CryptoActorStubWithType } from '@icure/api/icc-api/model/CryptoActorStub'
import { DataOwnerWithType } from '../../models/DataOwner.model'
import { Mapper } from '../Mapper'
import KeyVerificationBehaviour = CryptoStrategies.KeyVerificationBehaviour
import { hexPublicKeysWithSha1Of, hexPublicKeysWithSha256Of } from '@icure/api/icc-x-api/crypto/utils'

export class CryptoStrategiesBridge<DSDataOwnerWithType extends DataOwnerWithType> implements BaseCryptoStrategies {
    constructor(
        private readonly dsStrategies: CryptoStrategies<DSDataOwnerWithType>,
        private readonly dataOwnerMapper: Mapper<DSDataOwnerWithType, DataOwnerWithTypeDto>,
        private readonly cryptoActorStubToDomainTypeMapper: (stub: CryptoActorStubWithType) => DSDataOwnerWithType['type'],
    ) {}

    async generateNewKeyForDataOwner(self: DataOwnerWithTypeDto, cryptoPrimitives: CryptoPrimitives): Promise<RSAKeyPair<CryptoKey> | boolean> {
        const canGenerate = await this.dsStrategies.allowNewKeyPairGeneration(this.dataOwnerMapper.toDomain(self))
        if (canGenerate) {
            const newKey = await cryptoPrimitives.RSA.generateKeyPair(ShaVersion.Sha256)
            await this.dsStrategies.notifyKeyPairGeneration(new KeyPair({
                privateKey: ua2hex(await cryptoPrimitives.RSA.exportKey(newKey.privateKey, 'pkcs8')),
                publicKey: ua2hex(await cryptoPrimitives.RSA.exportKey(newKey.publicKey, 'spki')),
            }))
            return newKey
        } else return false
    }

    async recoverAndVerifySelfHierarchyKeys(
        keysData: {
            dataOwner: DataOwnerWithTypeDto
            unknownKeys: string[]
            unavailableKeys: string[]
        }[],
        cryptoPrimitives: CryptoPrimitives,
    ): Promise<{
        [dataOwnerId: string]: {
            recoveredKeys: {
                [keyPairFingerprint: string]: RSAKeyPair<CryptoKey>
            }
            keyAuthenticity: {
                [keyPairFingerprint: string]: boolean
            }
        }
    }> {
        // Users created from msg-gw actually have a parent
        // if (keysData.length !== 1) {
        //     throw new Error('Internal error: data owners of MedTech api should have no hierarchy.')
        // }
        const { dataOwner: dataOwnerWithType, unknownKeys: unverifiedKeys, unavailableKeys: missingKeys } = keysData[keysData.length - 1]

        const { recoveredKeyPairs, verifiedKeys } = await this.dsStrategies.recoverAndVerifyKeys(this.dataOwnerMapper.toDomain(dataOwnerWithType), missingKeys, unverifiedKeys)
        const missingKeysSet = new Set(missingKeys)
        const unverifiedKeysSet = new Set(unverifiedKeys)
        if (recoveredKeyPairs.some(({ publicKey }) => !missingKeysSet.has(publicKey))) {
            throw new Error('Recovered keys should only contain keys which were originally missing')
        }
        if (Object.keys(verifiedKeys).some((publicKey) => !unverifiedKeysSet.has(publicKey))) {
            throw new Error('Verified keys should only contain keys which were originally unverified')
        }
        if (unverifiedKeys.some((unverifiedKey) => !verifiedKeys[unverifiedKey] && !recoveredKeyPairs.find((recoveredKeyPair) => recoveredKeyPair.publicKey === unverifiedKey))) {
            throw new Error('Verified keys should contain an entry for each unverified key which was not recovered')
        }
        if (recoveredKeyPairs.some((recoveredKeyPair) => verifiedKeys[recoveredKeyPair.publicKey] && verifiedKeys[recoveredKeyPair.publicKey] !== KeyVerificationBehaviour.MARK_VERIFIED)) {
            throw new Error('Recovered keys should considered as verified.')
        }
        const recoveredEmpty = Object.fromEntries(
            keysData.map((data) => [
                data.dataOwner.dataOwner.id!,
                {
                    recoveredKeys: {},
                    keyAuthenticity: {},
                },
            ]),
        )
        const sha1Keys = hexPublicKeysWithSha1Of(dataOwnerWithType?.dataOwner)
        const sha256Keys = hexPublicKeysWithSha256Of(dataOwnerWithType?.dataOwner)

        return Promise.resolve({
            ...recoveredEmpty,
            [dataOwnerWithType.dataOwner.id!]: {
                recoveredKeys: Object.fromEntries(
                    await Promise.all(
                        recoveredKeyPairs.map(async (x): Promise<[string, RSAKeyPair<CryptoKey>]> => {
                            if (sha1Keys.has(x.publicKey)) {
                                return [x.publicKey.slice(-32), await cryptoPrimitives.RSA.importKeyPair('pkcs8', hex2ua(x.privateKey), 'spki', hex2ua(x.publicKey), ShaVersion.Sha1)]
                            }

                            if (sha256Keys.has(x.publicKey)) {
                                return [x.publicKey.slice(-32), await cryptoPrimitives.RSA.importKeyPair('pkcs8', hex2ua(x.privateKey), 'spki', hex2ua(x.publicKey), ShaVersion.Sha256)]
                            }

                            throw new Error('Internal error: recovered key should be an existing key')
                        }),
                    ),
                ),
                keyAuthenticity: Object.fromEntries(
                    Object.entries(verifiedKeys)
                        .filter(([, b]) => b !== KeyVerificationBehaviour.TEMPORARILY_UNVERIFIED)
                        .map(([k, b]) => {
                            if (b === KeyVerificationBehaviour.MARK_VERIFIED) {
                                return [k.slice(-32), true]
                            } else if (b === KeyVerificationBehaviour.MARK_UNVERIFIED) {
                                return [k.slice(-32), false]
                            } else throw new Error(`Unexpected key verification behaviour ${b}`)
                        }),
                ),
            },
        })
    }

    async verifyDelegatePublicKeys(delegate: CryptoActorStubWithType, publicKeys: string[], cryptoPrimitives: CryptoPrimitives): Promise<string[]> {
        return await this.dsStrategies.verifyDelegatePublicKeys(delegate.stub.id, publicKeys, cryptoPrimitives)
    }

    dataOwnerRequiresAnonymousDelegation(dataOwner: CryptoActorStubWithType): boolean {
        return this.dsStrategies.dataOwnerRequiresAnonymousDelegation(dataOwner.stub.id, this.cryptoActorStubToDomainTypeMapper(dataOwner))
    }
}
