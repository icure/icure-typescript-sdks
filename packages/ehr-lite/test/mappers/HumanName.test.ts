import { generateHumanName } from '../models/HumanName.model'
import { HumanName } from '../../src'
import { mapHumanNameToPersonNameDto, mapPersonNameDtoToHumanName } from '../../src/mappers/HumanName.mapper'

describe('HumanName', function () {
    it('should correctly map to PersonName and back to HumanName', () => {
        const instance = generateHumanName()
        const iCureInstance = mapHumanNameToPersonNameDto(instance)
        const newInstance = mapPersonNameDtoToHumanName(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
