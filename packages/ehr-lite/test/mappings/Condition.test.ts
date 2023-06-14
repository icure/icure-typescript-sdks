import { Annotation, CodeStub, HealthElement } from '@icure/api'
import { Identifier as IdentifierEntity } from '@icure/api/icc-api/model/Identifier'
import { initializeMapper, mapper } from '../../src/mappings/mapper'
import { Condition } from '../../src/models/Condition.model'
import { CodingReference } from '../../src/models/CodingReference.model'
import { SeverityEnum } from '../../src/models/enums/Severity.enum'
import { VerificationStatusEnum } from '../../src/models/enums/VerificationStatus.enum'
import { ClinicalStatusEnum } from '../../src/models/enums/ClinicalStatus.enum'
import { generateAnnotation } from '../models/Annotation.model'
import { generateCondition } from '../models/Condition.model'

describe('Condition', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to HealthElement and back to Condition', () => {
        const instance = generateCondition()
        const iCureInstance = mapper.map(instance, Condition, HealthElement)
        const newInstance = mapper.map(iCureInstance, HealthElement, Condition)

        expect(newInstance).toEqual(instance)
    })
})
