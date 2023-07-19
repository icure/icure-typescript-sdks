import { CommonApi, HealthElementFilter } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { Patient as PatientDto } from '@icure/api'
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
