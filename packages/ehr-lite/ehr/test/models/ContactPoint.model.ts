import {ContactPoint} from "../../src/models/ContactPoint.model";
import {ContactPointTelecomTypeEnum} from "../../src/models/enums/ContactPointTelecomType.enum";

export function generateContactPoint(): ContactPoint {
    const contactPoint = {
        system: ContactPointTelecomTypeEnum.PHONE,
        value: 'sample@example.com',
        description: 'Sample contact point description',
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new ContactPoint(contactPoint)
}