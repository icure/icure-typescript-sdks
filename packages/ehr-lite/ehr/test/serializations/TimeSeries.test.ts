import {TimeSeries} from '../../src/models/TimeSeries.model'
import {generateTimeSeries} from "../models/TimeSeries.model";

describe(`TimeSeries serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateTimeSeries()

        const json = TimeSeries.toJSON(instance)
        const newInstance = TimeSeries.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
