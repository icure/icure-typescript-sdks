import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateDelegation} from "../models/Delegation.model";
import {Delegation} from "../../src/models/Delegation.model";
import {Delegation as DelegationEntity} from "@icure/api";

describe('Delegation', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to DelegationEntity and back to Delegation', () => {
        const instance = generateDelegation()
        const iCureInstance = mapper.map(instance, Delegation, DelegationEntity)
        const newInstance = mapper.map(iCureInstance, DelegationEntity, Delegation)

        expect(newInstance).toEqual(instance)
    })
})