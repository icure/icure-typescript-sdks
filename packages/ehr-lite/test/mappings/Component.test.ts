import { initializeMapper, mapper } from '../../src/mappings/mapper'
import { generateComponent } from '../models/Component.model'
import { Component } from '../../src/models/Component.model'
import { Content } from '@icure/api'

describe('Component', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to Content and back to Component', () => {
        const instance = generateComponent()
        const iCureInstance = mapper.map(instance, Component, Content)
        const newInstance = mapper.map(iCureInstance, Content, Component)

        expect(newInstance).toEqual(instance)
    })
})
