import { CommonApi, HealthElementFilter, PatientDto } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class HealthcareElementFilter extends HealthElementFilter<Patient> {
    constructor(api: CommonApi) {
        super(api, {
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
        })
    }
}
