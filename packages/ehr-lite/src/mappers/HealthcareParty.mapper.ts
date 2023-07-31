import { HealthcareParty } from '@icure/api'
import { Practitioner } from '../models/Practitioner.model'
import { Organisation } from '../models/Organisation.model'
import { extractDataOwnerDomainType } from '@icure/typescript-common'
import { DataOwnerTypeEnum } from '../models/DataOwner.model'
import { mapHealthcarePartyToPractitioner, mapPractitionerToHealthcareParty } from './Practitioner.mapper'
import { mapHealthcarePartyToOrganisation, mapOrganisationToHealthcareParty } from './Organisation.mapper'

export const mapHealthcarePartyToDomain = (healthcareParty: HealthcareParty): Practitioner | Organisation => {
    const domainType = extractDataOwnerDomainType(healthcareParty).toLowerCase()

    if (domainType === DataOwnerTypeEnum.PRACTITIONER) {
        return mapHealthcarePartyToPractitioner(healthcareParty)
    } else if (domainType === DataOwnerTypeEnum.ORGANISATION) {
        return mapHealthcarePartyToOrganisation(healthcareParty)
    }

    throw new Error(`Unknown data owner domain type ${domainType}`)
}

export const mapDomainToHealthcareParty = (domain: Practitioner | Organisation): HealthcareParty => {
    if (domain instanceof Practitioner) {
        return mapPractitionerToHealthcareParty(domain)
    } else if (domain instanceof Organisation) {
        return mapOrganisationToHealthcareParty(domain)
    }

    throw new Error(`Unknown data owner domain type ${domain}`)
}
