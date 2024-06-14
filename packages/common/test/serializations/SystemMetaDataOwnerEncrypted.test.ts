import { SystemMetaDataOwnerEncrypted } from '../../src/models/SystemMetaDataOwnerEncrypted.model'
import { generateSystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted.model'

describe(`SystemMetaDataOwnerEncrypted serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSystemMetaDataOwnerEncrypted()

        const json = instance.toJSON()
        const newInstance = new SystemMetaDataOwnerEncrypted(json)

        expect(newInstance).toEqual(instance)
    })
})
