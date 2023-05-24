import { Delegation } from '../../src/models/Delegation.model'

describe('Delegation', () => {
    const delegationData = {
        owner: 'owner_test',
        delegateTo: 'delegateTo_test',
        key: 'key_test'
    };

    const delegationJSON = {
        owner: 'owner_test',
        delegateTo: 'delegateTo_test',
        key: 'key_test'
    };

    test('should convert instance to JSON', () => {
        const delegation = new Delegation(delegationData);

        expect(Delegation.toJSON(delegation)).toEqual(delegationJSON);
    });

    test('should convert JSON to instance', () => {
        const delegation = Delegation.fromJSON(delegationJSON);

        expect(delegation).toEqual(new Delegation(delegationData));
    });

    test('should serialize and deserialize correctly', () => {
        const delegation = new Delegation(delegationData);
        const serialized = Delegation.toJSON(delegation);
        const deserialized = Delegation.fromJSON(serialized);

        expect(deserialized).toEqual(delegation);
    });
});
