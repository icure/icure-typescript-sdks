import { initializeMapper, mapper } from '../../src/mappers/mapper'
import { initializeMapper as commonInitializeMapper } from '@icure/typescript-common'
import { generateComponent } from '../models/Component.model'
import { Component } from '../../src/models/Component.model'
import { Content } from '@icure/api'

describe('Component', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to Content and back to Component', () => {
        const instance = generateComponent()
        const iCureInstance = mapper.map(instance, Component, Content)
        const newInstance = mapper.map(iCureInstance, Content, Component)

        expect(newInstance).toEqual(instance)
    })
})
