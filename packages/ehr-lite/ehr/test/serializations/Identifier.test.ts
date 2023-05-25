import {Identifier} from '../../src/models/Identifier.model'
import {generateCodingReference} from './CodingReference.test'

export function generateIdentifier(): Identifier {
    const identifier = {
        assigner: 'sampleAssigner',
        end: '2023-05-24',
        id: 'sampleId',
        start: '2023-01-01',
        system: 'sampleSystem',
        type: generateCodingReference(),
        use: 'official',
        value: 'sampleValue',
    }

    return new Identifier(identifier)
}

describe(`Identifier serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateIdentifier()

        const json = Identifier.toJSON(instance)
        const newInstance = Identifier.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
