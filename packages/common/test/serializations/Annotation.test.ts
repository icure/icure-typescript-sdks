import { Annotation } from '../../src/models/Annotation.model'
import { generateAnnotation } from '../models/Annotation.model'

describe(`Annotation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateAnnotation()

        const json = instance.toJSON()
        const newInstance = new Annotation(json)

        expect(newInstance).toEqual(instance)
    })
})
