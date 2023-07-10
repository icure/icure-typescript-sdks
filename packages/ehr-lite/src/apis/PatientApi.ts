import { CommonApi, PaginatedList, PatientLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { PaginatedListPatient, Patient as PatientDto } from '@icure/api'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class PatientApi extends PatientLikeApiImpl<Patient> {}

export const patientApi = (api: CommonApi) =>
    new PatientApi(
        {
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
        },
        {
            toDomain(dto: PaginatedListPatient): PaginatedList<Patient> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapPatientDtoToPatient),
                }
            },
            toDto(domain: PaginatedList<Patient>): PaginatedListPatient {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapPatientToPatientDto),
                }
            },
        },
        api.errorHandler,
        api.baseApi.patientApi,
        api.baseApi.userApi,
        api.baseApi.dataOwnerApi
    )
