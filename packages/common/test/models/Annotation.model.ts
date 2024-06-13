import { Annotation } from '../../src'
import { ISO639_1 } from '@icure/api'
import { generateCodingReference } from './CodingReference.model'
import { v4 } from 'uuid'

export function generateAnnotation(): Annotation {
    const annotation = {
        id: v4(),
        tags: [generateCodingReference(), generateCodingReference()],
        author: 'sampleAuthor',
        created: 1234567890,
        modified: 1234567890,
        markdown: Object.fromEntries([
            ['en', 'English Markdown'],
            ['fr', 'French Markdown'],
        ]) as Record<ISO639_1, string>,
        target: 'sampleTarget',
        confidential: true,
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new Annotation(annotation)
}
