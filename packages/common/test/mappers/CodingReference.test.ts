import { CodingReference, mapCodeStubToCodingReference, mapCodingReferenceToCodeStub } from '../../src'
import { generateCodingReference } from '../models/CodingReference.model'

describe('CodingReference', function () {
    it('should correctly map to CodeStub and back to CodingReference', () => {
        const instance = generateCodingReference()
        const iCureInstance = mapCodingReferenceToCodeStub(instance)
        const newInstance = mapCodeStubToCodingReference(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
