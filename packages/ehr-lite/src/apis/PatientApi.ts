import {CommonApi, PatientLikeApi, PatientLikeApiImpl} from '@icure/typescript-common'
import {Patient} from '../models/Patient.model'
import {Patient as PatientDto} from '@icure/api'
import {mapPatientDtoToPatient, mapPatientToPatientDto} from '../mappers/Patient.mapper'

export interface PatientApi extends PatientLikeApi<Patient> {}
class PatientApiImpl extends PatientLikeApiImpl<Patient> {}

export const patientApi = (api: CommonApi): PatientApi =>
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
        api.baseApi.dataOwnerApi
    )
