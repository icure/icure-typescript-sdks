/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { User as UserDto } from '@icure/api'
import { EntityId } from '../types'
import { mapTo } from '../utils/decorators'
import { AuthenticationToken, IAuthenticationToken } from './AuthenticationToken.model'
import { IProperty, Property } from './Property.model'

@mapTo(UserDto)
export class User {
    /**
     * the Id of the user. We encourage using either a v4 UUID or a HL7 Id.
     */
    id: string
    /**
     * the revision of the user in the database, used for conflict management / optimistic locking.
     */
    rev?: string
    /**
     * the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion
     */
    deletionDate?: number
    /**
     * the creation date of the user (encoded as epoch).
     */
    created?: number
    /**
     * Last name of the user. This is the official last name that should be used for official administrative purposes.
     */
    name?: string
    /**
     * Extra properties for the user. Those properties are typed (see class Property)
     */
    properties: Property[] = []
    /**
     * Roles assigned to this user
     */
    roles: string[] = []
    /**
     * If the user is considered as an admin by the cloud environment
     */
    isAdmin?: boolean
    /**
     * True if the content of roles is inherited from the user's group configuration, false if the roles are defined specifically for the use
     */
    inheritsRoles?: boolean
    /**
     * Username for this user. We encourage using an email address
     */
    login?: string
    /**
     * Hashed version of the password (BCrypt is used for hashing)
     */
    passwordHash?: string
    /**
     * Secret token used to verify 2fa
     */
    secret?: string
    /**
     * Whether the user has activated two factors authentication
     */
    use2fa?: boolean
    /**
     * id of the group (practice/hospital) the user is member of
     */
    groupId?: string
    /**
     * Id of the healthcare party if the user is a healthcare party.
     */
    healthcarePartyId?: string
    /**
     * Id of the patient if the user is a patient
     */
    patientId?: string
    /**
     * Id of the patient if the user is a patient
     */
    deviceId?: string
    /**
     * Ids of the dataOwners with who the user is sharing all new data he is creating in iCure : All Data Types that may be shared can be found in SharedDataType enum
     */
    sharingDataWith: Record<SharedDataType, Array<string>> = {} as Record<SharedDataType, Array<string>>
    /**
     * email address of the user (used for token exchange or password recovery).
     */
    email?: string
    /**
     * mobile phone of the user (used for token exchange or password recovery).
     */
    mobilePhone?: string
    /**
     * Encrypted and time-limited Authentication tokens used for inter-applications authentication
     */
    authenticationTokens: Record<string, AuthenticationToken>

    toJSON(): IUser {
        return {
            id: this.id,
            rev: this.rev,
            deletionDate: this.deletionDate,
            created: this.created,
            name: this.name,
            properties: this.properties.map((item) => item.toJSON()),
            roles: this.roles.map((item) => item),
            isAdmin: this.isAdmin,
            inheritsRoles: this.inheritsRoles,
            login: this.login,
            passwordHash: this.passwordHash,
            secret: this.secret,
            use2fa: this.use2fa,
            groupId: this.groupId,
            healthcarePartyId: this.healthcarePartyId,
            patientId: this.patientId,
            deviceId: this.deviceId,
            sharingDataWith: { ...this.sharingDataWith },
            email: this.email,
            mobilePhone: this.mobilePhone,
            authenticationTokens: Object.fromEntries(Object.entries(this.authenticationTokens).map(([k, v]: [any, AuthenticationToken]) => [k, v.toJSON()])),
        }
    }

    constructor(json: Partial<IUser> & { id: string; authenticationTokens: Record<string, IAuthenticationToken> }) {
        this.id = json['id']!
        if (json['rev'] !== undefined) {
            this.rev = json['rev']!
        }
        if (json['deletionDate'] !== undefined) {
            this.deletionDate = json['deletionDate']!
        }
        if (json['created'] !== undefined) {
            this.created = json['created']!
        }
        if (json['name'] !== undefined) {
            this.name = json['name']!
        }
        if (json['properties'] !== undefined) {
            this.properties = json['properties']!.map((item: any) => new Property(item))
        }
        if (json['roles'] !== undefined) {
            this.roles = json['roles']!.map((item: any) => item)
        }
        if (json['isAdmin'] !== undefined) {
            this.isAdmin = json['isAdmin']!
        }
        if (json['inheritsRoles'] !== undefined) {
            this.inheritsRoles = json['inheritsRoles']!
        }
        if (json['login'] !== undefined) {
            this.login = json['login']!
        }
        if (json['passwordHash'] !== undefined) {
            this.passwordHash = json['passwordHash']!
        }
        if (json['secret'] !== undefined) {
            this.secret = json['secret']!
        }
        if (json['use2fa'] !== undefined) {
            this.use2fa = json['use2fa']!
        }
        if (json['groupId'] !== undefined) {
            this.groupId = json['groupId']!
        }
        if (json['healthcarePartyId'] !== undefined) {
            this.healthcarePartyId = json['healthcarePartyId']!
        }
        if (json['patientId'] !== undefined) {
            this.patientId = json['patientId']!
        }
        if (json['deviceId'] !== undefined) {
            this.deviceId = json['deviceId']!
        }
        if (json['sharingDataWith'] !== undefined) {
            this.sharingDataWith = { ...json['sharingDataWith']! }
        }
        if (json['email'] !== undefined) {
            this.email = json['email']!
        }
        if (json['mobilePhone'] !== undefined) {
            this.mobilePhone = json['mobilePhone']!
        }
        this.authenticationTokens = Object.fromEntries(Object.entries(json['authenticationTokens']!).map(([k, v]: [any, IAuthenticationToken]) => [k, new AuthenticationToken(v)]))
    }
}

export type SharedDataType = 'all' | 'administrativeData' | 'generalInformation' | 'financialInformation' | 'medicalInformation' | 'sensitiveInformation' | 'confidentialInformation'

export interface IUser {
    id: EntityId
    rev?: string
    deletionDate?: number
    created?: number
    name?: string
    properties: IProperty[]
    roles: string[]
    isAdmin?: boolean
    inheritsRoles?: boolean
    login?: string
    passwordHash?: string
    secret?: string
    use2fa?: boolean
    groupId?: string
    healthcarePartyId?: string
    patientId?: string
    deviceId?: string
    sharingDataWith: Record<SharedDataType, Array<string>>
    email?: string
    mobilePhone?: string
    authenticationTokens: Record<string, IAuthenticationToken>
}
