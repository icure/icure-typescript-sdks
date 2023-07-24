import { generateLocalComponent } from '../models/LocalComponent.model'
import { LocalComponent } from '../../src'
import { mapContentToLocalComponent, mapLocalComponentToContent } from '../../src/mappers/LocalComponent.mapper'

describe('LocalComponent', function () {
    it('should correctly map to Content and back to LocalComponent', () => {
        const instance = generateLocalComponent()
        const iCureInstance = mapLocalComponentToContent(instance)
        const newInstance = mapContentToLocalComponent(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
