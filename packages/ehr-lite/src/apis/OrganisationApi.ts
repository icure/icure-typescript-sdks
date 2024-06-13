import { CommonApi, HealthcarePartyLikeApi, HealthcarePartyLikeApiImpl, HealthcarePartyDto } from '@icure/typescript-common'
import { Organisation } from '../models/Organisation.model'
import { mapHealthcarePartyDtoToOrganisation, mapOrganisationToHealthcarePartyDto } from '../mappers/Organisation.mapper'

export interface OrganisationApi extends HealthcarePartyLikeApi<Organisation> {}
class OrganisationApiImpl extends HealthcarePartyLikeApiImpl<Organisation> {}

export const organisationApi = (api: CommonApi, basePath: string): OrganisationApi =>
    new OrganisationApiImpl(
        {
            toDomain(dto: HealthcarePartyDto): Organisation {
                return mapHealthcarePartyDtoToOrganisation(dto)
            },
            toDto(domain: Organisation): HealthcarePartyDto {
                return mapOrganisationToHealthcarePartyDto(domain)
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi,
        api.baseApi.authApi,
        basePath
    )
