import {generateMeasure} from "../models/Measure.model";
import {mapMeasureDtoToMeasure, mapMeasureToMeasureDto, Measure} from "../../src";

describe('Measure', function () {
    it('should correctly map to MeasureEntity and back to Measure', () => {
        const instance = generateMeasure()
        const iCureInstance = mapMeasureToMeasureDto(instance)
        const newInstance = mapMeasureDtoToMeasure(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})