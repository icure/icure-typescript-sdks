import { generateIdentifier } from '../models/Identifier.model'
import { Identifier, mapIdentifierDtoToIdentifier, mapIdentifierToIdentifierDto } from '../../src'

describe('Identifier', function () {
    it('should correctly map to IdentifierEntity and back to Identifier', () => {
        const instance = generateIdentifier()
        const iCureInstance = mapIdentifierToIdentifierDto(instance)
        const newInstance = mapIdentifierDtoToIdentifier(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
