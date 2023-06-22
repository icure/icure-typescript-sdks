import {initializeMapper, mapper} from "../../src/mappers/mapper";
import {generateRelatedPractitioner} from "../models/RelatedPractitioner.model";
import {RelatedPractitioner} from "../../src/models/RelatedPractitioner.model";
import {PatientHealthCareParty} from "@icure/api";
import {initializeMapper as commonInitializeMapper} from "@icure/typescript-common";

describe('RelatedPractitioner', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to PatientHealthCareParty and back to RelatedPractitioner', () => {
        const instance = generateRelatedPractitioner()
        const iCureInstance = mapper.map(instance, RelatedPractitioner, PatientHealthCareParty)
        const newInstance = mapper.map(iCureInstance, PatientHealthCareParty, RelatedPractitioner)

        expect(newInstance).toEqual(instance)
    })
})