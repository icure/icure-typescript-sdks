import { CommonApi, domainTypeTag, HealthcarePartyFilter } from '@icure/typescript-common'

export class OrganisationFilter extends HealthcarePartyFilter {
    constructor(api: CommonApi) {
        const hcpDomainTag = domainTypeTag('Organisation')

        super(api, [new HealthcarePartyFilter(api, []).byLabelCodeFilter(hcpDomainTag.type, hcpDomainTag.code).build()])
    }
}
