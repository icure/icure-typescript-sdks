import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generatePropertyType} from "../models/PropertyType.model";
import {PropertyType} from "../../src/models/PropertyType.model";
import {PropertyTypeStub} from "@icure/api";

describe('PropertyType', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to PropertyTypeStub and back to PropertyType', () => {
        const instance = generatePropertyType()
        const iCureInstance = mapper.map(instance, PropertyType, PropertyTypeStub)
        const newInstance = mapper.map(iCureInstance, PropertyTypeStub, PropertyType)

        expect(newInstance).toEqual(instance)
    })
})