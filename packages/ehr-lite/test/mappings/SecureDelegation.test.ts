import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateSecureDelegation} from "../models/SecureDelegation.model";
import {SecureDelegation} from "../../src/models/SecureDelegation.model";
import {SecureDelegation as SecureDelegationEntity} from "@icure/api";

describe('SecureDelegation', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to SecureDelegationEntity and back to SecureDelegation', () => {
        const instance = generateSecureDelegation()
        const iCureInstance = mapper.map(instance, SecureDelegation, SecureDelegationEntity)
        const newInstance = mapper.map(iCureInstance, SecureDelegationEntity, SecureDelegation)

        expect(newInstance).toEqual(instance)
    })
})