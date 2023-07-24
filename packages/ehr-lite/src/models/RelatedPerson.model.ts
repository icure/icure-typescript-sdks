import { Partnership } from '@icure/api'
import { mapTo } from '@icure/typescript-common'
import { RelatedPersonStatusEnum } from './enums/RelatedPersonStatus.enum'
import { RelatedPersonTypeEnum } from './enums/RelatedPersonType.enum'

@mapTo(Partnership)
export class RelatedPerson {
    type?: RelatedPersonTypeEnum
    status?: RelatedPersonStatusEnum
    personId?: string

    constructor(relatedPerson?: IRelatedPerson | any) {
        this.type = relatedPerson?.type
        this.status = relatedPerson?.status
        this.personId = relatedPerson?.personId
    }

    static toJSON(instance: RelatedPerson): any {
        const pojo: any = {}
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.status !== undefined) pojo['status'] = instance.status
        if (instance.personId !== undefined) pojo['personId'] = instance.personId
        return pojo
    }

    static fromJSON(pojo: any): RelatedPerson {
        const obj = {} as IRelatedPerson
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']
        }
        if (pojo['status'] !== undefined) {
            obj['status'] = pojo['status']
        }
        if (pojo['personId'] !== undefined) {
            obj['personId'] = pojo['personId']
        }
        return new RelatedPerson(obj)
    }
}

interface IRelatedPerson {
    type?: RelatedPersonTypeEnum
    status?: RelatedPersonStatusEnum
    personId?: string
}
