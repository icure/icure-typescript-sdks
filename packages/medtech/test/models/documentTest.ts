import 'mocha'

import { Document } from '../..'
import { assert } from 'chai'

export function newDocument(): Document {
    return new Document({
        id: 'id',
        rev: 'rev',
        created: 123,
        modified: 456,
        author: 'author',
        responsible: 'responsible',
        medicalLocationId: 'medicalLocationId',
        deletionDate: 789,
        objectStoreReference: 'objectStoreReference',
        mainUti: 'mainUti',
        name: 'name',
        version: 'version',
        otherUtis: (['otherUtis']),
        externalUuid: 'externalUuid',
        size: 101112,
        hash: 'hash',
        attachmentId: 'attachmentId',
    })
}

describe('Document model test', () => {
    it('Marshalling/Unmarshalling of Document model - Success', () => {
        const document = newDocument()
        const marshalledDocument = Document.toJSON(document)
        const unmarshalledDocument = Document.fromJSON(JSON.parse(JSON.stringify(marshalledDocument)))
        assert.deepEqual(document, unmarshalledDocument)
        assert.deepEqual(document, new Document(document))
    })
})
