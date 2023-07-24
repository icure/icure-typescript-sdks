import { SystemMetaDataOwnerEncrypted } from '../../src/models/SystemMetaDataOwnerEncrypted.model'
import { generateSystemMetaDataOwnerEncrypted } from '../models/SystemMetaDataOwnerEncrypted.model'

describe(`SystemMetaDataOwnerEncrypted serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSystemMetaDataOwnerEncrypted()

        const json = SystemMetaDataOwnerEncrypted.toJSON(instance)
        const newInstance = SystemMetaDataOwnerEncrypted.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
