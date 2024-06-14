import { mapTo, PartnershipDto } from '@icure/typescript-common'
import { RelatedPersonStatusEnum } from './enums/RelatedPersonStatus.enum'
import { RelatedPersonTypeEnum } from './enums/RelatedPersonType.enum'

@mapTo(PartnershipDto)
export class RelatedPerson implements IRelatedPerson {
    type?: RelatedPersonTypeEnum
    status?: RelatedPersonStatusEnum
    personId?: string

    toJSON(): IRelatedPerson {
        return {
            type: this.type,
            status: this.status,
            personId: this.personId,
        }
    }

    constructor(json: Partial<IRelatedPerson>) {
        if (json['type'] !== undefined) {
            this.type = json['type']!
        }
        if (json['status'] !== undefined) {
            this.status = json['status']!
        }
        if (json['personId'] !== undefined) {
            this.personId = json['personId']!
        }
    }
}

export interface IRelatedPerson {
    type?: RelatedPersonTypeEnum
    status?: RelatedPersonStatusEnum
    personId?: string
}
