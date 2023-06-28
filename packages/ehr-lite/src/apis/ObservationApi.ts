import { ErrorHandler, ServiceLikeApiImpl, Document, mapDocumentDtoToDocument, mapDocumentToDocumentDto } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { Observation } from '../models/Observation.model'
import { Document as DocumentDto, IccContactXApi, IccCryptoXApi, IccHelementXApi, IccPatientXApi, IccUserXApi, Patient as PatientDto, Service } from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { mapObservationToService, mapServiceToObservation } from '../mappers/Observation.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export const observationApi = (errorHandler: ErrorHandler, contactApi: IccContactXApi, userApi: IccUserXApi, patientApi: IccPatientXApi, healthElementApi: IccHelementXApi, cryptoApi: IccCryptoXApi, dataOwnerApi: IccDataOwnerXApi) =>
    new ServiceLikeApiImpl<Observation, Patient, Document>(
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
        errorHandler,
        userApi,
        contactApi,
        patientApi,
        healthElementApi,
        cryptoApi,
        dataOwnerApi
    )
