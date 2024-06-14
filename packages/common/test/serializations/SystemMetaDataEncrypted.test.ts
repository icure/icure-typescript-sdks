import { SystemMetaDataEncrypted } from '../../src/models/SystemMetaDataEncrypted.model'
import { generateSystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'

describe(`SystemMetaDataEncrypted serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSystemMetaDataEncrypted()

        const json = instance.toJSON()
        const newInstance = new SystemMetaDataEncrypted(json)

        expect(newInstance).toEqual(instance)
    })
})
