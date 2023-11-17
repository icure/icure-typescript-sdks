import { addUniqueObjectsToArray, HealthcarePartyDto, IdentifierDto } from '@icure/typescript-common'

export const NIHII_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/nihdi'
export const SSIN_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/ssin'
export const CBE_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/cbe'
export const EHP_SYSTEM = 'https://www.ehealth.fgov.be/standards/fhir/core/NamingSystem/ehp'

export const healthcareProfessionalIdentifiers = (h: HealthcarePartyDto) => {
    const nihiiIdentifier = h.nihii
        ? new IdentifierDto({
              system: NIHII_SYSTEM,
              value: h.nihii,
          })
        : undefined
    const cbeIdentifier = h.cbe
        ? new IdentifierDto({
              system: CBE_SYSTEM,
              value: h.cbe,
          })
        : undefined
    const ehpIdentifier = h.ehp
        ? new IdentifierDto({
              system: EHP_SYSTEM,
              value: h.ehp,
          })
        : undefined
    const ssinIdentifier = h.ssin
        ? new IdentifierDto({
              system: SSIN_SYSTEM,
              value: h.ssin,
          })
        : undefined

    const beHealthIdentifiers = [nihiiIdentifier, cbeIdentifier, ehpIdentifier, ssinIdentifier].filter((i) => !!i) as IdentifierDto[]

    return addUniqueObjectsToArray(h.identifier ?? [], ...beHealthIdentifiers)
}
