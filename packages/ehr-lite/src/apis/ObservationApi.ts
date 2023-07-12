import {
    ServiceLikeApiImpl,
    Document,
    mapDocumentDtoToDocument,
    mapDocumentToDocumentDto,
    CommonApi,
    ServiceLikeApi
} from '@icure/typescript-common'
import {Patient} from '../models/Patient.model'
import {Observation} from '../models/Observation.model'
import {Document as DocumentDto, Patient as PatientDto, Service} from '@icure/api'
import {mapObservationToService, mapServiceToObservation} from '../mappers/Observation.mapper'
import {mapPatientDtoToPatient, mapPatientToPatientDto} from '../mappers/Patient.mapper'

export interface ObservationApi extends ServiceLikeApi<Observation, Patient, Document> {
}

class ObservationApiImpl extends ServiceLikeApiImpl<Observation, Patient, Document> implements ObservationApi {
}

export const observationApi = (api: CommonApi): ObservationApi =>
    new ObservationApiImpl(
        {
            toDomain(dto: Service): Observation {
                return mapServiceToObservation(dto)
            },
            toDto(domain: Observation): Service {
                return mapObservationToService(domain)
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
            toDomain(dto: DocumentDto): Document {
                return mapDocumentDtoToDocument(dto)
            },
            toDto(domain: Document): DocumentDto {
                return mapDocumentToDocumentDto(domain)
            },
        },
        api.errorHandler,
        api.baseApi.userApi,
        api.baseApi.contactApi,
        api.baseApi.patientApi,
        api.baseApi.healthcareElementApi,
        api.baseApi.cryptoApi,
        api.baseApi.dataOwnerApi,
        api
    )
