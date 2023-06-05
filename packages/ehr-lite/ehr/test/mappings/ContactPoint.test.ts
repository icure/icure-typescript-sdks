import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateContactPoint} from "../models/ContactPoint.model";
import {ContactPoint} from "../../src/models/ContactPoint.model";
import {Telecom} from "@icure/api";

describe('ContactPoint', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to Telecom and back to ContactPoint', () => {
        const instance = generateContactPoint()
        const iCureInstance = mapper.map(instance, ContactPoint, Telecom)
        const newInstance = mapper.map(iCureInstance, Telecom, ContactPoint)

        expect(newInstance).toEqual(instance)
    })
})