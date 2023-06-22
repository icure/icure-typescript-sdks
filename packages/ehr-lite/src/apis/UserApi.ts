import {IccUserXApi, User as UserDto, Patient as PatientDto} from "@icure/api";
import {ErrorHandler, MessageGatewayApi, Sanitizer, User, UserLikeApiImpl} from "@icure/typescript-common";
import {Patient} from "../models/Patient.model";
import {mapper} from "../mappers/mapper";

export const userApi = (
    errorHandler: ErrorHandler,
    sanitizer: Sanitizer,
    userApi: IccUserXApi,
    messageGatewayApi?: MessageGatewayApi,
) => new UserLikeApiImpl<User, Patient>(
    {
        toDomain(dto: UserDto): User {
            return mapper.map(dto, UserDto, User)
        },
        toDto(domain: User): UserDto {
            return mapper.map(domain, User, UserDto)
        }
    },
    {
        toDomain(dto: PatientDto): Patient {
            return mapper.map(dto, PatientDto, Patient)
        },
        toDto(domain: Patient): PatientDto {
            return mapper.map(domain, Patient, PatientDto)
        }
    },
    errorHandler,
    sanitizer,
    userApi,
    messageGatewayApi
)