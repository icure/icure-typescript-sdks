import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateRelatedPerson} from "../models/RelatedPerson.model";
import {RelatedPerson} from "../../src/models/RelatedPerson.model";
import {Partnership} from "@icure/api";

describe('RelatedPerson', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to Partnership and back to RelatedPerson', () => {
        const instance = generateRelatedPerson()
        const iCureInstance = mapper.map(instance, RelatedPerson, Partnership)
        const newInstance = mapper.map(iCureInstance, Partnership, RelatedPerson)

        expect(newInstance).toEqual(instance)
    })
})