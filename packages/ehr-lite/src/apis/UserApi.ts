import { User as UserDto, Patient as PatientDto, HealthcareParty as HealthcarePartyDto } from '@icure/api'
import { CommonApi, mapUserDtoToUser, mapUserToUserDto, User, UserLikeApi, UserLikeApiImpl } from '@icure/typescript-common'
import { Patient } from '../models/Patient.model'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'
import { Practitioner } from '../models/Practitioner.model'
import { Organisation } from '../models/Organisation.model'
import { EHRLiteMessageFactory } from '../services/EHRLiteMessageFactory'
import { mapDomainToHealthcareParty, mapHealthcarePartyToDomain } from '../mappers/HealthcareParty.mapper'

export interface UserApi extends UserLikeApi<User, Patient> {}

class UserApiImpl extends UserLikeApiImpl<User, Patient, Practitioner | Organisation> implements UserApi {}

export const userApi = (api: CommonApi, messageFactory: EHRLiteMessageFactory, basePath: string): UserApi =>
    new UserApiImpl(
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
            toDomain(dto: HealthcarePartyDto): Practitioner | Organisation {
                return mapHealthcarePartyToDomain(dto)
            },
            toDto(domain: Practitioner | Organisation): HealthcarePartyDto {
                return mapDomainToHealthcareParty(domain)
            },
        },
        api.errorHandler,
        api.sanitizer,
        api.baseApi.userApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.authApi,
        api,
        messageFactory,
        basePath,
        api.messageGatewayApi,
    )

//TODO: Instantiate JWTAuthService and expose JWT method to get token
