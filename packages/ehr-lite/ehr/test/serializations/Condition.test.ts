import {Condition} from '../../src/models/Condition.model'
import {generateCondition} from "../models/Condition.model";

describe(`Condition serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateCondition()

        const json = Condition.toJSON(instance)
        const newInstance = Condition.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
