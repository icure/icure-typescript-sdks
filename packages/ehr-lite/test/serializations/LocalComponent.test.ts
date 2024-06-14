import { LocalComponent } from '../../src/models/LocalComponent.model'
import { generateLocalComponent } from '../models/LocalComponent.model'

describe(`LocalComponent serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateLocalComponent()

        const json = instance.toJSON()
        const newInstance = new LocalComponent(json)

        expect(newInstance).toEqual(instance)
    })
})
