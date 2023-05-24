import { TimeSeries } from '../../src/models/TimeSeries.model'

describe('TimeSeries', () => {
    const timeSeriesData = {
        fields: ['field1', 'field2'],
        samples: [[1, 2], [3, 4]],
        min: [1, 3],
        max: [2, 4],
        mean: [1.5, 3.5],
        median: [1.5, 3.5],
        variance: [0.25, 0.25]
    };

    const timeSeriesJSON = {
        fields: ['field1', 'field2'],
        samples: [[1, 2], [3, 4]],
        min: [1, 3],
        max: [2, 4],
        mean: [1.5, 3.5],
        median: [1.5, 3.5],
        variance: [0.25, 0.25]
    };

    test('should convert instance to JSON', () => {
        const timeSeries = new TimeSeries(timeSeriesData);

        expect(TimeSeries.toJSON(timeSeries)).toEqual(timeSeriesJSON);
    });

    test('should convert JSON to instance', () => {
        const timeSeries = TimeSeries.fromJSON(timeSeriesJSON);

        expect(timeSeries).toEqual(new TimeSeries(timeSeriesData));
    });

    test('should serialize and deserialize correctly', () => {
        const timeSeries = new TimeSeries(timeSeriesData);
        const serialized = TimeSeries.toJSON(timeSeries);
        const deserialized = TimeSeries.fromJSON(serialized);

        expect(deserialized).toEqual(timeSeries);
    });
});
