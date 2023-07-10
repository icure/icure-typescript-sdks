import { IccUserXApi, User as UserDto, Patient as PatientDto, PaginatedListUser } from '@icure/api'
import { CommonApi, ErrorHandler, mapUserDtoToUser, mapUserToUserDto, MessageGatewayApi, PaginatedList, Sanitizer, User, UserLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export class UserApi extends UserLikeApiImpl<User, Patient> {}

export const userApi = (api: CommonApi) =>
    new UserApi(
        {
            toDomain(dto: UserDto): User {
                return mapUserDtoToUser(dto)
            },
            toDto(domain: User): UserDto {
                return mapUserToUserDto(domain)
            },
        },
        {
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
        },
        {
            toDomain(dto: PaginatedListUser): PaginatedList<User> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapUserDtoToUser),
                }
            },
            toDto(domain: PaginatedList<User>): PaginatedListUser {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapUserToUserDto),
                }
            },
        },
        api.errorHandler,
        api.sanitizer,
        api.baseApi.userApi,
        api,
        api.messageGatewayApi
    )
