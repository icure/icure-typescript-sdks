import { CommonApi, domainTypeTag, HealthElementFilter } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { Patient as PatientDto } from '@icure/api'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class ConditionFilter extends HealthElementFilter<Patient> {
    constructor(api: CommonApi) {
        const heDomainTag = domainTypeTag('Condition')
        const patientMapper = {
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
        }

        super(api, patientMapper, [new HealthElementFilter(api, patientMapper, []).forSelf().byLabelCodeFilter(heDomainTag.type, heDomainTag.code).build()])
    }
}
