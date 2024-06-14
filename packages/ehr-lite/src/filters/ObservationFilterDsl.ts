import { CommonApi, domainTypeTag, PatientDto, ServiceFilter, ServiceFilterWithDataOwner } from '@icure/typescript-common'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { Patient } from '../models/Patient.model'

export class ObservationFilter extends ServiceFilter<Patient> {
    private readonly obsDomainTag = domainTypeTag('observation')

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
