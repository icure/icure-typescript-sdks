import {Observation} from '../../src/models/Observation.model'
import {generateIdentifier} from './Identifier.test'
import {generateComponent} from './Component.test'
import {generateLocalComponent} from './LocalComponent.test'
import {generateCodingReference} from './CodingReference.test'
import {generateAnnotation} from './Annotation.test'
import {generateSystemMetaDataEncrypted} from './SystemMetaDataEncrypted.test'

export function generateObservation(): Observation {
    const observation = {
        id: 'sampleId',
        transactionId: 'sampleTransactionId',
        identifiers: [generateIdentifier()],
        batchId: 'sampleBatchId',
        healthcareElementIds: ['sampleHealthcareElementId'],
        index: 1,
        component: generateComponent(),
        valueDate: 1621872000000, // Sample timestamp in milliseconds
        openingDate: 1621872000000, // Sample timestamp in milliseconds
        closingDate: 1621872000000, // Sample timestamp in milliseconds
        created: 1621872000000, // Sample timestamp in milliseconds
        modified: 1621872000000, // Sample timestamp in milliseconds
        endOfLife: 1621872000000, // Sample timestamp in milliseconds
        author: 'sampleAuthor',
        performer: 'samplePerformer',
        localContent: new Map([['en', generateLocalComponent()]]),
        qualifiedLinks: new Map([['linkType', new Map([['linkId', 'linkValue']])]]),
        codes: new Set([generateCodingReference()]),
        tags: new Set([generateCodingReference()]),
        systemMetaData: generateSystemMetaDataEncrypted(),
        notes: [generateAnnotation()],
    }

    return new Observation(observation)
}

describe(`Observation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateObservation()

        const json = Observation.toJSON(instance)
        const newInstance = Observation.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
