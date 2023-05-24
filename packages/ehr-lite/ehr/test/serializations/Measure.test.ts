import { Measure } from '../../src/models/Measure.model'
import {CodingReference} from "../../src/models/CodingReference.model";

describe('Measure', () => {
    const codingReferenceData = {
        id: 'id_test',
        type: 'type_test',
        code: 'code_test',
        version: 'version_test',
        label: new Map([['en', 'label_en'], ['fr', 'label_fr']])
    };

    const measureData = {
        value: 10,
        min: 5,
        max: 15,
        ref: 10,
        severity: 3,
        severityCode: 'code_test',
        evolution: 2,
        unit: 'unit_test',
        unitCodes: [new CodingReference(codingReferenceData)],
        comment: 'comment_test',
        comparator: 'comparator_test'
    };

    const measureJSON = {
        value: 10,
        min: 5,
        max: 15,
        ref: 10,
        severity: 3,
        severityCode: 'code_test',
        evolution: 2,
        unit: 'unit_test',
        unitCodes: [CodingReference.toJSON(new CodingReference(codingReferenceData))],
        comment: 'comment_test',
        comparator: 'comparator_test'
    };

    test('should convert instance to JSON', () => {
        const measure = new Measure(measureData);

        expect(Measure.toJSON(measure)).toEqual(measureJSON);
    });

    test('should convert JSON to instance', () => {
        const measure = Measure.fromJSON(measureJSON);

        expect(measure).toEqual(new Measure(measureData));
    });

    test('should serialize and deserialize correctly', () => {
        const measure = new Measure(measureData);
        const serialized = Measure.toJSON(measure);
        const deserialized = Measure.fromJSON(serialized);

        expect(deserialized).toEqual(measure);
    });
});
