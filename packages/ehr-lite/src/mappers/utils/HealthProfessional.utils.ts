import { HealthcareParty } from '@icure/api'
import { Identifier as IdentifierEntity } from '@icure/api/icc-api/model/Identifier'
import { addUniqueObjectsToArray } from '@icure/typescript-common'

export const NIHII_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/nihdi'
export const SSIN_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/ssin'
export const CBE_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/cbe'
export const EHP_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/ehp'

export const healthcareProfessionalIdentifiers = (h: HealthcareParty) => {
    const nihiiIdentifier = h.nihii
        ? new IdentifierEntity({
              system: NIHII_SYSTEM,
              value: h.nihii,
          })
        : undefined
    const cbeIdentifier = h.cbe
        ? new IdentifierEntity({
              system: CBE_SYSTEM,
              value: h.cbe,
          })
        : undefined
    const ehpIdentifier = h.ehp
        ? new IdentifierEntity({
              system: EHP_SYSTEM,
              value: h.ehp,
          })
        : undefined
    const ssinIdentifier = h.ssin
        ? new IdentifierEntity({
              system: SSIN_SYSTEM,
              value: h.ssin,
          })
        : undefined

    const beHealthIdentifiers = [nihiiIdentifier, cbeIdentifier, ehpIdentifier, ssinIdentifier].filter((i) => !!i) as IdentifierEntity[]

    return addUniqueObjectsToArray(h.identifier ?? [], ...beHealthIdentifiers)
}
