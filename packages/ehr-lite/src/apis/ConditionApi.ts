import { Condition } from '../models/Condition.model'
import { CommonApi, HealthElementLikeApi, HealthElementLikeApiImpl, HealthElementDto, PatientDto } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapConditionToHealthElementDto, mapHealthElementDtoToCondition } from '../mappers/Condition.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export interface ConditionApi extends HealthElementLikeApi<Condition, Patient> {}
class ConditionApiImpl extends HealthElementLikeApiImpl<Condition, Patient> {}

export const conditionApi = (api: CommonApi, basePath: string): ConditionApi =>
    new ConditionApiImpl(
        {
            toDomain(dto: HealthElementDto): Condition {
                return mapHealthElementDtoToCondition(dto)
            },
            toDto(domain: Condition): HealthElementDto {
                return mapConditionToHealthElementDto(domain)
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
        api.errorHandler,
        api.baseApi.healthcareElementApi,
        api.baseApi.userApi,
        api.baseApi.patientApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.cryptoApi,
        api.baseApi.authApi,
        basePath,
        api,
    )
