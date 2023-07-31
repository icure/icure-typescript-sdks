import { CodeStub } from '@icure/api'

export enum SeverityEnum {
    MILD = 'mild',
    MODERATE = 'moderate',
    SEVERE = 'severe',
}
export namespace SeverityEnum {
    export function toCodeStub(severity: SeverityEnum): CodeStub {
        if (severity === SeverityEnum.SEVERE) {
            return new CodeStub({
                type: 'SNOMEDCT',
                code: '24484000',
                version: '20190731',
            })
        } else if (severity === SeverityEnum.MODERATE) {
            return new CodeStub({
                type: 'SNOMEDCT',
                code: '6736007',
                version: '20230228',
            })
        } else if (severity === SeverityEnum.MILD) {
            return new CodeStub({
                type: 'SNOMEDCT',
                code: '255604002',
                version: '20190731',
            })
        } else throw new Error('Unrecognised severity: ' + severity)
    }

    export function fromCodeStub(codeStub: CodeStub): SeverityEnum {
        // TODO consider version in future
        if (codeStub.type !== 'http://snomed.info/sct' && codeStub.type !== 'SNOMEDCT') throw new Error('Unexpected codeStub.type for severity: ' + codeStub.type)
        if (codeStub.code === '24484000') {
            return SeverityEnum.SEVERE
        } else if (codeStub.code === '6736007') {
            return SeverityEnum.MODERATE
        } else if (codeStub.code === '255604002') {
            return SeverityEnum.MILD
        } else throw new Error('Unexpected codeStub.code for severity: ' + codeStub.code)
    }
}
