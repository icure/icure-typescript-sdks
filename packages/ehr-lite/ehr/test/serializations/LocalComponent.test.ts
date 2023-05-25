import {LocalComponent} from '../../src/models/LocalComponent.model'

export function generateLocalComponent(): LocalComponent {
    const localComponent = {
        stringValue: 'Sample value',
        documentId: 'sampleDocumentId',
    }

    return new LocalComponent(localComponent)
}

describe(`LocalComponent serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateLocalComponent()

        const json = LocalComponent.toJSON(instance)
        const newInstance = LocalComponent.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
