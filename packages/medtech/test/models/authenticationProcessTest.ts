import 'mocha'

import { AuthenticationProcess } from '../..'
import { assert } from 'chai'

function newAuthenticationProcess(): AuthenticationProcess {
    return new AuthenticationProcess({
        requestId: 'requestId',
        bypassTokenCheck: true,
        login: 'login',
    })
}

describe('AuthenticationProcess model test', () => {
    it('Marshalling/Unmarshalling of AuthenticationProcess model - Success', () => {
        const authenticationProcess = newAuthenticationProcess()
        const marshalledAuthenticationProcess = AuthenticationProcess.toJSON(authenticationProcess)
        const unmarshalledAuthenticationProcess = new AuthenticationProcess(JSON.parse(JSON.stringify(marshalledAuthenticationProcess)))
        assert.deepEqual(authenticationProcess, unmarshalledAuthenticationProcess)
        assert.deepEqual(authenticationProcess, new AuthenticationProcess(authenticationProcess))
    })
})
