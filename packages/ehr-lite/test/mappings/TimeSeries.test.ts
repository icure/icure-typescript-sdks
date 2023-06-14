import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateTimeSeries} from "../models/TimeSeries.model";
import {TimeSeries} from "../../src/models/TimeSeries.model";
import {TimeSeries as TimeSeriesEntity} from "@icure/api";

describe('TimeSeries', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to TimeSeriesEntity and back to TimeSeries', () => {
        const instance = generateTimeSeries()
        const iCureInstance = mapper.map(instance, TimeSeries, TimeSeriesEntity)
        const newInstance = mapper.map(iCureInstance, TimeSeriesEntity, TimeSeries)

        expect(newInstance).toEqual(instance)
    })
})