import {CommonApi, ErrorHandler, PaginatedList, PatientLikeApiImpl} from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import {IccPatientXApi, IccUserXApi, PaginatedListPatient, Patient as PatientDto} from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export const patientApi = (errorHandler: ErrorHandler, patientApi: IccPatientXApi, userApi: IccUserXApi, dataOwnerApi: IccDataOwnerXApi, api: CommonApi) =>
    new PatientLikeApiImpl<Patient>(
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
                    rows: dto.rows?.map(mapPatientDtoToPatient)
                }
            },
            toDto(domain: PaginatedList<Patient>): PaginatedListPatient {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapPatientToPatientDto)
                }
            }
        },
        errorHandler,
        patientApi,
        userApi,
        dataOwnerApi
    )
