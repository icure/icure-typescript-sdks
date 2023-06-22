import {generateSecureDelegation} from "../models/SecureDelegation.model";
import {SecureDelegation} from "../../src/models/SecureDelegation.model";
import {SecureDelegation as SecureDelegationDto} from "@icure/api";
import {initializeMapper, mapper} from "../../src";

describe('SecureDelegation', function () {
    beforeAll(() => {
        initializeMapper(mapper)
    })

    it('should correctly map to SecureDelegationEntity and back to SecureDelegation', () => {
        const instance = generateSecureDelegation()
        const iCureInstance = mapper.map(instance, SecureDelegation, SecureDelegationDto)
        const newInstance = mapper.map(iCureInstance, SecureDelegationDto, SecureDelegation)

        expect(newInstance).toEqual(instance)
    })
})