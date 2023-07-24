import { generateProperty } from '../models/Property.model'
import { mapPropertyStubToProperty, mapPropertyToPropertyStub, Property } from '../../src'

describe('Property', function () {
    it('should correctly map to PropertyStub and back to Property', () => {
        const instance = generateProperty()
        const iCureInstance = mapPropertyToPropertyStub(instance)
        const newInstance = mapPropertyStubToProperty(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
