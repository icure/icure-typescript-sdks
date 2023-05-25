import {Observation} from "../../src/models/Observation.model";
import {generateIdentifier} from "./Identifier.model";
import {generateComponent} from "./Component.model";
import {generateLocalComponent} from "./LocalComponent.model";
import {generateCodingReference} from "./CodingReference.model";
import {generateAnnotation} from "./Annotation.model";
import {generateSystemMetaDataEncrypted} from "./SystemMetaDataEncrypted.model";

export function generateObservation(): Observation {
    const observation = {
        id: 'sampleId',
        transactionId: 'sampleTransactionId',
        identifiers: [generateIdentifier()],
        batchId: 'sampleBatchId',
        healthcareElementIds: ['sampleHealthcareElementId'],
        index: 1,
        component: generateComponent(),
        valueDate: 1621872000000,
        openingDate: 1621872000000,
        closingDate: 1621872000000,
        created: 1621872000000,
        modified: 1621872000000,
        endOfLife: 1621872000000,
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