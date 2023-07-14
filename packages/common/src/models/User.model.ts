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
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { AuthenticationToken } from './AuthenticationToken.model'
import { Property } from './Property.model'

@mapTo(UserDto)
export class User {
    /**
     * the Id of the user. We encourage using either a v4 UUID or a HL7 Id.
     */
    'id': string
    /**
     * the revision of the user in the database, used for conflict management / optimistic locking.
     */
    'rev'?: string
    /**
     * the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion
     */
    'deletionDate'?: number
    /**
     * the creation date of the user (encoded as epoch).
     */
    'created'?: number
    /**
     * Last name of the user. This is the official last name that should be used for official administrative purposes.
     */
    'name'?: string
    /**
     * Extra properties for the user. Those properties are typed (see class Property)
     */
    'properties': Set<Property>
    /**
     * Roles assigned to this user
     */
    'roles': Set<string>
    /**
     * Username for this user. We encourage using an email address
     */
    'login'?: string
    /**
     * Hashed version of the password (BCrypt is used for hashing)
     */
    'passwordHash'?: string
    /**
     * Secret token used to verify 2fa
     */
    'secret'?: string
    /**
     * Whether the user has activated two factors authentication
     */
    'use2fa'?: boolean
    /**
     * id of the group (practice/hospital) the user is member of
     */
    'groupId'?: string
    /**
     * Id of the healthcare party if the user is a healthcare party.
     */
    'healthcarePartyId'?: string
    /**
     * Id of the patient if the user is a patient
     */
    'patientId'?: string
    /**
     * Id of the patient if the user is a patient
     */
    'deviceId'?: string
    /**
     * Ids of the dataOwners with who the user is sharing all new data he is creating in iCure : All Data Types that may be shared can be found in SharedDataType enum
     */
    'sharingDataWith': Map<SharedDataType, Set<string>>
    /**
     * email address of the user (used for token exchange or password recovery).
     */
    'email'?: string
    /**
     * mobile phone of the user (used for token exchange or password recovery).
     */
    'mobilePhone'?: string
    /**
     * Encrypted and time-limited Authentication tokens used for inter-applications authentication
     */
    'authenticationTokens': Map<string, AuthenticationToken>

    constructor(json: IUser) {
        this.id = forceUuid(json.id)
        this.rev = json.rev
        this.deletionDate = json.deletionDate
        this.created = json.created
        this.name = json.name
        this.properties = json.properties ?? new Set()
        this.roles = json.roles ?? new Set()
        this.login = json.login
        this.passwordHash = json.passwordHash
        this.secret = json.secret
        this.use2fa = json.use2fa
        this.groupId = json.groupId
        this.healthcarePartyId = json.healthcarePartyId
        this.patientId = json.patientId
        this.deviceId = json.deviceId
        this.sharingDataWith = json.sharingDataWith ?? new Map()
        this.email = json.email
        this.mobilePhone = json.mobilePhone
        this.authenticationTokens = json.authenticationTokens ?? new Map()
    }

    static toJSON(instance: User): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        pojo['rev'] = instance.rev
        pojo['deletionDate'] = instance.deletionDate
        pojo['created'] = instance.created
        pojo['name'] = instance.name
        pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
        pojo['roles'] = Array.from([...instance.roles].map((item) => item))
        pojo['login'] = instance.login
        pojo['passwordHash'] = instance.passwordHash
        pojo['secret'] = instance.secret
        pojo['use2fa'] = instance.use2fa
        pojo['groupId'] = instance.groupId
        pojo['healthcarePartyId'] = instance.healthcarePartyId
        pojo['patientId'] = instance.patientId
        pojo['deviceId'] = instance.deviceId
        pojo['sharingDataWith'] = Object.fromEntries([...instance.sharingDataWith.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => item))]))
        pojo['email'] = instance.email
        pojo['mobilePhone'] = instance.mobilePhone
        pojo['authenticationTokens'] = Object.fromEntries([...instance.authenticationTokens.entries()].map(([k, v]) => [k, AuthenticationToken.toJSON(v)]))
        return pojo
    }

    static fromJSON(pojo: any): User {
        return new User({
            id: pojo['id'],
            rev: pojo['rev'],
            deletionDate: pojo['deletionDate'],
            created: pojo['created'],
            name: pojo['name'],
            properties: new Set(pojo['properties'].map((item: any) => Property.fromJSON(item))),
            roles: new Set(pojo['roles'].map((item: any) => item)),
            login: pojo['login'],
            passwordHash: pojo['passwordHash'],
            secret: pojo['secret'],
            use2fa: pojo['use2fa'],
            groupId: pojo['groupId'],
            healthcarePartyId: pojo['healthcarePartyId'],
            patientId: pojo['patientId'],
            deviceId: pojo['deviceId'],
            sharingDataWith: new Map(Object.entries(pojo['sharingDataWith']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => item))])),
            email: pojo['email'],
            mobilePhone: pojo['mobilePhone'],
            authenticationTokens: new Map(Object.entries(pojo['authenticationTokens']).map(([k, v]: [any, any]) => [k, AuthenticationToken.fromJSON(v)])),
        })
    }
}

export type SharedDataType = 'all' | 'administrativeData' | 'generalInformation' | 'financialInformation' | 'medicalInformation' | 'sensitiveInformation' | 'confidentialInformation'

interface IUser {
    id?: string
    rev?: string
    deletionDate?: number
    created?: number
    name?: string
    properties?: Set<Property>
    roles?: Set<string>
    login?: string
    passwordHash?: string
    secret?: string
    use2fa?: boolean
    groupId?: string
    healthcarePartyId?: string
    patientId?: string
    deviceId?: string
    sharingDataWith?: Map<SharedDataType, Set<string>>
    email?: string
    mobilePhone?: string
    authenticationTokens?: Map<string, AuthenticationToken>
}
