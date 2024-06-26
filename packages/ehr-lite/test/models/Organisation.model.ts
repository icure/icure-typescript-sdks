import { Organisation } from '../../src/models/Organisation.model'
import { generateIdentifier } from '../../../common/test/models/Identifier.model'
import { generateCodingReference } from '../../../common/test/models/CodingReference.model'
import { generateLocation } from './Location.model'
import { generateProperty } from '../../../common/test/models/Property.model'
import { generateSystemMetaDataOwner } from '../../../common/test/models/SystemMetaDataOwner.model'
import { v4 } from 'uuid'
import { domainTypeTag, mapCodeStubToCodingReference } from '@icure/typescript-common'

export function generateOrganisation(): Organisation {
    const org = new Organisation({
        id: v4(),
        rev: 'fakeRev',
        created: Date.now(),
        modified: Date.now(),
        identifiers: [generateIdentifier()],
        tags: [generateCodingReference()],
        codes: [generateCodingReference()],
        deletionDate: Date.now(),
        name: 'Fake Organisation',
        parentId: 'fakeParentId',
        userId: 'fakeUserId',
        addresses: [generateLocation()],
        languages: ['en', 'fr'],
        description: Object.fromEntries([
            ['en', 'This is a fake organisation'],
            ['fr', 'Ceci est un organisation factice'],
        ]),
        properties: [generateProperty()],
        systemMetaData: generateSystemMetaDataOwner(mapCodeStubToCodingReference(domainTypeTag('organisation'))),
    })

    return org
}
