import {Practitioner} from "../../src/models/Practitioner.model";
import {generateIdentifier} from "./Identifier.model";
import {generateCodingReference} from "./CodingReference.model";
import {generateHumanName} from "./HumanName.model";
import {GenderEnum} from "../../src/models/enums/Gender.enum";
import {generateLocation} from "./Location.model";
import {generateProperty} from "./Property.model";
import {generateSystemMetaDataOwner} from "./SystemMetaDataOwner.model";

export function generatePractitioner(): Practitioner {
    const practitioner = {
        id: 'dummyId',
        rev: 'dummyRev',
        created: Date.now(),
        modified: Date.now(),
        identifiers: [generateIdentifier()],
        tags: [generateCodingReference()],
        codes: [generateCodingReference()],
        deletionDate: null,
        name: 'dummyName',
        lastName: 'dummyLastName',
        firstName: 'dummyFirstName',
        names: [generateHumanName()],
        gender: GenderEnum.unknown,
        civility: 'Mr.',
        speciality: 'dummySpeciality',
        parentId: 'dummyParentId',
        userId: 'dummyUserId',
        addresses: [generateLocation()],
        languages: ['English'],
        picture: new ArrayBuffer(8),
        specialityCodes: [generateCodingReference()],
        description: 'dummyDescription',
        properties: [generateProperty(), generateProperty()],
        systemMetaData: generateSystemMetaDataOwner(),
    }

    return new Practitioner(practitioner)
}