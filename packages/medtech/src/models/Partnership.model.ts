/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapTo, PartnershipDto } from '@icure/typescript-common'

/**
 * List of partners, or persons of contact (of class Partnership, see below).
 */
@mapTo(PartnershipDto)
export class Partnership {
    constructor(json: Partial<IPartnership>) {
        Object.assign(this as Partnership, json as IPartnership)
    }

    'type'?: PartnershipTypeEnum
    'status'?: PartnershipStatusEnum
    'partnerId'?: string

    static toJSON(instance: Partnership): IPartnership {
        const pojo: IPartnership = {} as IPartnership
        if (instance.type !== undefined) pojo["type"] = instance.type
        if (instance.status !== undefined) pojo["status"] = instance.status
        if (instance.partnerId !== undefined) pojo["partnerId"] = instance.partnerId
        return pojo
    }

    static fromJSON(pojo: IPartnership): Partnership {
        const obj = {} as IPartnership
        if (pojo["type"] !== undefined) {
            obj['type'] = pojo["type"]!
        }
        if (pojo["status"] !== undefined) {
            obj['status'] = pojo["status"]!
        }
        if (pojo["partnerId"] !== undefined) {
            obj['partnerId'] = pojo["partnerId"]!
        }
        return new Partnership(obj)
    }
}

interface IPartnership {
    type?: PartnershipTypeEnum
    status?: PartnershipStatusEnum
    partnerId?: string
}

export type PartnershipTypeEnum =
    | 'primary_contact'
    | 'primary_contact_for'
    | 'family'
    | 'friend'
    | 'counselor'
    | 'contact'
    | 'brother'
    | 'brotherinlaw'
    | 'child'
    | 'daughter'
    | 'employer'
    | 'father'
    | 'grandchild'
    | 'grandparent'
    | 'husband'
    | 'lawyer'
    | 'mother'
    | 'neighbour'
    | 'notary'
    | 'partner'
    | 'sister'
    | 'sisterinlaw'
    | 'son'
    | 'spouse'
    | 'stepdaughter'
    | 'stepfather'
    | 'stepmother'
    | 'stepson'
    | 'tutor'
    | 'next_of_kin'
    | 'federal_agency'
    | 'insurance_company'
    | 'state_agency'
    | 'unknown'
    | 'seealso'
    | 'refer'
export type PartnershipStatusEnum = 'active' | 'complicated' | 'past'
