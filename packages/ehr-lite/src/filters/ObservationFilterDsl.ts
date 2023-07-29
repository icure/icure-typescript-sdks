import { CommonApi, domainTypeTag, ServiceFilter } from '@icure/typescript-common'
import { Patient as PatientDto } from '@icure/api'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { Patient } from '../models/Patient.model'

export class ObservationFilter extends ServiceFilter<Patient> {
    constructor(api: CommonApi) {
        const obsDomainTag = domainTypeTag('Observation')

        const patientMapper = {
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
        }

        super(api, patientMapper, [new ServiceFilter(api, patientMapper, []).forSelf().byLabelCodeDateFilter(obsDomainTag.type, obsDomainTag.code).build()])
    }
}
