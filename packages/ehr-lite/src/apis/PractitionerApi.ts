import { CommonApi, ErrorHandler, HealthcarePartyLikeApiImpl, PaginatedList } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { HealthcareParty, IccHcpartyXApi, PaginatedListHealthcareParty } from '@icure/api'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from '../mappers/Practitioner.mapper'

export class PractitionerApi extends HealthcarePartyLikeApiImpl<Practitioner> {}

export const practitionerApi = (api: CommonApi) =>
    new PractitionerApi(
        {
            toDomain(dto: HealthcareParty): Practitioner {
                return mapHealthcarePartyToPractitioner(dto)
            },
            toDto(domain: Practitioner): HealthcareParty {
                return mapPractitionerToHealthcareParty(domain)
            },
        },
        {
            toDomain(dto: PaginatedListHealthcareParty): PaginatedList<Practitioner> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapHealthcarePartyToPractitioner),
                }
            },
            toDto(domain: PaginatedList<Practitioner>): PaginatedListHealthcareParty {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapPractitionerToHealthcareParty),
                }
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi
    )
