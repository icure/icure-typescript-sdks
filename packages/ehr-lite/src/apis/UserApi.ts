import { IccUserXApi, User as UserDto, Patient as PatientDto } from '@icure/api'
import { ErrorHandler, mapUserDtoToUser, mapUserToUserDto, MessageGatewayApi, Sanitizer, User, UserLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

export const userApi = (errorHandler: ErrorHandler, sanitizer: Sanitizer, userApi: IccUserXApi, messageGatewayApi?: MessageGatewayApi) =>
    new UserLikeApiImpl<User, Patient>(
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
        errorHandler,
        sanitizer,
        userApi,
        messageGatewayApi
    )
