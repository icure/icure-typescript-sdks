import { CommonApi, DataOwnerLikeApiImpl, mapUserDtoToUser, mapUserToUserDto, User } from '@icure/typescript-common'
import { DataOwner, DataOwnerWithType as EHRDataOwnerWithType } from '../models/DataOwner.model'
import { Patient } from '../models/Patient.model'
import { DataOwnerWithType, User as UserDto } from '@icure/api'
import dataOwnerMapper from '../mappers/DataOwner.mapper'

export class DataOwnerApi extends DataOwnerLikeApiImpl<EHRDataOwnerWithType, DataOwner, Patient, User> {
}

export const dataOwnerApi = (api: CommonApi) =>
    new DataOwnerApi(
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
        api.errorHandler,
        api.baseApi.dataOwnerApi,
        api.baseApi.patientApi,
        api.baseApi.icureMaintenanceTaskApi
    )
