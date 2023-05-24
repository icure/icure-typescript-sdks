import {CodingReference} from "../../src/models/CodingReference.model";
import {Identifier} from "../../src/models/Identifier.model";

describe('Identifier', () => {
    const codingReferenceData = {
        system: 'system_test',
        code: 'code_test',
        display: 'display_test'
    };

    const identifierData = {
        assigner: 'assigner_test',
        end: 'end_test',
        id: 'id_test',
        start: 'start_test',
        system: 'system_test',
        type: new CodingReference(codingReferenceData),
        use: 'use_test',
        value: 'value_test'
    };

    const identifierJSON = {
        assigner: 'assigner_test',
        end: 'end_test',
        id: 'id_test',
        start: 'start_test',
        system: 'system_test',
        type: CodingReference.toJSON(new CodingReference(codingReferenceData)),
        use: 'use_test',
        value: 'value_test'
    };

    test('should convert instance to JSON', () => {
        const identifier = new Identifier(identifierData);

        expect(Identifier.toJSON(identifier)).toEqual(identifierJSON);
    });

    test('should convert JSON to instance', () => {
        const identifier = Identifier.fromJSON(identifierJSON);

        expect(identifier).toEqual(new Identifier(identifierData));
    });

    test('should serialize and deserialize correctly', () => {
        const identifier = new Identifier(identifierData);
        const serialized = Identifier.toJSON(identifier);
        const deserialized = Identifier.fromJSON(serialized);

        expect(deserialized).toEqual(identifier);
    });
});

