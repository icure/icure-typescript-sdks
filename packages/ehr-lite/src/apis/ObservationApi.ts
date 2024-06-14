import { CommonApi, Document, DocumentDto, mapDocumentDtoToDocument, mapDocumentToDocumentDto, PatientDto, ServiceDto, ServiceLikeApi, ServiceLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { Observation } from '../models/Observation.model'
import { mapObservationToServiceDto, mapServiceDtoToObservation } from '../mappers/Observation.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export interface ObservationApi extends ServiceLikeApi<Observation, Patient, Document> {}

class ObservationApiImpl extends ServiceLikeApiImpl<Observation, Patient, Document> implements ObservationApi {}

export const observationApi = (api: CommonApi, basePath: string): ObservationApi =>
    new ObservationApiImpl(
        {
            toDomain(dto: ServiceDto): Observation {
                return mapServiceDtoToObservation(dto)
            },
            toDto(domain: Observation): ServiceDto {
                return mapObservationToServiceDto(domain)
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
        api.baseApi.authApi,
        api,
        basePath,
    )
