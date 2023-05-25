import {Component} from '../../src/models/Component.model'
import {generateMeasure} from './Measure.test'
import {generateTimeSeries} from './TimeSeries.test'

export function generateComponent(): Component {
    const component = {
        numberValue: 10,
        booleanValue: true,
        instantValue: 1621845600, // Exemple de timestamp UNIX
        fuzzyDateValue: 1621845600, // Exemple de timestamp UNIX
        measureValue: generateMeasure(),
        timeSeries: generateTimeSeries(),
        compoundValue: [], // Exemple avec deux observations
        ratio: [generateMeasure(), generateMeasure()], // Exemple avec deux mesures
        range: [generateMeasure(), generateMeasure()], // Exemple avec deux mesures
    }

    return new Component(component)
}

describe(`Component serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateComponent()

        const json = Component.toJSON(instance)
        const newInstance = Component.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
