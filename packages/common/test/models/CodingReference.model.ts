import { CodingReference } from '../../src'

export function generateCodingReference(context?: string): CodingReference {
    return new CodingReference({
        id: 'sampleType|sampleCode|sampleVersion',
        type: 'sampleType',
        code: 'sampleCode',
        version: 'sampleVersion',
        context: context ?? 'sampleContext',
    })
}
