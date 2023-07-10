import { HealthElement, PaginatedListHealthElement, Patient as PatientDto } from '@icure/api'
import { Condition } from '../models/Condition.model'
import { CommonApi, HealthElementLikeApiImpl, PaginatedList } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapConditionToHealthElement, mapHealthElementToCondition } from '../mappers/Condition.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class ConditionApi extends HealthElementLikeApiImpl<Condition, Patient> {}

export const conditionApi = (api: CommonApi) =>
    new ConditionApi(
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
        {
            toDomain(dto: PaginatedListHealthElement): PaginatedList<Condition> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapHealthElementToCondition),
                }
            },
            toDto(domain: PaginatedList<Condition>): PaginatedListHealthElement {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapConditionToHealthElement),
                }
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
