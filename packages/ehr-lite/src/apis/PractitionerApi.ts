import {ErrorHandler, HealthcarePartyLikeApiImpl, PaginatedList} from '@icure/typescript-common'
import { Practitioner } from '../models/Practitioner.model'
import {HealthcareParty, IccHcpartyXApi, PaginatedListHealthcareParty} from '@icure/api'
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
        {
            toDomain(dto: PaginatedListHealthcareParty): PaginatedList<Practitioner> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapHealthcarePartyToPractitioner)
                }
            },
            toDto(domain: PaginatedList<Practitioner>): PaginatedListHealthcareParty {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapPractitionerToHealthcareParty)
                }
            }
        },
        errorHandler,
        healthcarePartyApi
    )
