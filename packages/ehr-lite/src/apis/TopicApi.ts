import { CommonApi, CryptoStrategies, mapTopicDtoToTopic, mapTopicToTopicDto, Reference, Topic, TopicLikeApi, TopicLikeApiImpl } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { Patient } from '../models/Patient.model'
import { Observation } from '../models/Observation.model'
import { Condition } from '../models/Condition.model'
import { HealthcareParty, Topic as TopicDto, Patient as PatientDto, Service, HealthElement, DataOwnerWithType as DataOwnerWithTypeDto } from '@icure/api'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from '../mappers/Practitioner.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { mapObservationToService, mapServiceToObservation } from '../mappers/Observation.mapper'
import { mapConditionToHealthElement, mapHealthElementToCondition } from '../mappers/Condition.mapper'
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
