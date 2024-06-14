import { Delegation } from '../../src/models/Delegation.model'
import { generateDelegation } from '../models/Delegation.model'

describe(`Delegation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateDelegation()

        const json = instance.toJSON()
        const newInstance = new Delegation(json)

        expect(newInstance).toEqual(instance)
    })
})
