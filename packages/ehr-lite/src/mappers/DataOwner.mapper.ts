import { Mapper, DataOwnerTypeEnumDto, DataOwnerWithTypeDto } from '@icure/typescript-common'
import { DataOwnerWithType, extractDataOwnerDomainType } from '@icure/typescript-common'
import { DataOwnerTypeEnum } from '../models/DataOwner.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from './Patient.mapper'
import { mapHealthcarePartyDtoToPractitioner, mapPractitionerToHealthcarePartyDto } from './Practitioner.mapper'
import { mapHealthcarePartyDtoToOrganisation, mapOrganisationToHealthcarePartyDto } from './Organisation.mapper'

class DataOwnerMapper implements Mapper<DataOwnerWithType, DataOwnerWithTypeDto> {
    toDomain(dto: DataOwnerWithTypeDto): DataOwnerWithType {
        switch (dto.type) {
            case DataOwnerTypeEnumDto.Patient: {
                return {
                    type: DataOwnerTypeEnum.PATIENT,
                    dataOwner: mapPatientDtoToPatient(dto.dataOwner),
                }
            }
            case DataOwnerTypeEnumDto.Hcp: {
                const domainType = extractDataOwnerDomainType(dto.dataOwner)

                if (domainType === DataOwnerTypeEnum.PRACTITIONER) {
                    return {
                        type: DataOwnerTypeEnum.PRACTITIONER,
                        dataOwner: mapHealthcarePartyDtoToPractitioner(dto.dataOwner),
                    }
                } else if (domainType === DataOwnerTypeEnum.ORGANISATION) {
                    return {
                        type: DataOwnerTypeEnum.ORGANISATION,
                        dataOwner: mapHealthcarePartyDtoToOrganisation(dto.dataOwner),
                    }
                } else {
                    throw new Error(`Unknown data owner domain type ${domainType}`)
                }
            }
            default: {
                throw new Error(`Data owner dto type ${dto?.type} not supported`)
            }
        }
    }

    toDto(domain: DataOwnerWithType): DataOwnerWithTypeDto {
        if (domain.type === DataOwnerTypeEnum.PATIENT) {
            return {
                type: DataOwnerTypeEnumDto.Patient,
                dataOwner: mapPatientToPatientDto(domain.dataOwner),
            }
        } else if (domain.type === DataOwnerTypeEnum.PRACTITIONER) {
            return {
                type: DataOwnerTypeEnumDto.Hcp,
                dataOwner: mapPractitionerToHealthcarePartyDto(domain.dataOwner),
            }
        } else if (domain.type === DataOwnerTypeEnum.ORGANISATION) {
            return {
                type: DataOwnerTypeEnumDto.Hcp,
                dataOwner: mapOrganisationToHealthcarePartyDto(domain.dataOwner),
            }
        } else {
            // @ts-ignore
            throw new Error(`Unknown data owner domain type ${domain?.type}`)
        }
    }
}

export default new DataOwnerMapper()
