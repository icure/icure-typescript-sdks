import { Partnership } from '@icure/api'
import { mapTo } from "@icure/typescript-common"
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
        pojo["type"] = instance.type
        pojo["status"] = instance.status
        pojo["personId"] = instance.personId
        return pojo
    }

    static fromJSON(pojo: any): RelatedPerson {
        return new RelatedPerson({type: pojo["type"], status: pojo["status"], personId: pojo["personId"]})
    }
}

interface IRelatedPerson {
    type?: RelatedPersonTypeEnum
    status?: RelatedPersonStatusEnum
    personId?: string
}
