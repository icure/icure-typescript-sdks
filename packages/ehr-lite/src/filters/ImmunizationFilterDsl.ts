import { CommonApi, domainTypeTag, ServiceFilter, ServiceFilterWithDataOwner, PatientDto } from '@icure/typescript-common'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { Patient } from '../models/Patient.model'
import { IMMUNIZATION_FHIR_TYPE } from '../mappers/Immunization.mapper'

export class ImmunizationFilter extends ServiceFilter<Patient> {
    private readonly obsDomainTag = domainTypeTag(IMMUNIZATION_FHIR_TYPE)

    constructor(api: CommonApi) {
        const patientMapper = {
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
        }

        super(api, patientMapper)
    }

    forSelf(): ServiceFilterWithDataOwner<Patient> {
        return super.forSelf().byLabelCodeDateFilter(this.obsDomainTag.type, this.obsDomainTag.code)
    }

    forDataOwner(dataOwnerId: string): ServiceFilterWithDataOwner<Patient> {
        return super.forDataOwner(dataOwnerId).byLabelCodeDateFilter(this.obsDomainTag.type, this.obsDomainTag.code)
    }
}
