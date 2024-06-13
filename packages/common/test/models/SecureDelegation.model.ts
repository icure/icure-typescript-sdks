import { AccessLevelEnum, SecureDelegation } from '../../src'

export function generateSecureDelegation(): SecureDelegation {
    const secureDelegation = {
        delegator: 'sampleDelegator',
        delegate: 'sampleDelegate',
        secretIds: ['secretId1', 'secretId2'],
        encryptionKeys: ['encryptionKey1', 'encryptionKey2'],
        owningEntityIds: ['owningEntityId1', 'owningEntityId2'],
        parentDelegations: ['parentDelegation1', 'parentDelegation2'],
        exchangeDataId: 'sampleExchangeDataId',
        permissions: AccessLevelEnum.WRITE,
    } satisfies SecureDelegation

    return new SecureDelegation(secureDelegation)
}
