import 'mocha'

import { Delegation } from '../..'
import { assert } from 'chai'

export function newDelegation(): Delegation {
    return new Delegation({
        owner: 'owner',
        delegatedTo: 'delegatedTo',
        key: 'key',
    })
}

describe('Delegation model test', () => {
    it('Marshalling/Unmarshalling of Delegation model - Success', () => {
        const delegation = newDelegation()
        const marshalledDelegation = Delegation.toJSON(delegation)
        const unmarshalledDelegation = new Delegation(JSON.parse(JSON.stringify(marshalledDelegation)))
        assert.deepEqual(delegation, unmarshalledDelegation)
        assert.deepEqual(delegation, new Delegation(delegation))
    })
})
