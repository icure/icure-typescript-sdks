import {Delegation} from '../../src/models/Delegation.model'

export function generateDelegation(): Delegation {
    const delegation = {
        owner: 'sampleOwner',
        delegateTo: 'sampleDelegateTo',
        key: 'sampleKey',
    }

    return new Delegation(delegation)
}

describe(`Delegation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateDelegation()

        const json = Delegation.toJSON(instance)
        const newInstance = Delegation.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
