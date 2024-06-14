import { SystemMetaDataOwner } from '../../src/models/SystemMetaDataOwner.model'
import { generateSystemMetaDataOwner } from '../models/SystemMetaDataOwner.model'

describe(`SystemMetaDataOwner serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateSystemMetaDataOwner()

        const json = instance.toJSON()
        const newInstance = new SystemMetaDataOwner(json)

        expect(newInstance).toEqual(instance)
    })
})
