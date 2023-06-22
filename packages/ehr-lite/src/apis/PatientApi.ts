import {ErrorHandler, PatientLikeApiImpl} from "@icure/typescript-common";
import {Patient} from "../models/Patient.model";
import {IccPatientXApi, IccUserXApi, Patient as PatientDto} from "@icure/api";
import {mapper} from "../mappers/mapper";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";

export const patientApi = (
    errorHandler: ErrorHandler,
    patientApi: IccPatientXApi,
    userApi: IccUserXApi,
    dataOwnerApi: IccDataOwnerXApi,
) => new PatientLikeApiImpl<Patient>(
    {
        toDomain(dto: PatientDto): Patient {
            return mapper.map(dto, PatientDto, Patient)
        },
        toDto(domain: Patient): PatientDto {
            return mapper.map(domain, Patient, PatientDto)
        }
    },
    errorHandler,
    patientApi,
    userApi,
    dataOwnerApi,
)