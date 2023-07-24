import 'mocha'

import { TimeSeries } from '../..'
import { assert } from 'chai'

export function newTimeSeries(): TimeSeries {
    return new TimeSeries({
        fields: ['fields'],
        samples: [[123], [456]],
        min: [123, 456],
        max: [123, 456],
        mean: [123, 456],
        median: [123, 456],
        variance: [0, 0],
    })
}

describe('TimeSeries model test', () => {
    it('Marshalling/Unmarshalling of TimeSeries model - Success', () => {
        const timeSeries = newTimeSeries()
        const marshalledTimeSeries = TimeSeries.toJSON(timeSeries)
        const unmarshalledTimeSeries = new TimeSeries(JSON.parse(JSON.stringify(marshalledTimeSeries)))
        assert.deepEqual(timeSeries, unmarshalledTimeSeries)
        assert.deepEqual(timeSeries, new TimeSeries(timeSeries))
    })
})
