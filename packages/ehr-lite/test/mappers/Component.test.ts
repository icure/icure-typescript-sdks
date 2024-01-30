import { generateComponent } from '../models/Component.model'
import { Component } from '../../src'
import { mapComponentToContentDto, mapContentDtoToComponent } from '../../src/mappers/Component.mapper'

describe('Component', function () {
    it('should correctly map to Content and back to Component', () => {
        const instance = generateComponent()
        const iCureInstance = mapComponentToContentDto(instance)
        const newInstance = mapContentDtoToComponent(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
