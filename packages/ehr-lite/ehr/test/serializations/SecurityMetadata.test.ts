import { SecurityMetadata } from '../../src/models/SecurityMetadata.model'
import { SecureDelegation } from '../../src/models/SecureDelegation.model'

describe('SecurityMetadata', () => {
    const secureDelegationData = {
        delegator: 'delegator_test',
        delegate: 'delegate_test',
        secretIds: ['secret1', 'secret2'],
        encryptionKeys: ['key1', 'key2'],
        owningEntityIds: ['owning1', 'owning2'],
        parentDelegations: ['parent1', 'parent2'],
        exchangeDataId: 'exchangeDataId_test',
        encryptedExchangeDataId: new Map([['key1', 'value1'], ['key2', 'value2']]),
        permissions: 'READ'
    };

    const securityMetadataData = {
        secureDelegations: new Map([['hash1', new SecureDelegation(secureDelegationData)]]),
        keysEquivalences: new Map([['hash2', 'value2']])
    };

    const securityMetadataJSON = {
        secureDelegations: { 'hash1': SecureDelegation.toJSON(new SecureDelegation(secureDelegationData)) },
        keysEquivalences: { 'hash2': 'value2' }
    };

    test('should convert instance to JSON', () => {
        const securityMetadata = new SecurityMetadata(securityMetadataData);

        expect(SecurityMetadata.toJSON(securityMetadata)).toEqual(securityMetadataJSON);
    });

    test('should convert JSON to instance', () => {
        const securityMetadata = SecurityMetadata.fromJSON(securityMetadataJSON);

        expect(securityMetadata).toEqual(new SecurityMetadata(securityMetadataData));
    });

    test('should serialize and deserialize correctly', () => {
        const securityMetadata = new SecurityMetadata(securityMetadataData);
        const serialized = SecurityMetadata.toJSON(securityMetadata);
        const deserialized = SecurityMetadata.fromJSON(serialized);

        expect(deserialized).toEqual(securityMetadata);
    });
});


