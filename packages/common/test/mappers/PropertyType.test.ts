import {generatePropertyType} from "../models/PropertyType.model";
import {mapPropertyTypeStubToPropertyType, mapPropertyTypeToPropertyTypeStub, PropertyType} from "../../src";

describe('PropertyType', function () {
    it('should correctly map to PropertyTypeStub and back to PropertyType', () => {
        const instance = generatePropertyType()
        const iCureInstance = mapPropertyTypeToPropertyTypeStub(instance)
        const newInstance = mapPropertyTypeStubToPropertyType(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})