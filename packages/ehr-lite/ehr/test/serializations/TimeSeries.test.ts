import {TimeSeries} from '../../src/models/TimeSeries.model'

import {generateRandomNumberArray, generateRandomNumberMatrix, generateRandomStringArray} from './utils'

export function generateTimeSeries(): TimeSeries {
    return new TimeSeries({
        fields: generateRandomStringArray(),
        samples: generateRandomNumberMatrix(),
        min: generateRandomNumberArray(),
        max: generateRandomNumberArray(),
        mean: generateRandomNumberArray(),
        median: generateRandomNumberArray(),
        variance: generateRandomNumberArray(),
    })
}

describe(`TimeSeries serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateTimeSeries()

        const json = TimeSeries.toJSON(instance)
        const newInstance = TimeSeries.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
