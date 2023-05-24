import {LocalComponent} from "../../src/models/LocalComponent.model";

describe('LocalComponent', () => {
    const localComponentData = {
        stringValue: 'string_value_test',
        documentId: 'document_id_test'
    };

    const localComponentJSON = {
        stringValue: 'string_value_test',
        documentId: 'document_id_test'
    };

    test('should convert instance to JSON', () => {
        const localComponent = new LocalComponent(localComponentData);

        expect(LocalComponent.toJSON(localComponent)).toEqual(localComponentJSON);
    });

    test('should convert JSON to instance', () => {
        const localComponent = LocalComponent.fromJSON(localComponentJSON);

        expect(localComponent).toEqual(new LocalComponent(localComponentData));
    });

    test('should serialize and deserialize correctly', () => {
        const localComponent = new LocalComponent(localComponentData);
        const serialized = LocalComponent.toJSON(localComponent);
        const deserialized = LocalComponent.fromJSON(serialized);

        expect(deserialized).toEqual(localComponent);
    });
});

