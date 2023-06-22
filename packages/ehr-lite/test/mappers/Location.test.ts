import {initializeMapper, mapper} from "../../src/mappers/mapper";
import {generateLocation} from "../models/Location.model";
import {Location} from "../../src/models/Location.model";
import {Address} from "@icure/api";
import {initializeMapper as commonInitializeMapper} from "@icure/typescript-common";

describe('Location', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to Address and back to Location', () => {
        const instance = generateLocation()
        const iCureInstance = mapper.map(instance, Location, Address)
        const newInstance = mapper.map(iCureInstance, Address, Location)

        expect(newInstance).toEqual(instance)
    })
})