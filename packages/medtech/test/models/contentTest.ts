import 'mocha'

import { Content } from '../..'
import { assert, expect } from 'chai'
import { newMeasure } from './measureTest'
import { newTimeSeries } from './timeSeriesTest'
import { newDataSample } from './dataSampleTest'
import { DataSample } from '../..'
import { mapOf } from '@icure/typescript-common'
import { v4 } from 'uuid'

export function partialContent(): Content {
    return new Content({ stringValue: 'stringValue' })
}
export function newContent(): Content {
    return new Content({
        stringValue: 'stringValue',
        numberValue: 123,
        booleanValue: true,
        instantValue: 456,
        fuzzyDateValue: 789,
        binaryValue: new ArrayBuffer(5),
        documentId: v4(),
        measureValue: newMeasure(),
        timeSeries: newTimeSeries(),
        compoundValue: [new DataSample({ ...newDataSample(false), content: mapOf({ en: new Content({ stringValue: 'stringValue' }) }) })],
        ratio: [newMeasure(), newMeasure()],
        range: [newMeasure(), newMeasure()],
    })
}

describe('Content model test', () => {
    it('Marshalling/Unmarshalling of Content model - Success', () => {
        const content = newContent()
        const marshalledContent = Content.toJSON(content)
        const unmarshalledContent = Content.fromJSON(JSON.parse(JSON.stringify(marshalledContent)))

        assert.deepEqual(content.compoundValue, unmarshalledContent.compoundValue)
        assert.deepEqual(content, unmarshalledContent)
        assert.deepEqual(content, new Content(content))
    })

    it('Marshalling/Unmarshalling of Partial Content model - Success', () => {
        const content = partialContent()
        const marshalledContent = Content.toJSON(content)
        const unmarshalledContent = Content.fromJSON(JSON.parse(JSON.stringify(marshalledContent)))

        assert.deepEqual(content, unmarshalledContent)
        assert.deepEqual(content, new Content(content))
    })
})
