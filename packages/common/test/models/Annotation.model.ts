import { Annotation } from '../../src'
import { ISO639_1 } from '@icure/api'
import { generateCodingReference } from './CodingReference.model'
import { v4 } from 'uuid'

export function generateAnnotation(): Annotation {
    const annotation = {
        id: v4(),
        tags: new Set([generateCodingReference(), generateCodingReference()]),
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
