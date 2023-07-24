import { SystemMetaDataEncrypted } from '../../src/models/SystemMetaDataEncrypted.model'
import { generateSystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'

describe(`SystemMetaDataEncrypted serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSystemMetaDataEncrypted()

        const json = SystemMetaDataEncrypted.toJSON(instance)
        const newInstance = SystemMetaDataEncrypted.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
