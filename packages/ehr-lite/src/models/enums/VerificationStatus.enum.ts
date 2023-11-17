import { CodeStub } from '@icure/typescript-common'

export enum VerificationStatusEnum {
    UNCONFIRMED = 'unconfirmed',
    PROVISIONAL = 'provisional',
    DIFFERENTIAL = 'differential',
    CONFIRMED = 'confirmed',
    REFUTED = 'refuted',
    ENTERED_IN_ERROR = 'entered-in-error',
}

export namespace VerificationStatusEnum {
    export function toCodeStub(verificationStatus: VerificationStatusEnum): CodeStub {
        return new CodeStub({
            type: 'hl7/condition-ver-status',
            code: verificationStatus,
            version: '0.5.0',
        })
    }

    export function fromCodeStub(codeStub: CodeStub): VerificationStatusEnum {
        // TODO consider version in future
        if (codeStub.type !== 'http://terminology.hl7.org/CodeSystem/condition-ver-status' && codeStub.type !== 'hl7/condition-ver-status') throw new Error('Unexpected codeStub.type for verificationStatus: ' + codeStub.type)
        if (codeStub.code === 'unconfirmed') {
            return VerificationStatusEnum.UNCONFIRMED
        } else if (codeStub.code === 'provisional') {
            return VerificationStatusEnum.PROVISIONAL
        } else if (codeStub.code === 'differential') {
            return VerificationStatusEnum.DIFFERENTIAL
        } else if (codeStub.code === 'confirmed') {
            return VerificationStatusEnum.CONFIRMED
        } else if (codeStub.code === 'refuted') {
            return VerificationStatusEnum.REFUTED
        } else if (codeStub.code === 'entered-in-error') {
            return VerificationStatusEnum.ENTERED_IN_ERROR
        } else throw new Error('Unexpected codeStub.code for verificationStatus: ' + codeStub.code)
    }
}
