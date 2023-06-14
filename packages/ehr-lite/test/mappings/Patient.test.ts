import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generatePatient} from "../models/Patient.model";
import {Patient} from "../../src/models/Patient.model";
import {Patient as PatientEntity} from "@icure/api";

describe('Patient', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to PatientEntity and back to Patient', () => {
        const instance = generatePatient()
        const iCureInstance = mapper.map(instance, Patient, PatientEntity)
        const newInstance = mapper.map(iCureInstance, PatientEntity, Patient)

        expect(newInstance).toEqual(instance)
    })
})