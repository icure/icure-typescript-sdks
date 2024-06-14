import { HumanName } from '../../src/models/HumanName.model'
import { generateHumanName } from '../models/HumanName.model'

describe(`HumanName serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateHumanName()

        const json = instance.toJSON()
        const newInstance = new HumanName(json)

        expect(newInstance).toEqual(instance)
    })
})
