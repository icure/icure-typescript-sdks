import { Mapper } from '@icure/typescript-common'
import { DataOwnerWithType, DataOwnerTypeEnumDto, DataOwnerWithTypeDto } from '@icure/typescript-common'
import { DataOwnerTypeEnum } from '../models/DataOwner.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from './Patient.mapper'
import { mapHealthcarePartyToHealthcareProfessional, mapHealthcareProfessionalToHealthcareParty } from './HealthcareProfessional.mapper'
import { mapDeviceToMedicalDevice, mapMedicalDeviceToDevice } from './MedicalDevice.mapper'

class DataOwnerMapper implements Mapper<DataOwnerWithType, DataOwnerWithTypeDto> {
    toDomain({ dataOwner, type }: DataOwnerWithTypeDto): DataOwnerWithType {
        switch (type) {
            case DataOwnerTypeEnumDto.Patient: {
                return {
                    type: DataOwnerTypeEnum.Patient,
                    dataOwner: mapPatientDtoToPatient(dataOwner),
                }
            }
            case DataOwnerTypeEnumDto.Hcp: {
                return {
                    type: DataOwnerTypeEnum.HealthcareProfessional,
                    dataOwner: mapHealthcarePartyToHealthcareProfessional(dataOwner),
                }
            }
            case DataOwnerTypeEnumDto.Device: {
                return {
                    type: DataOwnerTypeEnum.MedicalDevice,
                    dataOwner: mapDeviceToMedicalDevice(dataOwner),
                }
            }
            default: {
                throw new Error(`Data owner dto type ${type} not supported`)
            }
        }
    }

    toDto({ dataOwner, type }: DataOwnerWithType): DataOwnerWithTypeDto {
        if (type === DataOwnerTypeEnum.Patient) {
            return {
                type: DataOwnerTypeEnumDto.Patient,
                dataOwner: mapPatientToPatientDto(dataOwner),
            }
        } else if (type === DataOwnerTypeEnum.HealthcareProfessional) {
            return {
                type: DataOwnerTypeEnumDto.Hcp,
                dataOwner: mapHealthcareProfessionalToHealthcareParty(dataOwner),
            }
        } else if (type === DataOwnerTypeEnum.MedicalDevice) {
            return {
                type: DataOwnerTypeEnumDto.Device,
                dataOwner: mapMedicalDeviceToDevice(dataOwner),
            }
        } else {
            // @ts-ignore
            throw new Error(`Unknown data owner domain type ${type}`)
        }
    }
}

export default new DataOwnerMapper()
