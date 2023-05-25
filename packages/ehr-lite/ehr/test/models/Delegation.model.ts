import {Delegation} from "../../src/models/Delegation.model";

export function generateDelegation(): Delegation {
    const delegation = {
        owner: 'sampleOwner',
        delegateTo: 'sampleDelegateTo',
        key: 'sampleKey',
    }

    return new Delegation(delegation)
}