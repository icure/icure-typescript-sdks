import { CommonApi, HealthcarePartyLikeApi, HealthcarePartyLikeApiImpl, HealthcarePartyDto } from '@icure/typescript-common'
import { Organisation } from '../models/Organisation.model'
import { mapHealthcarePartyToOrganisation, mapOrganisationToHealthcareParty } from '../mappers/Organisation.mapper'

export interface OrganisationApi extends HealthcarePartyLikeApi<Organisation> {}
class OrganisationApiImpl extends HealthcarePartyLikeApiImpl<Organisation> {}

export const organisationApi = (api: CommonApi, basePath: string): OrganisationApi =>
    new OrganisationApiImpl(
        {
            toDomain(dto: HealthcarePartyDto): Organisation {
                return mapHealthcarePartyToOrganisation(dto)
            },
            toDto(domain: Organisation): HealthcarePartyDto {
                return mapOrganisationToHealthcareParty(domain)
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi,
        api.baseApi.authApi,
        basePath,
    )
