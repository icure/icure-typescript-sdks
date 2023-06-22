import {initializeMapper, mapper} from "../../src";
import {generateTypedValueObject} from "../models/TypedValueObject.model";
import {TypedValueObject} from "../../src/models/TypedValueObject.model";
import {TypedValueObject as TypedValueObjectEntity} from "@icure/api";

describe('TypedValueObject', function () {
    beforeAll(() => {
        initializeMapper(mapper)
    })

    it('should correctly map to TypedValueObjectEntity and back to TypedValueObject', () => {
        const instance = generateTypedValueObject()
        const iCureInstance = mapper.map(instance, TypedValueObject, TypedValueObjectEntity)
        const newInstance = mapper.map(iCureInstance, TypedValueObjectEntity, TypedValueObject)

        expect(newInstance).toEqual(instance)
    })
})