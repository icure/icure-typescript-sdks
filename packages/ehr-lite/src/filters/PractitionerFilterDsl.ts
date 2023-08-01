import { CommonApi, domainTypeTag, HealthcarePartyFilter } from '@icure/typescript-common'

export class PractitionerFilter extends HealthcarePartyFilter {
    constructor(api: CommonApi) {
        const hcpDomainTag = domainTypeTag('Practitioner')

        super(api)

        this.byLabelCodeFilter(hcpDomainTag.type, hcpDomainTag.code)
    }
}
