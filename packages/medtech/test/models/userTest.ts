import 'mocha'

import { User } from '../..'
import { assert } from 'chai'
import { newProperty } from './propertyTest'
import { newAuthenticationToken } from './authenticationTokenTest'
import { recordOf } from '@icure/typescript-common'
import { v4 } from 'uuid'

export function newUser(): User {
    return new User({
        id: v4(),
        rev: 'rev',
        deletionDate: 123,
        created: 456,
        name: 'name',
        properties: [newProperty()],
        roles: ['roles'],
        login: 'login',
        passwordHash: 'passwordHash',
        secret: 'secret',
        use2fa: true,
        groupId: 'groupId',
        healthcarePartyId: 'healthcarePartyId',
        patientId: 'patientId',
        deviceId: 'deviceId',
        sharingDataWith: recordOf({ all: ['sharingDataWith'] }),
        email: 'email',
        mobilePhone: 'mobilePhone',
        authenticationTokens: recordOf({ key: newAuthenticationToken() }),
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
