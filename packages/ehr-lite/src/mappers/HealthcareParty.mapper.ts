import { Practitioner } from '../models/Practitioner.model'
import { Organisation } from '../models/Organisation.model'
import { extractDataOwnerDomainType, HealthcarePartyDto } from '@icure/typescript-common'
import { DataOwnerTypeEnum } from '../models/DataOwner.model'
import { mapHealthcarePartyDtoToPractitioner, mapPractitionerToHealthcarePartyDto } from './Practitioner.mapper'
import { mapHealthcarePartyDtoToOrganisation, mapOrganisationToHealthcarePartyDto } from './Organisation.mapper'

export const mapHealthcarePartyToDomain = (healthcareParty: HealthcarePartyDto): Practitioner | Organisation => {
    const domainType = extractDataOwnerDomainType(healthcareParty).toUpperCase()

    if (domainType === DataOwnerTypeEnum.PRACTITIONER) {
        return mapHealthcarePartyDtoToPractitioner(healthcareParty)
    } else if (domainType === DataOwnerTypeEnum.ORGANISATION) {
        return mapHealthcarePartyDtoToOrganisation(healthcareParty)
    }

    throw new Error(`Unknown data owner domain type ${domainType}`)
}

export const mapDomainToHealthcareParty = (domain: Practitioner | Organisation): HealthcarePartyDto => {
    if (domain instanceof Practitioner) {
        return mapPractitionerToHealthcarePartyDto(domain)
    } else if (domain instanceof Organisation) {
        return mapOrganisationToHealthcarePartyDto(domain)
    }

    throw new Error(`Unknown data owner domain type ${domain}`)
}
