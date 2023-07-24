import { generateTimeSeries } from '../models/TimeSeries.model'
import { mapTimeSeriesDtoToTimeSeries, mapTimeSeriesToTimeSeriesDto, TimeSeries } from '../../src'

describe('TimeSeries', function () {
    it('should correctly map to TimeSeriesEntity and back to TimeSeries', () => {
        const instance = generateTimeSeries()
        const iCureInstance = mapTimeSeriesToTimeSeriesDto(instance)
        const newInstance = mapTimeSeriesDtoToTimeSeries(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
