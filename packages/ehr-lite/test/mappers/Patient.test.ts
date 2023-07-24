import { generatePatient } from '../models/Patient.model'
import { Patient } from '../../src'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../../src/mappers/Patient.mapper'

describe('Patient', function () {
    it('should correctly map to PatientEntity and back to Patient', () => {
        const instance = generatePatient()
        const iCureInstance = mapPatientToPatientDto(instance)
        const newInstance = mapPatientDtoToPatient(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
