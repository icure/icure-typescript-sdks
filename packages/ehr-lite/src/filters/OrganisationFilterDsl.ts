import { CommonApi, domainTypeTag, HealthcarePartyFilter } from '@icure/typescript-common'

export class OrganisationFilter extends HealthcarePartyFilter {
    constructor(api: CommonApi) {
        const hcpDomainTag = domainTypeTag('organisation')

        super(api)

        this.byLabelCodeFilter(hcpDomainTag.type, hcpDomainTag.code)
    }
}
