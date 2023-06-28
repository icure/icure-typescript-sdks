import { ErrorHandler, PatientLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { IccPatientXApi, IccUserXApi, Patient as PatientDto } from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export const patientApi = (errorHandler: ErrorHandler, patientApi: IccPatientXApi, userApi: IccUserXApi, dataOwnerApi: IccDataOwnerXApi) =>
    new PatientLikeApiImpl<Patient>(
        {
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
        },
        errorHandler,
        patientApi,
        userApi,
        dataOwnerApi
    )
