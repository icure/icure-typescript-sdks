import { Observation } from '../../src/models/Observation.model'
import { generateObservation } from '../models/Observation.model'

describe(`Observation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateObservation()

        const json = Observation.toJSON(instance)
        const newInstance = Observation.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
