import {generateSecureDelegation} from "../models/SecureDelegation.model";
import {
    mapSecureDelegationDtoToSecureDelegation,
    mapSecureDelegationToSecureDelegationDto,
    SecureDelegation
} from "../../src";

describe('SecureDelegation', function () {
    it('should correctly map to SecureDelegationEntity and back to SecureDelegation', () => {
        const instance = generateSecureDelegation()
        const iCureInstance = mapSecureDelegationToSecureDelegationDto(instance)
        const newInstance = mapSecureDelegationDtoToSecureDelegation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})