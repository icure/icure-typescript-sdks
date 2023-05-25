import {SystemMetaDataOwner} from "../../src/models/SystemMetaDataOwner.model";
import {generateRandomStringArray, generateRandomStringMap} from "../serializations/utils";

export function generateSystemMetaDataOwner(): SystemMetaDataOwner {
    const publicKey: string = Math.random().toString(36).substring(2, 15)

    const hcPartyKeys: Map<string, string[]> = new Map()
    for (let i = 0; i < 5; i++) {
        hcPartyKeys.set(Math.random().toString(36).substring(2, 15), generateRandomStringArray())
    }

    const privateKeyShamirPartitions: Map<string, string> = new Map()
    for (let i = 0; i < 5; i++) {
        privateKeyShamirPartitions.set(Math.random().toString(36).substring(2, 15), Math.random().toString(36).substring(2, 15))
    }

    const aesExchangeKeys: Map<string, Map<string, Map<string, string>>> = new Map()
    for (let i = 0; i < 5; i++) {
        const innerMap: Map<string, Map<string, string>> = new Map()
        for (let j = 0; j < 5; j++) {
            innerMap.set(Math.random().toString(36).substring(2, 15), generateRandomStringMap())
        }
        aesExchangeKeys.set(Math.random().toString(36).substring(2, 15), innerMap)
    }

    const transferKeys: Map<string, Map<string, string>> = new Map()
    for (let i = 0; i < 5; i++) {
        transferKeys.set(Math.random().toString(36).substring(2, 15), generateRandomStringMap())
    }

    return new SystemMetaDataOwner({
        publicKey,
        hcPartyKeys,
        privateKeyShamirPartitions,
        aesExchangeKeys,
        transferKeys,
    })
}