import {CommonApi, ErrorHandler, HealthcarePartyLikeApiImpl, PaginatedList} from '@icure/typescript-common'
import {HealthcareParty, IccHcpartyXApi, PaginatedListHealthcareParty} from '@icure/api'
import { Organisation } from '../models/Organisation.model'
import { mapHealthcarePartyToOrganisation, mapOrganisationToHealthcareParty } from '../mappers/Organisation.mapper'

export const organisationApi = (errorHandler: ErrorHandler, healthcarePartyApi: IccHcpartyXApi, api: CommonApi) =>
    new HealthcarePartyLikeApiImpl<Organisation>(
        {
            toDomain(dto: HealthcareParty): Organisation {
                return mapHealthcarePartyToOrganisation(dto)
            },
            toDto(domain: Organisation): HealthcareParty {
                return mapOrganisationToHealthcareParty(domain)
            },
        },
        {
            toDomain(dto: PaginatedListHealthcareParty): PaginatedList<Organisation> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapHealthcarePartyToOrganisation)
                }
            },
            toDto(domain: PaginatedList<Organisation>): PaginatedListHealthcareParty {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapOrganisationToHealthcareParty)
                }
            }
        },
        errorHandler,
        healthcarePartyApi
    )
