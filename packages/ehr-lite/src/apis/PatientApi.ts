import { CommonApi, PatientDto, PatientLikeApi, PatientLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export interface PatientApi extends PatientLikeApi<Patient> {}

class PatientApiImpl extends PatientLikeApiImpl<Patient> {}

export const patientApi = (api: CommonApi, basePath: string): PatientApi =>
    new PatientApiImpl(
        {
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
        },
        api.errorHandler,
        api.baseApi.patientApi,
        api.baseApi.userApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.authApi,
        basePath,
    )
