import { mapTo, PatientHealthCarePartyDto } from '@icure/typescript-common'
import { PractitionerTypeEnum } from './enums/PractitionerType.enum'

@mapTo(PatientHealthCarePartyDto)
export class RelatedPractitioner implements IRelatedPractitioner {
    type?: PractitionerTypeEnum
    healthcarePartyId?: string
    encryptedSelf?: string

    toJSON(): IRelatedPractitioner {
        return {
        type: this.type,
        healthcarePartyId: this.healthcarePartyId,
        encryptedSelf: this.encryptedSelf,
        }
    }

    constructor(json: Partial<IRelatedPractitioner>) {
        if (json["type"] !== undefined) {
            this.type = json["type"]!
        }
        if (json["healthcarePartyId"] !== undefined) {
            this.healthcarePartyId = json["healthcarePartyId"]!
        }
        if (json["encryptedSelf"] !== undefined) {
            this.encryptedSelf = json["encryptedSelf"]!
        }
    }
}

export interface IRelatedPractitioner {
    type?: PractitionerTypeEnum
    healthcarePartyId?: string
    encryptedSelf?: string
}
