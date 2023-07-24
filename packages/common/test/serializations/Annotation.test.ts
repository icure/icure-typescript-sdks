import { Annotation } from '../../src/models/Annotation.model'
import { generateAnnotation } from '../models/Annotation.model'

describe(`Annotation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateAnnotation()

        const json = Annotation.toJSON(instance)
        const newInstance = Annotation.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
