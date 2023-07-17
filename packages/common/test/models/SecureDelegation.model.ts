import { AccessLevelEnum, SecureDelegation } from '../../src'

export function generateSecureDelegation(): SecureDelegation {
    const secureDelegation = {
        delegator: 'sampleDelegator',
        delegate: 'sampleDelegate',
        secretIds: new Set(['secretId1', 'secretId2']),
        encryptionKeys: new Set(['encryptionKey1', 'encryptionKey2']),
        owningEntityIds: new Set(['owningEntityId1', 'owningEntityId2']),
        parentDelegations: new Set(['parentDelegation1', 'parentDelegation2']),
        exchangeDataId: 'sampleExchangeDataId',
        permissions: AccessLevelEnum.WRITE,
    } satisfies SecureDelegation

    return new SecureDelegation(secureDelegation)
}
