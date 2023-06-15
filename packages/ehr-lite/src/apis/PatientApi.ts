import {ErrorHandler, PatientLikeApiImpl} from "@icure/typescript-common";
import {Patient as PatientModel} from "../models/Patient.model";
import {IccPatientXApi, IccUserXApi, Patient} from "@icure/api";
import {mapper} from "../mappings/mapper";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";

export const patientApi = (
    errorHandler: ErrorHandler,
    patientApi: IccPatientXApi,
    userApi: IccUserXApi,
    dataOwnerApi: IccDataOwnerXApi,
) => new PatientLikeApiImpl<PatientModel>(
    {
        toDomain(dto: Patient): PatientModel {
            return mapper.map(dto, Patient, PatientModel)
        },
        toDto(domain: PatientModel): Patient {
            return mapper.map(domain, PatientModel, Patient)
        }
    },
    errorHandler,
    patientApi,
    userApi,
    dataOwnerApi,
)