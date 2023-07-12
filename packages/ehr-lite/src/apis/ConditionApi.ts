import {HealthElement, Patient as PatientDto} from '@icure/api'
import {Condition} from '../models/Condition.model'
import {CommonApi, HealthElementLikeApi, HealthElementLikeApiImpl} from '@icure/typescript-common'
import {Patient} from '../models/Patient.model'
import {mapConditionToHealthElement, mapHealthElementToCondition} from '../mappers/Condition.mapper'
import {mapPatientDtoToPatient, mapPatientToPatientDto} from '../mappers/Patient.mapper'

export interface ConditionApi extends HealthElementLikeApi<Condition, Patient> {}
class ConditionApiImpl extends HealthElementLikeApiImpl<Condition, Patient> {}

export const conditionApi = (api: CommonApi): ConditionApi =>
    new ConditionApiImpl(
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
        api.errorHandler,
        api.baseApi.healthcareElementApi,
        api.baseApi.userApi,
        api.baseApi.patientApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.cryptoApi,
        api
    )
