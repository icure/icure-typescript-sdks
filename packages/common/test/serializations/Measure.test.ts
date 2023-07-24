import { Measure } from '../../src/models/Measure.model'
import { generateMeasure } from '../models/Measure.model'

describe(`Measure serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateMeasure()

        const json = Measure.toJSON(instance)
        const newInstance = Measure.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
