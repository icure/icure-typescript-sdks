import {RelatedPerson} from "../../src/models/RelatedPerson.model";
import {RelatedPersonTypeEnum} from "../../src/models/enums/RelatedPersonType.enum";
import {RelatedPersonStatusEnum} from "../../src/models/enums/RelatedPersonStatus.enum";

export function generateRelatedPerson(): RelatedPerson {
    const relatedPerson = {
        type: RelatedPersonTypeEnum.family,
        status: RelatedPersonStatusEnum.active,
        personId: 'samplePersonId',
    }

    return new RelatedPerson(relatedPerson)
}