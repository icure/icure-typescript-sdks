import { Patient } from '../../src/models/Patient.model'
import { generatePatient } from '../models/Patient.model'

describe(`Patient serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePatient()

        const json = instance.toJSON()
        const newInstance = new Patient(json)

        expect(newInstance).toEqual(instance)
    })
})
