import { CodingReference } from '../../src/models/CodingReference.model'

describe('CodingReference', () => {
    const labelData = new Map([['en', 'label_en'], ['fr', 'label_fr']]);

    const codingReferenceData = {
        id: 'id_test',
        type: 'type_test',
        code: 'code_test',
        version: 'version_test',
        label: labelData
    };

    const codingReferenceJSON = {
        id: 'id_test',
        type: 'type_test',
        code: 'code_test',
        version: 'version_test',
        label: { 'en': 'label_en', 'fr': 'label_fr' }
    };

    test('should convert instance to JSON', () => {
        const codingReference = new CodingReference(codingReferenceData);

        expect(CodingReference.toJSON(codingReference)).toEqual(codingReferenceJSON);
    });

    test('should convert JSON to instance', () => {
        const codingReference = CodingReference.fromJSON(codingReferenceJSON);

        expect(codingReference).toEqual(new CodingReference(codingReferenceData));
    });

    test('should serialize and deserialize correctly', () => {
        const codingReference = new CodingReference(codingReferenceData);
        const serialized = CodingReference.toJSON(codingReference);
        const deserialized = CodingReference.fromJSON(serialized);

        expect(deserialized).toEqual(codingReference);
    });
});
