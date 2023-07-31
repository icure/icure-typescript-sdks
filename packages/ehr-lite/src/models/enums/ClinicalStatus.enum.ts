import { CodeStub } from '@icure/api'

export enum ClinicalStatusEnum {
    ACTIVE = 'active',
    RECURRENCE = 'recurrence',
    RELAPSE = 'relapse',
    INACTIVE = 'inactive',
    REMISSION = 'remission',
    RESOLVED = 'resolved',
    UNKNOWN = 'unknown',
}

export namespace ClinicalStatusEnum {
    export function toCodeStub(clinicalStatus: ClinicalStatusEnum): CodeStub {
        return new CodeStub({
            type: 'hl7/condition-clinical',
            code: clinicalStatus,
            version: '2.0.0',
        })
    }

    export function fromCodeStub(codeStub: CodeStub): ClinicalStatusEnum {
        // TODO consider version in future
        if (codeStub.type !== 'http://terminology.hl7.org/CodeSystem/condition-clinical' && codeStub.type !== 'hl7/condition-clinical') throw new Error('Unexpected codeStub.type for clinicalStatus: ' + codeStub.type)
        if (codeStub.code === 'active') {
            return ClinicalStatusEnum.ACTIVE
        } else if (codeStub.code === 'recurrence') {
            return ClinicalStatusEnum.RECURRENCE
        } else if (codeStub.code === 'relapse') {
            return ClinicalStatusEnum.RELAPSE
        } else if (codeStub.code === 'inactive') {
            return ClinicalStatusEnum.INACTIVE
        } else if (codeStub.code === 'remission') {
            return ClinicalStatusEnum.REMISSION
        } else if (codeStub.code === 'resolved') {
            return ClinicalStatusEnum.RESOLVED
        } else if (codeStub.code === 'unknown') {
            return ClinicalStatusEnum.UNKNOWN
        } else throw new Error('Unexpected codeStub.code for clinicalStatus: ' + codeStub.code)
    }
}
