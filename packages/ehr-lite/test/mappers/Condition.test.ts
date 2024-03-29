import { mapConditionToHealthElementDto, mapHealthElementDtoToCondition } from '../../src/mappers/mapper'
import { Condition } from '../../src'
import { generateCondition } from '../models/Condition.model'

describe('Condition', function () {
    it('should correctly map to HealthElement and back to Condition', () => {
        const instance = generateCondition()
        const iCureInstance = mapConditionToHealthElementDto(instance)
        const newInstance = mapHealthElementDtoToCondition(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
