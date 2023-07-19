import { PatientHealthCareParty } from '@icure/api'
import { mapTo } from '@icure/typescript-common'
import { PractitionerTypeEnum } from './enums/PractitionerType.enum'

@mapTo(PatientHealthCareParty)
export class RelatedPractitioner {
    type?: PractitionerTypeEnum
    healthcarePartyId?: string
    encryptedSelf?: string

    constructor(relatedPractitioner?: IRelatedPractitioner | any) {
        this.type = relatedPractitioner?.type
        this.healthcarePartyId = relatedPractitioner?.healthcarePartyId
        this.encryptedSelf = relatedPractitioner?.encryptedSelf
    }

    static toJSON(instance: RelatedPractitioner): any {
        const pojo: any = {}
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.healthcarePartyId !== undefined) pojo['healthcarePartyId'] = instance.healthcarePartyId
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): RelatedPractitioner {
        const obj = {} as IRelatedPractitioner
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']
        }
        if (pojo['healthcarePartyId'] !== undefined) {
            obj['healthcarePartyId'] = pojo['healthcarePartyId']
        }
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        return new RelatedPractitioner(obj)
    }
}

interface IRelatedPractitioner {
    type?: PractitionerTypeEnum
    healthcarePartyId?: string
    encryptedSelf?: string
}
