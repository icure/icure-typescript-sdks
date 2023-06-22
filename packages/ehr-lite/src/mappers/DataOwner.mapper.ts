import {Mapper} from "@icure/typescript-common/dist/apis/Mapper";
import {DataOwnerWithType, extractDataOwnerDomainType} from "@icure/typescript-common";
import {DataOwnerTypeEnum as DataOwnerTypeEnumDto} from "@icure/api/icc-api/model/DataOwnerTypeEnum";
import {DataOwnerTypeEnum} from "../models/DataOwner.model";
import {mapper} from "./mapper";
import {HealthcareParty, Patient as PatientDto} from "@icure/api";
import {Patient} from "../models/Patient.model";
import {Practitioner} from "../models/Practitioner.model";
import {Organisation} from "../models/Organisation.model";

class DataOwnerMapper implements Mapper<DataOwnerWithType, DataOwnerWithType>{
    toDomain(dto: DataOwnerWithType): DataOwnerWithType {
        switch (dto.type) {
            case DataOwnerTypeEnumDto.Patient: {
                return {
                    type: DataOwnerTypeEnum.PATIENT,
                    dataOwner: mapper.map(dto.dataOwner, PatientDto, Patient)
                }
            }
            case DataOwnerTypeEnumDto.Hcp: {
                const domainType = extractDataOwnerDomainType(dto.dataOwner)

                if (domainType === DataOwnerTypeEnum.PRACTITIONER) {
                    return {
                        type: DataOwnerTypeEnum.PRACTITIONER,
                        dataOwner: mapper.map(dto.dataOwner, HealthcareParty, Practitioner)
                    }
                } else if (domainType === DataOwnerTypeEnum.ORGANISATION) {
                    return {
                        type: DataOwnerTypeEnum.ORGANISATION,
                        dataOwner: mapper.map(dto.dataOwner, HealthcareParty, Organisation)
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

    toDto(domain: DataOwnerWithType): DataOwnerWithType {
        if (domain.type === DataOwnerTypeEnum.PATIENT) {
            return {
                type: DataOwnerTypeEnumDto.Patient,
                dataOwner: mapper.map(domain.dataOwner, Patient, PatientDto)
            }
        } else if (domain.type === DataOwnerTypeEnum.PRACTITIONER) {
            return {
                type: DataOwnerTypeEnumDto.Hcp,
                dataOwner: mapper.map(domain.dataOwner, Practitioner, HealthcareParty)
            }
        } else if (domain.type === DataOwnerTypeEnum.ORGANISATION) {
            return {
                type: DataOwnerTypeEnumDto.Hcp,
                dataOwner: mapper.map(domain.dataOwner, Organisation, HealthcareParty)
            }
        } else {
            // @ts-ignore
            throw new Error(`Unknown data owner domain type ${domain?.type}`)
        }
    }
}

export default new DataOwnerMapper()