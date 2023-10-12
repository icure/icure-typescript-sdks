import { CommonApi, mapTopicDtoToTopic, mapTopicToTopicDto, Topic, TopicLikeApi, TopicLikeApiImpl } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { Patient } from '../models/Patient.model'
import { Observation } from '../models/Observation.model'
import { Condition } from '../models/Condition.model'
import { HealthcareParty, Topic as TopicDto, Patient as PatientDto, Service, HealthElement } from '@icure/api'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from '../mappers/Practitioner.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { mapObservationToService, mapServiceToObservation } from '../mappers/Observation.mapper'
import { mapConditionToHealthElement, mapHealthElementToCondition } from '../mappers/Condition.mapper'

export interface TopicApi extends TopicLikeApi<Topic, Practitioner, Patient, Observation, Condition> {}

class TopicApiImpl extends TopicLikeApiImpl<Topic, Practitioner, Patient, Observation, Condition> {}

export const topicApi = (api: CommonApi): TopicApi =>
    new TopicApiImpl(
        {
            toDomain(dto: TopicDto): Topic {
                return mapTopicDtoToTopic(dto)
            },
            toDto(domain: Topic): TopicDto {
                return mapTopicToTopicDto(domain)
            },
        },
        {
            toDomain(dto: HealthcareParty): Practitioner {
                return mapHealthcarePartyToPractitioner(dto)
            },
            toDto(domain: Practitioner): HealthcareParty {
                return mapPractitionerToHealthcareParty(domain)
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
            toDomain(dto: Service): Observation {
                return mapServiceToObservation(dto)
            },
            toDto(domain: Observation): Service {
                return mapObservationToService(domain)
            },
        },
        {
            toDomain(dto: HealthElement): Condition {
                return mapHealthElementToCondition(dto)
            },
            toDto(domain: Condition): HealthElement {
                return mapConditionToHealthElement(domain)
            },
        },
        api.errorHandler,
        api.baseApi.topicApi,
        api.baseApi.userApi,
        api.baseApi.patientApi,
        api.baseApi.dataOwnerApi,
    )
