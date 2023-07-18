import {CodingReference} from "../../src";
import {ISO639_1} from "@icure/api";

export function generateCodingReference(context?: string): CodingReference {
    const codingReference = {
        id: 'sampleType|sampleCode|sampleVersion',
        type: 'sampleType',
        code: 'sampleCode',
        version: 'sampleVersion',
        context: context ?? 'sampleContext',
        label: new Map<ISO639_1, string>([
            ['en', 'English Label'],
            ['fr', 'French Label'],
        ]),
    }

    return new CodingReference(codingReference)
}