import { generateLocalComponent } from '../models/LocalComponent.model'
import { LocalComponent } from '../../src'
import { mapContentDtoToLocalComponent, mapLocalComponentToContentDto } from '../../src/mappers/LocalComponent.mapper'

describe('LocalComponent', function () {
    it('should correctly map to Content and back to LocalComponent', () => {
        const instance = generateLocalComponent()
        const iCureInstance = mapLocalComponentToContentDto(instance)
        const newInstance = mapContentDtoToLocalComponent(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
