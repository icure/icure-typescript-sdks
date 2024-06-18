import { CommonApi, ContactFilter, ContactFilterWithDataOwner, domainTypeTag, PatientDto } from '@icure/typescript-common'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { ENCOUNTER_FHIR_TYPE } from '../mappers/Encounter.mapper'
import { Patient } from '../models/Patient.model'

export class EncounterFilter extends ContactFilter<Patient> {
    private readonly contactDomainTag = domainTypeTag(ENCOUNTER_FHIR_TYPE)

    constructor(commonApi: CommonApi) {
        const patientMapper = {
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
        }

        super(commonApi, patientMapper)
    }

    forDataOwner(dataOwnerId: string): ContactFilterWithDataOwner<Patient> {
        return super.forDataOwner(dataOwnerId).byLabelCodeDateFilter(this.contactDomainTag.type, this.contactDomainTag.code)
    }

    forSelf(): ContactFilterWithDataOwner<Patient> {
        return super.forSelf().byLabelCodeDateFilter(this.contactDomainTag.type, this.contactDomainTag.code)
    }
}
