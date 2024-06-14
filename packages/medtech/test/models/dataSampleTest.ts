import 'mocha'

import { DataSample } from '../..'
import { assert } from 'chai'
import { newContent } from './contentTest'
import { newIdentifier } from './identifierTest'
import { newCodingReference } from './codingReferenceTest'
import { newSystemMetaDataEncrypted } from './systemMetaDataEncryptedTest'
import { recordOf } from '@icure/typescript-common'
import { v4 } from 'uuid'

export function newDataSample(makeContent = false): DataSample {
    return new DataSample({
        id: v4(),
        transactionId: 'transactionId',
        identifiers: [newIdentifier()],
        batchId: 'batchId',
        healthcareElementIds: ['healthcareElementIds'],
        canvasesIds: 'canvasesIds',
        index: 123,
        content: makeContent ? recordOf({ en: newContent() }) : undefined,
        valueDate: 456,
        openingDate: 789,
        closingDate: 101112,
        created: 131415,
        modified: 161718,
        endOfLife: 192021,
        author: 'author',
        responsible: 'responsible',
        comment: 'comment',
        qualifiedLinks: recordOf({ from: recordOf({ to: 'to' }) }),
        codes: [newCodingReference()],
        labels: [newCodingReference()],
        systemMetaData: newSystemMetaDataEncrypted(),
    })
}

describe('DataSample model test', () => {
    it('Marshalling/Unmarshalling of DataSample model - Success', () => {
        const dataSample = newDataSample()
        const marshalledDataSample = DataSample.toJSON(dataSample)
        const unmarshalledDataSample = DataSample.fromJSON(JSON.parse(JSON.stringify(marshalledDataSample)))
        assert.deepEqual(dataSample, unmarshalledDataSample)
        assert.deepEqual(dataSample, new DataSample(dataSample))
    })
})
