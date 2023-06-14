import {Component} from "../../src/models/Component.model";
import {generateMeasure} from "./Measure.model";
import {generateTimeSeries} from "./TimeSeries.model";

export function generateComponent(): Component {
    const component = {
        numberValue: 10,
        booleanValue: true,
        instantValue: 1621845600,
        fuzzyDateValue: 1621845600,
        measureValue: generateMeasure(),
        timeSeries: generateTimeSeries(),
        compoundValue: [],
        ratio: [generateMeasure(), generateMeasure()],
        range: [generateMeasure(), generateMeasure()],
    }

    return new Component(component)
}