import {Measure} from '../../src/models/Measure.model'
import {generateCodingReference} from './CodingReference.test'

export function generateMeasure(): Measure {
    const measure = {
        value: 10,
        min: 0,
        max: 20,
        ref: 15,
        severity: 5,
        severityCode: 'sampleCode',
        evolution: 2,
        unit: 'sampleUnit',
        unitCodes: [generateCodingReference()],
        comment: 'Sample comment',
        comparator: '>',
    }

    return new Measure(measure)
}

describe(`Measure serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateMeasure()

        const json = Measure.toJSON(instance)
        const newInstance = Measure.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
