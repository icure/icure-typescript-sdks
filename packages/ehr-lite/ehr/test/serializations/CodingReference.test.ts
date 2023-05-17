import { CodingReference } from '../../src/models/CodingReference.model'
import { ISO639_1 } from '@icure/api'

describe('CodingReference', () => {
    let instance: CodingReference
    let json: any

    beforeEach(() => {
        instance = new CodingReference({
            id: 'id1',
            type: 'type1',
            code: 'code1',
            version: 'v1',
            label: new Map<ISO639_1, string>([['en', 'English']]),
        })

        json = {
            id: 'id1',
            type: 'type1',
            code: 'code1',
            version: 'v1',
            label: {
                en: 'English',
            },
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = CodingReference.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = CodingReference.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = CodingReference.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = CodingReference.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
