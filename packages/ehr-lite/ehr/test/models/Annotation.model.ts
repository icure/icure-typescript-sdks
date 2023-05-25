import {Annotation} from "../../src/models/Annotation.model";
import {ISO639_1} from "@icure/api";
import {generateCodingReference} from "./CodingReference.model";

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