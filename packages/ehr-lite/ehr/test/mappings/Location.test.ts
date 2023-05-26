import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateLocation} from "../models/Location.model";
import {Location} from "../../src/models/Location.model";
import {Address} from "@icure/api";

describe('Location', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to Address and back to Location', () => {
        const instance = generateLocation()
        const iCureInstance = mapper.map(instance, Location, Address)
        const newInstance = mapper.map(iCureInstance, Address, Location)

        expect(newInstance).toEqual(instance)
    })
})