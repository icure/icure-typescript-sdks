import {Organisation} from "../../src/models/Organisation.model";
import {generateIdentifier} from "./Identifier.model";
import {generateCodingReference} from "./CodingReference.model";
import {generateLocation} from "./Location.model";
import {generateProperty} from "./Property.model";
import {generateSystemMetaDataOwner} from "./SystemMetaDataOwner.model";

export function generateOrganisation(): Organisation {
    const org = new Organisation({
        id: 'fakeId',
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
        picture: new ArrayBuffer(8),
        description: 'This is a fake organisation',
        properties: [generateProperty()],
        systemMetaData: generateSystemMetaDataOwner(),
    });

    return org;
}
