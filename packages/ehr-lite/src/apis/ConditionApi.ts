import {HealthElement, IccCryptoXApi, IccHelementXApi, IccPatientXApi, IccUserXApi, Patient} from "@icure/api";
import {Condition} from "../models/Condition.model";
import {ErrorHandler, HealthElementLikeApiImpl} from "@icure/typescript-common";
import {mapper} from "../mappers/mapper";
import {Patient as PatientModel} from "../models/Patient.model";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";

export const conditionApi = (
    errorHandler: ErrorHandler,
    healthElementApi: IccHelementXApi,
    userApi: IccUserXApi,
    patientApi: IccPatientXApi,
    dataOwnerApi: IccDataOwnerXApi,
    cryptoApi: IccCryptoXApi,
) => new HealthElementLikeApiImpl<Condition, PatientModel>(
    {
        toDomain(dto: HealthElement): Condition {
            return mapper.map(dto, HealthElement, Condition)
        },
        toDto(domain: Condition): HealthElement {
            return mapper.map(domain, Condition, HealthElement)
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
    errorHandler,
    healthElementApi,
    userApi,
    patientApi,
    dataOwnerApi,
    cryptoApi,
)