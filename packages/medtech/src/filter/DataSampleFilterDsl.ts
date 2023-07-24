import { CommonApi, ServiceFilter } from '@icure/typescript-common'
import { Patient as PatientDto } from '@icure/api'
import { Patient } from '../models/Patient.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class DataSampleFilter extends ServiceFilter<Patient> {
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
