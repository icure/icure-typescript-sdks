import {CommonApi, HealthcarePartyLikeApi, HealthcarePartyLikeApiImpl} from '@icure/typescript-common'
import {HealthcareParty} from '@icure/api'
import {Organisation} from '../models/Organisation.model'
import {mapHealthcarePartyToOrganisation, mapOrganisationToHealthcareParty} from '../mappers/Organisation.mapper'

export interface OrganisationApi extends HealthcarePartyLikeApi<Organisation> {}
class OrganisationApiImpl extends HealthcarePartyLikeApiImpl<Organisation> {}

export const organisationApi = (api: CommonApi): OrganisationApi =>
    new OrganisationApiImpl(
        {
            toDomain(dto: HealthcareParty): Organisation {
                return mapHealthcarePartyToOrganisation(dto)
            },
            toDto(domain: Organisation): HealthcareParty {
                return mapOrganisationToHealthcareParty(domain)
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi
    )
