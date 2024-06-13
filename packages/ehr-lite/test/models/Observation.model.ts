import { Observation } from '../../src'
import { generateIdentifier } from '../../../common/test/models/Identifier.model'
import { generateComponent } from './Component.model'
import { generateLocalComponent } from './LocalComponent.model'
import { generateCodingReference } from '../../../common/test/models/CodingReference.model'
import { generateAnnotation } from '../../../common/test/models/Annotation.model'
import { generateSystemMetaDataEncrypted } from '../../../common/test/models/SystemMetaDataEncrypted.model'
import { v4 } from 'uuid'
import { domainTypeTag, mapCodeStubToCodingReference } from '@icure/typescript-common'
import { LocalComponent } from '../../src'

export function generateObservation(): Observation {
    return new Observation({
        id: v4(),
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
        localContent: Object.fromEntries([['en', generateLocalComponent()]]) as Record<string, LocalComponent>,
        qualifiedLinks: Object.fromEntries([['linkType', Object.fromEntries([['linkId', 'linkValue']])]]),
        codes: [generateCodingReference()],
        tags: [generateCodingReference()],
        systemMetaData: generateSystemMetaDataEncrypted(mapCodeStubToCodingReference(domainTypeTag('observation'))),
        notes: [generateAnnotation()],
    })
}
