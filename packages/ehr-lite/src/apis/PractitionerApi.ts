import { CommonApi, ErrorHandler, HealthcarePartyLikeApi, HealthcarePartyLikeApiImpl, PaginatedList } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { HealthcareParty, IccHcpartyXApi, PaginatedListHealthcareParty } from '@icure/api'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from '../mappers/Practitioner.mapper'

export interface PractitionerApi extends HealthcarePartyLikeApi<Practitioner> {}
class PractitionerApiImpl extends HealthcarePartyLikeApiImpl<Practitioner> {}

export const practitionerApi = (api: CommonApi, basePath: string): PractitionerApi =>
    new PractitionerApiImpl(
        {
            toDomain(dto: HealthcareParty): Practitioner {
                return mapHealthcarePartyToPractitioner(dto)
            },
            toDto(domain: Practitioner): HealthcareParty {
                return mapPractitionerToHealthcareParty(domain)
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi,
        api.baseApi.authApi,
        basePath,
    )
