import { CodeStub } from '@icure/api'
import { CodingReference } from '../../src/models/CodingReference.model'
import {initializeMapper, mapper} from "../../src";
import {generateCodingReference} from "../models/CodingReference.model";

describe('CodingReference', function () {
    beforeAll(() => {
        initializeMapper(mapper)
    })

    it('should correctly map to CodeStub and back to CodingReference', () => {
        const instance = generateCodingReference()
        const iCureInstance = mapper.map(instance, CodingReference, CodeStub)
        const newInstance = mapper.map(iCureInstance, CodeStub, CodingReference)

        expect(newInstance).toEqual(instance)
    })
})
