export interface Mapper<DSEntity, DTO> {
    toDomain(dto: DTO): DSEntity

    toDto(domain: DSEntity): DTO
}

/*type DomainLikes = {
    [key: string]: any
}

type DomainTypeMap = {
    code: any
    healthcareParty: DomainLikes
}

type TypeMappers<Domain extends DomainTypeMap> = {
    codeToDto: (dsCode: Domain['code']) => CodeDto
    codeToDomain: {
        [C in keyof Domain['code']] : (healthcareParty: CodeDto) => Domain['code'][C]
    }
    hcpToDto: (dsHcp: Domain['healthcareParty'][keyof Domain['healthcareParty']]) => HealthcarePartyDto
    healthcarePartyToDomain: {
        [H in keyof Domain['healthcareParty']]: (healthcareParty: HealthcarePartyDto) => Domain['healthcareParty'][H]
    }
}

interface SomeApiOrFilter<TM extends DomainTypeMap, H extends keyof TM['healthcareParty']> {
    getForCode(code: TM['code']): void
    getById(): TM['healthcareParty'][H]
}

class SomeApiOrFilterImpl<
    TM extends DomainTypeMap,
    H extends keyof TM['healthcareParty'],
    // C extends keyof TM['code']
> implements SomeApiOrFilter<TM, H> {
    constructor(
        private readonly mappers: TypeMappers<TM>,
        private readonly h: H,
    ) {
    }

    getForCode(code: TM['code']): void {
        this._functionRequiringCode(this.mappers.codeToDto[this.c](code))
    }

    getById(): TM['healthcareParty'][H] {
        return this.mappers.healthcarePartyToDomain[this.h](this._functionReturningHcp())
    }

    _functionRequiringCode(code: CodeDto) {
        throw "TODO"
    }

    _functionReturningHcp(): HealthcarePartyDto {
        throw "TODO"
    }
}*/

// ----- EHR Impl

/*class EhrOrganization {
    someOrgMethod() {}
}

class EhrPractitioner {
    somePractitionerMethod() {}
}

class EhrCoding {
    someCodeMethod() {}
}

type EhrTypes = {
    healthcareParty: {
        organization: EhrOrganization,
        practitioner: EhrPractitioner
    },
    code: EhrCoding
}

class EhrTypeMappers implements TypeMappers<EhrTypes> {
    codeToDto: (dsCode: EhrCoding) => CodeDto;
    codeToDomain: { someCodeMethod: (healthcareParty: CodeDto) => () => void; };
    hcpToDto: (dsHcp: EhrOrganization | EhrPractitioner) => HealthcarePartyDto;
    healthcarePartyToDomain: { organization: (healthcareParty: HealthcarePartyDto) => EhrOrganization; practitioner: (healthcareParty: HealthcarePartyDto) => EhrPractitioner; };

}

interface OrganizationApi extends SomeApiOrFilter<EhrTypes, 'organization'> {

}*/

/*
type DomainTypeMap = {
    patient: any
    hcp: DomainHcpLikes
}

type DomainHcpLikes = {
    [key: string]: any
}

type EhrPatient = {
    domainPatient: string
}

type EhrHcp = {
    domainHcp: string
}

type EhrOrganization = {
    ehrOrganization: string
}

type EhrTypeMap = {
    patient: EhrPatient
    hcp: {
        organization: EhrOrganization,
        practitioner: EhrHcp
    }
}

type DtoPatient = {
    dtoPatient: string
}

type DtoHcp = {
    dtoHcp: string
}

type TypeMappers<Domain extends DomainTypeMap> = {
    patientToDto: (patient: Domain['patient']) => DtoPatient
    patientToDomain: (patient: DtoPatient) => Domain['patient']
    hcpToDto: {
        [H in keyof Domain['hcp']]: (hcp: Domain['hcp'][H]) => DtoHcp
    }
    hcpToDomain: {
        [H in keyof Domain['hcp']]: (hcp: DtoHcp) => Domain['hcp'][H]
    }
}

interface SomeApiOrFilter<TM extends DomainTypeMap, H extends keyof TM['hcp']> {
    getForPatient(patient: TM['patient']): void
    getById(): TM['hcp'][H]
}

class SomeApiOrFilterImpl<
    TM extends DomainTypeMap,
    H extends keyof TM['hcp']
> implements SomeApiOrFilter<TM, H> {
    constructor(
        private readonly mappers: TypeMappers<TM>,
        private readonly h: H
    ) {
    }

    getForPatient(patient: TM['patient']): void {
        this._functionRequiringPatient(this.mappers.patientToDto(patient))
    }

    getById(): TM['hcp'][H] {
        return this.mappers.hcpToDomain[this.h](this._functionReturningHcp())
    }

    _functionRequiringPatient(patient: DtoPatient) {
        throw "TODO"
    }

    _functionReturningHcp(): DtoHcp {
        throw "TODO"
    }
}

interface PractitionerApi extends SomeApiOrFilter<EhrTypeMap, 'practitioner'> {}
interface OrganizationApi extends SomeApiOrFilter<EhrTypeMap, 'organization'> {}

function useIt() {
    const mappers: TypeMappers<EhrTypeMap> = {
        patientToDto: (patient: EhrPatient) => {
            return { dtoPatient: patient.domainPatient }
        },
        patientToDomain(patient: DtoPatient): EhrTypeMap["patient"] {
            return { domainPatient: patient.dtoPatient }
        },
        hcpToDomain: {
            'practitioner': (hcp: DtoHcp) => {
                return { domainHcp: hcp.dtoHcp }
            },
            'organization': (hcp: DtoHcp) => {
                return { ehrOrganization: hcp.dtoHcp }
            }
        },
        hcpToDto: {
            'practitioner': (hcp: EhrHcp) => {
                return { dtoHcp: hcp.domainHcp }
            },
            'organization': (hcp: EhrOrganization) => {
                return { dtoHcp: hcp.ehrOrganization }
            }
        }
    }
    const practitionerApi: PractitionerApi = new SomeApiOrFilterImpl<EhrTypeMap, 'practitioner'>(mappers, 'practitioner')
    const organizationApi: OrganizationApi = new SomeApiOrFilterImpl<EhrTypeMap, 'organization'>(mappers, 'organization')
    const p = practitionerApi.getById()
    const o = organizationApi.getById()
    practitionerApi.getForPatient()
}
*/
