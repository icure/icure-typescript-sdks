import { generateHumanName } from '../models/HumanName.model'
import { HumanName } from '../../src'
import { mapHumanNameToPersonName, mapPersonNameToHumanName } from '../../src/mappers/HumanName.mapper'

describe('HumanName', function () {
    it('should correctly map to PersonName and back to HumanName', () => {
        const instance = generateHumanName()
        const iCureInstance = mapHumanNameToPersonName(instance)
        const newInstance = mapPersonNameToHumanName(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
