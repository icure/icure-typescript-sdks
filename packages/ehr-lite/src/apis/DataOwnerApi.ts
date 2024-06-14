import { CommonApi, DataOwnerLikeApi, DataOwnerLikeApiImpl, DataOwnerWithType, mapUserDtoToUser, mapUserToUserDto, User, UserDto } from '@icure/typescript-common'
import { DataOwner, DataOwnerWithType as EHRDataOwnerWithType } from '../models/DataOwner.model'
import { Patient } from '../models/Patient.model'
import dataOwnerMapper from '../mappers/DataOwner.mapper'

export interface DataOwnerApi extends DataOwnerLikeApi<EHRDataOwnerWithType, User> {}

class DataOwnerApiImpl extends DataOwnerLikeApiImpl<EHRDataOwnerWithType, DataOwner, Patient, User> {}

export const dataOwnerApi = (api: CommonApi): DataOwnerApi =>
    new DataOwnerApiImpl(
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
        api.baseApi.icureMaintenanceTaskApi,
    )
