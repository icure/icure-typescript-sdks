import { CommonApi, HealthElementFilter } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { Patient as PatientDto } from '@icure/api'
import { mapPatientToPatientDto, mapPatientDtoToPatient } from '../mappers/Patient.mapper'

export class ConditionFilter extends HealthElementFilter<Patient> {
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
