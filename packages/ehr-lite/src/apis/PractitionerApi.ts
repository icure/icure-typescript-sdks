import { CommonApi, HealthcarePartyLikeApi, HealthcarePartyLikeApiImpl, HealthcarePartyDto } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from '../mappers/Practitioner.mapper'

export interface PractitionerApi extends HealthcarePartyLikeApi<Practitioner> {}
class PractitionerApiImpl extends HealthcarePartyLikeApiImpl<Practitioner> {}

export const practitionerApi = (api: CommonApi, basePath: string): PractitionerApi =>
    new PractitionerApiImpl(
        {
            toDomain(dto: HealthcarePartyDto): Practitioner {
                return mapHealthcarePartyToPractitioner(dto)
            },
            toDto(domain: Practitioner): HealthcarePartyDto {
                return mapPractitionerToHealthcareParty(domain)
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi,
        api.baseApi.authApi,
        basePath,
    )
