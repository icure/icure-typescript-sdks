import {ISO639_1} from '@icure/api'
import {Annotation} from '../../src/models/Annotation.model'
import {generateCodingReference} from './CodingReference.test'

export function generateAnnotation(): Annotation {
    const annotation = {
        id: 'sampleId',
        tags: [generateCodingReference(), generateCodingReference()],
        author: 'sampleAuthor',
        created: 1234567890,
        modified: 1234567890,
        markdown: new Map<ISO639_1, string>([
            ['en', 'English Markdown'],
            ['fr', 'French Markdown'],
        ]),
        target: 'sampleTarget',
        confidential: true,
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new Annotation(annotation)
}

describe(`Annotation serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateAnnotation()

        const json = Annotation.toJSON(instance)
        const newInstance = Annotation.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
