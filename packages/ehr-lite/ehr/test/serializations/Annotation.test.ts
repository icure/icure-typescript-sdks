import { ISO639_1 } from '@icure/api'
import { CodingReference } from '../../src/models/CodingReference.model'
import { Annotation } from '../../src/models/Annotation.model'

describe('Annotation', () => {
    let instance: Annotation
    let json: any

    beforeEach(() => {
        instance = new Annotation({
            id: 'id1',
            tags: [
                new CodingReference({
                    id: 'id1',
                    type: 'type1',
                    code: 'code1',
                    version: 'v1',
                    label: new Map<ISO639_1, string>([['en', 'English']]),
                }),
            ],
            author: 'author1',
            created: 1234567890,
            modified: 1234567890,
            markdown: new Map<ISO639_1, string>([['en', 'Markdown text']]),
            target: 'target1',
            confidential: true,
            encryptedSelf: 'encryptedSelf1',
        })

        json = {
            id: 'id1',
            tags: [
                {
                    id: 'id1',
                    type: 'type1',
                    code: 'code1',
                    version: 'v1',
                    label: { en: 'English' },
                },
            ],
            author: 'author1',
            created: 1234567890,
            modified: 1234567890,
            markdown: { en: 'Markdown text' },
            target: 'target1',
            confidential: true,
            encryptedSelf: 'encryptedSelf1',
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = Annotation.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = Annotation.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = Annotation.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = Annotation.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
