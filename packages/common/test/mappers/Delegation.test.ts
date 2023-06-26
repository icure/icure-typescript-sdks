import {generateDelegation} from "../models/Delegation.model";
import {Delegation, mapDelegationToDelegationDto} from "../../src";

describe('Delegation', function () {
    it('should correctly map to DelegationEntity and back to Delegation', () => {
        const instance = generateDelegation()
        const iCureInstance = mapDelegationToDelegationDto(instance)
        const newInstance = mapDelegationToDelegationDto(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})