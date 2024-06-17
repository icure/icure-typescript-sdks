import { SharedDataType, User } from '../models/User.model'
import { Permission as PermissionDto, PropertyStub as PropertyStubDto, User as UserDto } from '@icure/api'
import { mapPropertyStubToProperty, mapPropertyToPropertyStub } from './Property.mapper'
import { Property } from '../models/Property.model'
import { AuthenticationToken } from '../models/AuthenticationToken.model'
import { forceUuid } from '../utils/uuidUtils'
import SystemMetadata = UserDto.SystemMetadata

export function toUserDtoId(domain: User): string | undefined {
    return forceUuid(domain.id)
}

export function toUserDtoRev(domain: User): string | undefined {
    return domain.rev
}

export function toUserDtoDeletionDate(domain: User): number | undefined {
    return domain.deletionDate
}

export function toUserDtoCreated(domain: User): number | undefined {
    return domain.created
}

export function toUserDtoName(domain: User): string | undefined {
    return domain.name
}

export function toUserDtoProperties(domain: User): PropertyStubDto[] | undefined {
    return [...domain.properties].map(mapPropertyToPropertyStub)
}

export function toUserDtoPermissions(domain: User): PermissionDto[] | undefined {
    return undefined
}

export function toUserDtoRoles(domain: User): string[] | undefined {
    return [...domain.roles]
}

export function toUserDtoType(domain: User): UserDto.TypeEnum | undefined {
    return undefined
}

export function toUserDtoStatus(domain: User): UserDto.StatusEnum | undefined {
    return undefined
}

export function toUserDtoLogin(domain: User): string | undefined {
    return domain.login
}

export function toUserDtoPasswordHash(domain: User): string | undefined {
    return domain.passwordHash
}

export function toUserDtoSecret(domain: User): string | undefined {
    return domain.secret
}

export function toUserDtoUse2fa(domain: User): boolean | undefined {
    return domain.use2fa
}

export function toUserDtoGroupId(domain: User): string | undefined {
    return domain.groupId
}

export function toUserDtoHealthcarePartyId(domain: User): string | undefined {
    return domain.healthcarePartyId
}

export function toUserDtoPatientId(domain: User): string | undefined {
    return domain.patientId
}

export function toUserDtoDeviceId(domain: User): string | undefined {
    return domain.deviceId
}

export function toUserDtoAutoDelegations(domain: User):
    | {
          all?: string[] | undefined
          administrativeData?: string[] | undefined
          generalInformation?: string[] | undefined
          financialInformation?: string[] | undefined
          medicalInformation?: string[] | undefined
          sensitiveInformation?: string[] | undefined
          confidentialInformation?: string[] | undefined
          cdItemRisk?: string[] | undefined
          cdItemFamilyRisk?: string[] | undefined
          cdItemHealthcareelement?: string[] | undefined
          cdItemHealthcareapproach?: string[] | undefined
          cdItemAllergy?: string[] | undefined
          cdItemDiagnosis?: string[] | undefined
          cdItemLab?: string[] | undefined
          cdItemResult?: string[] | undefined
          cdItemParameter?: string[] | undefined
          cdItemMedication?: string[] | undefined
          cdItemTreatment?: string[] | undefined
          cdItemVaccine?: string[] | undefined
      }
    | undefined {
    return Object.fromEntries(Object.entries(domain.sharingDataWith ?? {}).map(([k, v]) => [k, [...v]]))
}

export function toUserDtoCreatedDate(domain: User): number | undefined {
    return undefined
}

export function toUserDtoTermsOfUseDate(domain: User): number | undefined {
    return undefined
}

export function toUserDtoEmail(domain: User): string | undefined {
    return domain.email
}

export function toUserDtoMobilePhone(domain: User): string | undefined {
    return domain.mobilePhone
}

export function toUserDtoApplicationTokens(domain: User): { [key: string]: string } | undefined {
    return undefined
}

export function toUserDtoAuthenticationTokens(domain: User):
    | {
          [key: string]: AuthenticationToken
      }
    | undefined {
    return Object.fromEntries(Object.entries(domain.authenticationTokens))
}

export function toUserId(dto: UserDto): string {
    return dto.id ?? forceUuid()
}

export function toUserRev(dto: UserDto): string | undefined {
    return dto.rev
}

export function toUserDeletionDate(dto: UserDto): number | undefined {
    return dto.deletionDate
}

export function toUserCreated(dto: UserDto): number | undefined {
    return dto.created
}

export function toUserName(dto: UserDto): string | undefined {
    return dto.name
}

export function toUserProperties(dto: UserDto): Array<Property> {
    return !!dto.properties ? [...dto.properties].map(mapPropertyStubToProperty) : []
}

export function toUserRoles(dto: UserDto): Array<string> {
    return !!dto.systemMetadata?.roles ? dto.systemMetadata?.roles : []
}

export function toUserLogin(dto: UserDto): string | undefined {
    return dto.login
}

export function toUserPasswordHash(dto: UserDto): string | undefined {
    return dto.passwordHash
}

export function toUserSecret(dto: UserDto): string | undefined {
    return dto.secret
}

export function toUserUse2fa(dto: UserDto): boolean | undefined {
    return dto.use2fa
}

export function toUserGroupId(dto: UserDto): string | undefined {
    return dto.groupId
}

export function toUserHealthcarePartyId(dto: UserDto): string | undefined {
    return dto.healthcarePartyId
}

export function toUserPatientId(dto: UserDto): string | undefined {
    return dto.patientId
}

export function toUserDeviceId(dto: UserDto): string | undefined {
    return dto.deviceId
}

export function toUserSharingDataWith(dto: UserDto): Partial<Record<SharedDataType, Array<string>>> {
    return Object.fromEntries(Object.entries(dto.autoDelegations ?? {}).map(([k, v]) => [k, v]))
}

export function toUserEmail(dto: UserDto): string | undefined {
    return dto.email
}

export function toUserMobilePhone(dto: UserDto): string | undefined {
    return dto.mobilePhone
}

export function toUserAuthenticationTokens(dto: UserDto): Record<string, AuthenticationToken> {
    return !!dto.authenticationTokens ? Object.fromEntries(Object.entries(dto.authenticationTokens).map(([k, at]) => [k, new AuthenticationToken(at)])) : {}
}

function toUserDtoSystemMetadata(domain: User): SystemMetadata | undefined {
    return undefined
}

function toUserIsAdmin(dto: UserDto): boolean | undefined {
    return dto.systemMetadata?.isAdmin
}

function toUserInheritsRoles(dto: UserDto): boolean | undefined {
    return dto.systemMetadata?.inheritsRoles
}

export function mapUserDtoToUser(dto: UserDto): User {
    return new User({
        id: toUserId(dto),
        rev: toUserRev(dto),
        deletionDate: toUserDeletionDate(dto),
        created: toUserCreated(dto),
        name: toUserName(dto),
        properties: toUserProperties(dto),
        roles: toUserRoles(dto),
        isAdmin: toUserIsAdmin(dto),
        inheritsRoles: toUserInheritsRoles(dto),
        login: toUserLogin(dto),
        passwordHash: toUserPasswordHash(dto),
        secret: toUserSecret(dto),
        use2fa: toUserUse2fa(dto),
        groupId: toUserGroupId(dto),
        healthcarePartyId: toUserHealthcarePartyId(dto),
        patientId: toUserPatientId(dto),
        deviceId: toUserDeviceId(dto),
        sharingDataWith: toUserSharingDataWith(dto),
        email: toUserEmail(dto),
        mobilePhone: toUserMobilePhone(dto),
        authenticationTokens: toUserAuthenticationTokens(dto),
    })
}

export function mapUserToUserDto(domain: User): UserDto {
    return new UserDto({
        id: toUserDtoId(domain),
        rev: toUserDtoRev(domain),
        deletionDate: toUserDtoDeletionDate(domain),
        created: toUserDtoCreated(domain),
        name: toUserDtoName(domain),
        properties: toUserDtoProperties(domain),
        permissions: toUserDtoPermissions(domain),
        roles: toUserDtoRoles(domain),
        type: toUserDtoType(domain),
        status: toUserDtoStatus(domain),
        login: toUserDtoLogin(domain),
        passwordHash: toUserDtoPasswordHash(domain),
        secret: toUserDtoSecret(domain),
        use2fa: toUserDtoUse2fa(domain),
        groupId: toUserDtoGroupId(domain),
        healthcarePartyId: toUserDtoHealthcarePartyId(domain),
        patientId: toUserDtoPatientId(domain),
        deviceId: toUserDtoDeviceId(domain),
        autoDelegations: toUserDtoAutoDelegations(domain),
        createdDate: toUserDtoCreatedDate(domain),
        termsOfUseDate: toUserDtoTermsOfUseDate(domain),
        email: toUserDtoEmail(domain),
        mobilePhone: toUserDtoMobilePhone(domain),
        applicationTokens: toUserDtoApplicationTokens(domain),
        authenticationTokens: toUserDtoAuthenticationTokens(domain),
        systemMetadata: toUserDtoSystemMetadata(domain),
    })
}
