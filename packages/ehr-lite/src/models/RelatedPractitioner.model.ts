import { PatientHealthCareParty } from '@icure/api'
import {mapTo} from "@icure/typescript-common"
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
        pojo['type'] = instance.type
        pojo['healthcarePartyId'] = instance.healthcarePartyId
        pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): RelatedPractitioner {
        return new RelatedPractitioner({ type: pojo['type'], healthcarePartyId: pojo['healthcarePartyId'], encryptedSelf: pojo['encryptedSelf'] })
    }
}

interface IRelatedPractitioner {
    type?: PractitionerTypeEnum
    healthcarePartyId?: string
    encryptedSelf?: string
}
