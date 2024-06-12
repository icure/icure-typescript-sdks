import { CodingReference, SystemMetaDataOwner } from '../../src'
import { generateRandomStringArray, generateRandomStringMap } from './utils'

export function generateSystemMetaDataOwner(domainTagType?: CodingReference): SystemMetaDataOwner {
    const publicKey: string = Math.random().toString(36).substring(2, 15)

    const hcPartyKeys: Record<string, string[]> = {}
    for (let i = 0; i < 5; i++) {
        hcPartyKeys[Math.random().toString(36).substring(2, 15)] = generateRandomStringArray()
    }

    const privateKeyShamirPartitions: Record<string, string> = {}
    for (let i = 0; i < 5; i++) {
        privateKeyShamirPartitions[Math.random().toString(36).substring(2, 15)] = Math.random().toString(36).substring(2, 15)
    }

    const aesExchangeKeys: Record<string, Record<string, Record<string, string>>> = {}
    for (let i = 0; i < 5; i++) {
        const innerMap: Record<string, Record<string, string>> = {}
        for (let j = 0; j < 5; j++) {
            innerMap[Math.random().toString(36).substring(2, 15)] = generateRandomStringMap()
        }
        aesExchangeKeys[Math.random().toString(36).substring(2, 15)] = innerMap
    }

    const transferKeys: Record<string, Record<string, string>> = {}
    for (let i = 0; i < 5; i++) {
        transferKeys[Math.random().toString(36).substring(2, 15)] = generateRandomStringMap()
    }

    return new SystemMetaDataOwner({
        publicKey,
        hcPartyKeys,
        privateKeyShamirPartitions,
        aesExchangeKeys,
        transferKeys,
        tags: (domainTagType ? [domainTagType] : []),
    })
}
