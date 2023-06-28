import { ErrorHandler, HealthcarePartyLikeApiImpl } from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import { HealthcareParty, IccHcpartyXApi, IccUserXApi } from '@icure/api'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from '../mappers/Practitioner.mapper'

export const practitionerApi = (errorHandler: ErrorHandler, healthcarePartyApi: IccHcpartyXApi) =>
    new HealthcarePartyLikeApiImpl<Practitioner>(
        {
            toDomain(dto: HealthcareParty): Practitioner {
                return mapHealthcarePartyToPractitioner(dto)
            },
            toDto(domain: Practitioner): HealthcareParty {
                return mapPractitionerToHealthcareParty(domain)
            },
        },
        errorHandler,
        healthcarePartyApi
    )
