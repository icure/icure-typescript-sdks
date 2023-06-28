import { DataOwnerApiImpl, ErrorHandler, mapUserDtoToUser, mapUserToUserDto, User } from '@icure/typescript-common'
import { DataOwner, DataOwnerWithType as EHRDataOwnerWithType } from '../models/DataOwner.model'
import { Patient } from '../models/Patient.model'
import { DataOwnerWithType, IccPatientXApi, User as UserDto } from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { IccIcureMaintenanceXApi } from '@icure/api/icc-x-api/icc-icure-maintenance-x-api'
import dataOwnerMapper from '../mappers/DataOwner.mapper'

export const dataOwnerApi = (errorHandler: ErrorHandler, dataOwnerApi: IccDataOwnerXApi, patientApi: IccPatientXApi, icureMaintenanceApi: IccIcureMaintenanceXApi) =>
    new DataOwnerApiImpl<EHRDataOwnerWithType, DataOwner, Patient, User>(
        {
            toDomain(dto: DataOwnerWithType): EHRDataOwnerWithType {
                return dataOwnerMapper.toDomain(dto)
            },
            toDto(domain: EHRDataOwnerWithType): DataOwnerWithType {
                return dataOwnerMapper.toDto(domain)
            },
        },
        {
            toDomain(dto: UserDto): User {
                return mapUserDtoToUser(dto)
            },
            toDto(domain: User): UserDto {
                return mapUserToUserDto(domain)
            },
        },
        errorHandler,
        dataOwnerApi,
        patientApi,
        icureMaintenanceApi
    )
