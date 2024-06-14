import { DataOwnerTypeEnumDto, DataOwnerWithType, DataOwnerWithTypeDto, Mapper } from '@icure/typescript-common'
import { DataOwnerTypeEnum } from '../models/DataOwner.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from './Patient.mapper'
import { mapHealthcarePartyDtoToHealthcareProfessional, mapHealthcareProfessionalToHealthcarePartyDto } from './HealthcareProfessional.mapper'
import { mapDeviceDtoToMedicalDevice, mapMedicalDeviceToDeviceDto } from './MedicalDevice.mapper'

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
                    dataOwner: mapHealthcarePartyDtoToHealthcareProfessional(dataOwner),
                }
            }
            case DataOwnerTypeEnumDto.Device: {
                return {
                    type: DataOwnerTypeEnum.MedicalDevice,
                    dataOwner: mapDeviceDtoToMedicalDevice(dataOwner),
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
                dataOwner: mapHealthcareProfessionalToHealthcarePartyDto(dataOwner),
            }
        } else if (type === DataOwnerTypeEnum.MedicalDevice) {
            return {
                type: DataOwnerTypeEnumDto.Device,
                dataOwner: mapMedicalDeviceToDeviceDto(dataOwner),
            }
        } else {
            // @ts-ignore
            throw new Error(`Unknown data owner domain type ${type}`)
        }
    }
}

export default new DataOwnerMapper()
