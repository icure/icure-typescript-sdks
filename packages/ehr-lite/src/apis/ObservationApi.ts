import {ErrorHandler, ServiceLikeApiImpl, Document as DocumentModel} from "@icure/typescript-common";
import {Patient as PatientModel} from "../models/Patient.model";
import {Observation} from "../models/Observation.model";
import {
    Document,
    IccContactXApi,
    IccCryptoXApi,
    IccHelementXApi,
    IccPatientXApi,
    IccUserXApi,
    Patient,
    Service
} from "@icure/api";
import {mapper} from "../mappings/mapper";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";

export const observationApi = (
    errorHandler: ErrorHandler,
    contactApi: IccContactXApi,
    userApi: IccUserXApi,
    patientApi: IccPatientXApi,
    healthElementApi: IccHelementXApi,
    cryptoApi: IccCryptoXApi,
    dataOwnerApi: IccDataOwnerXApi,
) => new ServiceLikeApiImpl<Observation, PatientModel, DocumentModel>(
    {
        toDomain(dto: Service): Observation {
            return mapper.map(dto, Service, Observation)
        },
        toDto(domain: Observation): Service {
            return mapper.map(domain, Observation, Service)
        }
    },
    {
        toDomain(dto: Patient): PatientModel {
            return mapper.map(dto, Patient, PatientModel)
        },
        toDto(domain: PatientModel): Patient {
            return mapper.map(domain, PatientModel, Patient)
        }
    },
    {
        toDomain(dto: Document): DocumentModel {
            return mapper.map(dto, Document, DocumentModel)
        },
        toDto(domain: DocumentModel): Document {
            return mapper.map(domain, DocumentModel, Document)
        }
    },
    errorHandler,
    userApi,
    contactApi,
    patientApi,
    healthElementApi,
    cryptoApi,
    dataOwnerApi,
)