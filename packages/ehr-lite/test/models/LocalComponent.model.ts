import { LocalComponent } from '../../src/models/LocalComponent.model'

export function generateLocalComponent(): LocalComponent {
    const localComponent = {
        stringValue: 'Sample value',
        documentId: 'sampleDocumentId',
    }

    return new LocalComponent(localComponent)
}
