import {initializeMapper, mapper} from "../../src/mappers/mapper";
import {generatePractitioner} from "../models/Practitioner.model";
import {Practitioner} from "../../src/models/Practitioner.model";
import {HealthcareParty} from "@icure/api";
import {initializeMapper as commonInitializeMapper} from "@icure/typescript-common";

describe('Practitioner', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to HealthcareParty and back to Practitioner', () => {
        const instance = generatePractitioner()
        const iCureInstance = mapper.map(instance, Practitioner, HealthcareParty)
        const newInstance = mapper.map(iCureInstance, HealthcareParty, Practitioner)

        expect(newInstance).toEqual(instance)
    })
})