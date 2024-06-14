import { SecurityMetadata } from '../../src/models/SecurityMetadata.model'
import { generateSecurityMetadata } from '../models/SecurityMetadata.model'

describe(`SecurityMetadata serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSecurityMetadata()

        const json = instance.toJSON()
        const newInstance = new SecurityMetadata(json)

        expect(newInstance).toEqual(instance)
    })
})
