import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateMeasure} from "../models/Measure.model";
import {Measure} from "../../src/models/Measure.model";
import {Measure as MeasureEntity} from "@icure/api";

describe('Measure', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to MeasureEntity and back to Measure', () => {
        const instance = generateMeasure()
        const iCureInstance = mapper.map(instance, Measure, MeasureEntity)
        const newInstance = mapper.map(iCureInstance, MeasureEntity, Measure)

        expect(newInstance).toEqual(instance)
    })
})