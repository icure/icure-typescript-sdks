import 'mocha'

import { User } from '../..'
import { assert } from 'chai'
import { newProperty } from './propertyTest'
import { newAuthenticationToken } from './authenticationTokenTest'
import { mapOf } from '@icure/typescript-common'
import { v4 } from 'uuid'

export function newUser(): User {
    return new User({
        id: v4(),
        rev: 'rev',
        deletionDate: 123,
        created: 456,
        name: 'name',
        properties: new Set([newProperty()]),
        roles: new Set(['roles']),
        login: 'login',
        passwordHash: 'passwordHash',
        secret: 'secret',
        use2fa: true,
        groupId: 'groupId',
        healthcarePartyId: 'healthcarePartyId',
        patientId: 'patientId',
        deviceId: 'deviceId',
        sharingDataWith: mapOf({ all: new Set(['sharingDataWith']) }),
        email: 'email',
        mobilePhone: 'mobilePhone',
        authenticationTokens: mapOf({ key: newAuthenticationToken() }),
    })
}

describe('User model test', () => {
    it('Marshalling/Unmarshalling of User model - Success', () => {
        const user = newUser()
        const marshalledUser = User.toJSON(user)
        const unmarshalledUser = User.fromJSON(JSON.parse(JSON.stringify(marshalledUser)))
        assert.deepEqual(user, unmarshalledUser)
        assert.deepEqual(user, new User(user))
    })
})
