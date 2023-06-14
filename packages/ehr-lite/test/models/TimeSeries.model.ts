import {TimeSeries} from "../../src/models/TimeSeries.model";
import {
    generateRandomNumberArray,
    generateRandomNumberMatrix,
    generateRandomStringArray
} from "../serializations/utils";

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