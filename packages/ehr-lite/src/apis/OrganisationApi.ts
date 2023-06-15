import {ErrorHandler, HealthcarePartyLikeApiImpl} from "@icure/typescript-common";
import {HealthcareParty, IccHcpartyXApi} from "@icure/api";
import {Organisation} from "../models/Organisation.model";
import {mapper} from "../mappings/mapper";

export const organisationApi = (
    errorHandler: ErrorHandler,
    healthcarePartyApi: IccHcpartyXApi,
) => new HealthcarePartyLikeApiImpl<Organisation>(
    {
        toDomain(dto: HealthcareParty): Organisation {
            return mapper.map(dto, HealthcareParty, Organisation )
        },
        toDto(domain: Organisation): HealthcareParty {
            return mapper.map(domain, Organisation, HealthcareParty)
        }
    },
    errorHandler,
    healthcarePartyApi,
)