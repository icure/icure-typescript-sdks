import {initializeMapper, mapper} from "../../src/mappers/mapper";
import {generateRelatedPerson} from "../models/RelatedPerson.model";
import {RelatedPerson} from "../../src/models/RelatedPerson.model";
import {Partnership} from "@icure/api";
import {initializeMapper as commonInitializeMapper} from "@icure/typescript-common";

describe('RelatedPerson', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to Partnership and back to RelatedPerson', () => {
        const instance = generateRelatedPerson()
        const iCureInstance = mapper.map(instance, RelatedPerson, Partnership)
        const newInstance = mapper.map(iCureInstance, Partnership, RelatedPerson)

        expect(newInstance).toEqual(instance)
    })
})