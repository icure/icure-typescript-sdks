import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generatePractitioner} from "../models/Practitioner.model";
import {Practitioner} from "../../src/models/Practitioner.model";
import {HealthcareParty} from "@icure/api";

describe('Practitioner', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to HealthcareParty and back to Practitioner', () => {
        const instance = generatePractitioner()
        const iCureInstance = mapper.map(instance, Practitioner, HealthcareParty)
        const newInstance = mapper.map(iCureInstance, HealthcareParty, Practitioner)

        expect(newInstance).toEqual(instance)
    })
})