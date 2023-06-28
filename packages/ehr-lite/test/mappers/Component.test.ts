import { generateComponent } from '../models/Component.model'
import { Component } from '../../src/models/Component.model'
import { mapComponentToContent, mapContentToComponent } from '../../src/mappers/Component.mapper'

describe('Component', function () {
    it('should correctly map to Content and back to Component', () => {
        const instance = generateComponent()
        const iCureInstance = mapComponentToContent(instance)
        const newInstance = mapContentToComponent(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
