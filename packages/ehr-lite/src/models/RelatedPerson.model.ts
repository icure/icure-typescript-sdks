import { mapTo, PartnershipDto } from '@icure/typescript-common'
import { RelatedPersonStatusEnum } from './enums/RelatedPersonStatus.enum'
import { RelatedPersonTypeEnum } from './enums/RelatedPersonType.enum'

@mapTo(PartnershipDto)
export class RelatedPerson implements IRelatedPerson {
    type?: RelatedPersonTypeEnum
    status?: RelatedPersonStatusEnum
    personId?: string

    constructor(relatedPerson?: Partial<IRelatedPerson>) {
        this.type = relatedPerson?.type
        this.status = relatedPerson?.status
        this.personId = relatedPerson?.personId
    }

    static toJSON(instance: RelatedPerson): IRelatedPerson {
        const pojo: IRelatedPerson = {} as IRelatedPerson
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.status !== undefined) pojo['status'] = instance.status
        if (instance.personId !== undefined) pojo['personId'] = instance.personId
        return pojo
    }

    static fromJSON(pojo: IRelatedPerson): RelatedPerson {
        const obj = {} as IRelatedPerson
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']!
        }
        if (pojo['status'] !== undefined) {
            obj['status'] = pojo['status']!
        }
        if (pojo['personId'] !== undefined) {
            obj['personId'] = pojo['personId']!
        }
        return new RelatedPerson(obj)
    }
}

export interface IRelatedPerson {
    type?: RelatedPersonTypeEnum
    status?: RelatedPersonStatusEnum
    personId?: string
}
