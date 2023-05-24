import {Component} from "../../src/models/Component.model";
import {Measure} from "../../src/models/Measure.model";
import {TimeSeries} from "../../src/models/TimeSeries.model";
import {Observation} from "../../src/models/Observation.model";

describe('Component', () => {
    const measureData: Measure = {
        value: 10,
        min: 5,
        max: 15,
        unit: 'cm',
        comment: 'Measurement of length'
    };

    const timeSeriesData: TimeSeries = {
        fields: ['time', 'value'],
        samples: [
            [1, 10],
            [2, 12],
            [3, 15]
        ],
        min: [1, 10],
        max: [3, 15],
        mean: [2, 12.3],
        median: [2, 12],
        variance: [1, 4.67]
    };

    const observationData: Observation = {
        id: 'obs_123',
        component: {
            numberValue: 10,
            booleanValue: true,
            instantValue: 1641532200,
            fuzzyDateValue: 202201,
            measureValue: measureData,
            timeSeries: timeSeriesData,
            compoundValue: [
                { stringValue: 'Compound value 1' },
                { stringValue: 'Compound value 2' }
            ],
            ratio: [
                { value: 0.5, unit: 'mg' },
                { value: 1.5, unit: 'mg' }
            ],
            range: [
                { min: 5, max: 15, unit: 'cm' },
                { min: 2, max: 8, unit: 'cm' }
            ]
        }
    };

    const observationJSON = {
        id: 'obs_123',
        component: {
            numberValue: 10,
            booleanValue: true,
            instantValue: 1641532200,
            fuzzyDateValue: 202201,
            measureValue: measureData,
            timeSeries: timeSeriesData,
            compoundValue: [
                { stringValue: 'Compound value 1' },
                { stringValue: 'Compound value 2' }
            ],
            ratio: [
                { value: 0.5, unit: 'mg' },
                { value: 1.5, unit: 'mg' }
            ],
            range: [
                { min: 5, max: 15, unit: 'cm' },
                { min: 2, max: 8, unit: 'cm' }
            ]
        }
    };

    test('should convert instance to JSON', () => {
        const component = new Component(observationData.component);

        expect(Component.toJSON(component)).toEqual(observationJSON.component);
    });

    test('should convert JSON to instance', () => {
        const component = Component.fromJSON(observationJSON.component);

        expect(component).toEqual(new Component(observationData.component));
    });

    test('should serialize and deserialize correctly', () => {
        const component = new Component(observationData.component);
        const serialized = Component.toJSON(component);
        const deserialized = Component.fromJSON(serialized);

        expect(deserialized).toEqual(component);
    });
});

