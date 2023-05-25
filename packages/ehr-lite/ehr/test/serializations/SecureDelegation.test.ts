import {SecureDelegation} from '../../src/models/SecureDelegation.model'
import {generateSecureDelegation} from "../models/SecureDelegation.model";

describe(`SecureDelegation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSecureDelegation()

        const json = SecureDelegation.toJSON(instance)
        const newInstance = SecureDelegation.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
