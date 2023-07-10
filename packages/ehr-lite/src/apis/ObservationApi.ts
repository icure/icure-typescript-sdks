import { ErrorHandler, ServiceLikeApiImpl, Document, mapDocumentDtoToDocument, mapDocumentToDocumentDto, CommonApi, PaginatedList } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { Observation } from '../models/Observation.model'
import { Document as DocumentDto, IccContactXApi, IccCryptoXApi, IccHelementXApi, IccPatientXApi, IccUserXApi, PaginatedListService, Patient as PatientDto, Service } from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { mapObservationToService, mapServiceToObservation } from '../mappers/Observation.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class ObservationApi extends ServiceLikeApiImpl<Observation, Patient, Document> {}
export const observationApi = (api: CommonApi) =>
    new ObservationApi(
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
        {
            toDomain(dto: PaginatedListService): PaginatedList<Observation> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapServiceToObservation),
                }
            },
            toDto(domain: PaginatedList<Observation>): PaginatedListService {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapObservationToService),
                }
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
