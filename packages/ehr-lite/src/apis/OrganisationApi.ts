import { CommonApi, HealthcarePartyLikeApiImpl, PaginatedList } from '@icure/typescript-common'
import { HealthcareParty, PaginatedListHealthcareParty } from '@icure/api'
import { Organisation } from '../models/Organisation.model'
import { mapHealthcarePartyToOrganisation, mapOrganisationToHealthcareParty } from '../mappers/Organisation.mapper'

export class OrganisationApi extends HealthcarePartyLikeApiImpl<Organisation> {}

export const organisationApi = (api: CommonApi) =>
    new OrganisationApi(
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
                    rows: dto.rows?.map(mapHealthcarePartyToOrganisation),
                }
            },
            toDto(domain: PaginatedList<Organisation>): PaginatedListHealthcareParty {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapOrganisationToHealthcareParty),
                }
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi
    )
