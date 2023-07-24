import 'mocha'

import { DataSample } from '../..'
import { assert } from 'chai'
import { newContent } from './contentTest'
import { newIdentifier } from './identifierTest'
import { newCodingReference } from './codingReferenceTest'
import { newSystemMetaDataOwner } from './systemMetaDataOwnerTest'
import { newSystemMetaDataEncrypted } from './systemMetaDataEncryptedTest'
import { mapOf } from '@icure/typescript-common'
import { v4 } from 'uuid'

export function newDataSample(makeContent = false): DataSample {
  return new DataSample({
    id: v4(),
    transactionId: 'transactionId',
    identifiers: [newIdentifier()],
    batchId: 'batchId',
    healthcareElementIds: new Set('healthcareElementIds'),
    canvasesIds: new Set('canvasesIds'),
    index: 123,
    content: makeContent ? mapOf({ en: newContent() }) : undefined,
    valueDate: 456,
    openingDate: 789,
    closingDate: 101112,
    created: 131415,
    modified: 161718,
    endOfLife: 192021,
    author: 'author',
    responsible: 'responsible',
    comment: 'comment',
    qualifiedLinks: mapOf({ from: mapOf({ to: 'to' }) }),
    codes: new Set([newCodingReference()]),
    labels: new Set([newCodingReference()]),
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
