import {SystemMetaDataOwnerEncrypted} from "../../src/models/SystemMetaDataOwnerEncrypted.model";
import {generateSystemMetaDataOwner} from "./SystemMetaDataOwner.model";
import {generateRandomStringArray} from "../serializations/utils";
import {generateSecurityMetadata} from "./SecurityMetadata.model";
import {Delegation} from "@icure/api";
import {generateDelegation} from "./Delegation.model";

export function generateSystemMetaDataOwnerEncrypted(): SystemMetaDataOwnerEncrypted {
    const fakeSystemMetaDataOwner = generateSystemMetaDataOwner()

    return new SystemMetaDataOwnerEncrypted({
        publicKey: fakeSystemMetaDataOwner.publicKey,
        hcPartyKeys: fakeSystemMetaDataOwner.hcPartyKeys,
        privateKeyShamirPartitions: fakeSystemMetaDataOwner.privateKeyShamirPartitions,
        secretForeignKeys: generateRandomStringArray(),
        cryptedForeignKeys: generateFakeDelegationMap(),
        delegations: generateFakeDelegationMap(),
        encryptionKeys: generateFakeDelegationMap(),
        aesExchangeKeys: fakeSystemMetaDataOwner.aesExchangeKeys,
        transferKeys: fakeSystemMetaDataOwner.transferKeys,
        securityMetadata: generateSecurityMetadata(),
        encryptedSelf: Math.random().toString(36).substring(2, 15),
    })
}

function generateFakeDelegationMap(): Map<string, Delegation[]> {
    const map: Map<string, Delegation[]> = new Map()
    for (let i = 0; i < 5; i++) {
        map.set(Math.random().toString(36).substring(2, 15), generateFakeDelegationArray())
    }
    return map
}

function generateFakeDelegationArray(): Delegation[] {
    return Array.from({length: 5}, () => generateDelegation())
}