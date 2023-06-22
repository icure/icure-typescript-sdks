import { User } from "../models/User.model"
import { User as UserDto } from "@icure/api"
import {createMap, forMember, ignore, mapFrom, Mapper} from "@automapper/core"

function forMember_UserDto_id() {
    return forMember<User, UserDto>(v => v.id, mapFrom(u => u.id))
}

function forMember_UserDto_rev() {
    return forMember<User, UserDto>(v => v.rev, mapFrom(u => u.rev))
}

function forMember_UserDto_deletionDate() {
    return forMember<User, UserDto>(v => v.deletionDate, mapFrom(u => u.deletionDate))
}

function forMember_UserDto_created() {
    return forMember<User, UserDto>(v => v.created, mapFrom(u => u.created))
}

function forMember_UserDto_name() {
    return forMember<User, UserDto>(v => v.name, mapFrom(u => u.name))
}

function forMember_UserDto_properties() {
    return forMember<User, UserDto>(v => v.properties, mapFrom(u => [...u.properties]))
}

function forMember_UserDto_permissions() {
    return forMember<User, UserDto>(v => v.permissions, ignore())
}

function forMember_UserDto_roles() {
    return forMember<User, UserDto>(v => v.roles, mapFrom(u => [...u.roles]))
}

function forMember_UserDto_type() {
    return forMember<User, UserDto>(v => v.type, ignore())
}

function forMember_UserDto_status() {
    return forMember<User, UserDto>(v => v.status, ignore())
}

function forMember_UserDto_login() {
    return forMember<User, UserDto>(v => v.login, mapFrom(u => u.login))
}

function forMember_UserDto_passwordHash() {
    return forMember<User, UserDto>(v => v.passwordHash, mapFrom(u => u.passwordHash))
}

function forMember_UserDto_secret() {
    return forMember<User, UserDto>(v => v.secret, mapFrom(u => u.secret))
}

function forMember_UserDto_use2fa() {
    return forMember<User, UserDto>(v => v.use2fa, mapFrom(u => u.use2fa))
}

function forMember_UserDto_groupId() {
    return forMember<User, UserDto>(v => v.groupId, mapFrom(u => u.groupId))
}

function forMember_UserDto_healthcarePartyId() {
    return forMember<User, UserDto>(v => v.healthcarePartyId, mapFrom(u => u.healthcarePartyId))
}

function forMember_UserDto_patientId() {
    return forMember<User, UserDto>(v => v.patientId, mapFrom(u => u.patientId))
}

function forMember_UserDto_deviceId() {
    return forMember<User, UserDto>(v => v.deviceId, mapFrom(u => u.deviceId))
}

function forMember_UserDto_autoDelegations() {
    return forMember<User, UserDto>(v => v.autoDelegations, mapFrom(u => Object.fromEntries([...u.sharingDataWith.entries()].map(([k, v]) => [k, [...v]]))))
}

function forMember_UserDto_createdDate() {
    return forMember<User, UserDto>(v => v.createdDate, ignore())
}

function forMember_UserDto_termsOfUseDate() {
    return forMember<User, UserDto>(v => v.termsOfUseDate, ignore())
}

function forMember_UserDto_email() {
    return forMember<User, UserDto>(v => v.email, mapFrom(u => u.email))
}

function forMember_UserDto_mobilePhone() {
    return forMember<User, UserDto>(v => v.mobilePhone, mapFrom(u => u.mobilePhone))
}

function forMember_UserDto_applicationTokens() {
    return forMember<User, UserDto>(v => v.applicationTokens, ignore())
}

function forMember_UserDto_authenticationTokens() {
    return forMember<User, UserDto>(v => v.authenticationTokens, mapFrom(u => Object.fromEntries([...u.authenticationTokens.entries()])))
}

function forMember_User_id() {
    return forMember<UserDto, User>(v => v.id, mapFrom(u => u.id))
}

function forMember_User_rev() {
    return forMember<UserDto, User>(v => v.rev, mapFrom(u => u.rev))
}

function forMember_User_deletionDate() {
    return forMember<UserDto, User>(v => v.deletionDate, mapFrom(u => u.deletionDate))
}

function forMember_User_created() {
    return forMember<UserDto, User>(v => v.created, mapFrom(u => u.created))
}

function forMember_User_name() {
    return forMember<UserDto, User>(v => v.name, mapFrom(u => u.name))
}

function forMember_User_properties() {
    return forMember<UserDto, User>(v => v.properties, mapFrom(u => u.properties))
}

function forMember_User_roles() {
    return forMember<UserDto, User>(v => v.roles, mapFrom(u => new Set(u.roles)))
}

function forMember_User_login() {
    return forMember<UserDto, User>(v => v.login, mapFrom(u => u.login))
}

function forMember_User_passwordHash() {
    return forMember<UserDto, User>(v => v.passwordHash, mapFrom(u => u.passwordHash))
}

function forMember_User_secret() {
    return forMember<UserDto, User>(v => v.secret, mapFrom(u => u.secret))
}

function forMember_User_use2fa() {
    return forMember<UserDto, User>(v => v.use2fa, mapFrom(u => u.use2fa))
}

function forMember_User_groupId() {
    return forMember<UserDto, User>(v => v.groupId, mapFrom(u => u.groupId))
}

function forMember_User_healthcarePartyId() {
    return forMember<UserDto, User>(v => v.healthcarePartyId, mapFrom(u => u.healthcarePartyId))
}

function forMember_User_patientId() {
    return forMember<UserDto, User>(v => v.patientId, mapFrom(u => u.patientId))
}

function forMember_User_deviceId() {
    return forMember<UserDto, User>(v => v.deviceId, mapFrom(u => u.deviceId))
}

function forMember_User_sharingDataWith() {
    return forMember<UserDto, User>(v => v.sharingDataWith, mapFrom(u => new Map(Object.entries(u.autoDelegations ?? {}).map(([k, v]) => [k, new Set(v)]))))
}

function forMember_User_email() {
    return forMember<UserDto, User>(v => v.email, mapFrom(u => u.email))
}

function forMember_User_mobilePhone() {
    return forMember<UserDto, User>(v => v.mobilePhone, mapFrom(u => u.mobilePhone))
}

function forMember_User_authenticationTokens() {
    return forMember<UserDto, User>(v => v.authenticationTokens, mapFrom(u => u.authenticationTokens))
}

export function initializeUserMapper(mapper: Mapper) {
    createMap(mapper, User, UserDto, forMember_UserDto_id(), forMember_UserDto_rev(), forMember_UserDto_deletionDate(), forMember_UserDto_created(), forMember_UserDto_name(), forMember_UserDto_properties(), forMember_UserDto_permissions(), forMember_UserDto_roles(), forMember_UserDto_type(), forMember_UserDto_status(), forMember_UserDto_login(), forMember_UserDto_passwordHash(), forMember_UserDto_secret(), forMember_UserDto_use2fa(), forMember_UserDto_groupId(), forMember_UserDto_healthcarePartyId(), forMember_UserDto_patientId(), forMember_UserDto_deviceId(), forMember_UserDto_autoDelegations(), forMember_UserDto_createdDate(), forMember_UserDto_termsOfUseDate(), forMember_UserDto_email(), forMember_UserDto_mobilePhone(), forMember_UserDto_applicationTokens(), forMember_UserDto_authenticationTokens())

    createMap(mapper, UserDto, User, forMember_User_id(), forMember_User_rev(), forMember_User_deletionDate(), forMember_User_created(), forMember_User_name(), forMember_User_properties(), forMember_User_roles(), forMember_User_login(), forMember_User_passwordHash(), forMember_User_secret(), forMember_User_use2fa(), forMember_User_groupId(), forMember_User_healthcarePartyId(), forMember_User_patientId(), forMember_User_deviceId(), forMember_User_sharingDataWith(), forMember_User_email(), forMember_User_mobilePhone(), forMember_User_authenticationTokens())
}
