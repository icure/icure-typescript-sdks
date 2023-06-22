import {initializeMapper, mapper} from "../../src";
import {generateIdentifier} from "../models/Identifier.model";
import {Identifier} from "../../src/models/Identifier.model";
import {Identifier as IdentifierEntity} from "@icure/api";

describe('Identifier', function () {
    beforeAll(() => {
        initializeMapper(mapper)
    })

    it('should correctly map to IdentifierEntity and back to Identifier', () => {
        const instance = generateIdentifier()
        const iCureInstance = mapper.map(instance, Identifier, IdentifierEntity)
        const newInstance = mapper.map(iCureInstance, IdentifierEntity, Identifier)

        expect(newInstance).toEqual(instance)
    })
})