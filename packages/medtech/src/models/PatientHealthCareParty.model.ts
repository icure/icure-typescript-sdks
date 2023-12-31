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

import { mapTo, PatientHealthCarePartyDto } from '@icure/typescript-common'

/**
 * Links (usually for therapeutic reasons) between this patient and healthcare parties (of class PatientHealthcareParty).
 */
@mapTo(PatientHealthCarePartyDto)
export class PatientHealthCareParty {
    constructor(json: IPatientHealthCareParty) {
        Object.assign(this as PatientHealthCareParty, json as IPatientHealthCareParty)
    }

    'type': PatientHealthCarePartyTypeEnum
    'healthcarePartyId'?: string

    static toJSON(instance: PatientHealthCareParty): any {
        const pojo: any = {}
        pojo['type'] = instance.type
        if (instance.healthcarePartyId !== undefined) pojo['healthcarePartyId'] = instance.healthcarePartyId
        return pojo
    }

    static fromJSON(pojo: any): PatientHealthCareParty {
        const obj = {} as IPatientHealthCareParty
        obj['type'] = pojo['type']
        if (pojo['healthcarePartyId'] !== undefined) {
            obj['healthcarePartyId'] = pojo['healthcarePartyId']
        }
        return new PatientHealthCareParty(obj)
    }
}

interface IPatientHealthCareParty {
    type?: PatientHealthCarePartyTypeEnum
    healthcarePartyId?: string
}

export type PatientHealthCarePartyTypeEnum = 'doctor' | 'referral' | 'medicalhouse' | 'retirementhome' | 'hospital' | 'other' | 'referringphysician' | 'managingorganization'
