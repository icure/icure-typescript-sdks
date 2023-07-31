import { CodeStub } from '@icure/api'

export enum CategoryEnum {
    PROBLEM_LIST_ITEM = 'problem-list-item',
    ENCOUNTER_DIAGNOSIS = 'encounter-diagnosis',
}

export namespace CategoryEnum {
    export function toCodeStub(category: CategoryEnum): CodeStub {
        return new CodeStub({
            type: 'hl7/condition-category',
            code: category,
            version: '0.5.0',
        })
    }

    export function fromCodeStub(codeStub: CodeStub): CategoryEnum {
        // TODO consider version in future
        if (codeStub.type !== 'http://terminology.hl7.org/CodeSystem/condition-category' && codeStub.type !== 'hl7/condition-category') throw new Error('Unexpected codeStub.type for category: ' + codeStub.type)
        if (codeStub.code === 'problem-list-item') {
            return CategoryEnum.PROBLEM_LIST_ITEM
        } else if (codeStub.code === 'encounter-diagnosis') {
            return CategoryEnum.ENCOUNTER_DIAGNOSIS
        } else throw new Error('Unexpected codeStub.code for category: ' + codeStub.code)
    }
}
