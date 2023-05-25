import {CodingReference} from "../../src/models/CodingReference.model";
import {ISO639_1} from "@icure/api";

export function generateCodingReference(): CodingReference {
    const codingReference = {
        id: 'sampleType|sampleCode|sampleVersion',
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