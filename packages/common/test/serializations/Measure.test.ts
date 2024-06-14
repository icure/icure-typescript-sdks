import { Measure } from '../../src/models/Measure.model'
import { generateMeasure } from '../models/Measure.model'

describe(`Measure serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateMeasure()

        const json = instance.toJSON()
        const newInstance = new Measure(json)

        expect(newInstance).toEqual(instance)
    })
})
