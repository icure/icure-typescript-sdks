import 'mocha'

import { HealthcareElement } from '../..'
import { assert } from 'chai'
import { newIdentifier } from './identifierTest'
import { newCodingReference } from './codingReferenceTest'
import { newSystemMetaDataEncrypted } from './systemMetaDataEncryptedTest'
import { v4 } from 'uuid'

export function newHealthcareElement(): HealthcareElement {
    return new HealthcareElement({
        id: v4(),
        identifiers: [newIdentifier()],
        rev: 'rev',
        created: 123,
        modified: 456,
        author: 'author',
        responsible: 'responsible',
        medicalLocationId: 'medicalLocationId',
        labels: [newCodingReference()],
        codes: [newCodingReference()],
        endOfLife: 789,
        deletionDate: 101112,
        healthcareElementId: 'healthcareElementId',
        valueDate: 131415,
        openingDate: 161718,
        closingDate: 192021,
        description: 'description',
        note: 'note',
        systemMetaData: newSystemMetaDataEncrypted(),
    })
}

describe('HealthcareElement model test', () => {
    it('Marshalling/Unmarshalling of HealthcareElement model - Success', () => {
        const healthcareElement = newHealthcareElement()
        const marshalledHealthcareElement = HealthcareElement.toJSON(healthcareElement)
        const unmarshalledHealthcareElement = HealthcareElement.fromJSON(JSON.parse(JSON.stringify(marshalledHealthcareElement)))
        assert.deepEqual(healthcareElement, unmarshalledHealthcareElement)
        assert.deepEqual(healthcareElement, new HealthcareElement(healthcareElement))
    })
})
