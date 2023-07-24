import { Measure } from '../../src/models/Measure.model'
import { generateCodingReference } from './CodingReference.model'

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
