import {CodingReference} from '../../src/models/CodingReference.model'
import {ISO639_1} from '@icure/api'

export function generateCodingReference(): CodingReference {
    const codingReference = {
        id: 'sampleId',
        type: 'sampleType',
        code: 'sampleCode',
        version: 'sampleVersion',
        label: new Map<ISO639_1, string>([
            ['en', 'English Label'],
            ['fr', 'French Label'],
        ]),
    }

    return new CodingReference(codingReference)
}

describe(`CodingReference serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateCodingReference()

        const json = CodingReference.toJSON(instance)
        const newInstance = CodingReference.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
