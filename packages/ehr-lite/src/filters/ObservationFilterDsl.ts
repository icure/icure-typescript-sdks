import { CommonApi, ServiceFilter } from '@icure/typescript-common'
import { Patient as PatientDto } from '@icure/api'
import { mapPatientToPatientDto, mapPatientDtoToPatient } from '../mappers/Patient.mapper'
import { Patient } from '../models/Patient.model'

export class ObservationFilter extends ServiceFilter<Patient> {
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
