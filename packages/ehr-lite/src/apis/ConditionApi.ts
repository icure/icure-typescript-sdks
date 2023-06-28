import { HealthElement, IccCryptoXApi, IccHelementXApi, IccPatientXApi, IccUserXApi, Patient as PatientDto } from '@icure/api'
import { Condition } from '../models/Condition.model'
import { ErrorHandler, HealthElementLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { mapConditionToHealthElement, mapHealthElementToCondition } from '../mappers/Condition.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export const conditionApi = (errorHandler: ErrorHandler, healthElementApi: IccHelementXApi, userApi: IccUserXApi, patientApi: IccPatientXApi, dataOwnerApi: IccDataOwnerXApi, cryptoApi: IccCryptoXApi) =>
    new HealthElementLikeApiImpl<Condition, Patient>(
        {
            toDomain(dto: HealthElement): Condition {
                return mapHealthElementToCondition(dto)
            },
            toDto(domain: Condition): HealthElement {
                return mapConditionToHealthElement(domain)
            },
        },
        {
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
        },
        errorHandler,
        healthElementApi,
        userApi,
        patientApi,
        dataOwnerApi,
        cryptoApi
    )
