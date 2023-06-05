import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateObservation} from "../models/Observation.model";
import {Observation} from "../../src/models/Observation.model";
import {Service} from "@icure/api";

describe('Observation', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to Service and back to Observation', () => {
        const instance = generateObservation()
        const iCureInstance = mapper.map(instance, Observation, Service)
        const newInstance = mapper.map(iCureInstance, Service, Observation)

        expect(newInstance).toEqual(instance)
    })
})