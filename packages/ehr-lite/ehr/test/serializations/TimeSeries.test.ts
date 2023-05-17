import { TimeSeries } from '../../src/models/TimeSeries.model'

describe('TimeSeries', () => {
    let instance: TimeSeries
    let json: any

    beforeEach(() => {
        instance = new TimeSeries({
            fields: ["field1", "field2"],
            samples: [[1,2], [3,4]],
            min: [1, 2],
            max: [3, 4],
            mean: [2.5, 3.5],
            median: [2, 3],
            variance: [0.5, 0.5]
        })

        json = {
            fields: ["field1", "field2"],
            samples: [[1,2], [3,4]],
            min: [1, 2],
            max: [3, 4],
            mean: [2.5, 3.5],
            median: [2, 3],
            variance: [0.5, 0.5]
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = TimeSeries.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = TimeSeries.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = TimeSeries.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = TimeSeries.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
