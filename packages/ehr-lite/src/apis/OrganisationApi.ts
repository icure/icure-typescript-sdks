import { ErrorHandler, HealthcarePartyLikeApiImpl } from '@icure/typescript-common'
import { HealthcareParty, IccHcpartyXApi } from '@icure/api'
import { Organisation } from '../models/Organisation.model'
import { mapHealthcarePartyToOrganisation, mapOrganisationToHealthcareParty } from '../mappers/Organisation.mapper'

export const organisationApi = (errorHandler: ErrorHandler, healthcarePartyApi: IccHcpartyXApi) =>
    new HealthcarePartyLikeApiImpl<Organisation>(
        {
            toDomain(dto: HealthcareParty): Organisation {
                return mapHealthcarePartyToOrganisation(dto)
            },
            toDto(domain: Organisation): HealthcareParty {
                return mapOrganisationToHealthcareParty(domain)
            },
        },
        errorHandler,
        healthcarePartyApi
    )
