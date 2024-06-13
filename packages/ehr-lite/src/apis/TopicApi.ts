import { CommonApi, CryptoStrategies, mapTopicDtoToTopic, mapTopicToTopicDto, Reference, Topic, TopicLikeApi, TopicLikeApiImpl, HealthcarePartyDto, TopicDto, PatientDto, ServiceDto, HealthElementDto, DataOwnerWithTypeDto } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { Patient } from '../models/Patient.model'
import { Observation } from '../models/Observation.model'
import { Condition } from '../models/Condition.model'
import { mapHealthcarePartyDtoToPractitioner, mapPractitionerToHealthcarePartyDto } from '../mappers/Practitioner.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { mapObservationToServiceDto, mapServiceDtoToObservation } from '../mappers/Observation.mapper'
import { mapConditionToHealthElementDto, mapHealthElementDtoToCondition } from '../mappers/Condition.mapper'
import { DataOwnerWithType } from '../models/DataOwner.model'
import DataOwnerMapper from '../mappers/DataOwner.mapper'

export interface TopicApi extends TopicLikeApi<Topic, Practitioner, Patient, Observation, Condition> {
    addObservations(topic: Topic, observations: Reference<Observation>[]): Promise<Topic>
    addConditions(topic: Topic, conditions: Reference<Condition>[]): Promise<Topic>
    removeObservations(topic: Topic, observations: Reference<Observation>[]): Promise<Topic>
    removeConditions(topic: Topic, conditions: Reference<Condition>[]): Promise<Topic>
}

class TopicApiImpl extends TopicLikeApiImpl<Topic, Practitioner, Patient, Observation, Condition, DataOwnerWithType> implements TopicApi {
    async addObservations(topic: Topic, observations: Reference<Observation>[]): Promise<Topic> {
        return await super.addServices(topic, observations)
    }

    async addConditions(topic: Topic, conditions: Reference<Condition>[]): Promise<Topic> {
        return await super.addHealthElements(topic, conditions)
    }

    override async addServices(topic: Topic, services: Reference<Observation>[]): Promise<Topic> {
        throw new Error('You should not use this method, use addObservations instead')
    }

    override async addHealthElements(topic: Topic, healthElements: Reference<Condition>[]): Promise<Topic> {
        throw new Error('You should not use this method, use addConditions instead')
    }

    async removeObservations(topic: Topic, observations: Reference<Observation>[]): Promise<Topic> {
        return await super.removeServices(topic, observations)
    }

    async removeConditions(topic: Topic, conditions: Reference<Condition>[]): Promise<Topic> {
        return await super.removeHealthElements(topic, conditions)
    }

    override async removeServices(topic: Topic, services: Reference<Observation>[]): Promise<Topic> {
        throw new Error('You should not use this method, use removeObservations instead')
    }

    override async removeHealthElements(topic: Topic, healthElements: Reference<Condition>[]): Promise<Topic> {
        throw new Error('You should not use this method, use removeConditions instead')
    }
}

export const topicApi = (api: CommonApi, cryptoStrategies: CryptoStrategies<DataOwnerWithType>): TopicApi =>
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
            toDomain(dto: HealthcarePartyDto): Practitioner {
                return mapHealthcarePartyDtoToPractitioner(dto)
            },
            toDto(domain: Practitioner): HealthcarePartyDto {
                return mapPractitionerToHealthcarePartyDto(domain)
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
            toDomain(dto: ServiceDto): Observation {
                return mapServiceDtoToObservation(dto)
            },
            toDto(domain: Observation): ServiceDto {
                return mapObservationToServiceDto(domain)
            },
        },
        {
            toDomain(dto: HealthElementDto): Condition {
                return mapHealthElementDtoToCondition(dto)
            },
            toDto(domain: Condition): HealthElementDto {
                return mapConditionToHealthElementDto(domain)
            },
        },
        {
            toDomain(dto: DataOwnerWithTypeDto): DataOwnerWithType {
                return DataOwnerMapper.toDomain(dto)
            },
            toDto(domain: DataOwnerWithType): DataOwnerWithTypeDto {
                return DataOwnerMapper.toDto(domain)
            },
        },
        api.errorHandler,
        api.baseApi.topicApi,
        api.baseApi.userApi,
        api.baseApi.patientApi,
        api.baseApi.dataOwnerApi,
        cryptoStrategies,
    )
