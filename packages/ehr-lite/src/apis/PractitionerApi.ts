import {ErrorHandler, HealthcarePartyLikeApiImpl} from "@icure/typescript-common";
import {Practitioner} from "../models/Practitioner.model";
import {HealthcareParty, IccHcpartyXApi, IccUserXApi} from "@icure/api";
import {mapper} from "../mappers/mapper";

export const practitionerApi = (
    errorHandler: ErrorHandler,
    healthcarePartyApi: IccHcpartyXApi,
) => new HealthcarePartyLikeApiImpl<Practitioner>(
    {
        toDomain(dto: HealthcareParty): Practitioner {
            return mapper.map(dto, HealthcareParty, Practitioner)
        },
        toDto(domain: Practitioner): HealthcareParty {
            return mapper.map(domain, Practitioner, HealthcareParty)
        }
    },
    errorHandler,
    healthcarePartyApi,
)