import {HumanName} from '../../src/models/HumanName.model'
import {generateHumanName} from "../models/HumanName.model";

describe(`HumanName serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateHumanName()

        const json = HumanName.toJSON(instance)
        const newInstance = HumanName.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
