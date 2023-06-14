import {RelatedPractitioner} from "../../src/models/RelatedPractitioner.model";
import {PractitionerTypeEnum} from "../../src/models/enums/PractitionerType.enum";

export function generateRelatedPractitioner(): RelatedPractitioner {
    const relatedPractitioner = {
        type: PractitionerTypeEnum.REFERRING_PHYSICIAN,
        healthcarePartyId: 'sampleHealthcarePartyId',
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new RelatedPractitioner(relatedPractitioner)
}