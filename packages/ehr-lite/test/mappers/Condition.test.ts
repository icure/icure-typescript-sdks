import { HealthElement } from '@icure/api'
import { initializeMapper, mapper } from '../../src/mappers/mapper'
import { Condition } from '../../src/models/Condition.model'
import { generateCondition } from '../models/Condition.model'
import {initializeMapper as commonInitializeMapper} from "@icure/typescript-common";

describe('Condition', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to HealthElement and back to Condition', () => {
        const instance = generateCondition()
        const iCureInstance = mapper.map(instance, Condition, HealthElement)
        const newInstance = mapper.map(iCureInstance, HealthElement, Condition)

        expect(newInstance).toEqual(instance)
    })
})
