import { ServiceLikeApiImpl, Document, mapDocumentDtoToDocument, mapDocumentToDocumentDto, CommonApi, ServiceLikeApi, DocumentDto, PatientDto, ServiceDto } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapImmunizationToServiceDto, mapServiceDtoToImmunization } from '../mappers/Immunization.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { Immunization } from '../models/Immunization.model'

export interface ImmunizationApi extends ServiceLikeApi<Immunization, Patient, Document> {}

class ImmunizationApiImpl extends ServiceLikeApiImpl<Immunization, Patient, Document> implements ImmunizationApi {}

export const immunizationApi = (api: CommonApi, basePath: string): ImmunizationApi =>
    new ImmunizationApiImpl(
        {
            toDomain(dto: ServiceDto): Immunization {
                return mapServiceDtoToImmunization(dto)
            },
            toDto(domain: Immunization): ServiceDto {
                return mapImmunizationToServiceDto(domain)
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
