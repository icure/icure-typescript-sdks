import {SecureDelegation} from "../../src/models/SecureDelegation.model";
import {AccessLevelEnum} from "../../src/models/enums/AccessLevel.enum";

export function generateSecureDelegation(): SecureDelegation {
    const secureDelegation = {
        delegator: 'sampleDelegator',
        delegate: 'sampleDelegate',
        secretIds: ['secretId1', 'secretId2'],
        encryptionKeys: ['encryptionKey1', 'encryptionKey2'],
        owningEntityIds: ['owningEntityId1', 'owningEntityId2'],
        parentDelegations: ['parentDelegation1', 'parentDelegation2'],
        exchangeDataId: 'sampleExchangeDataId',
        encryptedExchangeDataId: new Map([
            ['publicKeyFingerprint1', 'encryptedExchangeDataId1'],
            ['publicKeyFingerprint2', 'encryptedExchangeDataId2'],
        ]),
        permissions: AccessLevelEnum.WRITE,
    }

    return new SecureDelegation(secureDelegation)
}