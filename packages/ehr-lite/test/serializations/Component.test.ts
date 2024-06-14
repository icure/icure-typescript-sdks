import { Component } from '../../src/models/Component.model'
import { generateComponent } from '../models/Component.model'

describe(`Component serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateComponent()

        const json = instance.toJSON()
        const newInstance = new Component(json)

        expect(newInstance).toEqual(instance)
    })
})
