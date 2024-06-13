import 'mocha'

import { Coding } from '../..'
import { assert } from 'chai'
import { recordOf } from '@icure/typescript-common'

export function newCoding(): Coding {
    return new Coding({
        id: 'id',
        rev: 'rev',
        type: 'type',
        code: 'code',
        version: 'version',
        searchTerms: recordOf({
            en: ['test'],
        }),
        qualifiedLinks: recordOf({
            from: ['to'],
        }),
    })
}

describe('Coding model test', () => {
    it('Marshalling/Unmarshalling of Coding model - Success', () => {
        const coding = newCoding()
        const marshalledCoding = Coding.toJSON(coding)
        const unmarshalledCoding = Coding.fromJSON(JSON.parse(JSON.stringify(marshalledCoding)))
        assert.deepEqual(coding, unmarshalledCoding)
        assert.deepEqual(coding, new Coding(coding))
    })
})
