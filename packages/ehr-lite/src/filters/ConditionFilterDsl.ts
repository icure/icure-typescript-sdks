import { CommonApi, domainTypeTag, HealthElementFilter, HealthElementFilterWithDataOwner } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { Patient as PatientDto } from '@icure/api'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class ConditionFilter extends HealthElementFilter<Patient> {
    private readonly heDomainTag = domainTypeTag('Condition')

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

    forDataOwner(dataOwnerId: string): HealthElementFilterWithDataOwner<Patient> {
        return super.forDataOwner(dataOwnerId).byLabelCodeFilter(this.heDomainTag.type, this.heDomainTag.code)
    }

    forSelf(): HealthElementFilterWithDataOwner<Patient> {
        return super.forSelf().byLabelCodeFilter(this.heDomainTag.type, this.heDomainTag.code)
    }
}
