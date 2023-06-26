import {generateTypedValueObject} from "../models/TypedValueObject.model";
import {
    mapTypedValueObjectDtoToTypedValueObject,
    mapTypedValueObjectToTypedValueObjectDto,
    TypedValueObject
} from "../../src";

describe('TypedValueObject', function () {
    it('should correctly map to TypedValueObjectEntity and back to TypedValueObject', () => {
        const instance = generateTypedValueObject()
        const iCureInstance = mapTypedValueObjectToTypedValueObjectDto(instance)
        const newInstance = mapTypedValueObjectDtoToTypedValueObject(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})