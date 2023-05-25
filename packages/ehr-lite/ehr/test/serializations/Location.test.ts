import {Location} from '../../src/models/Location.model'
import {generateLocation} from "../models/Location.model";

describe(`Location serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateLocation()

        const json = Location.toJSON(instance)
        const newInstance = Location.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
