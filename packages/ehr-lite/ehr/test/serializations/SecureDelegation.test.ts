import { SecureDelegation } from '../../src/models/SecureDelegation.model'
import { AccessLevelEnum } from '../../src/models/enums/AccessLevel.enum'

describe('SecureDelegation', () => {
    const secureDelegationData = {
        delegator: 'delegator_test',
        delegate: 'delegate_test',
        secretIds: ['secret1', 'secret2'],
        encryptionKeys: ['key1', 'key2'],
        owningEntityIds: ['owning1', 'owning2'],
        parentDelegations: ['parent1', 'parent2'],
        exchangeDataId: 'exchangeDataId_test',
        encryptedExchangeDataId: new Map([['key1', 'value1'], ['key2', 'value2']]),
        permissions: AccessLevelEnum.READ
    };

    const secureDelegationJSON = {
        delegator: 'delegator_test',
        delegate: 'delegate_test',
        secretIds: ['secret1', 'secret2'],
        encryptionKeys: ['key1', 'key2'],
        owningEntityIds: ['owning1', 'owning2'],
        parentDelegations: ['parent1', 'parent2'],
        exchangeDataId: 'exchangeDataId_test',
        encryptedExchangeDataId: { 'key1': 'value1', 'key2': 'value2' },
        permissions: AccessLevelEnum.READ
    };

    test('should convert instance to JSON', () => {
        const secureDelegation = new SecureDelegation(secureDelegationData);

        expect(SecureDelegation.toJSON(secureDelegation)).toEqual(secureDelegationJSON);
    });

    test('should convert JSON to instance', () => {
        const secureDelegation = SecureDelegation.fromJSON(secureDelegationJSON);

        expect(secureDelegation).toEqual(new SecureDelegation(secureDelegationData));
    });

    test('should serialize and deserialize correctly', () => {
        const secureDelegation = new SecureDelegation(secureDelegationData);
        const serialized = SecureDelegation.toJSON(secureDelegation);
        const deserialized = SecureDelegation.fromJSON(serialized);

        expect(deserialized).toEqual(secureDelegation);
    });
});
