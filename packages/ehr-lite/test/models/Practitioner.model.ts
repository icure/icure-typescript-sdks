import { Practitioner } from '../../src/models/Practitioner.model'
import { generateIdentifier } from '../../../common/test/models/Identifier.model'
import { generateCodingReference } from '../../../common/test/models/CodingReference.model'
import { generateHumanName } from './HumanName.model'
import { GenderEnum } from '../../src/models/enums/Gender.enum'
import { generateLocation } from './Location.model'
import { generateProperty } from '../../../common/test/models/Property.model'
import { generateSystemMetaDataOwner } from '../../../common/test/models/SystemMetaDataOwner.model'
import { v4 } from 'uuid'
import { domainTypeTag, mapCodeStubToCodingReference } from '@icure/typescript-common'
import { ISO639_1 } from '@icure/api'

export function generatePractitioner(): Practitioner {
    const practitioner = {
        id: v4(),
        rev: 'dummyRev',
        created: Date.now(),
        modified: Date.now(),
        identifiers: [generateIdentifier()],
        // identifiers: [],
        tags: [generateCodingReference()],
        codes: [generateCodingReference()],
        deletionDate: undefined,
        name: 'dummyName',
        lastName: 'dummyLastName',
        firstName: 'dummyFirstName',
        names: [generateHumanName()],
        gender: GenderEnum.UNKNOWN,
        civility: 'Mr.',
        speciality: 'dummySpeciality',
        parentId: 'dummyParentId',
        userId: 'dummyUserId',
        addresses: [generateLocation()],
        languages: ['English'],
        specialityCodes: [generateCodingReference()],
        description: Object.fromEntries([
            ['en', 'This is a fake practitioner'],
            ['fr', 'Ceci est un praticien factice'],
        ]) as Record<ISO639_1, string>,
        properties: [generateProperty(), generateProperty()],
        systemMetaData: generateSystemMetaDataOwner(mapCodeStubToCodingReference(domainTypeTag('practitioner'))),
    } satisfies Practitioner

    return new Practitioner(practitioner)
}
