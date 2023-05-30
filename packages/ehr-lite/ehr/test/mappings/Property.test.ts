import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateProperty} from "../models/Property.model";
import {Property} from "../../src/models/Property.model";
import {PropertyStub} from "@icure/api";

describe('Property', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to PropertyStub and back to Property', () => {
        const instance = generateProperty()
        const iCureInstance = mapper.map(instance, Property, PropertyStub)
        const newInstance = mapper.map(iCureInstance, PropertyStub, Property)

        expect(newInstance).toEqual(instance)
    })
})